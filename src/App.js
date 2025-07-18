import React from "react";
import './App.css';
import router from "./routes/index";
import { useRoutes } from "react-router-dom";
import Notification from "./components/common/Notification";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state?.loading?.show)

  const routes = useRoutes(router)

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production')
      console.log = function () { };
  }, [])

  return (<>
    <Notification />
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <React.Suspense
      fallback={
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      {
        routes
      }
    </React.Suspense>
  </>);
}

export default App;
