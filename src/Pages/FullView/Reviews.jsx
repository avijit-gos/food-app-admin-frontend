/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CircleLoader from "../../Components/Loader/CircleLoader/CircleLoader";
import axios from "axios";
import ReviewsCard from "../../Components/ReviewsCard/ReviewsCard";

const Reviews = ({ subLoading, setSubLoading }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(5);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/review/${id}?page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        setCount(response.data.length);
        if (page === 1) {
          setReviews(response.data);
        } else {
          setReviews((prev) => [...prev, ...response.data]);
        }
        setSubLoading(false);
        setBtnLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setReviews([]);
        setSubLoading(false);
      });
  }, [id, page]);

  const handleIncrmentPage = () => {
    setBtnLoading(true);
    setPage((p) => p + 1);
  };
  return (
    <Fragment>
      {subLoading ? (
        <Box className='sub_loader_section'>
          <CircleLoader />
        </Box>
      ) : (
        <Box className='reviews_section'>
          {(reviews || []).length > 0 ? (
            <>
              {reviews.map((data) => (
                <ReviewsCard key={data._id} review={data} />
              ))}
              {count === limit && (
                <Box
                  className='pagination_section'
                  onClick={() => handleIncrmentPage()}>
                  <Button className='pagination_btn'>
                    {btnLoading ? <Spinner /> : <>Load more</>}
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Box className='empty_reviews_conatiner'>No data found</Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Reviews;
