var examenFini = false;
var executedOnce = false;
$(document).ready(function(){
    
    // Kill link drags
    $("a").on('dragstart', function(e) {
       e.preventDefault();
    });
    
    // Check for current session
    if(sessionStorage.id == undefined) {
        loadProfile();
    }
    
});

// refresh current score and fill score table
function refreshScore(user) {
    // insert stats in stats table
    $(".examenList").empty();
    
    // get test scores
    $(".testScore").html((user.test.score || 0) + " / " + (user.test.total || 0));
    
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
    
    // calcul du score + du message
    var finalScore = Math.round(parseInt(sessionStorage.score) / parseInt(sessionStorage.count) * 100);
    var palier = Math.floor(finalScore / step);
    
    
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
        $(dropSelector).addClass("dragenter");
    });
    $(dropSelector).on("dragleave",function(e){
        // remove dragenter class
        $(dropSelector).removeClass("dragenter");
    });
    $(dropSelector).on("dragover",function(e){
        // set drop effect
        e.originalEvent.dataTransfer.dropEffect = "move";
        e.preventDefault();
    });
    $(document).on("drop",function(e){
        e.preventDefault();
        
        // remove dragenter class
        $(dropSelector).removeClass("dragenter");
        
        // validate answer (replace form submit)
        var attemptedAnswer = e.originalEvent.dataTransfer.getData("answer");
        if(sessionStorage.exam_flag == 1) {
            validateExamQuestion({ "attemptedAnswer" : attemptedAnswer }, dropSelector);
        } else {
            validateTestQuestion({ "attemptedAnswer" : attemptedAnswer }, dropSelector);
        }
        
        // remove draggability
        $(dragSelector).prop("draggable", false);
        $(".next").prop("disabled", false);
    });
    
}

function addAnswer() {
    var list = $("#answerinputlist");
    var inputs = $("div.hidden div").clone();
    var newSize = list.children().length;
    if(newSize >= 6) { // On veut pas pouvoir spam le +
        return;
    }
    
    inputs.children("input[type=radio]").val(newSize).prop('id', newSize);
    inputs.children("label").prop('for', newSize).append("Réponse "+ (newSize+1));
    list.append(inputs);
    newSize = list.children().length;
    if(newSize >= 6) {
        $("#addAnswer").prop("disabled", true);
    }
}

function reset() {
    
    //admin page
    $("#addAnswer").prop("disabled", false);
    $("#answerinputlist").empty();
    $("input[type=text]").val("");
    $("input[type=radio]").removeProp('checked');
    
    // quiz page
    $(".next").prop("disabled", true);
    $(".unaffectedText").html("D&eacute;poser ici");
    $(".dropzone").removeClass("valid").removeClass("invalid");
    $("#answerList").empty();
}

function validateStringInput(stringInput) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return validateInput(stringInput.replace(/[&<>"']/g, function(m) { return map[m]; }));
}

function validateInput(input) {
    return input || 0;
}