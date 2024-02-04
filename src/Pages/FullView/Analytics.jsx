/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import CircleLoader from "../../Components/Loader/CircleLoader/CircleLoader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement
);

const Analytics = ({ subLoading, setSubLoading }) => {
  const { id } = useParams();

  const [ratings, setRatings] = useState([]);
  const [ratingTime, setRatingTime] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const [totalRateUser, setTotalRateUser] = useState(0);

  const [reviewsTime, setReviewsTime] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/product/analytics/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        // rating calculation ****
        setTotalRateUser(response.data.rating.length);

        const ratingFreqCounter = new Map();
        for (const element of response.data.rating) {
          setRatingCount((p) => p + element.rating_count);
          const hour = new Date(element.time).getHours();
          ratingFreqCounter.set(hour, (ratingFreqCounter.get(hour) || 1) + 1);
        }
        setRatingTime(Object.keys(Object.fromEntries(ratingFreqCounter)));
        setRatings(Object.values(Object.fromEntries(ratingFreqCounter)));

        // Reviews calculation ****
        setReviewsCount(response.data.reviews.length);
        const reviewsFreqCounter = new Map();
        for (const element of response.data.reviews) {
          const hour = new Date(element.time).getHours();
          reviewsFreqCounter.set(hour, (reviewsFreqCounter.get(hour) || 1) + 1);
        }
        setReviewsTime(Object.keys(Object.fromEntries(reviewsFreqCounter)));
        setReviews(Object.values(Object.fromEntries(reviewsFreqCounter)));

        // Orders calculation ****
        // setOrders(response.data.order);
        setSubLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const ratingData = {
    labels: ratingTime,
    datasets: [
      {
        label: "Rating",
        data: ratings,
        borderWidth: 1,
        fill: false,
        borderColor: "rgba(255, 71, 87,1.0)",
      },
    ],
  };

  const reviewsData = {
    labels: reviewsTime,
    datasets: [
      {
        label: "Reviews",
        data: reviews,
        borderWidth: 1,
        fill: false,
        borderColor: "rgba(46, 213, 115,1.0)",
      },
    ],
  };

  return (
    <Fragment>
      {subLoading ? (
        <Box className='sub_loader_section'>
          <CircleLoader />
        </Box>
      ) : (
        <Box className='reviews_section'>
          <Box className='line_chart_sections'>
            {/* Rating chart */}
            <Box className='line_chart_box'>
              <Line data={ratingData} />
              <Box className='card_info'>
                <Box className='counter_info'>
                  Total Rating: <span className='count'>{ratingCount}</span>
                </Box>
                <Box className='counter_info'>
                  Total users: <span className='count'>{totalRateUser}</span>
                </Box>
                <Box className='counter_info'>
                  Averages:{" "}
                  <span className='count'>
                    {Math.floor(ratingCount / totalRateUser)}
                  </span>
                </Box>
              </Box>
            </Box>

            {/* Reviews cvhart */}
            <Box className='line_chart_box'>
              <Line data={reviewsData} />
              <Box className='card_info'>
                <Box className='counter_info'>
                  Total no of reviews:{" "}
                  <span className='count'>{reviewsCount}</span>
                </Box>
              </Box>
            </Box>
            <Box className='line_chart_box'></Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default Analytics;
