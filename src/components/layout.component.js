import Header from "./header/header.component";
import React from 'react';
import { Outlet } from "react-router";

export default function Layout({children}) {
  return(
    <>
      <Header />
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  )
}