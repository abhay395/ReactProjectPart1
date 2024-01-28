// A mock function to mimic making an async request for data
export function featchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function featchCategories() {
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch("/categorys");
    const data = await response.json();
    resolve({ data });
  });
}
export function featchBrands() {
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function featchSingelProduct(id) {
  console.log(id);
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch(`/products/`+id);//! yaha per error ayega kyoki is hame object milega pehle arrray mila tha
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(addData) {
  // console.log(id)
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch(`/products`, {
      method: "POST",
      body: JSON.stringify(addData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function featchAllProductByFilter(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination= {_page:1,_limit:10}

  // TODO: on server we will support multi values

  let queryString = '';
  // let sort=''

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      for (let index = 0; index < categoryValues.length; index++) {
        queryString += `${key}=${categoryValues[index]}&`;
      }
    }
  }

  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch(
      "/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    console.log(totalItems)
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
export function updateProduct(updateproductData) {
  const id = updateproductData.id
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id, {
      method: "PATCH",
      body: JSON.stringify(updateproductData),
      headers: { "content-type": "application/json" },
    });
    // // console.log(id, updateproductData);
    const data = await response.json();
    // TODO: on Server it will only  return some infor of user (not password)
    resolve({ data });
  });
}
export function deleteProduct(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products/" + productId,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    resolve({ data: { id: productId } });
  });
}
