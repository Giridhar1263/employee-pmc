import React from "react";
import { Grid, Button, Paper, Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../../store/slicers/auth/authActions";
import { useDispatch } from "react-redux";
import benzLogo from "../../assets/images/nav_logo.png";
import CustomInputField from "../../components/customFields/CustomInputField";
import { showSnackBar } from "../../helpers/snackbar";
import StickyFooter from "../../components/layout/Footer";
// import coverpage from '../../assets/images/coverpage.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let EMAIL_REGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async (values) => {
    const payload = {
      email: values?.email.toLowerCase().trim(),
      password: values?.password.trim()
    };
    const response = await dispatch(signIn(payload));
    if (response?.payload && !response?.payload?.error) {
      if (!response?.payload?.data?.isFirstLogin) {
        showSnackBar(dispatch, "success", "Please set new Password !");
        navigate('/set-password');
      } else {
        showSnackBar(dispatch, "success", "Login successfully !");
        navigate("/dashboard");
      }
    }
  };

  const formikDetails = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(EMAIL_REGX, 'Invalid email address'),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: `${window.innerHeight}px`,
        backgroundColor: "#222",
        // backgroundImage: `url(${coverpage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxSizing: 'border-box'
      }}
    >
      <Grid
        item
        xs={10}
        lg={4.5}
        sx={{ color: "white", zIndex: "1", paddingY: 5 }}
      >
        <Paper elevation={5} sx={{ p: 2 }}>
          <Box style={{ width: "100%", textAlign: "center" }}>
            <img
              src={benzLogo}
              alt="benz"
              style={{
                height: "75px",
              }}
            />
          </Box>
          <form onSubmit={formikDetails.handleSubmit}>
            <Stack sx={{ px: 6, mt: 2 }} spacing={1.5}>
              <CustomInputField
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                value={formikDetails.values.email}
                onChange={formikDetails.handleChange}
                onBlur={formikDetails.handleBlur}
                fullWidth
                error={
                  formikDetails.errors.email && formikDetails.touched.email
                }
                errormessage={
                  formikDetails.errors.email && formikDetails.touched.email
                    ? formikDetails.errors.email
                    : ""
                }
              />
              <CustomInputField
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                value={formikDetails.values.password}
                onChange={formikDetails.handleChange}
                onBlur={formikDetails.handleBlur}
                fullWidth
                error={
                  formikDetails.errors.password &&
                  formikDetails.touched.password
                }
                errormessage={
                  formikDetails.errors.password &&
                    formikDetails.touched.password
                    ? formikDetails.errors.password
                    : ""
                }
              />
              <Button
                type="submit"
                variant="contained"
                // disabled={auth.loading}
                fullWidth
              >
                Login
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/forgot-password")}
                className="handSymbol"
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  border: "none",
                  textTransform: 'none',
                  textDecorationLine: 'underline',
                  "&:hover": {
                    color: "#000000",
                    border: "none",
                  },
                  "&:focus": {
                    color: "#000000",
                    border: "none",
                  },
                  // textDecoration: 'none',
                  fontSize: '10px'
                }}
              >
                <Typography
                  fontSize={'10px'}
                  fontWeight={'bold'}
                >
                  Forgot Password?
                </Typography>
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
      <StickyFooter color="#222222" />
    </Grid>
  );
};

export default React.memo(Login);
