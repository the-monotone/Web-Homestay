import Header from "./header/header.component";
import React from 'react';
import { Footer } from "./footer/footer.component";

export default function Layout({styleName, containerStyleName="container-md", children}) {
  return(
    <div className={`d-flex flex-column ${styleName}`}>
      <Header />
      <div className={`${containerStyleName} pb-4`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}