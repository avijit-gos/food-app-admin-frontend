/** @format */

import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import ModalComp from "../ModalComp/ModalComp";
import ButtonComp from "../ButtonComp/ButtonComp";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSocket, socket } from "../../socket/socket";

const ProductCard = ({ data }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [price, setPrice] = useState(Number(data.price));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [openUpdatePriceModal, setUpdatePriceModal] = useState(false);

  // handle delete product...
  const handleDeleteProduct = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/delete/${data._id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .request(config)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    setOpenDeleteModal(false);
  };

  const closeModal = () => {
    setOpenDeleteModal(false);
    setUpdatePriceModal(false);
  };

  // *** Handle update price
  const handleUpdatePrice = () => {
    console.log(
      `${process.env.REACT_APP_BASE_URL}api/product/update/price/${data._id}`
    );
    let value = JSON.stringify({
      price: price,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/update/price/${data._id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // emitting notification
        socket.emit("notification", response.data.notification);
        socket.emit("update_price", response.data.notification);
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        toast({
          title: "Error.",
          description: `${error.response.data.error.message}`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
    setUpdatePriceModal(false);
  };

  return (
    <Box
      className='pizza_card'
      onClick={() => navigate(`/product/${data._id}`)}>
      {/* Update price modal */}
      {openUpdatePriceModal && (
        <ModalComp
          isOpen={openUpdatePriceModal}
          onClose={closeModal}
          title='Update product price'
          body={
            <Box className='counter_modal_comp_body'>
              <Button
                className='update_count_btn'
                onClick={() => setPrice((prev) => prev + 1)}>
                <FaPlus />
              </Button>
              <Box className='counter'>{price}</Box>
              <Button
                className='update_count_btn'
                onClick={() => setPrice((prev) => prev - 1)}>
                <FaMinus />
              </Button>
            </Box>
          }
          footer={
            <Box className='product_modal_footer'>
              <ButtonComp
                text='Update'
                loading={false}
                disable={false}
                className={"product_btn"}
                disableClassName={""}
                clickHandler={handleUpdatePrice}
              />
            </Box>
          }
        />
      )}
      {/* Delete modal */}
      {openDeleteModal && (
        <ModalComp
          isOpen={openDeleteModal}
          onClose={closeModal}
          title='Delete product'
          body={
            <Box className='modal_comp_body'>
              Do you want to delete this product?
            </Box>
          }
          footer={
            <Box className='product_modal_footer'>
              <ButtonComp
                text='Delete'
                loading={false}
                disable={false}
                className={"product_btn delete_product_btn"}
                disableClassName={""}
                clickHandler={handleDeleteProduct}
              />
            </Box>
          }
        />
      )}
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
          <MenuItem
            className='header_menu_item'
            onClick={() => setUpdatePriceModal(true)}>
            Update price
          </MenuItem>
          <MenuItem className='header_menu_item'>
            Update product details
          </MenuItem>
          <MenuItem
            className='header_menu_item delete_header_menu_item'
            onClick={() => setOpenDeleteModal(true)}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProductCard;
