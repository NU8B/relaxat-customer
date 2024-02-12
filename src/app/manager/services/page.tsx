"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Page() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className={""}>
      <div className={"flex justify-between "}>
        <div className={"text-3xl font-bold"}>Services</div>
        <div>
          <button
            type="button"
            onClick={openModal}
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
          >
            <i className="bi bi-plus me-2"></i>Add New Service
          </button>
        </div>
      </div>
      <div className="my-4 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Service Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Category</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Price</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Available Branches</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Haircut
                </th>
                <td className="px-6 py-4">Hair</td>
                <td className="px-6 py-4">400 Baht</td>
                <td className="px-6 py-4">Siam Square One, Sukhumvit</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        open={isOpen}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border border-gray-100">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add New Service
              </Dialog.Title>
              <div className="mt-2">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="service"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Spa</option>
                        <option>Hair</option>
                        <option>Nail</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="branches"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Available Branches
                  </label>
                  <div className="mt-1 flex gap-2">
                    <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-indigo-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                      <span className="">Sukhumvit 20</span>
                    </div>
                    <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-indigo-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                      <span className="">Siam Square</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <select
                      id="branch"
                      name="branch"
                      autoComplete="branch-name"
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    >
                      <option selected disabled hidden>
                        Select Branch
                      </option>
                      <option>Mega Bangna</option>
                      <option>Chit Lom</option>
                      <option>Udom Suk</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="mt-3" />
              <div className="mt-2 float-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-2 me-3 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Add New Service
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
