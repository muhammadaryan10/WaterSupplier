import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
export default function Order() {
  const [vender, setVender] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [ErrorPopup, setErrorPopup] = useState(false);
  const [SuccesPopup, setSuccesPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [order, setOrder] = useState({
    CustomerName: "",
    CustomerEmail: "",
    CustomerPhone: "",
    CustomerAddress: "",
    Price: "",
  });
  const { id } = useParams();
  console.log(id);
  let value, name;
  const handleClosePopup = () => {
    setSuccesPopup(false);
    setErrorPopup(false);
  };
  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const navigate = useNavigate();
  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    setOrder({ ...order, Price: selectedPrice });
    setSubtotal(parseFloat(selectedPrice));
    console.log(order);
    console.log(vender);
  };
  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/vender/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("===== Response =====:", response); // Log the response object
      const data = await response.json();
      console.log("Result:", data); // Log the parsed JSON result
      if (response.status === 505) {
        setMsg(data.message);
        setErrorPopup(true);
        setTimeout(() => {
          navigate("/loginUser");
        }, 2000);
      } else if (response.status === 401) {
        setMsg(data.message);
        setErrorPopup(true);
        setTimeout(() => {
          handleClosePopup();
        }, 2000);
      } else if (response.status === 200) {
        setVender(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const makeOrder = async (e) => {
    e.preventDefault();
    const {
      CustomerName,
      CustomerEmail,
      CustomerPhone,
      CustomerAddress,
      Price,
    } = order;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        CustomerName: CustomerName,
        CustomerEmail: CustomerEmail,
        CustomerPhone: CustomerPhone,
        CustomerAddress: CustomerAddress,
        Price: Price,
      }),
    };

    let data;
    if (
      CustomerName &&
      CustomerEmail &&
      CustomerPhone &&
      CustomerAddress &&
      Price
    ) {
      const response = await fetch(
        `http://localhost:8000/api/user/order/${id}`,
        options
      );
      data = await response.json();
      if (response.status === 201) {
        console.log(data.message);
        setSuccesPopup(true);
        setMsg(data.message);
        setTimeout(() => {
          handleClosePopup();
        }, 2000);
      } else if (response.status === 422) {
        setMsg(data.message);
        setErrorPopup(true);
        setTimeout(() => {
          handleClosePopup();
        }, 2000);
      } else if (response.status === 420) {
        setMsg(data.message);
        setErrorPopup(true);
        setTimeout(() => {
          handleClosePopup();
        }, 2000);
      }
    } else {
      setErrorPopup(true);
      setMsg("Please Fill the All Feilds ");
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      {ErrorPopup && (
        <div className="overlay">
          <div class="custom-modal">
            <div class="danger danger-animation icon-top">
              <ClearIcon fontSize="large" />
            </div>
            <div class="danger border-bottom"></div>
            <div class="content">
              <p class="type">Order Can Not placed Please Try again </p>
              <p class="message-type">A Problem Occurred </p>
            </div>
          </div>
        </div>
      )}

      {SuccesPopup && (
        <div className="overlay">
          <div class="custom-modal ">
            <div class="succes succes-animation icon-top">
              <CheckIcon fontSize="large" />
            </div>
            <div class="succes border-bottom"></div>
            <div class="content">
              <p class="type">Order</p>
              <p class="message-type">Successfully Booked</p>
            </div>
          </div>
        </div>
      )}
      <section class="bg-white" style={{ backgroundColor: "#f7f7f7" }}>
        <div class="lg:grid lg:grid-cols-12">
          <main class="flex items-center justify-center p-3  sm:px-12 lg:col-span-7 lg:px-8  xl:col-span-6 ">
            <div class="max-w-xl lg:max-w-3xl  p-3 rounded">
              <h1 class=" text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Order Details 🦑
              </h1>

              <p class="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>

              <form action="#" class="mt-8 grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label
                    for="CustomerName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Enter Your Name
                  </label>

                  <input
                    onChange={getUserdata}
                    type="text"
                    id="CustomerName"
                    name="CustomerName"
                    class="mt-1 w-full h-8 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="CustomerEmail"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Enter Your Active Email
                  </label>

                  <input
                    onChange={getUserdata}
                    type="email"
                    id="CustomerEmail"
                    name="CustomerEmail"
                    class="mt-1 w-full h-8 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="CustomerPhone"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Enter Your Active Phone
                  </label>

                  <input
                    onChange={getUserdata}
                    type="phone"
                    id="CustomerPhone"
                    name="CustomerPhone"
                    class="mt-1 w-full h-8 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="CustomerAddress"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Please Enter Your Address For the Service
                  </label>

                  <input
                    onChange={getUserdata}
                    type="text"
                    id="CustomerAddress"
                    name="CustomerAddress"
                    class="mt-1 w-full h-8 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="Price"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Please Select The Quantity
                  </label>

                  <select
                    id="Price"
                    name="Price"
                    value={order.Price}
                    onChange={handlePriceChange}
                    class="mt-1 w-full h-8 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  >
                    <option value={vender && vender.price1}>
                      1000 Gallons
                    </option>
                    <option value={vender && vender.price2}>
                      2000 Gallons
                    </option>
                    <option value={vender && vender.price3}>
                      3000 Gallons
                    </option>
                  </select>
                </div>

                <div class="col-span-6">
                  <p class="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" class="text-gray-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" class="text-gray-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
          <aside class="flex justify-center block h-16  lg:col-span-5 lg:h-full xl:col-span-6">
            <div className="checkout-section  w-100 flex flex-col justify-between">
              <div className="checkout-total w-100 space-y-4 text-center">
                <h5 className="text-xl font-bold">ORDER SUMMARY</h5>
                <div className="subtotal">
                  <span>Vender Name </span>
                  <span>{vender && vender.shopName}</span>
                </div>
                <div className="subtotal">
                  <span>Customer Name </span>
                  <span>{order && order.CustomerName}</span>
                </div>
                <div className="subtotal">
                  <span>Sub total:</span>
                  <span>{subtotal}</span>
                </div>
                <div className="subtotal">
                  <span>Delivery:</span>
                  <span>Free</span>
                </div>
                <div className="total">
                  <span>Total:</span>
                  <span>{subtotal}</span>
                </div>
              </div>
              <button className="checkout-button" onClick={makeOrder}>
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
