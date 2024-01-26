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
} from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Home = () => {
  const { setPageType } = GlobalContext();
  const [loading, setLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

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
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Box className='home_container'>
        <Menu>
          <MenuButton as={Button} className='action_menu_btn'>
            <MdCreate />
          </MenuButton>
          <MenuList>
            <MenuItem className='header_menu_item'>Create product</MenuItem>
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
                  <Box className='item_section_header_title'>Drinks</Box>
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
