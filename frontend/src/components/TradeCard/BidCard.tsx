import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const imagePerRow = 6;
export default function BidCard() {
  const [getData, setGetData] = React.useState([]);
  console.log(getData, "dhfjsdhfshdfjksfskfh");
  
  const [next, setNext] = React.useState(imagePerRow);

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/getProject").then((res) => {
      setGetData(res?.data.result);
    });
  }, []);

  return (
    <>

    <div className="py-10 ">
    <div className="grid lg:grid-cols-3 gap-y-5 gap-x-5 sm:grid-cols-3 grid-cols-1 px-3">
      {getData.slice(0, next)?.map((resData: any, index) => (
        <div className="shadow-xl lg:p-5 p-3 relative" key={index}>
          <div className="text-center flex flex-row items-center justify-between">
            <div className="bg-red-800 uppercase lg:w-14 lg:h-14 w-8 h-8 rounded-full mb-2 flex items-center justify-center lg:text-4xl text-xl">
              {resData.UserId.substring(0, 1).toLowerCase()}
            </div>
            <p className="py-3 capitalize">{resData.Project_Name}</p>
          </div>
          <div className="lg:h-64 h-48 w-full">
            <img
              className="h-full rounded-lg w-full object-cover object-center"
              src={`/uploads/${resData.cover_Image}`}
              alt={resData.cover_Image}
            />
          </div>
          <p className="text-base py-2">
            {resData.project_Description.slice(0, 40)}
          </p>
          <div className="flex flex-row items-center justify-between">
            <p>
              Status:-{" "}
              <span
                className={`text-xl font-semibold ${
                  resData.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {resData.status}
              </span>
            </p>
            <p className="py-2">Budget:- ${resData.Base_price}</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Expire's on:- {resData.Expirey_date}</p>
            <div>
              <Link to={`/project/${resData.Project_id}`}>
                <button className="capitalize bg-blue-600 px-6 py-1 rounded-lg text-white">
                  Bid Now
                </button>
              </Link>
            </div>
          </div>
          {resData.status === "Sold"? (
            <div className="bg-white z-10 opacity-80 absolute top-0 bottom-0 left-0 right-0">
              <div className="mt-24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="lg:w-30 lg:h-30 w-20 h-20 text-center mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p className="lg:text-7xl text-5xl text-center">Sold</p>
                <p className="lg:text-2xl text-5xl text-center">bid sold to: {resData.UserId}</p>

              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
    {next < getData?.length && (
      <button
        className="mt-4 ml-30 flex w-48 text-center bg-blue-600 mx-auto capitalize  text-white px-8 py-2 rounded-lg"
        onClick={handleMoreImage}
      >
        Load more
      </button>
    )}
  </div>
  
     
    </>
  );
}
