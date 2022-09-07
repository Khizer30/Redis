import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { getStudents } from "../../config/redis" ;

// Get Students
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  res.end(await getStudents()) ;
}