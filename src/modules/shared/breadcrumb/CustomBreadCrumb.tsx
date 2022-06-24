import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const CustomBreadCrumb = ({ breadCrumbItems }: any) => {
    return (
        <>
            <ul className="m-subheader__breadcrumbs m-nav m-nav--inline">
                <li className="m-nav__item m-nav__item--home">
                    <NavLink to="/" className="m-nav__link m-nav__link--icon">
                        <i className="m-nav__link-icon la la-home"></i>
                    </NavLink>
                </li>
                {breadCrumbItems?.map((item: any, i: any) => {
                    return (
                        <Fragment key={i}>
                            <li className="m-nav__separator">/</li>
                            <li className="m-nav__item">
                                {
                                    !!item?.link ? (
                                        <NavLink to={item?.link} className="m-nav__link">
                                            <span className={`${item.classData ? "m-nav__link-text__m" : "m-nav__link-text"}`}>{item?.title}</span>
                                        </NavLink>
                                    ) : (
                                        <span className="m-nav__link">
                                            <span className={`${item.classData ? "m-nav__link-text__m" : "m-nav__link-text"}`}>{item?.title}</span>
                                        </span>
                                    )
                                }
                            </li>
                        </Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default CustomBreadCrumb;
