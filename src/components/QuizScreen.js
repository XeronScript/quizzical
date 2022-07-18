import './QuizScreen.css'

import Question from './Question'
import {useEffect, useState} from "react";

export default function QuizScreen(props) {
    const [questions, setQuestions] = useState([]);

    const question_templates = questions.map(question =>
            <Question
                question={question.question}
                incorrectAnswer={question.incorrect_answers}
                correctAnswer={question.correct_answer}
            />
    )

    // Add loading indicator while fetching questions data
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => setQuestions(data.results))
    }, [])

    // DEBUG
    console.log(questions)

    return (
        <div className="quiz-container">
            {question_templates}
            <button
                className="btn"
                onClick={() => props.handleClick()}
            >
                Check Answers
            </button>
        </div>
    )
}
