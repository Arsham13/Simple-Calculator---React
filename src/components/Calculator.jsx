import React, { useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar';

function Calculator() {

    const [progress, setProgress] = useState(0);

    const answerBtnRef = useRef(null)

    const num1Ref = useRef(null)
    const num2Ref = useRef(null)
    
    const [answer, setAnswer] = useState(0)

    const [error, setError] = useState([]);

    
    const [operator, setOperator] = useState(0);
    
    const handleChange = (e) => {
        setOperator(e.target.value);
    };

    const [styles, setStyles] = useState({
        container: {
            visibility: 'hidden'
        }
    })

    const handleReset = () => {
        setStyles({container: {visibility: 'hidden'}})
        if (num1Ref.current && num2Ref.current) {
            num1Ref.current.value = ''
            num2Ref.current.value = ''
        }
        setOperator(0)
        setError([])
        setAnswer('')
    }


    const handleAnswer = () => {
        setProgress(progress + 100);
        setStyles({container: {visibility: 'visible'}})
        if (num1Ref.current && num2Ref.current) {
            const num1 = parseInt(num1Ref.current.value)
            const num2 = parseInt(num2Ref.current.value)
            if (isNaN(num1) || isNaN(num2)) {
                setError(['Please enter valid numbers.']);
                return;
            } else {
                setError([])
            }
            switch (operator) {
                case '+':
                    setAnswer(num1 + num2)
                    break;
                case '-':
                    setAnswer(num1 - num2)
                    break;
                case '×':
                    setAnswer(num1 * num2)
                    break;
                case '÷':
                    setAnswer(num2 !== 0 ? num1 / num2 : 'Cannot divide by zero');
                    break;
                default:
                    setError(['Please select an operator.'])
                    break;
            }
        }

        
    }
  return (
    <>
    <div>
        <LoadingBar
            color='#ff8324'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            waitingTime={900}
            transitionTime={200}
        />
    </div>
    <form onChange={handleChange} action="" onSubmit={(e)=>{e.preventDefault();handleAnswer()}}>
        <div className="operator">
            <label htmlFor="operator">Operator:</label>
            <select value={operator} onChange={handleChange} name="operator" id="operator">
                <option value="0">Select an operator</option>
                <option value="+">Addtion (+)</option>
                <option value="-">Subtraction (-)</option>
                <option value="×">Multiplication (×)</option>
                <option value="÷">Division (÷)</option>
            </select>
        </div>
        <div className="numbers">
            <label htmlFor="num1">Number 1:</label>
            <input ref={num1Ref} type="number" name="num1" id="num1" />
            <br />
            <label htmlFor="num2">Number 2:</label>
            <input ref={num2Ref} type="number" name="num2" id="num2" />
        </div>
        <button ref={answerBtnRef} type="submit">Answer</button>
    </form>
    <br />
    <ul>
        {error && error.map((err, index) => (
            <li key={index} style={{ color: 'red' }} id="error">{err}</li>
        ))}
    </ul>
    {error.length === 0 &&
        <div style={styles.container} className="container">
            <p id="answer">{num1Ref.current ? num1Ref.current.value || 0 : 0} {operator} {num2Ref.current ? num2Ref.current.value || 0 : 0} = {answer}</p>
            <button className='delete' onClick={handleReset} type="button">Reset</button>
        </div>
    }

    </>
  )
}

export default Calculator