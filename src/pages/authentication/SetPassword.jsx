import React from "react";
import { Grid, Button, Paper, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setPassword } from "../../store/slicers/auth/authActions";
import { useDispatch } from "react-redux";

// import benzLogo from "../../assets/images/mercedes-benz-8.svg";
import CustomInputField from "../../components/customFields/CustomInputField";
// import { createNotification } from "../../store/slicers/Notification";
import { showSnackBar } from "../../helpers/snackbar";

const SetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let EMAIL_REGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const auth = useSelector((state) => state.auth);

    const handleSubmit = async (values) => {
        try {
            const payload = { email: values?.email, newPassword: values?.password, oldPassword: values?.oldpassword };
            const response = await dispatch(setPassword(payload));
            if (response?.payload?.status === 200 && !response?.payload?.error) {
                showSnackBar(dispatch, "success", response?.payload?.message);
                navigate('/login')
                return
            } else if (response?.payload?.status === 200 && response?.payload?.error) {
                showSnackBar(dispatch, "error", response?.payload?.message);
                return
            }
        } catch (e) {
            showSnackBar(dispatch, "error", "Please try Again !");
        }
    };

    const formikDetails = useFormik({
        initialValues: {
            email: "",
            password: "",
            oldpassword: "",
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required')
                .matches(EMAIL_REGX, 'Invalid email address'),
            oldpassword: Yup.string().required("Please enter password"),
            password: Yup.string()
                .min(8, 'Enter min 8 characters')
                .max(20, 'Enter max 20 characters')
                .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least 1 number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
                .required('Password is required'),
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
                            // src={benzLogo}
                            alt="benz"
                            style={{
                                height: "75px",
                                // objectFit: "contain",
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
                            <CustomInputField
                                name="oldpassword"
                                label="Old Password"
                                variant="outlined"
                                type="password"
                                value={formikDetails.values.oldpassword}
                                onChange={formikDetails.handleChange}
                                onBlur={formikDetails.handleBlur}
                                fullWidth
                                error={
                                    formikDetails.errors.oldpassword &&
                                    formikDetails.touched.oldpassword
                                }
                                errormessage={
                                    formikDetails.errors.oldpassword &&
                                        formikDetails.touched.oldpassword
                                        ? formikDetails.errors.oldpassword
                                        : ""
                                }
                            />
                            <CustomInputField
                                name="password"
                                label="New Password"
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
                                Set Password
                            </Button>&ensp;
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default React.memo(SetPassword);
