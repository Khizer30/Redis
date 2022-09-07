import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { removeStudent } from "../../config/redis" ;
import type { RemoveRequest } from "../../lib/library" ;

// Remove Student
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: RemoveRequest = req.body ;

  res.end(await removeStudent(data)) ;
}