import React, { useState } from "react" ;
import Head from "next/head" ;
// ...
import { getStudents } from "../config/redis" ;
import { getAPI, postAPI, checkInput } from "../lib/library" ;
import type { Res, StudentObj, AddRequest, RemoveRequest } from "../lib/library" ;

// Inputs Interface
interface Inputs
{
  name: string ;
  reg: string ;
  student: string ;
  search: string ;
}

// Props Interface
interface Props
{
  students: StudentObj[] ;
}

// SSR
export async function getServerSideProps()
{
  let res: Res = JSON.parse(await getStudents()) ;
  let students: StudentObj[] = [] ;

  if (res.code === 200)
  {
    students = JSON.parse(res.message) ;
  }

  return { props: { students } } ;
}

// Home
function Home(props: Props): JSX.Element
{
  // Variables
  const [inputs, setInputs] = useState<Inputs>({ name: "", reg: "", student: "NULL", search: "" }) ;
  const [students, setStudents] = useState<StudentObj[]>(props.students) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)
  {
    setInputs((values: Inputs) => ({ ...values, [event.target.name]: event.target.value })) ;
  }

  // Handle Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>)
  {
    event.preventDefault() ;
  }

  // Get Students
  async function getStudents()
  {
    let res: Res = await getAPI("http://localhost:3000/api/get_students") ;
    
    let temp: StudentObj[] = JSON.parse(res.message) ;
    setStudents(temp) ;
  }

  // Students Mapper
  function studentsMapper(x: StudentObj): JSX.Element
  {
    return (
    <>
      <option value={ x.entityId } key={ x.entityId } className="bold"> { x.name } </option>
    </>
    )
  }

  // Add Student
  async function addStudent(): Promise<void>
  {
    if (checkInput(inputs.name, 100) && checkInput(inputs.reg, 100))
    {
      let data: AddRequest = { name: inputs.name, reg: inputs.reg } ;
      let res: Res = await postAPI("http://localhost:3000/api/add_student", data) ;

      // Reset
      setInputs({ name: "", reg: "", student: "NULL", search: "" }) ;
      getStudents() ;

      console.log(`Code: ${ res.code }`) ;
      console.log(`Message: ${ res.message }`) ;
    }
    else
    {
      console.warn("Complete Form!") ;
    }
  }

  // Remove Student
  async function removeStudent(): Promise<void>
  {
    if (inputs.student !== "NULL")
    {
      let data: RemoveRequest = { id: inputs.student } ;
      let res: Res = await postAPI("http://localhost:3000/api/remove_student", data) ;

      // Reset
      setInputs({ name: "", reg: "", student: "NULL", search: "" }) ;
      getStudents() ;

      console.log(`Code: ${ res.code }`) ;
      console.log(`Message: ${ res.message }`) ;
    }
    else
    {
      console.warn("Complete Form!") ;
    }
  }

  return (
  <>
    <Head>
      <title> Home </title>
    </Head>

    <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="container-fluid" 
    autoComplete="off" noValidate onSubmit={ handleSubmit }>
      <h1 className="mainHeading"> Add Student </h1>

      <input 
        name="name"
        type="text"
        maxLength={ 100 }
        autoFocus
        required
        value={ inputs.name }
        onChange={ handleChange }
        className="form-control mainText"
      />

      <input 
        name="reg"
        type="text"
        maxLength={ 100 }
        required
        value={ inputs.reg }
        onChange={ handleChange }
        className="form-control mainText"
      />

      <div className="text-center">
        <button onClick={ addStudent } type="button" className="mainBtn"> Submit </button>
      </div>
    </form>

    <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="container-fluid" 
    autoComplete="off" noValidate onSubmit={ handleSubmit }>
      <h1 className="mainHeading"> Delete Student </h1>

      <select name="student" value={ inputs.student } onChange={ handleChange } className="form-select mainText">
        <option value="NULL" className="bold displayNone"> Select a Student </option>
      {
        students.map(studentsMapper)
      }
      </select>

      <div className="text-center">
        <button onClick={ removeStudent } type="button" className="mainBtn"> Submit </button>
      </div>
    </form>

    <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="container-fluid" 
    autoComplete="off" noValidate onSubmit={ handleSubmit }>
      <h1 className="mainHeading"> Search a Student </h1>

      <input 
        name="search"
        type="text"
        maxLength={ 100 }
        required
        value={ inputs.search }
        onChange={ handleChange }
        className="form-control mainText"
      />

      <ul className="list-group mainText">
        <li className="list-group-item listItem"> <span> Khizer </span> </li>
        <li className="list-group-item listItem"> <span> Ashhad </span> </li>
      </ul>
    </form>
  </>
  )
}

// Export Home
export default Home ;