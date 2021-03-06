import React from 'react';
import HostHeader from './header/hostheader.component';
import {Footer} from './footer/footer.component';

export default function HostLayout({styleName='', containerStyleName="container-md", children}) {
    return(
      <div className={`d-flex flex-column position-relative ${styleName}`}>
        <HostHeader />
        <div className={`row w-100 gx-0 `}>
          {children}
        </div>
        <Footer/>
      </div>
    )
  }
