export function featchLoggedInUserOrder(userid){
  return new Promise(async (resolve)=>{
    const response  = await fetch('http://localhost:8080/orders/?user.id='+userid)
    const data = await response.json()
    resolve ({data})
  })
}
export function featchLoggedInUserInfo(userid){
  return new Promise(async (resolve)=>{
    const response  = await fetch('http://localhost:8080/users/'+userid)
    const data = await response.json()
    resolve ({data})
  })
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}