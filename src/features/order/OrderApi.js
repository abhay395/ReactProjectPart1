export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data)
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}