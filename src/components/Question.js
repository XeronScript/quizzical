import './Question.css'
// import {nanoid} from 'nanoid'

export default function Question(props) {

    const answers = [(
        <button className="answer-btn">
            {props.correctAnswer}
        </button>
    )]

    for (let i = 0; i < props.incorrectAnswer.length; i++) {
        answers.push(
            <button
                // Change this key prop. It can cause some damage O_O
                key={i}
                className="answer-btn"
            >
                {props.incorrectAnswer[i]}
            </button>
        )
    }

    function shuffle(array) {
        let currIndex = array.length, randIndex

        while (currIndex !== 0) {
            randIndex = Math.floor(Math.random() * currIndex)
            currIndex--

            [array[currIndex], array[randIndex]] = [array[randIndex], array[currIndex]]
        }
        return array
    }

    shuffle(answers)

    return (
        <div
            className="question-container"
        >
            <h3 className="question-text">{props.question}</h3>
            <div className="answers-container">
                {answers}
            </div>
            <hr/>
        </div>
    )
}
