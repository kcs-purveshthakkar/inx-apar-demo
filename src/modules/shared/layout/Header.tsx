import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

const Header = () => {


    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <header
                className="m-grid__item m-header d-flex"
                data-minimize-mobile="hide"
                data-minimize-offset="200"
                data-minimize-mobile-offset="200"
                data-minimize="minimize"
            >
                <div className="logo-wrap d-flex align-items-center">
                    <Link to="#">
                        <img alt="" src={"/images/dashboard-logo.png"} />
                    </Link>
                </div>
                <div className="pageTitle flex-fill"></div>
                <div className="searchWrap d-flex align-items-center">
                    <div className="searchbox"></div>
                </div>

                {/* <div
                    className="d-flex justify-content-end flex-fill topbar-icons mr-3"
                    id="m_header_nav"
                >
                    <ul className="m-topbar__nav m-nav m-nav--inline d-flex align-items-center">
                        <li
                            className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width"
                            data-dropdown-toggle="click"
                            data-dropdown-persistent="true"
                        >
                            <a
                                href="!#"
                                // onClick={onNotificationRead}
                                className="m-nav__link m-dropdown__toggle"
                                id="m_topbar_notification_icon"
                            >
                                <span className="m-nav__link-icon">
                                    <i className="flaticon-music-2"></i>

                                </span>
                            </a>
                            <div className="m-dropdown__wrapper">
                                <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                                <div className="m-dropdown__inner">
                                    <div className="m-dropdown__header m--align-center">
                                        <span className="m-dropdown__header-subtitle">
                                            Shipment Notifications
                                        </span>
                                    </div>
                                    <div className="m-dropdown__body">
                                        <div className="m-dropdown__content">
                                            <div className="tab-content">
                                                <div
                                                    className="tab-pane active"
                                                    id="topbar_notifications_notifications"
                                                    role="tabpanel"
                                                >
                                                    <div
                                                        className="m-scrollable mCustomScrollbar _mCS_2 mCS-autoHide mCS_no_scrollbar"
                                                        data-scrollable="true"
                                                        data-max-height="250"
                                                        data-mobile-max-height="200"
                                                        style={{
                                                            height: "250px",
                                                            position: "relative",
                                                            overflow: "visible",
                                                        }}
                                                    >
                                                        <div
                                                            id="mCSB_2"
                                                            className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
                                                        //   tabIndex="0"
                                                        >
                                                            <div
                                                                id="mCSB_2_container"
                                                                className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                                                                style={{
                                                                    position: "relative",
                                                                    top: "0",
                                                                    left: "0",
                                                                }}
                                                                dir="ltr"
                                                            >
                                                                <div className="m-list-timeline m-list-timeline--skin-light">
                                                                    <div className="m-list-timeline__items">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="mCSB_2_scrollbar_vertical"
                                                            className="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
                                                            style={{ display: "none" }}
                                                        >
                                                            <div className="mCSB_draggerContainer">
                                                                <div
                                                                    id="mCSB_2_dragger_vertical"
                                                                    className="mCSB_dragger"
                                                                    style={{
                                                                        position: "absolute",
                                                                        minHeight: "50px",
                                                                        top: "0px",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="mCSB_dragger_bar"
                                                                        style={{ lineHeight: "50px" }}
                                                                    ></div>
                                                                </div>
                                                                <div className="mCSB_draggerRail"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div> */}
                <div className="userwrap d-flex justify-content-end" id="m_header_nav">
                    <div className="d-flex align-items-center">
                        <ul className="d-flex align-items-center">
                            <li
                                className="m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light"
                                data-dropdown-toggle="click"
                            >
                                <a href="#x" className="m-nav__link m-dropdown__toggle">
                                    <span className="m-topbar__username">Demo User</span>
                                    <span className="m-nav__link-icon">
                                        <i className="fa fa-user-o"></i>
                                    </span>
                                    <span>
                                        <i className="la la-angle-down"></i>
                                    </span>
                                </a>
                                <div className="m-dropdown__wrapper">
                                    <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                                    <div className="m-dropdown__inner">
                                        <div className="m-dropdown__header m--align-center">
                                            <div className="m-card-user m-card-user--skin-dark">
                                                <div className="m-card-user__pic">
                                                    <NavLink
                                                        to="/"
                                                        className="m-nav__link text-decoration-none d-block mx-0"
                                                        style={{ color: "#ffffff" }}
                                                    >
                                                        <img
                                                            src="/images/avtar.png"
                                                            className="m--img-rounded m--marginless"
                                                            alt=""
                                                        />
                                                    </NavLink>
                                                </div>
                                                <div className="m-card-user__details">
                                                    <span className="m-card-user__name m--font-weight-500">
                                                        Demo User
                                                    </span>
                                                    {/*  <span className="m-card-user__name m--font-weight-500 mt-2">
                                                        <NavLink
                                                            to="#"
                                                            className="m-nav__link text-decoration-none d-block mx-0"
                                                            style={{ color: "#000000" }}

                                                        >
                                                            Change Password
                                                        </NavLink>
                                                    </span> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/*  <div className="m-dropdown__body">
                                            <div className="m-dropdown__content">
                                                <ul className="m-nav m-nav--skin-light">
                                                    <li className="m-nav__section m--hide">
                                                        <span className="m-nav__section-text">Section</span>
                                                    </li>
                                                    <li className="m-nav__item">
                                                        Users
                                                        {<a
                                                            href="#x"
                                                            className="btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder"
                                                        >
                                                            Logout
                                                        </a>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
