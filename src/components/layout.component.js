import Header from "./header/header.component";
import React from 'react';

export default function Layout({children}) {
  return(
    <>
      <Header />
      <main className="container mt-3">
        {children}
      </main>
    </>
  )
}