import { ITEMS_PER_PAGE } from "../../app/constant";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
export default function Pagination({
  handelPage,
  setpage,
  page,
  totaItems = 55,
}) {
  return (
    <div className="flex  items-center w-full justify-between border-t border-gray-700 bg-[#1a202c] px-4 py-3 sm:px-6">
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
            {Array.from({
              length: Math.ceil(totaItems / ITEMS_PER_PAGE),
            }).map((el, index) => (
              <div
                onClick={(e) => {
                  handelPage(index + 1);
                }}
                key={index + 1}
                // aria-current="page"
                className={`relative z-10  inline-flex items-center ${
                  page - 1 === index ? "bg-indigo-600" : " "
                } px-4 py-2 cursor-pointer text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}
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
