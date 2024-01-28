export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function featchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/");
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + update.id, {
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
    const response = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data)
    // TODO: on Server it will only  return some infor of user (not password)
    console.log(data);
    resolve({data});
  });
}
export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await featchItemsByUserId();
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
