import React from 'react'
import HeadAgentNavbar from '../Navbar/HeadAgentNavbar'

const HeadAgentLayout = () => {
    return (
        <>
          <div className="flex h-screen">
             <HeadAgentNavbar />
             <div className="flex-1 p-7">
            </div>
          </div>
          {/* <Outlet /> */}
        </>
      )
}

export default HeadAgentLayout
