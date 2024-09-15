import React from 'react'
import VerifierNavbar from '../Navbar/VerifierNavbar';

const VerifierLayout = () => {
    return (
        <>
          <div className="flex h-screen">
             <VerifierNavbar />
             <div className="flex-1 p-7">
            </div>
          </div>
          {/* <Outlet /> */}
        </>
      )
}

export default VerifierLayout
