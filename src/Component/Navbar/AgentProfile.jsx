// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AgentProfile = ({ isOpen, onClose, profile }) => {
//   const [formData, setFormData] = useState({
//     userId: '',
//     userName: '',
//     email: '',
//     password: '',
//   });
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         userId: profile.userId || '',
//         userName: profile.userName || '',
//         email: profile.email || '',
//         password: profile.password || '', 
//       });
//       setOldPassword('');
//       setNewPassword('');
//       setConfirmNewPassword('');
//       setIsEditing(false);
//       setIsOldPasswordVerified(false);
//       setErrorMessage('');
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'oldPassword') {
//       setOldPassword(value);
//     } else if (name === 'newPassword') {
//       setNewPassword(value);
//     } else if (name === 'confirmNewPassword') {
//       setConfirmNewPassword(value);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleVerifyOldPassword = () => {
//     if (oldPassword === formData.password) {
//       setIsOldPasswordVerified(true);
//       setErrorMessage('');
//     } else {
//       setIsOldPasswordVerified(false);
//       setErrorMessage('Old password is incorrect');
//     }
//   };

//   const handleUpdate = () => {
//     if (newPassword !== confirmNewPassword) {
//       setErrorMessage('New passwords do not match');
//       return;
//     }

//     if (!isOldPasswordVerified) {
//       setErrorMessage('Please verify your old password');
//       return;
//     }

//     // Update user profile with new password
//     axios.post(`http://localhost:1230/register/Update`, {
//       ...formData,
//       password: newPassword || formData.password, 
//     })
//       .then((response) => {
//         alert('Profile updated successfully');
//         onClose(); 
//       })
//       .catch((error) => {
//         console.error('Error updating profile', error);
//         alert('Failed to update profile');
//       });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               name="userName"
//               value={formData.userName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded p-2"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded p-2"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Current Password</label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={formData.password}
//               disabled={true}
//               className="w-full border border-gray-300 rounded p-2"
//             />
//           </div>
//           {isEditing && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Old Password</label>
//                 <input
//                   type="password"
//                   name="oldPassword"
//                   value={oldPassword}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded p-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleVerifyOldPassword}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                   Verify Old Password
//                 </button>
//               </div>
//               {isOldPasswordVerified && (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">New Password</label>
//                     <input
//                       type="password"
//                       name="newPassword"
//                       value={newPassword}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded p-2"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Confirm New Password</label>
//                     <input
//                       type="password"
//                       name="confirmNewPassword"
//                       value={confirmNewPassword}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded p-2"
//                     />
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//           {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//           <div className="flex justify-between">
//             {!isEditing ? (
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleUpdate}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Update
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AgentProfile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentProfile = ({ isOpen, onClose, profile }) => {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    email: '',
    password: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        userId: profile.userId || '',
        userName: profile.userName || '',
        email: profile.email || '',
        password: profile.password || '', 
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsEditing(false);
      setIsOldPasswordVerified(false);
      setErrorMessage('');
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmNewPassword') {
      setConfirmNewPassword(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleVerifyOldPassword = () => {
    if (oldPassword === formData.password) {
      setIsOldPasswordVerified(true);
      setErrorMessage('');
    } else {
      setIsOldPasswordVerified(false);
      setErrorMessage('Old password is incorrect');
    }
  };

  const handleUpdate = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    if (newPassword === formData.password) {
      setErrorMessage('New password cannot be the same as the old password');
      return;
    }

    if (!isOldPasswordVerified) {
      setErrorMessage('Please verify your old password');
      return;
    }

    // Update user profile with new password
    axios.post(`http://localhost:1230/register/Update`, {
      ...formData,
      password: newPassword || formData.password, 
    })
      .then((response) => {
        alert('Profile updated successfully');
        onClose(); 
      })
      .catch((error) => {
        console.error('Error updating profile', error);
        alert('Failed to update profile');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.password}
              disabled={true}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          {isEditing && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
                <button
                  type="button"
                  onClick={handleVerifyOldPassword}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Verify Old Password
                </button>
              </div>
              {isOldPasswordVerified && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </>
              )}
            </>
          )}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="flex justify-between">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentProfile;
