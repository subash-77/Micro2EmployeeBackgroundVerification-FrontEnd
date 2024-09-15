import React from 'react'

import HrNavbar from '../Navbar/HrNavbar';

const HrLayout = () => {
    return (
        <>
          <div className="flex h-screen">
             <HrNavbar />
             <div className="flex-1 p-7">
            </div>
          </div>
          {/* <Outlet /> */}
        </>
      )
    
}

export default HrLayout
