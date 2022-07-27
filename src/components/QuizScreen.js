import Question from './Question'
// import Skeleton from './Skeleton'
import {useState} from "react";
import {nanoid} from 'nanoid'

import './QuizScreen.css'


/**
 * Questions passed to this component will be changed, thus they will have following structure: <br>
 * <code>
 * questions = [
 *  {
 *      question: str,
 *      answers: [
 *      {
 *          id,
 *          text,
 *          isHeld,
 *          isCorrect
 *      }, {}, ...
 *      ]
 *  }, ...
 * ]
 * </code> <br>
 * In short: <br>
 * <code>
 * questions = Array( Object( {string, Array()} ) )
 * </code>
 * @returns JSX.Element
 */
export default function QuizScreen(props) {
    const [validation, setValidation] = useState(false)
    const [questions, setQuestions] = useState(getAnswers() || [])
    const [score, setScore] = useState(0);


    /**
     * Takes all questions from this component's properties and changes their <code>answers</code> array
     * to contain more information, like
     * <ul>
     *     <li>id: string</li>
     *     <li>text: string</li>
     *     <li>isHeld: boolean</li>
     *     <li>isCorrect: boolean</li>
     * </ul>
     * @returns {Array<Object<{questions: string, answers: Array<Object>}>>}
     */
    function getAnswers() {
        return props.questions.map(propQuestion => {
            return {
                ...propQuestion,
                answers: propQuestion.answers.map((answer, index) => ({
                    id: nanoid(),
                    text: answer,
                    isHeld: false,
                    isCorrect: index === propQuestion.answers.length - 1
                }))
            }
        })
    }


    /**
     * This function is looping through all question objects,
     * and for each question object it is looking into its answers
     * to find if any of currently iterating question's answer has been clicked
     * and then toggles found answer's <code>isHeld</code> property
     * @param {string} id
     */
    function holdAnswer(id) {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                ({
                    ...question,
                    answers: question.answers.map(answer =>
                        answer.id === id
                            ? {...answer, isHeld: !answer.isHeld}
                            : answer
                    )
                })
            )
        )
    }

    function checkAnswers() {
        setScore(0)
        questions.forEach(question => {
            question.answers.forEach(answer => {
                if (answer.isHeld && answer.isCorrect)
                    setScore(prevScore => prevScore + 1)
            })
        })

        setValidation(prevValidation => !prevValidation)
    }


    const question_template = questions.map(question => {
        let choice = {
            correctChoice: false,
        }

        question.answers.forEach(function(answer) {
            if (answer.isHeld && answer.isCorrect)
                this.correctChoice = true
        }, choice)

        return (
            <Question
                key={nanoid()}
                question={question.question}
                answers={question.answers}
                handleClick={holdAnswer}
                validation={validation}
                correctness={choice}
            />
        )
    })

    const bottomBar = validation ?
        (
            <div className='bottom-bar'>
                <p>You scored {score}/5 correct answers</p>
                <button
                    className="btn"
                    onClick={checkAnswers} // change function to play again
                >
                    Play Again
                </button>
            </div>
        ) :
        (
            <button
                className="btn"
                onClick={checkAnswers} // change function to play again
            >
                Check Answers
            </button>
        )

    return (
        <div className="quiz-container">
            {question_template}
            {bottomBar}
        </div>
    )
}
