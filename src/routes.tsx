import AparInvoiceDetailSummary from "./modules/invoice/InvoiceDetailSummary";
import AparInvoices from "./modules/invoice/InvoiceTable";
import {
    RouteObject
} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <AparInvoices />,
    },
    {
        path: "/invoice-detail/:id",
        element: <AparInvoiceDetailSummary />
    }

];

export default routes;