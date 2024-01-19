import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
// import SuccessAlert from "../../Components/SuccesPopup";
export default function Register_User() {
  const [ErrorPopup, setErrorPopup] = useState(false);
  const [SuccesPopup,setSuccesPopup]=useState(false)
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setSuccesPopup(false)
    setErrorPopup(false);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  let value, name;
  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = user;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
      }),
    };

    let data;
    if (name && email && phone && password) {
      const response = await fetch(
        "http://localhost:8000/api/user/register",
        options
      );
      data = await response.json();
      if (response.status === 201) {
        console.log(data.message);
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setSuccesPopup(true);
        setMsg(data.message);
        setTimeout(() => {
          navigate("/loginUser");
        }, 1000);
      } else if (response.status === 422) {
        setMsg(data.message);
        setErrorPopup(true);
        console.log(data.message);
      } else if (response.status === 420) {
        setMsg(data.message);
        setErrorPopup(true);
        console.log("Please Try Again Later .");
      }
    } else {
      setErrorPopup(true);
      setMsg("Please Fill the All Feilds ");
    }
  };
  return (
    <div className="h-[110vh] w-full  bg-gray-900 bg-cover bg-no-repeat back" style={{ backgroundImage:"url('https://images.pexels.com/photos/1582619/pexels-photo-1582619.jpeg?cs=srgb&dl=pexels-igor-faoro-1582619.jpg&fm=jpg')"}}>
      {ErrorPopup && (
        <div className="overlay">
          <div className="popup d-flex flex-col justify-content-center items-center space-y-3">
            <div className="flex">
              <div class=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-xl  mx-3 mb-3">
                  An Error Occurred
                </h1>
                <h1 className="fs-4 ww-bold mx-3">{msg}</h1>
              </div>
            </div>
            <div className=" custum-end">
              <button
                className="p-3 text-white    btn bg-red-600"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {SuccesPopup && (
      <div className="overlay">
      <div className="popup d-flex flex-col justify-content-center items-center space-y-3">
        <div className="flex">
          <div class=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
               viewBox="0 0 24 24"
               class="text-green-600 w-16 h-16 mx-auto my-6"
             >
               <path
                 fill="currentColor"
                 d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
               ></path>
             </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl  mx-3 mb-3">
             Congratilations
            </h1>
            <h1 className="fs-4 ww-bold mx-3">{msg}</h1>
          </div>
        </div>
        <div className=" custum-end">
          <button
            className="p-3 text-white    btn bg-green-500"
            onClick={handleClosePopup}
          >
            OK
          </button>
        </div>
      </div>
    </div>
      )}
      <Navbar />
      <section class="themeColor" >
        <div class="flex  items-center justify-center px-6 my-6 mx-auto lg:py-0">
          <div class="w-full blurr dark:border md:py-6  sm:max-w-sm xl:p-0  dark:border-gray-300">
            <div class="p-6 space-y-4  md:space-y-4 sm:p-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-black mb-6">
                Register As a User
              </h1>
              <form class="space-y-8 md:space-y-8 mt-3" action="#">
                <div>
                  <TextField
                    onChange={getUserdata}
                    name="name"
                    id="outlined-password-input"
                    label="Name"
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
                    class="text-sm font-medium text-white hover:underline dark:text-primary-500 mr-3"
                  >
                    Already have an Account ! Login ..
                  </Link>
                </div>
                <button
                  onClick={sendData}
                  type="submit"
                  class="w-full text-white bg-gray-800 hover:bg-black focus:ring-4  font-medium text-sm px-5 py-2.5 text-center  dark:hover:bg-primary-700"
                >
                  Register
                </button>
                <Link
                  type="submit"
                  to="/registerVender"
                  class="w-full border border-3 border-black theme_btn  focus:ring-4 font-medium text-sm px-5 py-2.5 text-center custom-text-white "
                >
                  Or Register As a Vender
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
