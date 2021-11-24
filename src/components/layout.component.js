import Header from "./header/header.component";
import React from 'react';

export default function Layout({children}) {
  return(
    <>
      <Header />
      <div className="container mt-5">
        {children}
      </div>
    </>
  )
}