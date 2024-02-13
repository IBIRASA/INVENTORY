import React, { useEffect, useState } from "react";
import Sidebar2 from "../Layouts/Sidebar2";
import Contents from "./Contents";
import "../styles/dashbaord.css";
import ItemsIntable from "./ItemsIntable";
import { getStock, updateStock, deleteStock } from './../services/ApiServices'
import { formatDate } from "../services/util";

import "aos/dist/aos.css";

function ItemsIn() {
  const [data, setData] = useState()
  const [dialog, setDialog] = useState(false)
  const [quantity, setQuanity] = useState()
  const [status, setStatus] = useState("");
  const [currentstatus, setCurrentStatus] = useState("");
  const [id, setId] = useState()
  useEffect(() => {
    const fetchStock = async () => {
      const data = await getStock()
      setData(data)
    }
    fetchStock()
  }, [])

  const openDialog = (id) => {
    setId(id);
    setDialog(true);
  }

  const updateStocks = async (e) => {
    e.preventDefault();
    try {
      await updateStock(id, quantity, status);
    } catch (error) {
      console.log(error);
    }
  }
  const deleteSock = async (id) => {
    console.log(id);
    try {
      await deleteSock(id);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
    <div className="flex">
 <div className=" flex-none w-2/12 h-screen bg-gray-800 ">
 <Sidebar2 userRole={localStorage.getItem("role")} />
 </div>
 
   <div className="flex-grow dashboard-content shadow-2xl">
     <div className="users">
            <Contents />

            { <button
              onClick={openDialog}
              className="btn-user mt-20 delay-[300ms] duration-[600ms] text-sm  mr-32 mb-12 bg-gray-800 rounded-md"
              data-aos="fade-down"
            >
              Add item
            </button> }
            <div className="mt-12 ml-8 mr-8   h-screen-h justify-center  bg-gray-100 rounder-lg  shadow-2xl">
            <table className="finance-table mt-24 bg-gray-200">
              <thead>
                <tr data-aos="fade-up" className="bg-gray-800">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Item-name</th>
                  <th>Quantity</th>
                  <th>Unit-Price</th>
                  <th>TOtal-Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {data && data.data.data.map((data) => (
                <tr data-aos="zoom-in-down" key={data.id}>
                  <td>{formatDate(data)}</td>
                  <td>{formatDate(data)}</td>
                  <td>{data.name} </td>
                  <td>{data.quantity}</td>
                  <td className="font-bold text-[#031952]">{data.unitPrice} RWF</td>
                  <td className="font-bold text-[#031952]">{data.totalPrice} RWF</td>
                  <td>
                    {/* <button className={`bg-${data.status === "pending" ? "green-600" : "blue-600"} text-white rounded-full py-2 px-8 text-sm mr-4`}> */}
                    {data.status}
                    {/* </button> */}
                  </td>
                  <td>
                    <button onClick={() => openDialog(data._id)} className="bg-blue-900 text-white rounded-full py-2 px-8 text-sm mr-4">
                      Update
                    </button>{" "}
                    <button className="bg-red-900 text-white rounded-full py-2 px-8 text-sm mr-4" onClick={() => deleteStock(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tbody>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      {dialog && <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Fill the Form
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form className="form mx-4 md:mx-0">
                        <input
                          className="input-field mb-6 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                          id="username"
                          type="number"
                          placeholder="Money on account"
                          data-aos="fade-down"
                          onChange={(e) => setQuanity(e.target.value)}
                          disabled={status !== "approved"}
                        />

                        <select
                          className="input-field mb-4 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                          id="status"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <button
                          className="home-button mb-6 bg-blue-900 text-white rounded-full px-8 py-3 font-bold hover:bg-blue-700 hover:text-white transition duration-300"
                          data-aos="fade-down" onClick={(e) => updateStocks(e)}
                        >
                          Update Stock
                        </button>
                      </form>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setDialog(false)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default ItemsIn;
