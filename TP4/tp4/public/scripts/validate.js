$(document).ready(function() {
    // Exam events
    $("#examenForm").submit(function( event ) {// DEPRECATED
        if(examenFini == false) {
            event.preventDefault();
            newExamQuestion();
        }
        
    });
    $("#abandonExam").submit(function( event ) {// DEPRECATED
        sessionStorage.score = 0;
    });
    
    
    // Test events
    $("#testForm").submit(function( event ) {// DEPRECATED
        event.preventDefault();
        newTestQuestion();
    });
    $("#abandonTest").submit(function( event ) {// DEPRECATED
        localStorage.testScore = parseInt((localStorage.testScore || 0)) + parseInt(sessionStorage.score);
        localStorage.testCount = parseInt((localStorage.testCount || 0)) + parseInt(sessionStorage.count) - 1;
    });
    
    
    // Tableau de bord events
    $( "#startTest" ).submit(function( event ) {// DEPRECATED
        sessionStorage.count = 0;
        sessionStorage.score = 0;
    });
    $( "#startExamen" ).submit(function( event ) {// DEPRECATED
        sessionStorage.totalQuestions = $("#nbquestions").val();
        sessionStorage.domain = $("#domaine option:selected").val();
        sessionStorage.count = 0;
        sessionStorage.score = 0;
    });
    $( "#reset" ).click(function( event ) { // DEPRECATED
        localStorage.clear();
        refreshScore();
    });
    $("#domaine").on('change', function(event) {
        var valueSelected = this.value;
        getQuestionCount(valueSelected);
    });
    
    
    // Admin events
    $("#addQuestion").submit(function(event) {
        event.preventDefault();
        // validate the data entered
        var question = validateStringInput($("#questioninput").val());
        var domain = validateStringInput($("#domaine option:selected").val());
        var trueAnswer = validateStringInput($('input[name=trueAnswer]:checked', '#addQuestion').val());
        var answers = [];
        $("#answerinputlist").children().each(function() {
            answers.push(validateStringInput($(this).children('input[type=text]').val()));
        });
        console.log(question, domain, trueAnswer, answers);
        
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
        emptyDatabase();
    });
});