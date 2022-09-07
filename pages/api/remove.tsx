import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import studentReposiory, { Student } from "../../config/redis" ;
import { createResponse } from "../../lib/library" ;
import type { RemoveRequest } from "../../lib/library" ;

// Remove
async function remove(req: NextApiRequest, res: NextApiResponse): Promise<void>
{
  let inputs: RemoveRequest = req.body ;
  await studentReposiory.remove(inputs.id) ;

  res.end(createResponse(300, "Student Deleted!")) ;
}

// Export Remove
export default remove ;