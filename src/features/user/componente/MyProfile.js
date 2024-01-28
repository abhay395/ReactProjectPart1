// UserProfile.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  featchLoggedInUserInfoAsync,
  selectUserinfo,
  updateUserAsync,
} from "../userSlice";
// // import { selectLoggedInUser } from "../../auth/AuthSlice";
import Navbar from "../../navbar/Navbar";
import { useForm } from "react-hook-form";

// // const user = {
// //   email: "Abhayparja90@gmail.com",
// //   password: "Abhay@4545",
// //   addresses: [
// //     {
// //       fullName: "Abhay Prajapati",
// //       email: "abhayparj@gmail.com",
// //       phone: "9509123636",
// //       streetAddress: "iti square gori nagar ",
// //       city: "indore",
// //       state: "Madhya pradesh",
// //       pinCode: "45001",
// //     },
// //     {
// //       fullName: "Abhay Prajapati",
// //       email: "abhayparj@gmail.com",
// //       phone: "9509123636",
// //       streetAddress: "iti square gori nagar ",
// //       city: "indore",
// //       state: "Madhya pradesh",
// //       pinCode: "45001",
// //     },
// //   ],
// //   id: 2,
// // };

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedEditeindex, setSelectedEditeindex] = useState(-1);
  const [AddFormSet, setAddFormSet] = useState(false);
  // // const { email, addresses } = user;
  const dispatch = useDispatch();
  const userinfo = useSelector(selectUserinfo);

  const handelEditeForm = (index) => {
    setSelectedEditeindex(index);
    console.log(index, userinfo);
    setValue("fullName", userinfo?.addresses[index].fullName);
    setValue("email", userinfo?.addresses[index].email);
    setValue("phone", userinfo?.addresses[index].phone);
    setValue("streetAddress", userinfo?.addresses[index].streetAddress);
    setValue("city", userinfo?.addresses[index].city);
    setValue("pinCode", userinfo?.addresses[index].pinCode);
    setValue("state", userinfo?.addresses[index].state);
  };
  const handleEdit = (updateData) => {
    // console.log(newUser)
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
    console.log(updateData, selectedEditeindex, newUser);
    newUser.addresses.splice(selectedEditeindex, 1, updateData);
    dispatch(updateUserAsync(newUser));
    setSelectedEditeindex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
    console.log(newUser);
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  // useEffect(() => {
  //   dispatch(featchLoggedInUserInfoAsync(userId));
  // }, [dispatch]);
  const handeladdForm = () => {
    setValue("fullName", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("streetAddress", "");
    setValue("city", "");
    setValue("pinCode", "");
    setValue("state", "");
    setAddFormSet(true);
  };
  const handeladdSubmit = (data) => {
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
    console.log(newUser);
    newUser.addresses.push(data);
    dispatch(updateUserAsync(newUser));
    setAddFormSet(false);
  };
  const Onsubmit = (data) => {
    handleEdit(data);
  };
  return (
    <>
      {" "}
      <div className="sticky top-0 z-50">
        {" "}
        <Navbar />
      </div>
      <div className=" flex items-center min-h-screen justify-center bg-gray-900 text-white">
        <div className="w-full  bg-gray-700 p-8 md:m-[100px] rounded-md shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-blue-400">
              User Profile
            </h1>
            <p className="text-gray-400">{userinfo?.email}</p>
            {userinfo?.role === "admin" && (
              <h3 className="text-gray-400">role:{userinfo.role}</h3>
            )}
          </div>
          {AddFormSet === true ? (
            <form action="" onSubmit={handleSubmit(handeladdSubmit)}>
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
                      {...register("fullName", {
                        required: "name is required",
                      })}
                      id="name"
                      autoComplete="name"
                      // value={address.fullName}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // value={address.email}
                      autoComplete="email-address"
                      {...register("email", {
                        pattern: {
                          value: /^[a-zA-Z0-9._-]+@gmail.com$/,
                          message: "please add @ and gmail.com",
                        },
                        required: "email is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // value={address.phone}
                      {...register("phone", {
                        required: "phone number is required",
                      })}
                      id="phone-number"
                      autoComplete="phone-number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // value={address.streetAddress}
                      {...register("streetAddress", {
                        required: "street Address is required",
                      })}
                      id="streetAddress"
                      autoComplete="streetAddress"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // value={address.city}
                      {...register("city", { required: "city is required" })}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // value={address.state}
                      {...register("state", { required: "state is required" })}
                      id="state"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      // // value={address.pinCode}
                      {...register("pinCode", { required: "pin is required" })}
                      id="pinl"
                      autoComplete="pin"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      onClick={(e) => setAddFormSet(false)}
                      type="button"
                      className="text-sm font-semibold  leading-6 mr-[30px] text-gray-900"
                    >
                      Cancel
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
          ) : null}
          {AddFormSet == false ? (
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handeladdForm()}
            >
              Add Address
            </button>
          ) : null}
          {userinfo?.addresses.map((address, index) => (
            <>
              {selectedEditeindex === index ? (
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
                          {...register("fullName", {
                            required: "name is required",
                          })}
                          id="name"
                          autoComplete="name"
                          // value={address.fullName}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // value={address.email}
                          autoComplete="email-address"
                          {...register("email", {
                            pattern: {
                              value: /^[a-zA-Z0-9._-]+@gmail.com$/,
                              message: "please add @ and gmail.com",
                            },
                            required: "email is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // value={address.phone}
                          {...register("phone", {
                            required: "phone number is required",
                          })}
                          id="phone-number"
                          autoComplete="phone-number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // value={address.streetAddress}
                          {...register("streetAddress", {
                            required: "street Address is required",
                          })}
                          id="streetAddress"
                          autoComplete="streetAddress"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // value={address.city}
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // value={address.state}
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // // value={address.pinCode}
                          {...register("pinCode", {
                            required: "pin is required",
                          })}
                          id="pinl"
                          autoComplete="pin"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm   bg-gray-600  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          onClick={(e) => setSelectedEditeindex(-1)}
                          type="button"
                          className="text-sm font-semibold  leading-6 mr-[30px] text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-1 pl-2 mr-[25px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edite Address
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : null}
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                  Address {index + 1}:
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400">Full Name:</label>
                    <p className="text-gray-100 font-semibold">
                      {address.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400">Street Address:</label>
                    <p className="text-gray-100">{address.streetAddress}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-gray-400">City:</label>
                    <p className="text-gray-100">{address.city}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">State:</label>
                    <p className="text-gray-100">{address.state}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-gray-400">Pin Code:</label>
                  <p className="text-gray-100">{address.pinCode}</p>
                </div>
                <div className="mt-4">
                  <label className="text-gray-400">Phone:</label>
                  <p className="text-gray-100">{address.phone}</p>
                </div>

                {/* Buttons for Edit and Remove */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={(e) => handelEditeForm(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
