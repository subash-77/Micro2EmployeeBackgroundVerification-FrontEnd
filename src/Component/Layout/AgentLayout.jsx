import React from 'react'

import AgentNavbar from '../Navbar/AgentNavbar';
const AgentLayout = () => {
    return (
        <>
          <div className="flex h-screen">
             <AgentNavbar />
             <div className="flex-1 p-7">
            </div>
          </div>
          {/* <Outlet /> */}
        </>
      )
}

export default AgentLayout
