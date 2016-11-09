// get new question
function newTestQuestion() {
    
    $.get('/api/test/question', {}, function(result) {
        
        // reset view
        reset();
        
        var q = result.q;
        var n = result.n;
        
        // update view
        $("#questionText").html(q.question);
        $("#questionTitle").html("Question " + n.test.currenttest.total);
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
    
    $.get('/api/examen/question', {}, function(result) {
    
        // reset view
        reset();
    
        var q = result.q;
        var n = result.n;
        
        // update view
        $('#questionText').html(q.question);
        $("#questionTitle").html("Question " + (n.examen.currentexam.questionIndex) + " / " + n.examen.currentexam.totalQuestions);
        $("#questionDomain").html("Domaine : " + q.domain.toUpperCase());
        if(n.examen.currentexam.questionIndex == n.examen.currentexam.totalQuestions) {
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
    $.post('/api/question/add', data, function(result, status) {
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
    $.delete('/api/question/emptyDB', {}, function(result, status) {
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
function validateTestQuestion(attemptedAnswer) {
    $.post('/api/question/validate', attemptedAnswer, function(result, status) {
        $("#scoreCourant").html("Score courant : " +
            (Math.round(parseInt(result.n.test.currenttest.score) / parseInt(result.n.test.currenttest.total) * 100) || 0) + "%");
        if(parseInt(result.goodAnswer) == 1) {
            $(".dropzone").addClass("valid");
            $(".unaffectedText").html("&#x2713;");
        } else {
            $(".dropzone").addClass("invalid");
            $(".unaffectedText").html("&#x2717;");
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// validate question
function validateExamQuestion(trueAnswer) {
    $.post('/api/question/validate', trueAnswer, function(result, status) {
        $("#scoreCourant").html("Score courant : " +
            (Math.round(parseInt(result.n.examen.currentexam.score) / parseInt(result.n.examen.currentexam.questionIndex) * 100) || 0) + "%");
        if(parseInt(result.goodAnswer) == 1) {
            $(".dropzone").addClass("valid");
            $(".unaffectedText").html("&#x2713;");
        } else {
            $(".dropzone").addClass("invalid");
            $(".unaffectedText").html("&#x2717;");
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// configure exam
function configureExam(domain, totalQuestions) {
    $.put('/api/examen/configure', { domain: domain, totalQuestions: totalQuestions }, function(result, status) {
        startExamExecutedOnce = true;
        $( "#startExamen" ).trigger("submit");
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// finish exam == abandon exam
function finishExam() {
    $.post('/api/examen/finish', {}, function(result, status) {
        // SEND FEEDBACK
        endExamExecutedOnce = true;
        sessionStorage.exam_flag = 0;
        refreshScore(result.n);
        $( "#examenForm" ).trigger("submit");
        
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// finish test == abandon test
function finishTest() {
    $.post('/api/test/finish', {}, function(result, status) {
        // SEND FEEDBACK
        refreshScore(result.n);
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// resultats finaux
function resultatsFinaux() {
    $.get('/api/user/finalResults', {}, function(result, status) {
        
        var user = result.n;
        
        var messages = [
            'Score final inacceptable.',
            'Score final &agrave; am&eacute;liorer.',
            'Score final passable.',
            'Score final excellent.',
            'Score final parfait.'
        ];
        var step = 25;
        
        // calcul du score + du message
        var finalScore = Math.round(parseInt(user.examen.currentexam.score) / parseInt(user.examen.currentexam.totalQuestions) * 100);
        var palier = Math.floor(finalScore / step);
        
        
        // update view
        $("#finalScore").html(finalScore);
        $("#message").html(messages[palier]);
    
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// load profile
function loadProfile() {
    $.get('/api/user/load', {}, function(result, status) {
        var user = result.n;
        refreshScore(user);
        sessionStorage.id = user._id;
        sessionStorage.exam_flag = user.exam_flag;
        
        // Ajouter alerte pour reprendre un exam en cours
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// reset scores
function resetScores() {
    $.delete('/api/user/resetScores', {}, function(result, status) {
        // SEND FEEDBACK
        refreshScore(result.n);
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