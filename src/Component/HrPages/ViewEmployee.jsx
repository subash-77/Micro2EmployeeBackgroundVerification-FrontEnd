// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewEmployee = () => {
//   const [records, setRecords] = useState([]);
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const userId = sessionStorage.getItem('userId');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1230/hr/${userId}`)
//       .then((response) => {

//         if (response.data && response.data.onBoardingEmployee) {
//             console.log(JSON.stringify(response.data.onBoardingEmployee,null,2));
//           setRecords(response.data.onBoardingEmployee);
//         } else {
//           console.error('Unexpected response format:', response.data);
//           setError('Unexpected response format.');
//         }
//       })
//       .catch((err) => {
//         console.error('API error:', err);
//         setError('Error fetching data.');
//       });
//   }, [userId]);

//   const getFileDataURL = (base64String) => {
//     if (base64String && typeof base64String === 'string') {
//       // Ensure the Base64 string is properly formatted and valid
//       return `data:application/pdf;base64,${base64String.trim()}`;
//     }
//     return null;
//   };

//   const handleViewClick = (base64String) => {
//     const pdfURL = getFileDataURL(base64String);
//     console.log('Generated PDF URL:', pdfURL); // Check if this URL looks correct
//     if (pdfURL) {
//       setSelectedPdf(pdfURL);
//       setModalIsOpen(true);
//     } else {
//       setError('Invalid PDF data.');
//     }
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setSelectedPdf(null);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error messages */}

//       {records.length > 0 ? (
//         records.map((record) => (
//           <div key={record.onboardingEmployeeId} className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Onboarding Employee ID: {record.onboardingEmployeeId}</h2>
//             <ul>
//               {Object.entries(record).map(([key, value]) =>
//                 key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
//                   <li key={key} className="mb-2">
//                     <a
//                       href={getFileDataURL(value)}
//                       download={`${record.onboardingEmployeeId}_${key}.pdf`}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                     >
//                       Download {key}
//                     </a>
//                     <button
//                       onClick={() => handleViewClick(value)}
//                       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       View {key}
//                     </button>
//                   </li>
//                 ) : null
//               )}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No records found.</p>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={handleCloseModal}
//         contentLabel="PDF Viewer"
//         className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//         overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//       >
//         <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//           {selectedPdf ? (
//             <iframe
//               src={selectedPdf}
//               width="100%"
//               height="100%"
//               style={{ border: 'none' }}
//               title="PDF Viewer"
//             ></iframe>
//           ) : (
//             <p className="text-gray-500">Loading PDF...</p>
//           )}
//           <button
//             onClick={handleCloseModal}
//             className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ViewEmployee;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewEmployee = () => {
//   const [records, setRecords] = useState([]);
//   const [exprecords, expSetRecords] = useState([]);
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const userId = sessionStorage.getItem('userId');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1230/hr/${userId}`)
//       .then((response) => {
//         if (response.data && response.data.onBoardingEmployee) {
//           setRecords(response.data.onBoardingEmployee);
//           expSetRecords(response.data.onBoardingExpEmployee);
//           console.log((response.data.onBoardingExpEmployee));
//         } else {
//           console.error('Unexpected response format:', response.data);
//           setError('Unexpected response format.');
//         }
//       })
//       .catch((err) => {
//         console.error('API error:', err);
//         setError('Error fetching data.');
//       });
//   }, [userId]);

//   const getFileDataURL = (base64String) => {
//     if (base64String && typeof base64String === 'string') {
//       return `data:application/pdf;base64,${base64String.trim()}`;
//     }
//     return null;
//   };

//   const handleViewClick = (base64String) => {
//     const pdfURL = getFileDataURL(base64String);
//     if (pdfURL) {
//       setSelectedPdf(pdfURL);
//       setModalIsOpen(true);
//     } else {
//       setError('Invalid PDF data.');
//     }
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setSelectedPdf(null);
//   };

//   const handleViewDocuments = (record) => {
//     setSelectedDocument(record);
//     setShowDocumentsModal(true);
//   };

//   const handleCloseDocumentsModal = () => {
//     setShowDocumentsModal(false);
//     setSelectedDocument(null);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {records.length > 0 ? (
//         <div>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {records.map((record) => (
//                 <tr key={record.onboardingEmployeeId}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                     <button
//                       onClick={() => handleViewDocuments(record)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       View Documents
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Documents Modal */}
//           <Modal
//             isOpen={showDocumentsModal}
//             onRequestClose={handleCloseDocumentsModal}
//             contentLabel="Documents"
//             className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//             overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//           >
//             <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//               <h2 className="text-xl font-semibold mb-4">Documents</h2>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                     key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
//                       <tr key={key}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                           <a
//                             href={getFileDataURL(value)}
//                             download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                           >
//                             Download
//                           </a>
//                           <button
//                             onClick={() => handleViewClick(value)}
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ) : null
//                   )}
//                 </tbody>
//               </table>
//               <button
//                 onClick={handleCloseDocumentsModal}
//                 className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </Modal>

//           {/* PDF Viewer Modal */}
//           <Modal
//             isOpen={modalIsOpen}
//             onRequestClose={handleCloseModal}
//             contentLabel="PDF Viewer"
//             className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//             overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//           >
//             <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//               {selectedPdf ? (
//                 <iframe
//                   src={selectedPdf}
//                   width="100%"
//                   height="100%"
//                   style={{ border: 'none' }}
//                   title="PDF Viewer"
//                 ></iframe>
//               ) : (
//                 <p className="text-gray-500">Loading PDF...</p>
//               )}
//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </Modal>
//         </div>
//       ) : (
//         <p className="text-gray-500">No records found.</p>
//       )}
//     </div>
//   );
// };

// export default ViewEmployee;

// upto onboarding employee view

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewEmployee = () => {
//   const [records, setRecords] = useState([]);
//   const [expRecords, setExpRecords] = useState([]);
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const userId = sessionStorage.getItem('userId');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1230/hr/${userId}`)
//       .then((response) => {
//         if (response.data) {
//           if (response.data.onBoardingEmployee) {
//             setRecords(response.data.onBoardingEmployee);
//           }
//           if (response.data.onBoardingExpEmployee) {
//             setExpRecords(response.data.onBoardingExpEmployee);
//             console.log(response.data.onBoardingExpEmployee);
//           }
//         } else {
//           console.error('Unexpected response format:', response.data);
//           setError('Unexpected response format.');
//         }
//       })
//       .catch((err) => {
//         console.error('API error:', err);
//         setError('Error fetching data.');
//       });
//   }, [userId]);

//   const getFileDataURL = (base64String) => {
//     if (base64String && typeof base64String === 'string') {
//       return `data:application/pdf;base64,${base64String.trim()}`;
//     }
//     return null;
//   };

//   const handleViewClick = (base64String) => {
//     const pdfURL = getFileDataURL(base64String);
//     if (pdfURL) {
//       setSelectedPdf(pdfURL);
//       setModalIsOpen(true);
//     } else {
//       setError('Invalid PDF data.');
//     }
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setSelectedPdf(null);
//   };

//   const handleViewDocuments = (record) => {
//     setSelectedDocument(record);
//     setShowDocumentsModal(true);
//   };

//   const handleCloseDocumentsModal = () => {
//     setShowDocumentsModal(false);
//     setSelectedDocument(null);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {records.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//           <table className="min-w-full divide-y divide-gray-200 mb-8">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {records.map((record) => (
//                 <tr key={record.onboardingEmployeeId}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                     <button
//                       onClick={() => handleViewDocuments(record)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       View Documents
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {expRecords.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//           <table className="min-w-full divide-y divide-gray-200 mb-8">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {expRecords.map((record) => (
//                 <tr key={record.experienceId}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                     <button
//                       onClick={() => handleViewDocuments(record)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       View Documents
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Documents Modal */}
//       <Modal
//         isOpen={showDocumentsModal}
//         onRequestClose={handleCloseDocumentsModal}
//         contentLabel="Documents"
//         className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//         overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//       >
//         <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//           <h2 className="text-xl font-semibold mb-4">Documents</h2>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                 key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
//                   <tr key={key}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                       <a
//                         href={getFileDataURL(value)}
//                         download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                       >
//                         Download
//                       </a>
//                       <button
//                         onClick={() => handleViewClick(value)}
//                         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ) : null
//               )}
//             </tbody>
//           </table>
//           <button
//             onClick={handleCloseDocumentsModal}
//             className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Close
//           </button>
//         </div>
//       </Modal>

//       {/* PDF Viewer Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={handleCloseModal}
//         contentLabel="PDF Viewer"
//         className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//         overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//       >
//         <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//           {selectedPdf ? (
//             <iframe
//               src={selectedPdf}
//               width="100%"
//               height="100%"
//               style={{ border: 'none' }}
//               title="PDF Viewer"
//             ></iframe>
//           ) : (
//             <p className="text-gray-500">Loading PDF...</p>
//           )}
//           <button
//             onClick={handleCloseModal}
//             className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ViewEmployee;

// upto onboarding employee view and onboardingExp Employee

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set up modal root
Modal.setAppElement('#root');

const ViewEmployee = () => {
    const [records, setRecords] = useState([]);
    const [expRecords, setExpRecords] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
    const [successMessage, setSuccessMessage] = useState(''); // Success message content

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        axios
            .get(`http://localhost:1230/hr/${userId}`)
            .then((response) => {
                if (response.data) {
                    if (response.data.onBoardingEmployee) {
                        setRecords(response.data.onBoardingEmployee);
                    }
                    if (response.data.onBoardingExpEmployee) {
                        setExpRecords(response.data.onBoardingExpEmployee);
                        console.log(response.data.onBoardingExpEmployee);
                    }
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format.');
                }
            })
            .catch((err) => {
                console.error('API error:', err);
                setError('Error fetching data.');
            });
    }, [userId]);

    const getFileDataURL = (base64String) => {
        if (base64String && typeof base64String === 'string') {
            return `data:application/pdf;base64,${base64String.trim()}`;
        }
        return null;
    };

    const handleViewClick = (base64String) => {
        const pdfURL = getFileDataURL(base64String);
        if (pdfURL) {
            setSelectedPdf(pdfURL);
            setModalIsOpen(true);
        } else {
            setError('Invalid PDF data.');
        }
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedPdf(null);
    };

    const handleViewDocuments = (record) => {
        setSelectedDocument(record);
        setShowDocumentsModal(true);
    };

    const handleCloseDocumentsModal = () => {
        setShowDocumentsModal(false);
        setSelectedDocument(null);
    };

    // const handleProceedToVerifyEmployee = (id, type) => {
    //     axios
    //         .post(`http://localhost:1230/hr/updateonboardingemployeeId/${id}`)

    //     console.log(id);
    // };
    // const handleProceedToVerifyExpEmployee = (id, type) => {
    //     // Prepare the API URL and payload based on the type


    //     axios
    //         .post(`http://localhost:1230/hr/updateonboardingexpemployeeId/${id}`)


    //     console.log(id);
    // };
    const handleProceedToVerifyEmployee = (id) => {
        const HRID = sessionStorage.getItem('userId');

        axios
            .post(`http://localhost:1230/hr/updateonboardingemployeeId/${id}`, null, {
                params: { hrId: HRID }
            })
            .then(response => {
                // Handle the successful response here
                // alert("Records Assigned To Head HR");
                setSuccessMessage("Records Assigned To Head HR");
                setShowSuccessModal(true);
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });

        console.log('Request made for employee ID:', id);
    };

    const handleProceedToVerifyExpEmployee = (id) => {
        const HRID = sessionStorage.getItem('userId');

        axios
            .post(`http://localhost:1230/hr/updateonboardingexpemployeeId/${id}`, null, {
                params: { hrId: HRID }
            })
            .then(response => {
                // Handle the successful response here
                // alert("Records Assigned To Head HR");
                setSuccessMessage("Records Assigned To Head HR");
                setShowSuccessModal(true);
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });

        console.log('Request made for exp employee ID:', id);
    };



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View Employee</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {records.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Employees Records</h2>
                    <table className="min-w-full divide-y divide-gray-200 mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record) => (
                                <tr key={record.onboardingEmployeeId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <button
                                            onClick={() => handleViewDocuments(record)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                        >
                                            View Documents
                                        </button>
                                        <button
                                            onClick={() => handleProceedToVerifyEmployee(record.onboardingEmployeeId, 'employee')}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Proceed to Verify
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {expRecords.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Experience Employees Records</h2>
                    <table className="min-w-full divide-y divide-gray-200 mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expRecords.map((record) => (
                                <tr key={record.experienceId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <button
                                            onClick={() => handleViewDocuments(record)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                        >
                                            View Documents
                                        </button>
                                        <button
                                            onClick={() => handleProceedToVerifyExpEmployee(record.onboardingExpEmployeeId, 'experience')}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Proceed to Verify
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Documents Modal */}
            <Modal
                isOpen={showDocumentsModal}
                onRequestClose={handleCloseDocumentsModal}
                contentLabel="Documents"
                className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
            >
                <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4">Documents</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(selectedDocument || {}).map(([key, value]) =>
                                key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
                                    <tr key={key}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            <a
                                                href={getFileDataURL(value)}
                                                download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                            >
                                                Download
                                            </a>
                                            <button
                                                onClick={() => handleViewClick(value)}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </table>
                    <button
                        onClick={handleCloseDocumentsModal}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* PDF Viewer Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="PDF Viewer"
                className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
            >
                <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                    {selectedPdf ? (
                        <iframe
                            src={selectedPdf}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                        ></iframe>
                    ) : (
                        <p className="text-gray-500">Loading PDF...</p>
                    )}
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>
            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onRequestClose={() => setShowSuccessModal(false)}
                contentLabel="Success"
                className="absolute inset-0 flex items-center justify-center p-4 border-gray-300"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
            >
                <div className="relative w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Success</h2>
                    <p className="text-gray-700 mb-4">{successMessage}</p>
                    <button
                        onClick={() => setShowSuccessModal(false)}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default ViewEmployee;
