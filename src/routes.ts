import AparInvoiceDetailSummary from "./modules/invoice/AparInvoiceDetailSummary";
import AparInvoices from "./modules/invoice/AparInvoices";



const routes = [
    {
        path: "/",
        icon: "flaticon-list-2",
        name: "Apar Invoices",
        element: AparInvoices,
    },
    {
        path: "/invoice-detail/:id",
        icon: "flaticon-list-2",
        name: "Invoice Detail",
        element: AparInvoiceDetailSummary,
    }
];

export default routes;