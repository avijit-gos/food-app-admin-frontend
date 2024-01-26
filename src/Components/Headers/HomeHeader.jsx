/** @format */

import React from "react";
import PizzaLogo from "../../Assets/pizza.png";
import "./HomeHeader.css";
import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";

const HomeHeader = () => {
  return (
    <Box className='header_container'>
      <Box className='header_logo_section'>
        <Img src={PizzaLogo} className='header_logo' />
        <span className='header_title'>Cheese Fest</span>
      </Box>

      <Menu>
        <MenuButton as={Button} className='header_menu_btn'>
          <Avatar className='menu_avatar' />
        </MenuButton>
        <MenuList>
          <MenuItem className='header_menu_item'>Products</MenuItem>
          <MenuItem className='header_menu_item'>Orders</MenuItem>
          <MenuItem className='header_menu_item'>Analytics</MenuItem>
          <MenuItem className='header_menu_item logout_menu_item'>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default HomeHeader;
