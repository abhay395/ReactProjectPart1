import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  featchAllProductAsync,
  featchAllProductByFilterAsync,
  SelectAllProducts,
  SelectTotalItems,
} from "../ProductSlice";
import { Fragment, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: 'smartphones', label: 'smartphones' },
  { value: 'laptops', label: 'laptops' },
  { value: 'fragrances', label: 'fragrances' },
  { value: 'skincare', label: 'skincare' },
  { value: 'groceries', label: 'groceries' },
  { value: 'home-decoration', label: 'home-decoration' },
  { value: 'furniture', label: 'furniture' },
  { value: 'tops', label: 'tops' },
  { value: 'womens-dresses', label: 'womens-dresses' },
  { value: 'womens-shoes', label: 'womens-shoes' },
  { value: 'mens-shirts', label: 'mens-shirts' },
  { value: 'mens-shoes', label: 'mens-shoes' },
  { value: 'mens-watches', label: 'mens-watches' },
  { value: 'womens-watches', label: 'womens-watches' },
  { value: 'womens-bags', label: 'womens-bags' },
  { value: 'womens-jewellery', label: 'womens-jewellery' },
  { value: 'sunglasses', label: 'sunglasses' },
  { value: 'automotive', label: 'automotive' },
  { value: 'motorcycle', label: 'motorcycle' },
  { value: 'lighting', label: 'lighting' }
    ],
  },
  {
    id: "brand",
    name: "brand",
    options: [
      { value: "Apple", label: "Apple" },
      { value: "Samsung", label: "Samsung" },
      { value: "OPPO", label: "OPPO" },
      { value: "Huawei", label: "Huawei" },
      { value: "Microsoft Surface", label: "Microsoft Surface" },
      { value: "Infinix", label: "Infinix" },
      { value: "HP Pavilion", label: "HP Pavilion" },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
      },
      { value: "Royal_Mirage", label: "Royal_Mirage" },
      { value: "Fog Scent Xpressio", label: "Fog Scent Xpressio" },
      { value: "Al Munakh", label: "Al Munakh" },
      { value: "Lord - Al-Rehab", label: "Lord   Al Rehab" },
      { value: "L'Oreal Paris", label: "L'Oreal Paris" },
      { value: "Hemani Tea", label: "Hemani Tea" },
      { value: "Dermive", label: "Dermive" },
      { value: "ROREC White Rice", label: "ROREC White Rice" },
      { value: "Fair & Clear", label: "Fair & Clear" },
      { value: "Saaf & Khaas", label: "Saaf & Khaas" },
      { value: "Bake Parlor Big", label: "Bake Parlor Big" },
      { value: "Baking Food Items", label: "Baking Food Items" },
      { value: "fauji", label: "fauji" },
      { value: "Dry Rose", label: "Dry Rose" },
      { value: "Boho Decor", label: "Boho Decor" },
      { value: "Flying Wooden", label: "Flying Wooden" },
      { value: "LED Lights", label: "LED Lights" },
      { value: "luxury palace", label: "luxury palace" },
      { value: "Golden", label: "Golden" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  // const count = useSelector(SelectAllProducts);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(SelectAllProducts);
  const totalItems = useSelector(SelectTotalItems);
  // console.log(products)

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setpage] = useState(1);

  // TODO handelFilter Start

  const handlefilter = (e, section, option) => {
    // // console.log(section.id,option.value)
    let newFilter = { ...filter };
    if (e.currentTarget.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
      console.log(index);
    }
    console.log(newFilter);
    setFilter(newFilter);
    // // dispatch(featchAllProductByFilterAsync(newFilter))
    // console.log(e.currentTarget.checked)
  };
  // TODO handelFilter END

  // TODO handelSort START
  const handelSort = (e, option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    // // console.log(e.checked)
    setSort(newSort);
    // // dispatch(featchAllProductByFilterAsync(newFilter))
  };

  // TODO handelSort END

  const handelPage = (page) => {
    setpage(page);
    // // console.log(page)
  };
  useEffect(()=>{
    setpage(1)
  },[sort,totalItems])

  //!HELPFULL FOR MY PROJECT BY CHATGPT
  const fetchAllProductsMemoized = useCallback(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(featchAllProductByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    fetchAllProductsMemoized();
  }, [fetchAllProductsMemoized, filter, sort]);
  //!HELPFULL FOR MY PROJECT BY CHATGPT

  return (
    <div className="bg-[#1a202c] h-[100%] min-h-[1000px]">
      <div>
        {/*TODO Mobile filter dialog */}
        <MobailFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handlefilter={handlefilter}
        />
        {/*TODO MOBAIL Filter End */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-900 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-[#d2d6dc]">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-[#2c3e50] hover:text-gray-500">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-[#1a202c] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              // href={option.href}
                              onClick={(e) => handelSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-900",
                                active ? "bg-gray-500" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-900 hover:text-gray-900 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-900 hover:text-gray-900 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-900 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-[#1a202c] py-3 text-sm text-gray-900 hover:text-gray-900">
                            <span className="font-medium text-[#d2d6dc]">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) =>
                                    handlefilter(e, section, option)
                                  }
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-900"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid  START */}
              <div className="lg:col-span-3 col-span-1 flex flex-wrap ">
                {/* PRODUCT START*/}
                <ProductGrid products={products} />
                {/* PRODUCT END */}
                {/* PAGINATION START */}
                <Pagination
                  handelPage={handelPage}
                  page={page}
                  setpage={setpage}
                  totaItems={totalItems}
                />
                {/* PAGINATION END*/}
              </div>
              {/* Product grid END */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Pagination({ handelPage, setpage, page, totaItems = 55 }) {
  return (
    <div className="flex items-center w-full justify-between border-t border-gray-700 bg-[#1a202c] px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => {
            if (page === 1) {
              handelPage(1);
            } else {
              handelPage(page - 1);
            }
          }}
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-700 bg-[#1a202c] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-6000"
        >
          Previous
        </div>
        <div
          onClick={() => {
            if (page < totaItems / ITEMS_PER_PAGE) {
              handelPage(page + 1);
            }
          }}
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-700 bg-[#1a202c] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-500"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
            <span className="font-medium">{totaItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-500 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5"
                onClick={() => {
                  if (page === 1) {
                    handelPage(1);
                  } else {
                    handelPage(page - 1);
                  }
                }}
                aria-hidden="true"
              />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:outline-offset-0" */}

            {Array.from({ length: Math.ceil(totaItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
                <div
                  onClick={(e) => {
                    handelPage(index + 1);
                  }}
                  // aria-current="page"
                  className={`relative z-10  inline-flex items-center ${
                    page - 1 === index ? "bg-indigo-600" : " "
                  } px-4 py-2 cursor-pointer text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              )
            )}
            <div
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                onClick={() => {
                  if (page < totaItems / ITEMS_PER_PAGE) {
                    handelPage(page + 1);
                  }
                }}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="bg-[#1a202c]">
      <div className="mx-auto  max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {/* Products */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products ? (
            products.map((product) => (
              <Link to={`/product-detail`} key={product.id}>
                <div class="relative overflow-hidden bg-white shadow rounded-xl  dark:bg-gray-700">
                  <div class="relative overflow-hidden">
                    <div class="mb-5 overflow-hidden">
                      <img
                        class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110"
                        src={product.thumbnail}
                        alt=""
                      />
                    </div>
                    {/* <button class="absolute top-0 left-0 p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
</svg>
</button> */}
                  </div>
                  <p>
                    <h3 class="px-5 mb-4 text-lg font-bold dark:text-white">{`${product.title.slice(
                      0,
                      10
                    )}...`}</h3>
                  </p>
                  <div class="flex">
                    <div class="w-1/2 px-5 pb-3">
                      <p class="text-lg font-bold text-blue-500 dark:text-blue-300">
                        ${product.price}
                      </p>
                      <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">
                        {Math.round(
                          product.price -
                            product.price * (product.discountPercentage / 100)
                        )}
                      </span>
                    </div>
                    <button class="flex-1 text-sm text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Box
              sx={{
                bgcolor: "Background",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={210}
                height={118}
              />
            </Box>
          )}
        </div>
        {/* Products End*/}
      </div>
    </div>
  );
}
function MobailFilters({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handlefilter,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col border overflow-y-auto bg-gray-700 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-700 p-2 text-gray-900"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    className="h-6 w-6 text-gray-900"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-[gray-900]">
                <h3 className="sr-only">Categories</h3>
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-900 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-gray-700 px-2 py-3 text-gray-900 hover:text-gray-900">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) =>
                                    handlefilter(e, section, option)
                                  }
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
