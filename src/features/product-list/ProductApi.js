// A mock function to mimic making an async request for data
export function featchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function featchAllProductByFilter(filter, sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination= {_page:1,_limit:10}

  // TODO: on server we will support multi values

  let queryString = "";
  // let sort=''

  for (let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
  for (let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  for (let key in filter) {
    const categoryValues = filter[key];
    // console.log(categoryValues)
    if (categoryValues.length) {
     for (let index = 0; index < categoryValues.length; index++) {
      // const lastCategoryValues = categoryValues[categoryValues.length - 1];
      // console.log(lastCategoryValues,"kk")
      queryString +=`${key}=${categoryValues[index]}&`;
      
     }
    }
  }
  
  console.log(queryString)
  // // console.log(filter);
  return new Promise(async (resolve) => {
    //TODO:we will not head-code server URL here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data:{products:data,totalItems:+totalItems} });
  });
}
