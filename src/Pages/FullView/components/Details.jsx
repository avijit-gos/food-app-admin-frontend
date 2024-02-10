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
import React, { useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import ModalComp from "../../../Components/ModalComp/ModalComp";
import ButtonComp from "../../../Components/ButtonComp/ButtonComp";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSocket, socket } from "../../../socket/socket";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TotalRatingCount } from "../../../Utils/TotalRatingCount";
import Reviews from "./Reviews";
import InputComp from "../../../Components/InputComp/InputComp";
import TextareaComp from "../../../Components/InputComp/TextareraComp";

const Details = ({ item }) => {
  useSocket();
  const toast = useToast();
  const [image, setImage] = useState(item.image);
  const [name, setName] = useState(item.title);
  const [desription, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [type, settype] = useState(item.p_type);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  const [openUpdatePriceModal, setUpdatePriceModal] = useState(false);
  const [openUpdateDetailsModal, setUpdateDetailsModal] = useState(false);
  const [productTitle, setProductTitle] = useState(item.title);
  const [productDescription, setProductDescription] = useState(
    item.description
  );

  // handle delete product...
  const handleDeleteProduct = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/delete/${item._id}`,
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
    setUpdateDetailsModal(false);
  };

  // *** Handle update price
  const handleUpdatePrice = () => {
    console.log(
      `${process.env.REACT_APP_BASE_URL}api/product/update/price/${item._id}`
    );
    let value = JSON.stringify({
      price: price,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/update/price/${item._id}`,
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

  const handleTitleChange = (e) => {
    setProductTitle(e.target.value.slice(0, 70));
  };

  useEffect(() => {
    if (
      !productTitle.trim() ||
      !productDescription.trim() ||
      productTitle === name ||
      productDescription === desription
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [productTitle, productDescription, name, desription]);

  const handleUpdateProduct = () => {
    setDisable(true);
    setLoading(true);
    let data = JSON.stringify({
      title: productTitle,
      description: productDescription,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/update/details/${item._id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setName(productTitle);
        setDescription(productDescription);
        setLoading(false);
        setUpdateDetailsModal(false);
      })
      .catch((error) => {
        toast({
          title: "Error.",
          description: `${error.response.data.error.message}`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        setUpdateDetailsModal(false);
        console.log(error);
      });
  };

  return (
    <Box className='details_container_section'>
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

      {/* Update Product details modal */}
      {openUpdateDetailsModal && (
        <ModalComp
          isOpen={openUpdateDetailsModal}
          onClose={closeModal}
          title='Update product details'
          body={
            <Box className='product_form_modal_body'>
              <InputComp
                type='text'
                placeholder={"Enter product title"}
                className='modal_form_input'
                value={productTitle}
                handleChange={handleTitleChange}
              />
              <TextareaComp
                type='text'
                placeholder='Enter product description'
                className='modal_form_textarea'
                value={productDescription}
                handleChange={(e) =>
                  setProductDescription(e.target.value.slice(0, 300))
                }
              />
            </Box>
          }
          footer={
            <Box className='product_modal_footer'>
              <ButtonComp
                text='Update'
                loading={loading}
                disable={disable}
                className={"product_btn"}
                disableClassName={"disable_product_btn"}
                clickHandler={handleUpdateProduct}
              />
            </Box>
          }
        />
      )}
      {/* Image section */}
      <Box className='full_view_image_section'>
        <Img src={image} className='full_view_image' />
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<MdMoreVert />}
            className='menu_btn'></MenuButton>
          <MenuList>
            <MenuItem
              className='header_menu_item'
              onClick={() => setUpdatePriceModal(true)}>
              Update price
            </MenuItem>
            <MenuItem
              className='header_menu_item'
              onClick={() => setUpdateDetailsModal(true)}>
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

      {/* Item Body section */}
      <Box className='product_body_section'>
        <Box className='product_title'>{name}</Box>
        <Box className='product_description'>{desription}</Box>
        <Box className='product_info_section'>
          <Box className='product_price'>
            <MdOutlineCurrencyRupee />
            {price}
          </Box>
          <Box className='product_type'>{type.toUpperCase()}</Box>
          <Box className='product_rating'>
            Total raing {TotalRatingCount(item.rating)} out of{" "}
            {item.rating.length} users
          </Box>
        </Box>
      </Box>

      {/* Product Reviews Section */}
      <Box className='product_reviews_section'>
        <Box className='product_reviews_title'>User reviews</Box>
        <Reviews subLoading={subLoading} setSubLoading={setSubLoading} />
      </Box>
    </Box>
  );
};

export default Details;
