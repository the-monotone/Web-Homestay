import React from 'react';
import HostHeader from './header/hostheader.component';

export default function HostLayout({styleName, containerStyleName="container-md", children}) {
    return(
      <div className={`d-flex flex-column ${styleName}`}>
        <HostHeader />
        <div className={`main-div mt-1 ${containerStyleName}`}>
          {children}
        </div>
      </div>
    )
  }
