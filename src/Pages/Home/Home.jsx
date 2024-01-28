/** @format */

import React, { useState, useEffect, useLayoutEffect } from "react";
import { GlobalContext } from "../../Context/Context";
import "./Home.css";
import Layout from "../../Layout/Layout";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Img,
} from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ModalComp from "../../Components/ModalComp/ModalComp";
import InputComp from "../../Components/InputComp/InputComp";
import TextareraComp from "../../Components/InputComp/TextareraComp";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";

const Home = () => {
  const { setPageType } = GlobalContext();
  const [loading, setLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [openProductCreateModal, setOpenProductCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [type, setType] = useState("");
  const [catagory, setCatagory] = useState("pizza");
  const [btnLoading, setBtnLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  useLayoutEffect(() => {
    setPageType("home");
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        response.data.map((data) => {
          if (data.catagory === "pizza") {
            setPizzas((prev) => [...prev, data]);
          } else if (data.catagory === "drink") {
            setDrinks((prev) => [...prev, data]);
          } else if (data.catagory === "cake") {
            setCakes((prev) => [...prev, data]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  const onCloseModal = () => {
    setOpenProductCreateModal(false);
    setTitle("");
    setDescription("");
    setPrevImage("");
    setImage("");
    setPrice(0);
    setCatagory("pizza");
    setType("");
  };

  const handleImageFileChange = (e) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const closeImage = () => {
    setImage("");
    setPrevImage("");
  };

  useEffect(() => {
    if (
      !title.trim() &&
      !description.trim() &&
      !image &&
      price <= 0 &&
      type.trim() &&
      !catagory.trim()
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [title, description, price, image, type, catagory]);

  const handleCreateProduct = () => {
    setDisable(true);
    setBtnLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("catagory", catagory);
    formdata.append("p_type", type);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}api/product/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        onCloseModal();
        setBtnLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        onCloseModal();
        setBtnLoading(false);
      });
  };

  return (
    <Layout>
      <Box className='home_container'>
        {openProductCreateModal && (
          <ModalComp
            isOpen={openProductCreateModal}
            onClose={onCloseModal}
            title={<>Create new product</>}
            body={
              <Box className='product_modal_body'>
                {/* Title */}
                <InputComp
                  type='text'
                  placeholder='Enter product name'
                  className='modal_input'
                  value={title}
                  handleChange={(e) => setTitle(e.target.value)}
                />

                {/* Description */}
                <TextareraComp
                  type='text'
                  placeholder={"Enter product description"}
                  className={"modal_textarea"}
                  value={description}
                  handleChange={(e) => setDescription(e.target.value)}
                />

                {/* Image */}
                <Box className='modal_image_section'>
                  {image ? (
                    <Box className='modal_image_container'>
                      <Img src={prevImage} className='modal_image' />
                      <Button className='close_image_btn' onClick={closeImage}>
                        <MdOutlineClose />
                      </Button>
                    </Box>
                  ) : (
                    <Box className='image_upload_container'>
                      <label htmlFor='image' className='input_label'>
                        <AiOutlineCloudUpload className='file_upload_icon' />
                      </label>
                      <Input
                        type='file'
                        id='image'
                        onChange={(e) => handleImageFileChange(e)}
                        className='file_input'
                        accept='image/*'
                      />
                    </Box>
                  )}
                </Box>

                {/* Price */}
                <InputComp
                  type='number'
                  placeholder='Enter product price'
                  className='modal_input'
                  value={price}
                  handleChange={(e) => setPrice(e.target.value)}
                />

                {/* Product type */}
                <Box className='modal_radio_section'>
                  <Box className='modal_radio_title'>Product type:</Box>
                  <Box className='box_modal_radio_input_section'>
                    <Box className='radio_onput' onClick={() => setType("veg")}>
                      {type === "veg" ? (
                        <BiRadioCircleMarked />
                      ) : (
                        <BiRadioCircle />
                      )}
                      <span className='radio_input_title'>Veg</span>
                    </Box>
                    <Box
                      className='radio_onput'
                      onClick={() => setType("non_veg")}>
                      {type === "non_veg" ? (
                        <BiRadioCircleMarked />
                      ) : (
                        <BiRadioCircle />
                      )}
                      <span className='radio_input_title'>Non Veg</span>
                    </Box>
                  </Box>
                </Box>

                {/* Product catagory */}
                <Box className='modal_radio_section'>
                  <Box className='modal_radio_title'>Product catagory:</Box>
                  <Box className='box_modal_radio_input_section'>
                    <Box
                      className='radio_onput'
                      onClick={() => setCatagory("pizza")}>
                      {catagory === "pizza" ? (
                        <BiRadioCircleMarked />
                      ) : (
                        <BiRadioCircle />
                      )}
                      <span className='radio_input_title'>Pizza</span>
                    </Box>
                    <Box
                      className='radio_onput'
                      onClick={() => setCatagory("cake")}>
                      {catagory === "cake" ? (
                        <BiRadioCircleMarked />
                      ) : (
                        <BiRadioCircle />
                      )}
                      <span className='radio_input_title'>Cake</span>
                    </Box>
                    <Box
                      className='radio_onput'
                      onClick={() => setCatagory("drink")}>
                      {catagory === "drink" ? (
                        <BiRadioCircleMarked />
                      ) : (
                        <BiRadioCircle />
                      )}
                      <span className='radio_input_title'>Drink</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            }
            footer={
              <Box className='modal_footer_section'>
                <ButtonComp
                  disable={disable}
                  loading={btnLoading}
                  className={"create_product_btn"}
                  disableClassName={"disable_create_product_btn"}
                  text='Create'
                  clickHandler={handleCreateProduct}
                />
              </Box>
            }
          />
        )}
        <Menu>
          <MenuButton as={Button} className='action_menu_btn'>
            <MdCreate />
          </MenuButton>
          <MenuList>
            <MenuItem
              className='header_menu_item'
              onClick={() => setOpenProductCreateModal(true)}>
              Create product
            </MenuItem>
            <MenuItem className='header_menu_item'>Announcement</MenuItem>
          </MenuList>
        </Menu>

        {loading ? (
          <Box className='home_loading_section'>
            <Loader />
          </Box>
        ) : (
          <>
            {(pizzas || []).length > 0 && (
              <Box className='item_section'>
                <Box className='item_section_header'>
                  <Box className='item_section_header_title'>Pizza</Box>
                  <Box className='item_section_divider'></Box>
                </Box>
                <Box className='item_content_section'>
                  {pizzas.map((data) => (
                    <ProductCard key={data._id} data={data} />
                  ))}
                </Box>
              </Box>
            )}

            {(drinks || []).length > 0 && (
              <Box className='item_section'>
                <Box className='item_section_header'>
                  <Box className='item_section_header_title'>Drinks</Box>
                  <Box className='item_section_divider'></Box>
                </Box>
                <Box className='item_content_section'>
                  {drinks.map((data) => (
                    <ProductCard key={data._id} data={data} />
                  ))}
                </Box>
              </Box>
            )}

            {(cakes || []).length > 0 && (
              <Box className='item_section'>
                <Box className='item_section_header'>
                  <Box className='item_section_header_title'>Cakes</Box>
                  <Box className='item_section_divider'></Box>
                </Box>
                <Box className='item_content_section'>
                  {cakes.map((data) => (
                    <ProductCard key={data._id} data={data} />
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
