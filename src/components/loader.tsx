import React from 'react';
import './loader.scss';

const Loader = (props: any) => {

    return (
        <>
            {
                props.isLoading &&
                <div className="custom-loader">
                    <div className="loading-block">
                        <svg className="spinner ml-2" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                            <circle className="circle" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                        </svg>
                        <p className="pt-3 h6">Loading...</p>
                    </div>
                </div>
            }
        </>
    );
};

export default Loader;