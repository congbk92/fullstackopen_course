import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({onClick, text}) => {
    return (
      <button onClick={onClick}>{text}</button>
    )
  }

  const Display = ({text}) => {
    return (
      <div>
        <p>{text}</p>
      </div>
    )
  }

  const onClickGood = () => setGood(good+1)
  const onClickNeutral = () => setNeutral(neutral+1)
  const onClickBad = () => setBad(bad+1)

  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = (good*100)/all

  const displayGood = "good " + good 
  const displayNeutral = "neutral " + neutral 
  const displayBad = "bad " + bad
  const displayAll = "all " + all
  const displayAverage = "average " + average
  const displayPositive = "positive " + positive + " %" 

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onClickGood} text="good"/>
      <Button onClick={onClickNeutral} text="neutral"/>
      <Button onClick={onClickBad} text="bad"/>
      <h1>statistics</h1>
      <Display text={displayGood}/>
      <Display text={displayNeutral}/>
      <Display text={displayBad}/>
      <Display text={displayAll}/>
      <Display text={displayAverage}/>
      <Display text={displayPositive}/>
    </div>
  )
}

export default App