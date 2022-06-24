import React, { ReactNode } from 'react';
import {
    useRoutes
} from "react-router-dom";
import routes from '../../../routes';
import FooterLayout from './Footer';
import Header from './Header';

const BaseLayout = () => {

    let element = useRoutes(routes);

    return (
        <>
            <div
                style={{ height: '100%' }}
                className='m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'>
                <div className='m-grid m-grid--hor m-grid--root m-page' id='mPage'>
                    <Header />
                    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
                        {element}
                    </div>
                    <FooterLayout />
                </div>
            </div>
        </>
    )
}

export default BaseLayout;
