import {useEffect, useState} from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from './components/QuizScreen'
import parseString from "./parseString";

import './App.css';


function App() {
    const [quiz, setQuiz] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => {
                return data.results.map(question => ({
                        ...question,
                        question: parseString(question.question),
                        correct_answer: parseString(question.correct_answer),
                        incorrect_answers: parseString(question.incorrect_answers)
                    })
                )
            })
            .then(data => {
                let parsedData = data.map(item => ({
                    question: item.question,
                    answers: [...item.incorrect_answers, item.correct_answer]
                }))

                setQuestions(parsedData)
            })
    }, [])

    function startQuiz() {
        setQuiz(prevQuiz => !prevQuiz)
    }

    return (
        <div className="container">
            { quiz ?
                <QuizScreen questions={questions}/> :
                <HomeScreen handleClick={startQuiz}/>
            }
        </div>
    );
}

export default App;
