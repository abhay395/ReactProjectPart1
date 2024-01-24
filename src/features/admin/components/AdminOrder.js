import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { featchAllOrder } from "../../order/OrderApi";
import { HiXMark } from "react-icons/hi2";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  SelectAllOrder,
  featchAllOrderAsync,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/OrderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { useForm } from "react-hook-form";
import { Pagination } from "@mui/material";

function AdminOrder() {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6]);
  const [sort, setSort] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [editabelOrderId, seteditabelOrderId] = useState(-1);
  const totalOrders = useSelector(selectTotalOrders);
  const totalorder = Array.from({
    length: Math.ceil(totalOrders / ITEMS_PER_PAGE),
  });
  const handelEditesetId = (item) => {
    seteditabelOrderId(item.id);
  };
  const handelShow = (id) => {
    console.log(id);
  };
  const handelUpdate = (e, order) => {
    const Order = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(Order));
    seteditabelOrderId(-1);
  };
  const handelPage = (page) => {
    setCurrentPage(page);
  };
  const handelSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };
  useEffect(() => { //! this is for sorting
    const pagination = { _page: currentPage, _limit: ITEMS_PER_PAGE };
    dispatch(featchAllOrderAsync({ pagination, sort }));
    console.log(totalOrders);
  }, [dispatch, currentPage, sort]);
  const Orders = useSelector(SelectAllOrder);

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="w-full min-h-screen  flex items-center justify-center bg-gray-100 font-sans ">
          <div className="w-full m-2 ">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={() => {
                        handelSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        });
                      }}
                    >
                      Order #
                      {sort._sort==='id' &&( sort._order==='asc' ? (
                      <ArrowDownIcon className="inline ml-3 w-4 h-4" />
                      ) : (
                        <ArrowUpIcon className="inline ml-3 w-4 h-4" />
                      ))}
                    </th>
                    {/* <th className="py-3 px-6 text-left">Items</th> */}
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center cursor-pointer"
                       onClick={() => {
                        handelSort({
                          sort: "total",
                          order: sort._order === "asc" ? "desc" : "asc",
                        });
                      }}
                    >
                      TOTOAL AMOUNT
                      {sort._sort==='total' && (sort._order==='asc'? (
                       <ArrowDownIcon className="inline ml-3 w-4 h-4" />
                      ) : (
                        <ArrowUpIcon className="inline ml-3 w-4 h-4" />
                      ))}
                    </th>
                    <th className="py-3 px-6 text-center">shipping address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                {Orders.map((item, index) => (
                  <tbody className="text-gray-600 text-sm font-light">
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{item.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.items[0].thumbnail}
                            />
                          </div>
                          <span>
                            {item.items[0].title} - #{item.items[0].quantity} -
                            ${item.items[0].price}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">{item.total}$</td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          {" "}
                          <strong>{item.selectedAddress.fullName}</strong>,
                        </div>
                        <div>{item.selectedAddress.streetAddress},</div>
                        <div>{item.selectedAddress.city},</div>
                        <div> {item.selectedAddress.state}</div>
                        <div>{item.selectedAddress.pinCode}</div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editabelOrderId != item.id && (
                          <span
                            className={`${
                              item.status === "delieverd" &&
                              "bg-green-400 text-white "
                            } ${item.status === "pending" && "bg-purple-200"} ${
                              item.status === "cancelled" &&
                              "bg-red-400 text-white"
                            } ${
                              item.status === "dispatched" &&
                              "bg-orange-400 text-white"
                            } w-[100px] text-purple-600 py-1 px-3 rounded-full text-xs`}
                          >
                            {item.status}
                          </span>
                        )}
                        {editabelOrderId === item.id && (
                          <select
                            className={`${
                              item.status === "delieverd" && "bg-green-400  "
                            } ${item.status === "pending" && "bg-purple-200"} ${
                              item.status === "cancelled" && "bg-red-400 "
                            } ${
                              item.status === "dispatched" && "bg-orange-400 "
                            } font-bold outline-none border-none text-purple-600 py-1 w-[100px] px-3 rounded-full text-xs`}
                            onChange={(e) => handelUpdate(e, item)}
                            value={item.status}
                          >
                            <option value="pending" className="bg-white">
                              pending
                            </option>
                            <option value="dispatched" className="bg-white">
                              dispatched
                            </option>
                            <option value="delieverd" className="bg-white">
                              delieverd
                            </option>
                            <option value="cancelled" className="bg-white">
                              cancelled
                            </option>
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          {editabelOrderId !== item.id && (
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={() => handelShow(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                          )}
                          <div
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => handelEditesetId(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div>
                            {editabelOrderId === item.id && (
                              <HiXMark
                                onClick={() => seteditabelOrderId(-1)}
                                className="text-xl hover:text-purple-500 hover:scale-110"
                              />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
              <div
                className="hidden items-center justify-between sm:flex"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    if (page === 1) {
                      handelPage(1);
                    } else {
                      handelPage(page - 1);
                    }
                  }}
                  className="hover:text-indigo-600 flex items-center gap-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </button>
                <ul className="flex items-center gap-1">
                  {totalorder.map((item, idx) => (
                    <li key={item} className="text-sm">
                      <button
                        aria-current={currentPage === idx + 1 ? "page" : false}
                        className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                          currentPage == idx + 1
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          handelPage();
                        }}
                      >
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (page < totalOrders / ITEMS_PER_PAGE) {
                      handelPage(page + 1);
                    }
                  }}
                  href="javascript:void(0)"
                  className="hover:text-indigo-600 flex items-center gap-x-2"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {/* On mobile version */}
              <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                <button
                  onClick={() => {
                    if (page === 1) {
                      handelPage(1);
                    } else {
                      handelPage(page - 1);
                    }
                  }}
                  href="javascript:void(0)"
                  className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                  Previous
                </button>
                <div className="font-medium">
                  Page {currentPage} of {totalorder.length}
                </div>
                <button
                  onClick={() => {
                    if (page < totalOrders / ITEMS_PER_PAGE) {
                      handelPage(page + 1);
                    }
                  }}
                  className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrder;
