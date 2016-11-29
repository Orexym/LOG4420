export class Examen {
    domain: string;
    totalQuestion: number;

    constructor(domain:string, nbQuestions:number) {
        this.domain = domain;
        this.totalQuestion = nbQuestions;
    }
}