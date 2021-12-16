import Header from "./header/header.component";
import React from 'react';
import { Footer } from "./footer/footer.component";

export default function Layout({styleName, containerStyleName="container-md", showFooter=true, children}) {
  return(
    <div className={`d-flex flex-column position-relative ${styleName}`}>
      <Header />
      <div className={`${containerStyleName} padding-bottom-footer`}>
        {children}
      </div>
      <Footer isShow={showFooter}/>
    </div>
  )
}