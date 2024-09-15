import React from 'react'
import HeadHrNavbar from '../Navbar/HeadHrNavbar'

const HeadHrLayout = () => {
    return (
        <>
          <div className="flex h-screen">
             <HeadHrNavbar />
             <div className="flex-1 p-7">
            </div>
          </div>
          {/* <Outlet /> */}
        </>
      )
}

export default HeadHrLayout
