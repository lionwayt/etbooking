import React from "react";

const Footer = () =>{
    return(
        <footer>
            <div className="nav">
            <div className="footerContainer">
                <div className="line"><button>List Your Property</button></div>
                <div className="footerList">
                    <div className="listItem">
                    <span>Terms & conditions</span>
                    </div>
                    <div className="listItem">
                    <span>How we work</span>
                    </div>
                    <div className="listItem">
                    <span>Privacy & Cookies</span>
                    </div>
                    <div className="listItem">
                    <span>About Booking.com</span>
                    </div>
                    
                </div>
    <div className="copyright">
            Copyright &copy;  1996-2022   Booking.com  .All rights reserved. 
    </div>
    </div>
    </div>
        </footer>
    );
}
export default Footer;