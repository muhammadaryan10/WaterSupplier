  import { TextField } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";

  export default function VenderListing() {
    const [vender, setVender] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const ratingStars = (rating) => {
      const roundedRating = Math.floor(rating);
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <svg
            key={i}
            className={`star w-8 h-8 ${
              i < roundedRating ? "text-yellow-500" : "text-gray-500"
            } cursor-pointer`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
      return stars;
    };

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/user/allVenders");
        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
          setVender(result);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
      fetchData(); // Fetch data when the component mounts
    }, []);

    const sendData = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            minPrice: minPrice,
            maxPrice: maxPrice,
          }),
        };
  
        if (! minPrice || !maxPrice) {
          const response = await fetch("http://localhost:8000/api/user/filter", options);
          const data = await response.json();
          console.log(data)
          setVender(data);
        } else {
          alert("Please Fill All the Fields");
        }
      } catch (err) {
        alert(err);
      }
    };


    return (
      <div>
        <div className="max-w-7xl custom_break px-4 mx-6 flex  justify-content-center ">
          <div className="w-full bg-white rounded-xl shadow border md:py-6 m-4 p-2">
            <h1 className="text-2xl font-bold mb-2">Filters</h1>
            <div className="space-y-4 border-y">
              <h1 className="text-lg text-gray-600 font-bold mt-2 ">By Price</h1>
              <form className="space-y-8 md:space-y-4 mt-3" action="#">
                <div>
                  <p className="mb-2">min</p>
                  <TextField
                    onChange={(e) => setMinPrice(parseInt(e.target.value, 10) || 0)}
                    name="minPrice"
                    id="outlined-email-input"
                    label="0"
                    type="number"
                    size="small"
                    className=""
                  />
                </div>
                <div>
                  <p className="mb-2">max</p>
                  <TextField
                    onChange={(e) => setMaxPrice(parseInt(e.target.value, 10) || 10000)}
                    name="maxPrice"
                    id="outlined-password-input"
                    label="10000+"
                    type="number"
                    size="small"
                    className=""
                    autoComplete="current-password"
                  />
                </div>
              </form>
              <button
                onClick={sendData}
                type="button"
                className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"
              >
                Submit
              </button>
            </div>
            <div className="">
              <h1 className="text-lg text-gray-600 font-bold mt-2 ">By Location</h1>
            </div>
          </div>
          <div>
          {vender.map((e) => (
            <section key={e._id} className="bg-transparent">
              <Link to={`/vender/${e._id}`}>
                <div className="flex items-center justify-center px-6 my-2 mx-auto lg:py-0">
                  <div className="w-full bg-white dark:border md:py-6 xl:p-0 dark:border-gray-300 rounded-xl">
                    <div className="p-6 space-y-3 md:space-y-3 sm:p-6">
                      <div className="flex justify-between">
                        <div>
                          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-xl theme_txt">
                            {e.shopName}
                          </h1>
                        </div>
                        <div>
                          <span className="text-xl font-bold leading-tight tracking-tight theme_txt  text-black">
                            {e.price1}
                          </span>
                          ~
                          <span className="text-xl font-bold leading-tight tracking-tight theme_txt  text-black">
                            {e.price3}
                          </span>
                        </div>
                      </div>
                      <div>{e.description}</div>
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            {ratingStars(e.OverAllRating)}
                            <span className="text-black text-xl ml-3">
                              ({e.OverAllRating.toFixed()})
                            </span>
                          </div>
                          <div className="text-gray-600 text-sm mt-2">
                            ({e.reviews.length}) Reviews
                          </div>
                        </div>
                        <div>
                          <button className="theme_btn p-2 rounded">
                            SHOW MORE <span aria-hidden="true">&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          ))}
          </div>
        </div>
      </div>
    );
  }
