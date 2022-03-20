const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Part = ({name, exercises}) => {
    console.log(name, exercises)
    return (
      <li>{name} {exercises}</li>
    )
  }
  
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <ul>
        {
          parts.map(part => {
          console.log(part)
          return <Part key={part.id} name={part.name} exercises={part.exercises}/>
          })
        }
      </ul> 
    )
  }
  
  
  const Total = (props) => {
    return (
      <div>
        <p>Total of exercises {props.total}</p>
      </div>
    )
  }
  
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total total={course.parts.map(part => part.exercises).reduce((partialSum, a) => partialSum + a, 0)}/>
      </div>
    )
  }

  export default Course;