import React from "react";
import Carousel from "./carousel";
import StatsBar from "./StatsBar";
import OurHistory from "./OurHistory";
import CoffeeOrigins from "./CoffeeOrigins";
import Certifications from "./Certifications";
import Productroll from "./Productroll";

const Main = () => {
  return (
    <>
      <Carousel />
      <StatsBar />
      <OurHistory />
      <CoffeeOrigins />
      <Certifications />
      <Productroll />
    </>
  );
};

export default Main;
