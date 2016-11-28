export class User {
    username: String;
    password: String;
    test: {
        currenttest: {
            questionID: String,
            score: Number,
            total: Number
        },
        score: Number,
        total: Number
    };
    examen: {
        currentexam: {
            questionIndex: Number,
            questionID: String,
            questionDomain: String,
            score: Number,
            totalQuestions: Number
        },
        previousexam: [
            {
                score: Number,
                total: Number,
                domain: String,
                date: String
            }
            ],
        score: Number,
        total: Number
    };
    mode: String;
    exam_flag: Number;
}