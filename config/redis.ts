import { Client, Entity, Schema, Repository } from "redis-om" ;

const client: Client = new Client() ;
async function connect(): Promise<void>
{
  if (!client.isOpen())
  {
    await client.open(process.env.REDIS_URL) ;
  }
}
connect() ;

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

const studentRepository: Repository<Student> = client.fetchRepository(schema) ;

async function createIndex(): Promise<void>
{ 
  await studentRepository.createIndex() ;
}
createIndex() ;

// Export Student Class
export { Student } ;

// Export Student Repository
export default studentRepository ;