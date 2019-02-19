import React from 'react';
import './index.css';

const Footer = props => {
    return (
        <footer className="footer bg-dark text-white py-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <span className="text-muted"><a className="text-muted" href="http://instaservice.by">instaservice.by</a> © 2019</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
