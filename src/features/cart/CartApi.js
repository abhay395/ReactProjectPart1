export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function featchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    console.log(data);
    resolve({ data });
  });
}
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    console.log(data);
    resolve({ data: { id: itemId } });
  });
}
export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await featchItemsByUserId(userId);
    const items = response.data;
    console.log(items,'4');
    // let response1;
    for (let item in items) {
      console.log(item,'7')
      // response1= await deleteItemFromCart(item.id);
    }
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      await deleteItemFromCart(element.id);
      
    }
    // console.log(response1,'5');
    // console.log(data);
    resolve({ status: "succes" });
  });
}
