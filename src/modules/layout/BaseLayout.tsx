import React, { ReactNode } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import routes from '../../routes';
import AparInvoiceDetailSummary from '../invoice/AparInvoiceDetailSummary';
import AparInvoices from '../invoice/AparInvoices';
import Header from './Header';

type Route = {
    element: JSX.Element
}
const BaseLayout = () => {

    return (
        <>
            <div
                style={{ height: '100%' }}
                className='m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
            >
                <div className='m-grid m-grid--hor m-grid--root m-page' id='mPage'>
                    <Header />
                    <AparInvoices />
                    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
                        {/* <Routes> */}
                        {/* {routes.map((route, idx) => {
                                console.log("111", route.element)
                                return route.element ? (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={<route.element />}
                                    >
                                    </Route>
                                ) : undefined;
                            })} */}
                        {/* <Route path="invoice">
                                <Route path=":id" element={<AparInvoiceDetailSummary />} />
                            </Route> */}

                        {/* </Routes> */}
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    )
}

export default BaseLayout;
