/** @format */

import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import { GlobalContext } from "../../Context/Context";
import { Box, Button, Img } from "@chakra-ui/react";
import CircleLoader from "../../Components/Loader/CircleLoader/CircleLoader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FullViewItem.css";
import { MdKeyboardBackspace } from "react-icons/md";
import Details from "./components/Details";
import Analytics from "./components/Analytics";

const FullViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pageType, setPageType } = GlobalContext();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [active, setActive] = useState("details");

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
        console.log(response.data);
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

              {/* Body Section */}
              <Box className='full_product_body'>
                {/* Tab section */}
                <Box className='tab_section'>
                  {/* Details section */}
                  <Box
                    onClick={() => handleChangeTab("details")}
                    className={
                      active === "details"
                        ? "tab_item active_tab_item"
                        : "tab_item"
                    }>
                    Details
                  </Box>
                  {/* Analytics Section */}
                  <Box
                    onClick={() => handleChangeTab("analytics")}
                    className={
                      active === "analytics"
                        ? "tab_item active_tab_item"
                        : "tab_item "
                    }>
                    Analytics
                  </Box>
                </Box>

                {/* Tab item container */}
                <>
                  {active === "details" ? (
                    <Details item={item} />
                  ) : (
                    <Analytics />
                  )}
                </>
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
