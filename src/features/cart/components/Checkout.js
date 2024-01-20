import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { selectCartItem, deleteItemFromCartAsync } from "../CartSlice";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from "../../auth/AuthSlice";
import { useState } from "react";
import { addOrderAsync } from "../../order/OrderSlice";

function Checkout() {
  const Addresses = [
    {
      phone: 9509123636,
      pinCode: 326001,
      streetAddress: "Manbgal pura",
      fullName: "Abhay prajapati",
      city: "jhalawar",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Product = useSelector(selectCartItem);
  const user = useSelector(selectLoggedInUser)
  const total = Product?.reduce((acu, current) => {
    return acu + current.price * current.quantity;
  }, 0);
  const [selectedAddress,setSelectedAdress] = useState(null)
  const [paymentMethode,setpaymentMethode] = useState('cash')
  const discount = Product?.reduce((acu, currentva) => {
    return (
      acu +
      Math.round(
        (currentva.price * currentva.quantity) / currentva.discountPercentage
      )
    );
  }, 0);
  
  // console.log(total, discount);
  const deletehandler = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const Onsubmit  = (data)=>{
    dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
    reset()
  }
  const handleAddress = (e)=>{
    const indexofAddress = e.target.value
    // // console.log(indexofAddress)
    const selcted = user.addresses[indexofAddress]
    // // console.log(selcted)
    setSelectedAdress(selcted)
  }
  const handelPayment = (e)=>{
    const methode = e.target.value
    // // console.log(indexofAddress)
    // // const selcted = user.addresses[indexofAddress]
    console.log(methode)
    setpaymentMethode(methode)
  }
  const navigater = useNavigate()
  const handelOrder = ()=>{
    const order = {items:Product,total,userId:user.id,paymentMethode,selectedAddress}
    dispatch(addOrderAsync(order))
    // // dispatch()
    navigate("/")
    // TODO: redirect to order-success page 
    // TODO: clear cart after order
    // TODO: on server change the stock number of items

  }
  return (
    <>
       { !Product.length && <Navigate to ='/' replace={true}></Navigate>}
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="border-b lg:w-[700px] ml-4 mt-8 border-gray-900/10 pb-12">
          <h2 className=" font-semibold leading-7 text-3xl text-gray-400">
            Personal Information
          </h2>
         <form action="" onSubmit={handleSubmit(Onsubmit)}>
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
                  {...register('fullName',{required:"name is required"})}
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {errors.name && (
                    <p role="alert" className="text-red-700">
                     {errors.name.message}
                    </p>
                  )}
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
                  id="email-address"
                  autoComplete="email-address"
                  {...register("email", {
                    pattern:{
                      value: /^[a-zA-Z0-9._-]+@gmail.com$/,
                      message:"please add @ and gmail.com"
                    },
                    required: "email is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.email && (
                    <p role="alert" className="text-red-700">
                     {errors.email.message}
                    </p>
                  )}
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
                  type="tel"
                  {...register('phone',{required:"phone number is required"})}
                  id="phone-number"
                  autoComplete="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.phone && (
                    <p role="alert" className="text-red-700">
                     {errors.phone.message}
                    </p>
                  )}
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
                  {...register('streetAddress',{required:"street Address is required"})}
                  id="streetAddress"
                  autoComplete="streetAddress"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.street && (
                    <p role="alert" className="text-red-700">
                     {errors.street.message}
                    </p>
                  )}
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
                  {...register('city',{required:"city is required"})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.city && (
                    <p role="alert" className="text-red-700">
                     {errors.city.message}
                    </p>
                  )}
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
                  {...register('state',{required:"state is required"})}
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.state && (
                    <p role="alert" className="text-red-700">
                     {errors.state.message}
                    </p>
                  )}
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
                  {...register('pinCode',{required:"pin is required"})}
                  id="pinl"
                  autoComplete="pin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.pin && (
                    <p role="alert" className="text-red-700">
                     {errors.pin.message}
                    </p>
                  )}
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
         </form>
          {/* Address add form end */}
          <div className="mt-4">
            {" "}
            <ul>
              {user.addresses.map((address,index) => (
                <li
                  key={address.id}
                  className="flex justify-between mr-3 gap-x-0 bg-gray-700 rounded-lg px-5 py-5 border-solid border-2 border-gray-900"
                >
                  <div className="flex gap-x-4">
                    <input
                      name="address"
                      type="radio"
                      onChange={handleAddress}
                      value={index}
                      className="h-4  w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address["fullName"]}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address["streetAddress"]}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address["pinCode"]}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address["phone"]}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address["city"]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h1>Payment methode</h1>
            <p className="my-2">Chose One</p>
            <div className="flex flex-col gap-y-3">
              <div className="flex">
                <input
                  type="radio"
                  name="paymentMethode"
                  onChange={handelPayment}
                  checked={paymentMethode==='cash'}
                  className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="paymentMethode"
                  value='cash'
                />
                <label
                  htmlFor="cash"
                  className=" text-gray-500 ms-2 text-sm dark:text-gray-400"
                >
                  Cash
                </label>
              </div>

              <div className="flex">
                <input
                  type="radio"
                  value='creadite card'
                  name="paymentMethode"
                  checked={paymentMethode==='creadite card'}
                  onChange={handelPayment}
                  className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="paymentMethode"
                />
                <label
                  htmlFor="creadite-card"
                  className="text-sm text-gray-500 ms-2 dark:text-gray-400"
                >
                  Creadite card
                </label>
              </div>
            </div>
          </div>
        </div>
        <section className="h-screen  py-12 sm:py-16 lg:py-20">
          <div className="mx-auto px-0 sm:px-6 lg:px-8">
            <div className="mx-auto mt-8 sm:max-w-md md:mt-12">
              <div className="sm:rounded-lg bg-gray-800  ">
                <div className=" px-8 pr-0 py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      {Product.map((product) => (
                        <li className="flex  space-y-3 py-6 text-left flex-row space-x-5 sm:w-96 ">
                          <div className="shrink-0 relative">
                            <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-400 shadow sm:-top-2 sm:-right-2">
                              {product.quantity}
                            </span>
                            <img
                              className="h-24  w-24  rounded-lg object-cover"
                              src={product.thumbnail}
                              alt=""
                            />
                          </div>

                          <div className="relative flex items-start flex-col justify-between">
                            <div className="sm:col-gap-5 flex justify-between sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-400">
                                  {`${product.title.slice(0, 9)}...`}
                                </p>
                              </div>

                              <div className=" flex  justify-between sm:mt-0 items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-400 sm:order-2 sm:ml-8 sm:text-right">
                                  {product.price}$
                                </p>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 items-center flex sm:bottom-0 sm:top-auto">
                              <button
                                type="button"
                                onClick={()=>deletehandler(product.id)}
                                className="flex rounded sm:p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <svg
                                  className="block h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                    className=""
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" />

                  {/* <div className="mt-6 space-y-3 border-t border-b py-8">
         <div className="flex items-center justify-between">
           <p className="text-gray-400">Subtotal</p>
           <p className="text-lg font-semibold text-gray-400">$2399.00</p>
         </div>
         <div className="flex items-center justify-between">
           <p className="text-gray-400">Shipping</p>
           <p className="text-lg font-semibold text-gray-400">$8.00</p>
         </div>
       </div> */}
                  <div className="mt-6 flex items-center justify-between mr-4 ">
                    <p className=" font-medium text-gray-400 text-2xl">Total</p>
                    <p className="text-2xl font-semibold text-gray-400">
                      <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                     {total}
                    </p>
                  </div>

                  <div className="mt-6 mr-4 text-center">
                    <button
                      type="button"
                      onClick={handelOrder}
                      className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Order Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
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
    </>
  );
}

export default Checkout;
