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

    constructor(
       private userService: UserService,
       private questionService: QuestionService
    ) {

    }

    emptyDb() : void {
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



    reset() : void {
        /*
         $("#addAnswer").prop("disabled", false);
         $("#answerinputlist").empty();
         $("input[type=text]").val("");
         $("input[type=radio]").removeProp('checked');
         */
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
