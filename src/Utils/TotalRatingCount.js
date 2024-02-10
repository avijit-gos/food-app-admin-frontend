/** @format */

export const TotalRatingCount = (data) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    count += data[i].rating;
  }
  return count;
};
