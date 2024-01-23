import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { featchItemsByUserIdAsync, selectCartItem } from "../cart/CartSlice";
import { featchLoggedInUserInfoAsync, selectUserinfo } from "../user/userSlice";
import { selectLoggedInUser } from "../auth/AuthSlice";
const navigation = [
  {name:"Admin",link:'/admin',user:true}
];

function classs(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const Product = useSelector(selectCartItem)
  const totalitem = Product.length
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
  if(user){
    dispatch( featchItemsByUserIdAsync(user.id))
    dispatch(featchLoggedInUserInfoAsync(user.id));
  }
  },[dispatch,user])
  const userinfo =useSelector(selectUserinfo)
  console.log(totalitem)
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"> */}
              {/* Mobile menu button*/}
              {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-[30px] font-bold">
                    Layout
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex justify-center items-center ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                    <div>
                      {!item[userinfo?.role] &&   <Link
                        key={item.name}
                        to={item.link}
                        className={classs(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>}
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5 " />
                  {/* <span className="sr-only bg-slate-400">5</span> */}
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="inline-flex items-center rounded-md bg-gray-50 absolute bottom-4 px-1  text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                   {totalitem}
                  </span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="">
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full "
                        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-1467725033.jpg"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {" "}
                            <Link
                              to='/myprofile'
                              className={classs(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My profile
                            </Link>
                            <Link
                              to="/myorders"
                              className={classs(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My order
                            </Link>
                            <Link
                              to="/logout"
                              // onClick={()=>d}
                              className={classs(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 -z-10">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classs(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
