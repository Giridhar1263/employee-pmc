import React from "react";
import { Grid, Button, Paper, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createNewPassword } from "../../store/slicers/auth/authActions";
import { useDispatch } from "react-redux";

// import benzLogo from "../../assets/images/mercedes-benz-8.svg";
import CustomInputField from "../../components/customFields/CustomInputField";

const CreatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let EMAIL_REGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // const auth = useSelector((state) => state.auth);

    const handleSubmit = async (values) => {
        const payload = {
            email: values?.email,
            otp: JSON.stringify(values?.emailVerficationOtp),
            password: values?.confirmPassword,
            otpType: ""
        };
        const response = await dispatch(createNewPassword(payload));
        if (response?.payload?.status === 200) {
            formikDetails.resetForm();
            navigate("/login");
        }
    };

    const formikDetails = useFormik({
        initialValues: {
            email: "",
            emailVerficationOtp: "",
            createPassword: "",
            confirmPassword: ""
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required')
                .matches(EMAIL_REGX, 'Invalid email address'),
            emailVerficationOtp: Yup.string().required("Please enter email verfication otp"),
            createPassword: Yup.string()
                .min(8, 'Enter min 8 characters')
                .max(20, 'Enter max 20 characters')
                .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least 1 number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
                .required('Password is required')
            ,
            confirmPassword: Yup.string().required('Confirm password').oneOf([Yup.ref('createPassword'), null], 'Password should match')
        }),
    });


    return (
        <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: `${window.innerHeight}px`,
                backgroundColor: "#000",
            }}
        >
            <Grid
                item
                xs={10}
                lg={4.5}
                sx={{ color: "white", zIndex: "1", }}
            >
                <Paper elevation={5}>
                    <Box style={{ width: "100%", textAlign: "center", paddingTop: '10px' }}>
                        <img
                            // src={benzLogo}
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
                                value={formikDetails.values.email}
                                onChange={formikDetails.handleChange}
                                onBlur={formikDetails.handleBlur}
                                fullWidth
                                error={
                                    formikDetails.errors.email && formikDetails.touched.email
                                }
                                errormessage={
                                    formikDetails.errors.email && formikDetails.touched.email
                                        ? formikDetails.errors.email : ""
                                }
                            />
                            <CustomInputField
                                name="emailVerficationOtp"
                                label="Email Verfication Otp"
                                variant="outlined"
                                type="number"
                                value={formikDetails.values.emailVerficationOtp}
                                onChange={formikDetails.handleChange}
                                onBlur={formikDetails.handleBlur}
                                fullWidth
                                error={
                                    formikDetails.errors.emailVerficationOtp && formikDetails.touched.emailVerficationOtp
                                }
                                errormessage={
                                    formikDetails.errors.emailVerficationOtp && formikDetails.touched.emailVerficationOtp
                                        ? formikDetails.errors.emailVerficationOtp : ""
                                }
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                }}
                            />
                            <CustomInputField
                                name="createPassword"
                                label="Create Password"
                                variant="outlined"
                                type="password"
                                value={formikDetails.values.createPassword}
                                onChange={formikDetails.handleChange}
                                onBlur={formikDetails.handleBlur}
                                fullWidth
                                error={
                                    formikDetails.errors.createPassword && formikDetails.touched.createPassword
                                }
                                errormessage={
                                    formikDetails.errors.createPassword && formikDetails.touched.createPassword
                                        ? formikDetails.errors.createPassword : ""
                                }
                            />
                            <CustomInputField
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                value={formikDetails.values.confirmPassword}
                                onChange={formikDetails.handleChange}
                                onBlur={formikDetails.handleBlur}
                                fullWidth
                                error={
                                    formikDetails.errors.confirmPassword && formikDetails.touched.confirmPassword
                                }
                                errormessage={
                                    formikDetails.errors.confirmPassword && formikDetails.touched.confirmPassword
                                        ? formikDetails.errors.confirmPassword : ""
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                // disabled={auth.loading}
                                fullWidth
                            >
                                submit
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => navigate("/login")}
                                className="handSymbol"
                                sx={{
                                    color: "#000000",
                                    fontWeight: "600",
                                    border: "none",
                                    textDecorationLine: 'underline',
                                    textTransform: 'none',
                                    "&:hover": {
                                        color: "#000000",
                                        border: "none",
                                    },
                                    "&:focus": {
                                        color: "#000000",
                                        border: "none",
                                    },
                                }}
                            >
                                login?
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default React.memo(CreatePassword);

