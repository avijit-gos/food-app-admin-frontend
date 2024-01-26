/** @format */

import { Button, Spinner } from "@chakra-ui/react";
import React, { Fragment } from "react";

const ButtonComp = ({
  loading,
  disable,
  text,
  className,
  disableClassName,
  clickHandler,
}) => {
  return (
    <Fragment>
      {disable ? (
        <Button className={disableClassName}>
          {loading ? <Spinner /> : <>{text}</>}
        </Button>
      ) : (
        <Button className={className} onClick={clickHandler}>
          {text}
        </Button>
      )}
    </Fragment>
  );
};

export default ButtonComp;
