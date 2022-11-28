import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const imagePerRow = 6;
export default function BidCard() {
  const [getData, setGetData] = React.useState([]);
  const [next, setNext] = React.useState(imagePerRow);

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/getProject").then((res) => {
      setGetData(res?.data.result);
      //setInterval(handleMoreImage, 1000)
    });
  }, [getData]);

  return (
    <>
      <div className="py-10">
        <div className="grid lg:grid-cols-3 gap-y-5 gap-x-5 sm:grid-cols-3 grid-cols-1 px-3">
          { getData ? getData.slice(0, next)?.map((resData: any, index) => {
            const budget = Number(resData.Base_price);

            return (

              <div className="shadow-xl lg:p-5 p-3 relative" key={ index }>
                <div className="text-center flex flex-row items-center justify-between">
                  <div className="bg-red-800 uppercase lg:w-14 lg:h-14 w-8 h-8 rounded-full mb-2 flex items-center justify-center lg:text-4xl text-xl">
                    { resData.UserId.substring(0, 1).toLowerCase() }
                  </div>
                  <p className="py-3 capitalize">{ resData.Project_Name }</p>
                </div>
                <div className="lg:h-64 h-48 w-full">
                  <img
                    className="h-full rounded-lg w-full object-cover object-center"
                    src={ `/uploads/${resData.cover_Image}` }
                    alt={ resData.cover_Image }
                  />
                </div>
                <p className="text-base py-2">
                  { resData.project_Description.slice(0, 40) }
                </p>
                <div className="flex flex-row items-center justify-between">
                  <p>
                    Status:-{ " " }
                    <span
                      className={ `text-xl font-semibold ${resData.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                        }` }
                    >
                      { resData.status }
                    </span>
                  </p>
                  <p className="py-2 text-sm lg:text-base">Budget:- ${ budget.toLocaleString() }</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-sm lg:text-base">Expire's on:- { resData.Expirey_date }</p>
                  <div>
                    <Link to={ `/project/${resData.Project_id}` }>
                      <button className="capitalize bg-blue-600 text-sm lg:text-base px-4 lg:px-6 py-1 rounded-lg text-white">
                        Bid Now
                      </button>
                    </Link>
                  </div>
                </div>
                { resData.status === "Sold" ? (
                  <div className="bg-white z-10 opacity-80 absolute top-0 bottom-0 left-0 right-0  ">
                    <div className="mt-16">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={ 1.5 }
                        stroke="currentColor"
                        className="lg:w-48 lg:h-48 w-24 h-24 text-center mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <p className="lg:text-2xl text-5xl text-center">Project sold to:- { resData.winnerId }</p>
                      <p className="lg:text-7xl text-5xl text-center">Sold</p>
                    </div>
                  </div>
                ) : (
                  ""
                ) }

                { resData.status === "Expire" ? (
                  <div className="bg-white z-10 opacity-80 absolute top-0 bottom-0 left-2 right-0  ">
                    <div className="mt-20 text-center mx-auto">
                      <svg className="lg:w-48 lg:h-48 w-24 h-24 text-center mx-auto" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 
                        12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z" /></svg>
                    </div>
                    <p className="lg:text-7xl text-5xl text-center m-15">Expired</p>
                    <p className="lg:text-2xl text-5xl text-center mt-10">Expired on: { resData.Expirey_date }</p>

                  </div>
                ) : (
                  ""
                ) }
              </div>
            );
          }) :
            <img src="data:image/jpeg;base64,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" />
          }
        </div>
        { next < getData?.length && (
          <button
            className="mt-4 w-48 text-center bg-blue-600 mx-auto capitalize  text-white px-8 py-2 rounded-lg"
            onClick={ handleMoreImage }
          >
            Load more
          </button>
        ) }
      </div>
    </>
  );
}
