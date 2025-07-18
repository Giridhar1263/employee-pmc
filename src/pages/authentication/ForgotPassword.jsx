import React from "react";
import { Grid, Button, Paper, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../store/slicers/auth/authActions";
import { useDispatch } from "react-redux";
// import coverpage from '../../assets/images/coverpage.png'
import benzLogo from "../../assets/images/nav_logo.png";
import CustomInputField from "../../components/customFields/CustomInputField";
import StickyFooter from "../../components/layout/Footer";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let EMAIL_REGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // const auth = useSelector((state) => state.auth);

    const handleSubmit = async (values) => {
        const payload = { email: values?.email };
        const response = await dispatch(forgotPassword(payload));
        console.log(response);
        if (response?.payload?.status === 200) {
            formikDetails.resetForm();
            navigate("/create-new-password");
        }
    };

    const formikDetails = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required')
                .matches(EMAIL_REGX, 'Invalid email address'),
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
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                onClick={() => { }}
                            >
                                Otp
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => navigate("/login")}
                                className="handSymbol"
                                sx={{
                                    textDecoration: 'underline',
                                    textTransform: 'none',
                                    fontSize: '10px',
                                    color: "#000000",
                                    fontWeight: "600",
                                    border: "none",
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
            <StickyFooter color="#222222" />
        </Grid>
    );
};

export default React.memo(ForgotPassword);

