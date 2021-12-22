import Header from "./header/header.component";
import React from 'react';
import { Footer } from "./footer/footer.component";
import "../index.css";

export default function Layout({styleName="", containerStyleName="container-md", showFooter=true, children}) {

  return(
    <div className={`d-flex flex-column position-relative ${styleName}`}>
      <Header />
      <div className={`${containerStyleName} main-div`}>
        {children}
      </div>
      <Footer isShow={showFooter}/>
    </div>
  )
}