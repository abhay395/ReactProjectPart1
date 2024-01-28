export function featchLoggedInUserOrder(){
  return new Promise(async (resolve)=>{
    const response  = await fetch('/orders/')
    const data = await response.json()
    resolve ({data})
  })
}
export function featchLoggedInUserInfo(){
  return new Promise(async (resolve)=>{
    const response  = await fetch('/users/own')
    const data = await response.json()
    resolve ({data})
  })
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}