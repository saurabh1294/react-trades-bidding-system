import React from "react";
import BidCard from "../components/TradeCard/BidCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const Home = () => {
  return (
    <>
      <Header />
      <section className=" max-w-screen-2xl mx-auto">
        <BidCard />
      </section>
      <Footer/>
    </>
  );
};
