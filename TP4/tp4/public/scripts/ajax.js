// get new question
function getNextTestQuestion() {
    
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
function getNextExamQuestion() {
    
    $.get('/api/examen/question', {}, function(result) {
    
        // reset view
        reset();
    
        var q = result.q;
        var n = result.n;
        
        // update view
        $('#questionText').html(q.question);
        $("#questionTitle").html("Question " + (n.examen.currentexam.questionIndex) + " / " + n.examen.currentexam.totalQuestions);
        $("#questionDomain").html("Domaine : " + q.domain.toUpperCase());
        if(n.examen.currentexam.questionIndex >= n.examen.currentexam.totalQuestions) {
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
    
        $("#banner").html("Question ajoutée avec succès");
        $("#banner").animate({
            right: '20px'
        },400)
            .delay(2000)
            .animate({
                right: '-270px'
            },400);
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// empty database
function emptyQuestionDatabase() {
    $.delete('/api/question/emptyDB', {}, function(result, status) {
    
        $("#banner").html("DB de questions vidée avec succès");
        $("#banner").animate({
            right: '20px'
        },400)
            .delay(2000)
            .animate({
                right: '-270px'
            },400);
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// Get nb questions
function getQuestionCount(domain) {
    $.get('/api/question/count/'+domain, {}, function(result, status) {
        var input = $("#nbquestions");
        input.prop('max', result.count);
        if(result.count <= input.val()) {
            input.val(result.count);
        }
        
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// get nb questions total
function getQuestionCountTotal() {
    $.get('api/question/count', {}, function(result, status) {
        console.log("Somme: " + result.count);
        if(result.count == 0) {
            $("#startExamen input[type=submit]").prop('disabled', true);
            $("#startTest input[type=submit]").prop('disabled', true);
        }
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// validate question
function validateQuestion(attemptedAnswer) {
    $.post('/api/question/validate', attemptedAnswer, function(result, status) {
        
        var user = result.n;
        refreshScore(user);
        
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

// configure test
function configureTest() {
    $.put('/api/test/configure', {}, function(result, status) {
        startTestExecutedOnce = true;
        $( "#startTest" ).trigger("submit");
        console.log("Result: " + result);
        console.log("Status: " + status);
    })
}

// finish exam == abandon exam
function finishExam() {
    $.post('/api/examen/finish', {}, function(result, status) {
        endExamExecutedOnce = true;
        $( "#examenForm" ).trigger("submit");
        
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// finish test == abandon test
function finishTest() {
    $.post('/api/test/finish', {}, function(result, status) {
        
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
        
        showContinueExamButton(user.exam_flag == 1);
        console.log("Result: " + result);
        console.log("Status: " + status);
    });
}

// reset scores
function resetScores() {
    $.delete('/api/user/resetScores', {}, function(result, status) {
    
        $("#banner").html("Résultats précédents vidés avec succès");
        $("#banner").animate({
                right: '20px'
            },400)
            .delay(2000)
            .animate({
                right: '-270px'
            },400);
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