import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { addStudent } from "../../config/redis" ;
import type { AddRequest } from "../../lib/library" ;

// Add Student
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: AddRequest = req.body ;

  res.end(await addStudent(data)) ;
}