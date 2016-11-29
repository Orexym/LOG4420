export class User {
    username: string;
    password: string;
    test: {
        currenttest: {
            questionID: string,
            score: number,
            total: number
        },
        score: number,
        total: number
    };
    examen: {
        currentexam: {
            questionIndex: number,
            questionID: string,
            questionDomain: string,
            score: number,
            totalQuestions: number
        },
        previousexam: [
            {
                score: number,
                total: number,
                domain: string,
                date: string
            }
            ],
        score: number,
        total: number
    };
    mode: string;
    exam_flag: number;
}