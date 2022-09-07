import { Client, Entity, Schema, Repository } from "redis-om" ;
// ...
import { createResponse } from "../lib/library" ;
import type { AddRequest, RemoveRequest } from "../lib/library" ;

class Student extends Entity {} ;

let schema: Schema<Student> = new Schema(
  Student,
  {
    name: { type: "string" },
    reg: { type: "string" }
  },
  {
    "dataStructure": "JSON"
  }
) ;

const client: Client = new Client() ;

// Connect
async function connect(): Promise<void>
{
  if (!client.isOpen())
  {
    await client.open(process.env.REDIS_URL) ;
    await client.fetchRepository(schema).createIndex() ;
  }
}

// Disconnect
async function disconnect(): Promise<void>
{
  if (client.isOpen())
  {
    await client.close() ;
  }
}

// Add Student
async function addStudent(data: AddRequest): Promise<string>
{
  await connect() ;
  const studentRepository: Repository<Student> = await client.fetchRepository(schema) ;

  try
  {
    let student: Student = await studentRepository.createAndSave({ name: data.name, reg: data.reg }) ;

    await disconnect() ;
    return createResponse(100, JSON.stringify(student)) ;
  }
  catch
  {
    await disconnect() ;
    return createResponse(101, JSON.stringify({ message: "Error!" })) ;
  }
}

// Get Students
async function getStudents(): Promise<string>
{
  await connect() ;
  const studentRepository: Repository<Student> = await client.fetchRepository(schema) ;

  try
  {
    let students: Student[] = await studentRepository.search().returnAll() ;

    await disconnect() ;
    return createResponse(200, JSON.stringify(students)) ;
  }
  catch
  {
    await disconnect() ;
    return createResponse(201, JSON.stringify({ message: "Error!" })) ;
  }
}

// Remove Student
async function removeStudent(data: RemoveRequest): Promise<string>
{
  await connect() ;
  const studentRepository: Repository<Student> = await client.fetchRepository(schema) ;

  try
  {
    await studentRepository.remove(data.id) ;

    await disconnect() ;
    return createResponse(300, JSON.stringify({ message: "Student Deleted!" })) ;
  }
  catch
  {
    await disconnect() ;
    return createResponse(301, JSON.stringify({ message: "Error!" })) ;
  }
}

// Export Student Class
export { Student } ;

// Exports
export { addStudent, getStudents, removeStudent } ;