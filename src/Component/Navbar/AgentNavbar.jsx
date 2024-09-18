// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import axios from "axios"; 


// const Modal = ({ isOpen, onClose, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <p className="mt-4">{message}</p>
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             OK
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const HeadAgentNavbar = () => {
//   const [open, setOpen] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [profile, setProfile] = useState(null); 
//   const [showProfileModal, setShowProfileModal] = useState(false); 
//   const navigate = useNavigate();

//   const Menus = [
//     { title: "View Records To Verify", src: "Chart", alt: "inbox_image", path: "/viewrecordstoverify" },
//     { title: "Records Status", src: "User", alt: "account_image", path: "/agentrecordstatus" },
//     { title: "Reference Check", src: "User", alt: "account_image", path: "/referencecheck" },
//   ];

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");

//     if (token) {
//       const decodedToken = decodeToken(token);
//       if (decodedToken.exp * 1000 < Date.now()) {
//         handleLogout();
//       } else {
//         setIsLoggedIn(true);
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//     // navigate('/dashboard');
//   }, []);

//   const decodeToken = (token) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch (e) {
//       return {};
//     }
//   };

//   useEffect(() => {
//     const id = sessionStorage.getItem('userId');
//     if (id) {
//       axios.get(`http://localhost:1230/register/${id}`)
//         .then((response) => {
//             console.log(response.data);
//           setProfile(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("role");
//     setIsTokenValid(false);
//     setModalMessage("Successfully Logout - Session Expired");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     navigate('/');
//   };

//   const openProfileModal = () => {
//     setShowProfileModal(true);
//   };

//   const closeProfileModal = () => {
//     setShowProfileModal(false);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <div className={`w-${open ? "72" : "20"} bg-dark-purple h-full p-5 pt-8 relative duration-300`}>
//         <img
//           src="./control.png"
//           alt="control_image"
//           className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full transition-transform duration-300 ${
//             !open && "rotate-180"
//           }`}
//           onClick={() => setOpen(!open)}
//         />
//         <div className="flex gap-x-4 items-center">
//           <h1
//             className={`text-white origin-left font-medium text-xl transition-transform duration-300 ${
//               !open && "scale-0"
//             }`}
//           >
//             Agent
//           </h1>
//         </div>
//         <ul className="pt-6">
//           {Menus.map((Menu, index) => (
//             <li
//               key={index}
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
//                 index === 0 && "bg-light-white"
//               }`}
//             >
//               <Link to={Menu.path} className="flex items-center gap-x-4">
//                 <img src={`./${Menu.src}.png`} alt={`${Menu.alt}`} />
//                 <span className={`${!open && "hidden"} origin-left transition-transform duration-300`}>
//                   {Menu.title}
//                 </span>
//               </Link>
//             </li>
//           ))}
//           <Link className="flex items-center gap-x-4 mt-10 p-2.5">
//             <FaSignOutAlt size={24} className="text-gray-300 size-5" onClick={handleLogout}/>
//             <span className={`${!open && "hidden"} origin-left transition-transform duration-300 text-gray-300`} onClick={handleLogout}>
//               Logout
//             </span>
//           </Link>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <div className={`fixed top-0 left-${open ? "72" : "20"} right-0 bg-dark-purple text-white flex items-center justify-end px-6 py-4`}>
//           <div className="flex items-center space-x-6">
//             <FaBell className="text-xl cursor-pointer" />
//             <div className="relative">
//               <FaUser
//                 className="text-xl cursor-pointer"
//                 onClick={() => setProfileOpen(!profileOpen)}
//               />
//               {profileOpen && (
//                 <div className="absolute top-full right-0 bg-dark-purple text-white border border-gray-200 rounded-lg shadow-lg w-48 mt-2">
//                   <ul className="py-2">
//                     <li
//                       className="px-4 py-2 hover:bg-light-gray cursor-pointer"
//                       onClick={openProfileModal}
//                     >
//                       View Profile
//                     </li>
//                     <li className="px-4 py-2 hover:bg-light-gray cursor-pointer" onClick={handleLogout}>
//                       Logout
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               <IoIosArrowDown
//                 className={`absolute top-2 left-6 transition-transform duration-300 ${profileOpen && "rotate-180"}`}
//                 size={16}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Rendered Content Area */}
//         <main className="flex-1 overflow-auto mt-16">
//           <Outlet />
//         </main>
//       </div>

//       {/* Modal Components */}
      
//       <Modal isOpen={showModal} onClose={closeModal} message={modalMessage} />
//     </div>
//   );
// };

// export default HeadAgentNavbar;
//-------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Toast from './Toast';
import ProfileModal from './AgentProfile';  // Import the ProfileModal component

const HeadAgentNavbar = () => {
    const [records, setRecords] = useState([]);
    const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
    const [expRecords, setExpRecords] = useState([]);
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [profile, setProfile] = useState(null); 
  const [showProfileModal, setShowProfileModal] = useState(false); 
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  const Menus = [
    { title: "View Records To Verify", src: "Chart", alt: "inbox_image", path: "/viewrecordstoverify" },
    { title: "Records Status", src: "User", alt: "account_image", path: "/agentrecordstatus" },
    // { title: "Reference Check", src: "User", alt: "account_image", path: "/referencecheck" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
    navigate('/viewrecordstoverify');
  }, []);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return {};
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    if (id) {
      axios.get(`http://localhost:1230/register/${id}`)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsTokenValid(false);
    setModalMessage("Successfully Logout - Session Expired");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    // Fetch onboarding employee records
    fetchRecords();
    // Fetch agent records
    // fetchAgents();
}, []);

const fetchRecords = () => {
    fetch('http://localhost:1230/agent/allAgentOnBoardingEmployee')
        .then(response => response.json())
        .then(data => {
            setRecords(data);
            const approvedCount = data.filter(record => record.schoolStatus === 'Approved' || record.collegeStatus === 'Approved').length;
            if (approvedCount > 0) {
                setNotificationCount(prevCount => prevCount + approvedCount);
                setToastMessage(`You have ${approvedCount} new notifications!`);
                setShowToast(true);
            }
            console.log(data);
        })
        .catch(err => {
            console.error('API error:', err);
            //setError('Error fetching records.');
        });

    fetch('http://localhost:1230/agent/allAgentOnBoardingExpEmployee')
        .then(response => response.json())
        .then(data => {
            setExpRecords(data);
            const approvedCount = data.filter(record => record.schoolStatus === 'Approved' || record.collegeStatus === 'Approved').length;
            if (approvedCount > 0) {
                setNotificationCount(prevCount => prevCount + approvedCount);
                setToastMessage(`You have ${approvedCount} new notifications!`);
                setShowToast(true);
            }
            console.log(data);
        })
        .catch(err => {
            console.error('API error:', err);
            //setError('Error fetching records.');
        });
};
const handleToastClose = () => {
    setShowToast(false);
};
const handleBellClick = () => {
    navigate('/agentrecordstatus');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`w-${open ? "72" : "20"} bg-dark-purple h-full p-5 pt-8 relative duration-300`}>
        <img
          src="./control.png"
          alt="control_image"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full transition-transform duration-300 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
        <img src="agentLogo.png" className={`cursor-pointer w-10 duration-500 ${
                open && "rotate-[360deg]"
            } `}/>
          <h1 className={`text-white origin-left font-medium text-xl transition-transform duration-300 ${!open && "scale-0"}`}>
            Agent
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${index === 0 && "bg-light-white"}`}>
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <img src={`./${Menu.src}.png`} alt={`${Menu.alt}`} />
                <span className={`${!open && "hidden"} origin-left transition-transform duration-300`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
          <Link className="flex items-center gap-x-4 mt-10 p-2.5">
            <FaSignOutAlt size={24} className="text-gray-300 size-5" onClick={handleLogout} />
            <span className={`${!open && "hidden"} origin-left transition-transform duration-300 text-gray-300`} onClick={handleLogout}>
              Logout
            </span>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`fixed top-0 left-${open ? "72" : "20"} right-0 bg-dark-purple text-white flex items-center justify-end px-6 py-4`}>
          <div className="flex items-center space-x-6">
            <FaBell 
             className="text-xl cursor-pointer"
             onClick={handleBellClick} />
             {/*  */}
            <div className="relative">
              <FaUser
                className="text-xl cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute top-full right-0 bg-dark-purple text-white border border-gray-200 rounded-lg shadow-lg w-48 mt-2">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-light-gray cursor-pointer"
                      onClick={openProfileModal}
                    >
                      View Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-light-gray cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              <IoIosArrowDown
                className={`absolute top-2 left-6 transition-transform duration-300 ${profileOpen && "rotate-180"}`}
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Rendered Content Area */}
        <main className="flex-1 overflow-auto mt-16 ml-28">
          <Outlet />
        </main>
      </div>

      {/* Modal Components */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        profile={profile}
      />
      {/* <Modal isOpen={showModal} onClose={closeModal} message={modalMessage} /> */}

      {showToast && (
    <Toast
        message={toastMessage}
        onClose={handleToastClose}
    />
)}
    </div>
  );
};

export default HeadAgentNavbar;
