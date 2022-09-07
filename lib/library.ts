// Res Interface
interface Res
{
  code: string | number ;
  message: string ;
}

// Student Object Interface
interface StudentObj
{
  name: string ;
  reg: string ;
  entityId: string ;
}

// Add Request Interface
interface AddRequest
{
  name: string ;
  reg: string ;
}

// Remove Request Interface
interface RemoveRequest
{
  id: string ;
}

// Create Response
function createResponse(code: string | number, message: string): string
{
  return JSON.stringify({ code: code, message: message }) ;
}

// Get API
async function getAPI(url: string): Promise<Res>
{
  const response: Response = await fetch(url, 
  {
    method: "GET",
    headers: 
    {
      "Content-Type": "application/json"
    }
  }) ;

  let res: Res = await response.json() ;
  return res ;
}

// Post API
async function postAPI(url: string, data: AddRequest | RemoveRequest): Promise<Res>
{
  const response: Response = await fetch(url, 
  {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }) ;

  let res: Res = await response.json() ;
  return res ;
}

// Check Input
function checkInput(it: string, len: number): boolean
{
  if ((it !== "") && (it.length <= len))
  {
    return true ;
  }
  else
  {
    return false ;
  }
}

// Exports
export { createResponse, getAPI, postAPI, checkInput } ;
export type { Res, StudentObj, AddRequest, RemoveRequest } ;