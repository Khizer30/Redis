import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import studentReposiory, { Student } from "../../config/redis" ;
import { createResponse } from "../../lib/library" ;
import type { AddRequest } from "../../lib/library" ;

// Add
async function add(req: NextApiRequest, res: NextApiResponse): Promise<void>
{
  let inputs: AddRequest = req.body ;
  let student: Student = await studentReposiory.createAndSave({ name: inputs.name, reg: inputs.reg }) ;

  res.end(createResponse(100, JSON.stringify(student))) ;
}

// Export Add
export default add ;