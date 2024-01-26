/** @format */

import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [price, setPrice] = useState(data.price);
  return (
    <Box className='pizza_card'>
      {/* Image section */}
      <Img
        src={image}
        className='card_image'
        onClick={() => navigate(`/product/${data._id}`)}
      />
      <Box
        className='card_title'
        onClick={() => navigate(`/product/${data._id}`)}>
        {title}
      </Box>
      <Box
        className='card_description'
        onClick={() => navigate(`/product/${data._id}`)}>
        {description.slice(0, 111)}
        {description.length > 110 && <>...</>}
        <Box className='item_price_section'>
          Price:{" "}
          <span className='item_price_icon'>
            <FaRupeeSign />
          </span>
          <span className='item_price'>{price}</span>
        </Box>
      </Box>

      <Menu>
        <MenuButton as={Button} className='product_card_menu_btn'>
          <MdMoreHoriz />
        </MenuButton>
        <MenuList>
          <MenuItem className='header_menu_item'>Update price</MenuItem>
          <MenuItem className='header_menu_item'>
            Update product details
          </MenuItem>
          <MenuItem className='header_menu_item delete_header_menu_item'>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProductCard;
