export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.xtoken) 
  {
    return {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json", 
      "Authorization": '' + user.xtoken };
  } else 
  {
    return {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json",
    };
  }
}