$(document).ready(function() {
    // Exam events
    $("#examenForm").submit(function( event ) {
        if(examenFini == false) {
            event.preventDefault();
            event.stopImmediatePropagation();
            newExamQuestion();
        } else {
            if(endExamExecutedOnce == false) {
                event.preventDefault();
                event.stopImmediatePropagation();
                finishExam();
            }
        }
    });
    $("#abandonExam").submit(function( event ) {
        finishExam();
    });
    
    
    // Test events
    $("#testForm").submit(function( event ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        newTestQuestion();
    });
    $("#abandonTest").submit(function( event ) {
        finishTest();
    });
    
    
    // Tableau de bord events
    $("#nbquestions").keypress(function ( event ) {
        event.preventDefault();
    });
    $( "#startExamen" ).submit(function( event ) {
        if(showConfirm && !confirm("Un examen est déjà en cours. Voulez-vous abandonner et en débuter un nouveau?")) {
            showConfirm = false;return;
        }
        if(!startExamExecutedOnce) {
            event.preventDefault();
            event.stopImmediatePropagation();
            configureExam($("#domaine option:selected").val(), $("#nbquestions").val());
        }
    });
    $( "#reset" ).click(function( event ) {
        resetScores();
    });
    $("#domaine").on('change', function(event) {
        var valueSelected = this.value;
        getQuestionCount(valueSelected);
    });
    
    
    // Admin events
    $("#addQuestion").submit(function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        // validate the data entered
        var question = validateStringInput($("#questioninput").val());
        var domain = validateStringInput($("#domaine option:selected").val());
        var trueAnswer = validateStringInput($('input[name=trueAnswer]:checked', '#addQuestion').val());
        var answers = [];
        $("#answerinputlist").children().each(function() {
            answers.push(validateStringInput($(this).children('input[type=text]').val()));
        });
        
        // send to server
        addQuestion(
            {
                "domain": domain,
                "question": question,
                "ans": JSON.stringify(answers),
                "trueAnswer": trueAnswer
            }
        );
    });
    $("#addAnswer").click( function() {
        addAnswer();
    });
    $("#vider").click( function() {
        emptyQuestionDatabase();
    });
});