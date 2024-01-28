/** @format */

import React from "react";
import { Textarea } from "@chakra-ui/react";

const TextareraComp = ({
  type,
  placeholder,
  className,
  value,
  handleChange,
}) => {
  return (
    <Textarea
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};
export default TextareraComp;
