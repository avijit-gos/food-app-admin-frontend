/** @format */

import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { Box, Button, Img } from "@chakra-ui/react";
import CircleLoader from "../../Components/Loader/CircleLoader/CircleLoader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FullViewItem.css";
import { MdKeyboardBackspace } from "react-icons/md";
import Reviews from "./Reviews";
import Analytics from "./Analytics";

const FullViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pageType, setPageType } = GlobalContext();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [active, setActive] = useState("reviews");
  const [subLoading, setSubLoading] = useState(false);

  useLayoutEffect(() => {
    setPageType("full_view");
  }, []);

  useEffect(() => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setItem(null);
        setLoading(false);
      });
  }, [id]);

  const handleChangeTab = (value) => {
    setActive(value);
    setSubLoading(true);
  };

  return (
    <Fragment>
      {loading ? (
        <Box className='loading_full_product_container'>
          <CircleLoader />
        </Box>
      ) : (
        <Fragment>
          {item ? (
            <Box className='product_container'>
              {/* Header */}
              <Box className='full_item_header'>
                <Button className='back_btn' onClick={() => navigate(-1)}>
                  <MdKeyboardBackspace />
                </Button>
                <Box className='product_title'>{item.title}</Box>
              </Box>

              <Box className='full_product_body'>
                <Img src={item.image} className='product_image' />
                <Box className='product_title'>{item.title}</Box>
                <Box className='product_description'>{item.description}</Box>

                <Box className='ite_tab_section'>
                  <Box
                    className={
                      active === "reviews"
                        ? "tab_item active_tab_item"
                        : "tab_item "
                    }
                    onClick={() => handleChangeTab("reviews")}>
                    Reviews
                  </Box>

                  <Box
                    className={
                      active === "analytics"
                        ? "tab_item active_tab_item"
                        : "tab_item"
                    }
                    onClick={() => handleChangeTab("analytics")}>
                    Analytics
                  </Box>
                </Box>

                {active === "reviews" ? (
                  <Reviews
                    subLoading={subLoading}
                    setSubLoading={setSubLoading}
                  />
                ) : (
                  <Analytics
                    subLoading={subLoading}
                    setSubLoading={setSubLoading}
                  />
                )}
              </Box>
            </Box>
          ) : (
            <Box className='empty_product_container'>No product found</Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default FullViewItem;
