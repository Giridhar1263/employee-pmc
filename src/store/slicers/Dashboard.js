import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { config } from "../../helpers/config";
// import client from "../../helpers/client";
// import { showLoader } from "./Loading";
// import { showSnackBar } from "../../helpers/snackbar";

// export const postGetCompletionStatus = createAsyncThunk(
//     "postGetCompletionStatus",
//     async ({ payload }, { dispatch }) => {
//         try {
//             const response = await client.post(`${config.DASHBOARD_API}/GetSubjectsStatisticsGraph`, payload)
//             return response
//         } catch (error) {
//             console.log(error)
//             showSnackBar(dispatch, "error", "Server Error !");
//         } finally {
//             dispatch(showLoader(false))
//         }
//     }
// );

// export const getSiteListRoleBased = createAsyncThunk(
//     "getSiteListRoleBased",
//     async ({ dispatch }) => {
//         try {
//             const url = `${config.SITES_API}/GetSitesByUserRole`;
//             const response = await client.get(url);
//             return response.data
//         } catch (error) {
//             if (error?.status === 400)
//                 showSnackBar(dispatch, "error", error?.title)
//             else if (error?.status === 404) {
//                 showSnackBar(dispatch, "error", error?.message);
//             }
//         } finally {
//             dispatch(showLoader(false));
//         }
//     }
// );

// export const updateTroubleShootRequest = createAsyncThunk(
//     "updateTroubleShootRequest",
//     async ({ payload }, { dispatch }) => {
//         try {
//             dispatch(showLoader(true))
//             const response = await client.put(`${config.SYSTEM_TROUBLE_SHOOT_API}/UpdateTroubleshoot`, payload)
//             if (response.status === 200) {
//                 dispatch(GetTroubleShootRequest({ dispatch }))
//                 showSnackBar(dispatch, "success", response?.message);
//             } else if (response.status === 409) {
//                 showSnackBar(dispatch, "error", response?.message);
//             } else {
//                 showSnackBar(dispatch, "warning", response?.message);
//                 return response
//             }
//         } catch (error) {
//             if (error?.status === 400)
//                 showSnackBar(dispatch, "error", error?.title);
//             else if (error?.status === 404) {
//                 showSnackBar(dispatch, "error", error?.message);
//             } else if (error?.status === 422) {
//                 showSnackBar(dispatch, "error", error?.message);
//             }
//         } finally {
//             dispatch(showLoader(false))
//         }
//     }
// );

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        // completationData: []
    },
    reducers: {
        setDashboardDetails: (state, action) => {
            state.dashboard = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // .addCase(getEthnicitySiteCampaign.pending, (state) => {
        //     return state;
        // })
        // .addCase(getEthnicitySiteCampaign.fulfilled, (state, actions) => {
        //     return {
        //         ...state,
        //         GetEthnicitySiteCampaign: actions.payload ? actions.payload : []
        //     };
        // })
        // .addCase(getEthnicitySiteCampaign.rejected, (state) => {
        //     return state;
        // })
    },
});

export const { setDashboardDetails } = DashboardSlice.actions;

export default DashboardSlice.reducer;
