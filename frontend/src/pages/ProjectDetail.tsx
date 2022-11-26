import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Modal } from "react-responsive-modal";
import Box from "@mui/material/Box";
import "react-responsive-modal/styles.css";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor:any =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; 



export const ProjectDetail = () => {
  interface project {
    cover_Image: string;
    Project_Name: string;
    project_Description: string;
    Base_price: string;
    Expirey_date: string;
    createdAt: string;
  }
  const { id } = useParams();
  const Project_id = id;
  const [project, setProject] = React.useState<project>();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [bidder, setBidder] = React.useState([]);

  const getProjectDetail = () => {
    axios
      .get(`http://localhost:4000/api/getProjectbyId/${Project_id}`)
      .then((response) => {
        if (response?.data?.result) {
          console.log(response?.data?.result, "response.data?.result");
          setProject(response?.data?.result);
        }
      })
      .catch((err) => {
        console.log(err, ":error");
      });
  };

  const getbiddersList = () => {
    axios
      .get(`http://localhost:4000/api/getBidding/${id}`)
      .then((getbiddersResponse) => {
        if (getbiddersResponse?.data?.result) {
          console.log(
            getbiddersResponse?.data?.result,
            "response.data for bidders"
          );
          setBidder(getbiddersResponse?.data?.result);
        }
      })
      .catch((err) => {
        console.log(err, ":error");
      });
  };

  const submitBid = (e: any) => {
    e.preventDefault();
    const data = {
      userId: email,
      bidding_price: amount,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    axios
      .post(`http://localhost:4000/api/addBidding/${id}`, formData)
      .then((response) => {
        if (response?.data?.message === "Add Bidding Successfully") {
          setOpen(false);
          setEmail("");
          setAmount("");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    getProjectDetail();
    setInterval(() => {
      getbiddersList();
    }, 2000);
    getbiddersList();
  }, []);

  return (
    <>
      <Header />
      <section className="max-w-screen flex lg:flex-row flex-col justify-between lg:space-x-10 lg:py-10 py-2 px-4 lg:px-16 mx-auto  shadow-lg">
        <div className="lg:w-3/4 lg:sticky lg:top-20">
          <div className="lg:h-[500px] h-64 w-full">
            <img
              className="h-full w-full object-cover object-center rounded-lg"
              src={`/uploads/${project?.cover_Image}`}
              alt={project?.cover_Image}
              loading="lazy"
            />
          </div>
          <div>
            <h1 className="text-center text-black py-2 lg:text-2xl text-lg">
              {project?.Project_Name}
            </h1>
          </div>
          <div className="flex lg:flex-row flex-col lg:justify-between items-center w-full">
            <p className="text-sm text-left float-left">
              Project Created On:-{" "}
              <span className="font-semibold">{project?.createdAt}</span>
            </p>
            <p className="text-sm text-left">
              Project End On:-{" "}
              <span className="font-semibold lg:text-xl text-lg text-green-600">
                {project?.Expirey_date}
              </span>
            </p>
          </div>
          <div>
            <h1 className="text-left text-black py-2 text-base">
              Budget :- ${project?.Base_price}
            </h1>
          </div>
          <div>
            <h1 className="text-left text-black py-2 text-base">
              {project?.project_Description}
            </h1>
          </div>
        </div>
        <div className="lg:w-1/4 w-full  flex flex-col justify-between bg-gray-100  rounded-lg lg:shadow-xl">
          <div>
            <div className="lg:text-2xl text-xl  px-5 pt-5">Bidder List</div>
            <div className="grid lg:grid-cols-1 space-y-3 mt-3 px-5 max-h-[600px] overflow-y-auto">
              {bidder ? (
                bidder.map((resData: any, index) => (
                  <div className="flex flex-row items-start justify-between  bg-white shadow-xl rounded-lg p-3">
                    <div>
                      Budget:- ${resData.Bid_price}
                      <p className="text-sm">{resData.bidderId}</p>
                      <small>Bidding date:{resData.Bid_date}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No any biding</p>
              )}
            </div>
          </div>
          <div className="rounded-lg pt-5">
            <button
              onClick={onOpenModal}
              className=" bg-blue-500 text-white w-full p-2 rounded-lg"
            >
              BidNow
            </button>
          </div>
          <Modal open={open} onClose={onCloseModal} center>
            <div className="p-5">
              <form onSubmit={submitBid}>
                <div>
                  <p className="text-base pb-3 text-gray-700">
                    Project title:- <br /> {project?.Project_Name}
                  </p>
                  <Box
                    sx={{ "& > legend": { mt: 2 } }}
                    style={{ border: "none" }}
                  ></Box>

                  <p className="mb-0 pb-0 text-dark ">UserId</p>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email.."
                    className="w-full border text-base focus:outline-none border-gray-600 mb-3 p-1 rounded-lg"
                  />
                  <p className="mb-0 pb-0 text-dark">Your Bid</p>
                  <input
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="Enter amount.."
                    className="w-full border text-base focus:outline-none border-gray-600 mb-3 p-1 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="btn bg-blue-600 px-8 py-2 rounded-lg text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </section>
      <Footer />
    </>
  );
};
