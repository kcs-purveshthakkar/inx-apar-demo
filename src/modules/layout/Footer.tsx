import React from "react";

const FooterLayout = () => {
    return (
        <footer className="m-grid__item m-footer ">
            <div className="m-container m-container--fluid m-container--full-height m-page__container">
                <div className="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
                    <div className="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
                        <span className="m-footer__copyright my-3">2021 &copy; Inxeption</span>
                    </div>
                    <div className="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterLayout;
