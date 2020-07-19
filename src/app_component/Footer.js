import React from "react";
import {MDBContainer,MDBFooter } from "mdbreact";

export const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} <a href="https://kevzpeter.github.io"> kevzpeter.github.io </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
