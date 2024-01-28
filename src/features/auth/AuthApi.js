// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function LoginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if(response.ok){
        const data = await response.json();
        resolve({data})
      }else{
        const error = await response.json();
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}
export function checkAuth(){
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "content-type": "application/json" },
      });
      if(response.ok){
        const data = await response.json();
        resolve({data})
      }else{
        const error = await response.json();
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });

}
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}
