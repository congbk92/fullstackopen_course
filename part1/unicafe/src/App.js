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

  const Display = ({text, number}) => {
    return (
      <div>
        <p>{text} {number}</p>
      </div>
    )
  }

  const onClickGood = () => setGood(good+1)
  const onClickNeutral = () => setNeutral(neutral+1)
  const onClickBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onClickGood} text="good"/>
      <Button onClick={onClickNeutral} text="neutral"/>
      <Button onClick={onClickBad} text="bad"/>
      <h1>statistics</h1>
      <Display text="good" number={good}/>
      <Display text="neutral" number={neutral}/>
      <Display text="bad" number={bad}/>
    </div>
  )
}

export default App