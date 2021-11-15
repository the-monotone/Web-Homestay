import Header from "./header/header.component";
import React from 'react';

export default function Layout({children}) {
  return(
    <>
      <Header />
      <main className="container">
        {children}
      </main>
    </>
  )
}