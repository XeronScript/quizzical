import './HomeScreen.css'

export default function HomeScreen(props) {
    return (
        <div className="home-screen">
            <h2>Quizzical</h2>
            <button
                className="home-btn"
                onClick={() => props.handleClick()}
            >
                Start Quiz
            </button>
        </div>
    )
}
