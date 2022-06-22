import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AparInvoiceDetailSummary from "./modules/invoice/AparInvoiceDetailSummary";
import AparInvoices from "./modules/invoice/AparInvoices";
import BaseLayout from "./modules/layout/BaseLayout";
import "./assets/App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />} />
          <Route path="/invoice-detail/:id" element={<AparInvoiceDetailSummary />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
