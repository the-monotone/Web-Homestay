import Header from "./header/header.component";
import React from 'react';

export default function Layout({styleName, containerStyleName="container-md", children}) {
  return(
    <div className={`d-flex flex-column ${styleName}`}>
      <Header />
      <div className={`main-div mt-1 ${containerStyleName}`}>
        {children}
      </div>
    </div>
  )
}