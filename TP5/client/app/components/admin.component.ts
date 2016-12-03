import { Component } from '@angular/core';
import { QuestionService } from "../services/question.service";

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
    
    bannerText: string;    
    private bannerHidden = true;

    constructor(
       private questionService: QuestionService
    ) {
        this.hideBanner();
    }

    emptyDB() : void {
        this.questionService.emptyQuestionDatabase().then(() => {
			this.bannerText = "DB de questions vidée avec succès";
			this.showBanner();
			setTimeout(() => this.hideBanner(), 2000);
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
        this.questionService.addQuestion(
            {
                "domain": this.validateInput(this.domain),
                "question": this.validateInput(this.question),
                "ans": JSON.stringify(this.validateStringInputByArray(this.answerSlates)),
                "trueAnswer": this.validateInput(this.trueAnswer)
            }
        ).then(() => {
        	this.bannerText = "Question ajoutée avec succès";
			this.showBanner();
			setTimeout(() => this.hideBanner(), 2000);
            this.reset();
        });
    }

    mapAnswers() {
        return this;
    }

    reset() : void {
         this.disable = false;
         this.answerSlates = ["", ""];
         this.trueAnswer = "";
         this.domain = "";
         this.question = "";
    }

    // validation de string
    validateStringInputByArray(stringInputs: string[]) : string[] {
        let sanitized: string[] = [];
        stringInputs.forEach(s => {
            sanitized.push(this.validateInput(s));
        });
        return sanitized;
    }

    // validation d'objet
    validateInput(input: any) : any {
        console.log(input);
        return input || 0;
    }
    
    hideBanner() : void {
		this.bannerHidden = true;
    }
    
    showBanner() : void {
		this.bannerHidden = false;
    }    

}
