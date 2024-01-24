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
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data)
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function featchAllOrder(pagination,sort) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?"+queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");

    // console.log(data)
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data :{orders:data,totalOrders:+totalOrders} });
  });
}