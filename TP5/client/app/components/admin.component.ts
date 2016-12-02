import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
import { QuestionService } from "../services/question.service";

const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
};

@Component({
    selector: 'my-admin',
    templateUrl: 'templates/admin'
})

export class AdminComponent {

    disable: boolean = false;
    answerSlates: string[] = ["", ""];
    question: string;
    domain: string;
    trueAnswer: string;

    constructor(
       private userService: UserService,
       private questionService: QuestionService
    ) {

    }

    emptyDB() : void {
        this.questionService.emptyQuestionDatabase().then(() => {
            /*
             $("#banner").html("DB de questions vidée avec succès");
             $("#banner").animate({
             right: '20px'
             },400)
             .delay(2000)
             .animate({
             right: '-270px'
             },400);
             */
        })
    }

    addAnswer() : void {
        if(this.answerSlates.length >= 6) {
            return;
        }
        this.answerSlates.push("");
        if(this.answerSlates.length >= 6) {
            this.disable = true;
        }
    }

    addQuestion() : void {
        console.log("Got here");
        console.log(this.question);
        console.log(this.trueAnswer);
        console.log(this.answerSlates);
        /*
        // validate the data entered
        var trueAnswer = validateStringInput($('input[name=trueAnswer]:checked', '#addQuestion').val());
        var answers = [];
        $("#answerinputlist").children().each(function() {
            answers.push(validateStringInput($(this).children('input[type=text]').val()));
        });

        // send to server
        this.questionService.addQuestion(
            {
                "domain": this.domain,
                "question": this.question,
                "ans": JSON.stringify(answers),
                "trueAnswer": trueAnswer
            }
        ).then(() => {

        });*/
    }

    mapAnswers() {
        return this;
    }

    reset() : void {
         this.disable = false;
    }

    // validation de string
    validateStringInput(stringInput: string) : string {
        return this.validateInput(stringInput.replace(/[&<>"']/g, function(m) { return map[m]; }));
    }

    // validation d'objet
    validateInput(input: any) : any {
        return input || 0;
    }
}
