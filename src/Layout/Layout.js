/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import { GlobalContext } from "../Context/Context";
import HomeHeader from "../Components/Headers/HomeHeader";

const Header = ({ pageType }) => {
  if (pageType === "home") {
    return <HomeHeader pageType={pageType} />;
  }
};

const Layout = ({ children }) => {
  const { pageType } = GlobalContext();
  return (
    <Box className='layout_container'>
      {/* Header */}
      <Box className='layout_header_container'>
        <Header pageType={pageType} />
      </Box>
      {/* Children */}
      <Box className='layout_app_container'>{children}</Box>
    </Box>
  );
};

export default Layout;
