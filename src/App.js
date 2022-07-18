import {useState} from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from './components/QuizScreen'

import './App.css';


function App() {
    const [quiz, setQuiz] = useState(false)

    function startQuiz() {
        setQuiz(prevQuiz => !prevQuiz)
    }

    return (
        <div className="container">
            { quiz ?
                <QuizScreen handleClick={startQuiz} /> :
                <HomeScreen handleClick={startQuiz}/>
            }
        </div>
    );
}

export default App;
