/** @format */

import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import InputComp from "../../Components/InputComp/InputComp";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    if (email.trim() && !email.includes("@gmail")) {
      setDisable(true);
      setError("Email is not correct for admin");
    } else if (!name.trim() || !email.trim() || !password.trim()) {
      setDisable(true);
      setError("");
    } else {
      setDisable(false);
      setError("");
    }
  }, [name, email, password]);

  const handleRegister = () => {
    setDisable(true);
    setLoading(true);
    let data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      isAdmin: true,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/user/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        setResponseError(error.response.data.error.message);
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='auth_section'>
        {/* Header Section */}
        <Box className='auth_header'>Register</Box>
        {error && <Box className='error_msg'>{error}</Box>}
        {responseError && <Box className='error_msg'>{responseError}</Box>}
        {/* Form section */}
        <Box className='auth_form_section'>
          <InputComp
            type='text'
            placeholder='Enter name'
            className='auth_input'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <InputComp
            type='email'
            placeholder='Enter email'
            className='auth_input'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <InputComp
            type='password'
            placeholder='Enter password'
            className='auth_input'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Box
            className='auth_redirect_section'
            onClick={() => navigate("/login")}>
            Already have an account?
          </Box>
        </Box>
        {/* Button section */}
        <ButtonComp
          loading={loading}
          disable={disable}
          text='Register'
          className={"auth_btn"}
          disableClassName={"disable_auth_btn"}
          clickHandler={handleRegister}
        />
      </Box>
    </Box>
  );
};

export default Register;
