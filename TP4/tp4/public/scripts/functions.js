var examenFini = false;
var startExamExecutedOnce = false;
var endExamExecutedOnce = false;

$(document).ready(function(){
    
    // Kill link drags
    $("a").on('dragstart', function(e) {
       e.preventDefault();
    });
    
    // Check for current session
    loadProfile();
    
});

// refresh current score and fill score table
function refreshScore(result) {
    // insert stats in stats table
    $(".examenList ~ tr").empty();
    
    // get user
    var user = result;
    
    if(parseInt(user.exam_flag) == 1) {
        $("#scoreCourant").html("Score courant : " +
            (Math.round(parseInt(user.examen.currentexam.score) / parseInt(user.examen.currentexam.questionIndex) * 100) || 0) + "%");
    } else {
        $("#scoreCourant").html("Score courant : " +
            (Math.round(parseInt(user.test.currenttest.score) / parseInt(user.test.currenttest.total) * 100) || 0) + "%");
    }
    
    // get test scores
    $(".testScore").html((user.test.score || 0) + " / " + (user.test.total || 0));
    
    // get exam scores + average
    var examens = (user.examen.previousexam.length > 0) ? user.examen.previousexam : [];
    for (var i = examens.length - 1; i >= 0; i--) {
        $(".examenList").after("<tr class='examenElement'><td>" + examens[i].date + "</td>" +
            "<td>(" + examens[i].domain.toUpperCase() + ")</td>" +
            "<td>" + (Math.round(parseInt(examens[i].score) / parseInt(examens[i].total) * 100) || 0) + "%</td></tr>");
    }
    $(".examScore").html((Math.round(user.examen.score / user.examen.total * 100) || 0) + "%");
    
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
        validateQuestion({ "attemptedAnswer" : attemptedAnswer });
        
        // remove draggability
        $(dragSelector).prop("draggable", false);
        $(".next").prop("disabled", false);
    });
    
}

// ajouter un champ de réponse
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
    
    if(list.children().length >= 6) {
        $("#addAnswer").prop("disabled", true);
    }
}

// reset les vues
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

// afficher le bouton continuer
function showContinueExamButton(show) {
    console.log("Here first?");
    if(show) {
        $("#continueExamen").removeClass("hidden");
        console.log("Here");
    }
}

// validation de string
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

// validation d'objet
function validateInput(input) {
    return input || 0;
}