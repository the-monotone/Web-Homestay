import Header from "./header/header.component";
import React from 'react';
import { Footer } from "./footer/footer.component";

export default function Layout({styleName, containerStyleName="container-md", showFooter=true, children}) {
  return(
    <div className={`d-flex flex-column ${styleName}`}>
      <Header />
      <div className={`${containerStyleName} main-div pb-4`}>
        {children}
      </div>
      <Footer isShow={showFooter}/>
    </div>
  )
}