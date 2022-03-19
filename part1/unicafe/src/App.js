import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics  = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = (good*100)/all
  if (all === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>avarage {average}</p>
        <p>positive {positive} %</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => setGood(good+1)
  const onClickNeutral = () => setNeutral(neutral+1)
  const onClickBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onClickGood} text="good"/>
      <Button onClick={onClickNeutral} text="neutral"/>
      <Button onClick={onClickBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App