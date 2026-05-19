import React from "react";
import Carousel from "./carousel";

import OurHistory from "./OurHistory";
import CoffeeOrigins from "./CoffeeOrigins";
import Certifications from "./Certifications";
import Productroll from "./Productroll";
import ContactUsPage from "../../pages/ContactUsPage";

const Main = () => {
  return (
    <>
      <Carousel />

      <OurHistory />
      <CoffeeOrigins />
      <Productroll />
      <Certifications />
      <ContactUsPage />
    </>
  );
};

export default Main;
