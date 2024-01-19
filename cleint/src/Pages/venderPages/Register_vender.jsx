import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export default function Register_Vender() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const hideAlerts = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const [vender, setVender] = useState({
    shopName: "",
    description: "",
    shopAddress: "",
    price1: "",
    price2: "",
    price3: "",
    email: "",
    phone: "",
    password: "",
  });
  let value, name;
  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setVender({ ...vender, [name]: value });
    console.log(vender);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const {
      shopName,
      description,
      shopAddress,
      price1,
      price2,
      price3,
      email,
      phone,
      password,
    } = vender;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopName: shopName,
        description: description,
        shopAddress: shopAddress,
        price1: price1,
        price2: price2,
        price3: price3,
        email: email,
        phone: phone,
        password: password,
      }),
    };

    let data
    if (
      shopName &&
      description &&
      shopAddress &&
      price1 &&
      price2 &&
      price3 &&
      email &&
      phone &&
      password
    ) {
      const response = await fetch(
        "http://localhost:8000/api/vender/register",
        options
      );
       data = await response.json();
      if (response.status === 201) {
        console.log(data.message);
        setVender({
          shopName: "",
          description: "",
          shopAddress: "",
          price1: "",
          price2: "",
          price3: "",
          email: "",
          phone: "",
          password: "",
        })
        ;
        setSuccessAlert(true);
        setMsg(data.message);
        setTimeout(hideAlerts, 5000);
      } else if (response.status === 422) {
        setMsg(data.message)
        setErrorAlert(true)
        setTimeout(hideAlerts, 5000);
        console.log(data.message)
      } else {
        setMsg("Please  Try again Later")
        setErrorAlert(true)
        setTimeout(hideAlerts, 5000);
        console.log("Please Try Again Later .");
      }
    } else {
      setErrorAlert(true);
      setMsg("Please Fill the All Feilds ");
      setTimeout(hideAlerts, 5000);
    }
  };
  return (
    <div>
      <Navbar />
      {successAlert && (
        <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
        >
          {msg}
        </Alert>
      )}{" "}
      {errorAlert && (
        <Alert variant="filled" severity="error">
          {msg}
        </Alert>
      )}
      <section class="bg-white">
        <div class="flex  items-center justify-center px-6 my-6 mx-auto lg:py-0">
          <div class="w-full bg-white dark:border md:py-6  sm:max-w-lg xl:p-0  dark:border-gray-300">
            <div class="p-6 space-y-4  md:space-y-4 sm:p-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-black mb-6">
                Register As a Vender
              </h1>
              <form class="space-y-8 md:space-y-8 mt-3" action="#">
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="shopName"
                    id="outlined-password-input"
                    label="Shop Name"
                    type="text"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="description"
                    id="outlined-password-input"
                    label="About Your Shop"
                    type="text"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="shopAddress"
                    id="outlined-password-input"
                    label=" Your Shop Address"
                    type="text"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="email"
                    id="outlined-email-input"
                    label="E-Mail"
                    type="email"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="price1"
                    id="outlined-email-input"
                    label="Price for 1000 Gallons Tanker"
                    type="number"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="price2"
                    id="outlined-email-input"
                    label="Price for 2000 Gallons Tanker"
                    type="number"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="price3"
                    id="outlined-email-input"
                    label="Price for 3000 Gallons Tanker"
                    type="number"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="phone"
                    id="outlined-password-input"
                    label="Phone"
                    type="number"
                    size="small"
                    className="w-full h-6"
                  />
                </div>
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="password"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    size="small"
                    className="w-full h-6"
                    autoComplete="current-password"
                  />
                </div>
                <div class="flex items-start">
                  <Link
                    to="/loginUser"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500 mr-3"
                  >
                    Already have an Account ! Login ..
                  </Link>
                </div>
                <button
                  onClick={sendData}
                  class="w-full text-white bg-gray-800 hover:bg-black focus:ring-4  font-medium text-sm px-5 py-2.5 text-center  dark:hover:bg-primary-700"
                >
                  Register
                </button>
                <Link
                  type="submit"
                  to="/registerUser"
                  class="w-full border border-3 border-black theme_btn  focus:ring-4 font-medium text-sm px-5 py-2.5 text-center custom-text-white "
                >
                  Or Register As a User
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
