// get new question
function newTestQuestion() {
    
    $.get('/api/test/questions', {}, function(result) {
        
        // reset view
        reset();
        
        var q = result.q;
        var u = result.u;
        
        // update view
        $("#questionText").html(q.question);
        $("#questionTitle").html("Question " + (u.test.currenttest.total+1));
        $("#questionDomain").html("Domaine : " + q.domain.toUpperCase());
        
        // build answers
        var answerElements = [];
        $.each(q.ans, function(i, item) {
            answerElements.push("<li class='answerElement' draggable='true' id='"+item.value+"'><span>"+item.text+"</span></li>");
        });
        $("#answerList").append(answerElements.join(''));
        $(document).off("drop");
        addDnDListeners($(".answerElement"), $(".dropzone"));
    });
}

// get new question
function newExamQuestion() {
    
    $.get('/api/exam/questions', {}, function(result) {
    
        // reset view
        reset();
    
        var q = result.q;
        var u = result.u;
        
        // update view
        $('#questionText').html(q.question);
        $("#questionTitle").html("Question " + (u.examen.currentexam.questionIndex+1) + " / " + u.examen.currentexam.totalQuestions);
        $("#questionDomain").html("Domaine : " + q.domain.toUpperCase());
        if(u.examen.currentexam.questionIndex+1 == u.examen.currentexam.totalQuestions) {
            $(".next").val("Terminer");
            $("#examenForm").prop('action', './resultats');
            examenFini = true;
        }
        
        // build answers
        var answerElements = [];
        $.each(q.ans, function(i, item) {
            answerElements.push("<li class='answerElement' draggable='true' id='"+item.value+"'><span>"+item.text+"</span></li>");
        });
        $("#answerList").append(answerElements.join(''));
        $(document).off("drop");
        addDnDListeners($(".answerElement"), $(".dropzone"));
    });
}

// post new question
function addQuestion(data) {
    $.post('/api/questions', data, function(result, status) {
        reset();
        addAnswer();
        addAnswer();
        // SHOW FEEDBACK
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// empty database
function emptyQuestionDatabase() {
    $.delete('/api/emptyQuestionDatabase', {}, function(result, status) {
        // SEND FEEDBACK
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// Get nb questions
function getQuestionCount(data) {
    $.get('/api/questionCount/'+data, {}, function(result, status) {
        var input = $("#nbquestions");
        input.prop('max', result.count);
        if(result.count <= input.val()) {
            input.val(result.count);
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// validate question
function validateTestQuestion(attemptedAnswer, dropSelector) {
    $.post('/api/validation', attemptedAnswer, function(result, status) {
        $("#scoreCourant").html("Score courant : " + (Math.round(parseInt(result.u.test.currenttest.score) / parseInt(result.u.test.currenttest.total) * 100) || 0) + "%");
        if(parseInt(result.goodAnswer) == 1) {
            dropSelector.addClass("valid");
            $(".unaffectedText").html("&#x2713;");
        } else {
            dropSelector.addClass("invalid");
            $(".unaffectedText").html("&#x2717;");
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// validate question
function validateExamQuestion(trueAnswer, dropSelector) {
    $.post('/api/validation', trueAnswer, function(result, status) {
        $("#scoreCourant").html("Score courant : " + (Math.round(parseInt(result.u.examen.currentexam.score) / parseInt(result.u.examen.currentexam.questionIndex) * 100) || 0) + "%");
        if(parseInt(result.goodAnswer) == 1) {
            dropSelector.addClass("valid");
            $(".unaffectedText").html("&#x2713;");
        } else {
            dropSelector.addClass("invalid");
            $(".unaffectedText").html("&#x2717;");
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// configure exam
function configureExam(domain, totalQuestions) {
    $.put('/api/configureExam/', { domain: domain, totalQuestions: totalQuestions }, function(result, status) {
        executedOnce = true;
        $( "#startExamen" ).trigger("submit");
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// finish exam == abandon exam
function finishExam() {
    $.put('/api/exam/finish', {id: sessionStorage.id}, function(result, status) {
        // SEND FEEDBACK
        sessionStorage.exam_flag = 0;
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// finish test == abandon test
function finishTest() {
    $.put('/api/test/finish', {id: sessionStorage.id}, function(result, status) {
        // SEND FEEDBACK
        refreshScore()
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// load profile
function loadProfile() {
    $.get('/api/load', {}, function(result, status) {
        var user = result;
        sessionStorage.id = user._id;
        sessionStorage.exam_flag = user.exam_flag;
        
        // Ajouter alerte pour reprendre un exam en cours
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

/*
    EXTENDED SUPPORT FOR PUT/DELETE
 */
jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }
        
        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});