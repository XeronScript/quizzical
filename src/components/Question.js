import './Question.css'

export default function Question(props) {
    const answerButtons = props.answers.map(answer => {
        let btnClass

        if (answer.isHeld && props.correctness.correctChoice)
            btnClass = 'correct-choice-btn'
        else if (answer.isHeld && !props.correctness.correctChoice)
            btnClass = 'incorrect-choice-btn'
        else
            btnClass = 'unchecked-choice-btn'


        return props.validation
            ?
            (
                <button
                    className={`answer-btn ${btnClass}`}
                    key={answer.id}
                    onClick={() => {}}
                >
                    {answer.text}
                </button>
            )
            :
            (
                <button
                    className={`answer-btn ${answer.isHeld ? 'held' : ''}`}
                    key={answer.id}
                    onClick={() => props.handleClick(answer.id)}
                >
                    {answer.text}
                </button>
            )
    })


    return (
        <div className="question-container">
            <h3 className="question-text">
                {props.question}
            </h3>
            <div className="answers-container">
                {answerButtons}
            </div>
            <hr/>
        </div>
    )
}
