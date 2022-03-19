import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({key, text, value}) => {
  return (
    <tr key={key}>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics  = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = (good*100)/all + " %"
  if (all === 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    const statisticsInfo =
      [
        { 
          text: "good",
          value: good
        },
        {
          text: "neutral",
          value: neutral
        },
        {
          text: "bad",
          value: bad
        },
        {
          text: "all",
          value: all
        },
        {
          text: "average",
          value: average
        },
        {
          text: "positive",
          value: positive
        },
      ]
      console.log(statisticsInfo)
    return (
      <table>
        {
          statisticsInfo.map((value, index) => {return (<StatisticLine key={index} text={value.text} value={value.value}/>)})
        }
      </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App