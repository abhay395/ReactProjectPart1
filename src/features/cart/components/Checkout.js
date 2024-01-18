function Checkout() {
  const Addresses = [{"phone-number":9509123636,"pinCode":326001,"streetAddress":"Manbgal pura","fullName":"Abhay prajapati","city":"jhalawar"}]
  const Products = [[{
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
  },{quantity:5}],[{
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
  },{quantity:5}]]
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="border-b lg:w-[700px] ml-4 mt-8 border-gray-900/10 pb-12">
        <h2 className=" font-semibold leading-7 text-3xl text-gray-400">
          Personal Information
        </h2>
        <div className="mt-10 w-full grid lg:grid-cols-6 gap-x-6 gap-y-9 sm:grid-cols-6">
          <div className="lg:col-span-full col-span-6">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullName"
                id="fullName"
                autoComplete="fullName"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="lg:col-span-full col-span-6">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="email-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="lg:col-span-full col-span-6">
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                autoComplete="phone-number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="lg:col-span-full col-span-6">
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                autoComplete="streetAddress"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2 col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="state"
                id="state"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="pin"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              PIN
            </label>
            <div className="mt-2 w-full">
              <input
                type="text"
                name="pin"
                id="pinl"
                autoComplete="pin"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-1 mb-9  items-center grid col-span-7 justify-end pl-[40px] gap-x-1">
            <div className="">
              {" "}
              <button
                // onClick={e=>reset()}
                type="button"
                className="text-sm font-semibold  leading-6 mr-[30px] text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-1 pl-2 mr-[25px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
        {/* Address add form end */}
        <div className="mt-4">
          {" "}
          <ul>
           {Addresses.map((address)=> <li
              // key={index}
              className="flex justify-between gap-x-6 bg-gray-700 rounded-lg px-5 py-5 border-solid border-2 border-gray-900"
            >
              <div className="flex gap-x-4">
                <input
                  name="address"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address["fullName"]}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                   {address["streetAddress"]}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address['pinCode']}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone: {address["phone-number"]}
                </p>
                <p className="text-sm leading-6 text-gray-500">{address["city"]}</p>
              </div>
            </li>)}
          </ul>
        </div>
        <div className="mt-4" >
          <h1 >Payment methode</h1>
          <p className = 'my-2' >Chose One</p>
          <div class="flex flex-col gap-y-3">
            <div class="flex">
              <input
                type="radio"
                name="cash"
                
                class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                id="cash"
              />
              <label
                for="cash"
                class=" text-gray-500 ms-2 text-sm dark:text-gray-400"
              >
                Cash
              </label>
            </div>

            <div class="flex">
              <input
                type="radio"
                name="creadite-card"
                class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                id="creadite-card"
              />
              <label
                for="creadite-card"
                class="text-sm text-gray-500 ms-2 dark:text-gray-400"
              >
                Creadite card
              </label>
            </div>
          </div>
        </div>
      </div>
      <section class="h-screen  py-12 sm:py-16 lg:py-20">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto mt-8 sm:max-w-md md:mt-12">
            <div class="rounded-lg bg-gray-800 ">
              <div class=" px-8 py-10">
                <div class="flow-root">
                  <ul class="-my-8">
                   {Products.map((product)=>  <li class="flex  space-y-3 py-6 text-left flex-row space-x-5 ">
                      <div class="shrink-0 relative">
                        <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-400 shadow sm:-top-2 sm:-right-2">
                          {product[1].quantity}
                        </span>
                        <img
                          class="sm:h-24 h-32 sm:w-24 max-w-full rounded-lg object-cover"
                          src={product[0].thumbnail}
                          alt=""
                        />
                      </div>

                      <div class="relative flex  flex-col justify-between">
                        <div class="sm:col-gap-5 flex justify-between sm:grid sm:grid-cols-2">
                          <div class="pr-8 sm:pr-5">
                            <p class="text-base font-semibold text-gray-400">
                              {product[0].title}
                            </p>
                          </div>

                          <div class=" flex  justify-between sm:mt-0 items-start sm:justify-end">
                            <p class="shrink-0 w-20 text-base font-semibold text-gray-400 sm:order-2 sm:ml-8 sm:text-right">
                             {product[0].price}$
                            </p>
                          </div>
                        </div>
                        <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                      <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                      </svg>
                    </button>
                  </div>
                      </div>
                    </li>)}
                  </ul>
                </div>

                 <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" />

                {/* <div class="mt-6 space-y-3 border-t border-b py-8">
            <div class="flex items-center justify-between">
              <p class="text-gray-400">Subtotal</p>
              <p class="text-lg font-semibold text-gray-400">$2399.00</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-gray-400">Shipping</p>
              <p class="text-lg font-semibold text-gray-400">$8.00</p>
            </div>
          </div> */}
                <div class="mt-6 flex items-center justify-between">
                  <p class=" font-medium text-gray-400 text-2xl">Total</p>
                  <p class="text-2xl font-semibold text-gray-400">
                    <span class="text-xs font-normal text-gray-400">USD</span>{" "}
                    2499.00
                  </p>
                </div>

                <div class="mt-6 text-center">
                  <button
                    type="button"
                    class="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Pay Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
