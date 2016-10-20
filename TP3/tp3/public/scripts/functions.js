$(document).ready(function(){
    var examenFini = false;
        
    // Tableau de bord events
    $( "#startTest" ).submit(function( event ) {
        sessionStorage.count = 0;
        sessionStorage.score = 0;
    });
    $( "#startExamen" ).submit(function( event ) {
        sessionStorage.totalQuestions = $("#questions").val();
        sessionStorage.domain = $("#domaine option:selected").val();
        sessionStorage.count = 0;
        sessionStorage.score = 0;
    });
    $( "#reset" ).click(function( event ) {
        localStorage.clear();
        refreshScore();
    });
    
    // Exam events
    $("#examenForm").submit(function( event ) {
        if(examenFini == false) {
            event.preventDefault();
            newExamQuestion();
        }
        
    });
    $("#abandonExam").submit(function( event ) {
        sessionStorage.score = 0;
    });
    
    
    // Test events
    $("#testForm").submit(function( event ) {
        event.preventDefault();
        newTestQuestion();
    });
    $("#abandonTest").submit(function( event ) {
        localStorage.testScore = parseInt((localStorage.testScore || 0)) + parseInt(sessionStorage.score);
        localStorage.testCount = parseInt((localStorage.testCount || 0)) + parseInt(sessionStorage.count) - 1;
    });
    
    $("#questions").keypress(function (evt) {
        evt.preventDefault();
    });
    
    
});

// get new question
function newTestQuestion() {
    
    // update score
    $("#scoreCourant").html("Score courant : " + (Math.round(parseInt(sessionStorage.score) / parseInt(sessionStorage.count) * 100) || 0) + "%");
    
    // reset view
    $(".next").prop("disabled", true);
    $(".unaffectedText").html("D&eacute;poser ici");
    $(".dropzone").removeClass("valid").removeClass("invalid");
    var list = $("#answerList");
    list.empty();
    
    $.get('/ajax/test', {}, function(result) {
        
        // save data to sessionStorage
        sessionStorage.question = JSON.stringify(result);
        sessionStorage.count = parseInt(sessionStorage.count) + 1;
        sessionStorage.domain = result.domain;
        
        // update view
        $("#questionText").html(result.question);
        $("#questionTitle").html("Question " + sessionStorage.count);
        $("#questionDomain").html("Domaine : " + sessionStorage.domain.toUpperCase());
        
        // build answers
        var answerElements = [];
        $.each(result.ans, function(i, item) {
            answerElements.push("<li class='answerElement' draggable='true' id='"+item.value+"'><span>"+item.text+"</span></li>");
        });
        list.append(answerElements.join(''));
        $(document).off("drop");
        addDnDListeners($(".answerElement"), $(".dropzone"));
    });
}

// get new question
function newExamQuestion() {
    
    // update score
    $("#scoreCourant").html("Score courant : " + (Math.round(parseInt(sessionStorage.score) / parseInt(sessionStorage.count) * 100) || 0) + "%");
    
    // reset view
    $(".next").prop("disabled", true);
    $(".unaffectedText").html("D&eacute;poser ici");
    $(".dropzone").removeClass("valid").removeClass("invalid");
    var list = $("#answerList");
    list.empty();
    
    $.get('/ajax/domain='+sessionStorage.domain, {}, function(result) {
        
        // save data to sessionStorage
        sessionStorage.question = JSON.stringify(result);
        sessionStorage.count = parseInt(sessionStorage.count) + 1;
        
        // update view
        $('#questionText').html(result.question);
        $("#questionTitle").html("Question " + sessionStorage.count + " / " + sessionStorage.totalQuestions);
        $("#questionDomain").html("Domaine : " + sessionStorage.domain.toUpperCase());
        if(sessionStorage.count == sessionStorage.totalQuestions) {
            $(".next").val("Terminer");
            $("#examenForm").attr('action', './resultats');
            examenFini = true;
        }
        
        // build answers
        var answerElements = [];
        $.each(result.ans, function(i, item) {
            answerElements.push("<li class='answerElement' draggable='true' id='"+item.value+"'><span>"+item.text+"</span></li>");
        });
        list.append(answerElements.join(''));
        $(document).off("drop");
        addDnDListeners($(".answerElement"), $(".dropzone"));
    });
}

// refresh current score and fill score table
function refreshScore() {
    // insert stats in stats table
    $(".examenList").empty();
    
    // get test scores
    $(".testScore").html((localStorage.testScore || 0) + " / " + (localStorage.testCount || 0));
    
    // get exam scores + average
    var totalScore = 0;
    var totalCount = 0;
    var examens = (localStorage.examens != undefined) ? JSON.parse(localStorage.examens) : [];
    for (var i = examens.length - 1; i >= 0; i--) {
        $(".examenList").after("<tr class='examenElement'><td>Examen" + examens[i].id + "</td>" +
            "<td>(" + examens[i].domain.toUpperCase() + ")</td>" +
            "<td>" + (Math.round(parseInt(examens[i].score) / parseInt(examens[i].total) * 100) || 0) + "%</td></tr>");
        
        totalScore += parseInt(examens[i].score);
        totalCount += parseInt(examens[i].total);
    }
    $(".examScore").html((Math.round(totalScore / totalCount * 100) || 0) + "%");
    
}

function resultatsFinaux() {
    var messages = [
        'Score final inacceptable.',
        'Score final &agrave; am&eacute;liorer.',
        'Score final passable.',
        'Score final excellent.',
        'Score final parfait.'
    ];
    var step = 25;
    var palier = -1;
    
    // calcul du score + du message
    var finalScore = Math.round(parseInt(sessionStorage.score) / parseInt(sessionStorage.count) * 100);
    var temp = finalScore;
    while(temp >= 0) { temp -= step; palier += 1; }
    
    // update view
    $("#finalScore").html(finalScore);
    $("#message").html(messages[palier]);
    
    // update stats
    localStorage.nbExamens = parseInt((localStorage.nbExamens || 0)) + 1;
    var examens = (localStorage.examens != undefined) ? JSON.parse(localStorage.examens) : [];
    var newExam = {
        "id" : localStorage.nbExamens,
        "score" : sessionStorage.score,
        "total" : sessionStorage.count,
        "domain" : sessionStorage.domain
    };
    examens.push(newExam);
    localStorage.examens = JSON.stringify(examens);
}

// set DnD listeners to answer items
function addDnDListeners(dragSelector, dropSelector) {
    // extra styling
    $(dragSelector).on("mousedown", function (e) {
        // add drag class
        $(dragSelector).addClass("drag");
    });
    $(document).on("mouseup",function(e){
        // remove drag class
        $(dragSelector).removeClass("drag");
    });
    
    // Drag events
    $(dragSelector).on("dragstart",function(e){
        e.originalEvent.dataTransfer.setData("answer", e.target.id);
        e.originalEvent.dataTransfer.effectAllowed = "move";
    });
    $(dragSelector).on("dragend",function(e){
        // remove drag class
        $(dragSelector).removeClass("drag");
    });
    
    // Drop events
    $(dropSelector).on("dragenter",function(e){
        // add dragenter class
        $(e.target).addClass("dragenter");
    });
    $(dropSelector).on("dragleave",function(e){
        // remove dragenter class
        $(e.target).removeClass("dragenter");
    });
    $(dropSelector).on("dragover",function(e){
        // set drop effect
        e.originalEvent.dataTransfer.dropEffect = "move";
        e.preventDefault();
    });
    $(document).on("drop",function(e){
        // remove dragenter class
        $(e.target).removeClass("dragenter");
        
        // validate answer (replace form submit)
        var attemptedAnswer = e.originalEvent.dataTransfer.getData("answer");
        var correctAnswer = JSON.parse(sessionStorage.question).trueAnswer;
        if(correctAnswer == attemptedAnswer) {
            sessionStorage.score = parseInt(sessionStorage.score) + 1;
            dropSelector.addClass("valid");
            $(".unaffectedText").html("&#x2713;");
        } else {
            dropSelector.addClass("invalid");
            $(".unaffectedText").html("&#x2717;");
        }
        
        // remove draggability
        $(dragSelector).prop("draggable", false);
        $(".next").prop("disabled", false);
        
        e.preventDefault();
    });
    
}