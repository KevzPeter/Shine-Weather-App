import React from "react";
import {MDBContainer,MDBFooter } from "mdbreact";

export const Footer = () => {
  return (
    <MDBFooter className="font-small">
      <div className="footer text-center py-2">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} <a href="https://kevzpeter.github.io"> kevzpeter.github.io </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
