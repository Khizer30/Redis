import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import studentReposiory, { Student } from "../../config/redis" ;
import { createResponse } from "../../lib/library" ;

// Get Students
async function getStudents(req: NextApiRequest, res: NextApiResponse): Promise<void>
{
  let students: Student[] = await studentReposiory.search().returnAll() ;

  res.end(createResponse(200, students)) ;
}

// Export Get Students
export default getStudents ;