import {
  BrowserRouter,
} from "react-router-dom";
import BaseLayout from "./modules/shared/layout/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/App.scss";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        // hideProgressBar={true}
        closeOnClick={true}
        pauseOnFocusLoss
        pauseOnHover
      />
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
