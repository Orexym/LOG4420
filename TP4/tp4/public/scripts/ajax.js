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
    
    $.get('/api/test', {}, function(result) {
        
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
    
    $.get('/api/domain/'+sessionStorage.domain, {}, function(result) {
        
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

// post new question
function addQuestion(data) {
    $.post('/api/addQuestion', data, function(result, status) {
        reset();
        addAnswer();
        addAnswer();
        // SHOW FEEDBACK
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// empty database
function emptyDatabase() {
    $.post('/api/emptyDatabase', {}, function(result, status) {
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// Get nb questions
function getQuestionCount(data) {
    $.get('/api/questionCount/'+data, {}, function(result, status) {
        var input = $("#nbquestions");
        input.prop('max', result);
        if(result <= input.val()) {
            input.val(result);
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// request (validate + update score) -> reply (new question + updated score)