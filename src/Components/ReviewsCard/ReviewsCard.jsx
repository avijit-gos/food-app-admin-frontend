/** @format */

import React, { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { MdMoreHoriz } from "react-icons/md";
import "./ReviewsCard.css";

const ReviewsCard = ({ review }) => {
  return (
    <Box className='review_card'>
      {/* Header */}
      <Box className='review_header'>
        <Box className='review_user_box'>
          <Avatar src='' className='review_avatar' />
          <span className='review_user_name'>{review.user.name}</span>
        </Box>
        {/* Menu list */}
        <Menu>
          <MenuButton
            className='review_menu_btn'
            as={Button}
            rightIcon={<MdMoreHoriz />}></MenuButton>
          <MenuList>
            <MenuItem className='review_menu_item delete_menu_item'>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {/* Body */}
      <Box className='review_card_body'>{review.text}</Box>
    </Box>
  );
};

export default ReviewsCard;
