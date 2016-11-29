export class Question {
    domain: string;
    question: string;
    ans: [{
        text : string,
        value : string
    }];
    trueAnswer: string;
}