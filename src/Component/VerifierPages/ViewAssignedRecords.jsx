// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [agent, setAgent] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [selectedAgentId, setSelectedAgentId] = useState('');
//     const [assigningId, setAssigningId] = useState(null);
//     const [assigningType, setAssigningType] = useState('');
//     const [loading, setLoading] = useState(false); // State for loader
//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         // Fetch onboarding employee records
//         fetchRecords();
//         // Fetch agent records
//         // fetchAgents();
//     }, [userId]);

//     // Update the fetchRecords function
//     const fetchRecords = async () => {
//         const agentId = sessionStorage.getItem('userId');

//         try {
//             // Fetch onboarding employee records
//             const response = await axios.get(`http://localhost:1230/verifier/getAllEmployee`);
//             setRecords(response.data);
//             console.log(response.data);

//             // Fetch experience employee records
//             const expResponse = await axios.get(`http://localhost:1230/verifier/getAllExpEmployee`);
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };


//     // const fetchAgents = () => {
//     //     fetch('http://localhost:1230/agent/GetAllSubAgentByRole')
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             setAgent(data);
//     //             console.log(JSON.stringify(data, null, 2));
//     //         })
//     //         .catch(error => console.error('Error fetching Agent records:', error));
//     // };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record) => {
//         setSelectedDocument(record);
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//     };

//     const openAssignModal = (id, type) => {
//         setAssigningId(id);
//         setAssigningType(type);
//         setModalIsOpen(true);
//     };

//     const sendToVerifier = async (recordId, type) => {
//         setLoading(true); // Show loader

//         try {
//             let url;
//             if (type === 'employee') {
//                 console.log(recordId);
//                 url = `http://localhost:1230/agent/sendEmployeeToVerifier?recordId=${recordId}`;
//             } else if (type === 'experience') {
//                 console.log(recordId);
//                 url = `http://localhost:1230/agent/sendExperienceToVerifier?recordId=${recordId}`;
//             } else {
//                 throw new Error('Invalid type provided');
//             }

//             const response = await axios.post(url);
//             if (response.status === 200) {
//                 alert('Record sent to verifier successfully.');
//             } else {
//                 alert('Failed to send record to verifier.');
//             }
//         } catch (error) {
//             console.error('Error sending record to verifier:', error);
//             alert('An error occurred while sending the record to verifier.');
//         } finally {
//             setLoading(false); // Hide loader
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         <button
//                                             onClick={() => sendToVerifier(record.onboardingEmployeeId, 'employee')}
//                                             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                                         >
//                                             Send to Verifier
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         <button
//                                             onClick={() => sendToVerifier(record.onboardingExpEmployeeId, 'experience')}
//                                             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                                         >
//                                             Send to Verifier
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Documents Modal */}
//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                 key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* PDF Viewer Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* Loader */}
//             {loading && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//                     <div className="text-white text-lg">Loading...</div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewAssignedRecords;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [VerifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [userId] = useState(sessionStorage.getItem('userId'));

//     useEffect(() => {
//         // Fetch onboarding employee records
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     // Update the fetchRecords function
//     const fetchRecords = async () => {
//         try {
//             // Fetch onboarding employee records
//             const response = await axios.get(`http://localhost:1230/verifier/getAllEmployee`);
//             setRecords(response.data);
//             console.log(response.data);

//             // Fetch experience employee records
//             const expResponse = await axios.get(`http://localhost:1230/verifier/getAllExpEmployee`);
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {

//         try {
//             // Fetch onboarding employee records
//             const response = await axios.get(`http://localhost:1230/verifier/getAllVerifyResource`);
//             setVerifyRecords(response.data);
//             console.log("Ivanthanda athu");
//             console.log(response.data);

//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     }

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record) => {
//         setSelectedDocument(record);
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Documents Modal */}
//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                 key.startsWith('resume') || key.startsWith('education') || key.startsWith('sem') || key.startsWith('drivingLicense') || key.startsWith('aadhaar') ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* PDF Viewer Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default ViewAssignedRecords;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [verifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [verificationStatus, setVerificationStatus] = useState({});
//     const [userId] = useState(sessionStorage.getItem('userId'));

//     useEffect(() => {
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     const fetchRecords = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
//             setRecords(response.data);
//             console.log(response.data);

//             const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
//             setVerifyRecords(response.data);
//             console.log(response.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record) => {
//         setSelectedDocument(record);
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//     };

//     const handleVerifyRecord = (record) => {
//         const verifyData = verifyRecords.find(v => v.id === record.id);

//         if (verifyData) {
//             const status = {};
//             const fields = [
//                 'resume', 'educationTenth', 'educationTwelth',
//                 'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
//                 'drivingLicense', 'aadhaar'
//             ];

//             fields.forEach(field => {
//                 if (verifyData[field] && record[field]) {
//                     status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
//                 } else {
//                     status[field] = '❓';
//                 }
//             });

//             setVerificationStatus(status);
//         } else {
//             setError('No verification data found.');
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         <button
//                                             onClick={() => handleVerifyRecord(record)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Verify
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         <button
//                                             onClick={() => handleVerifyRecord(record)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Verify
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Documents Modal */}
//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                  key.startsWith('education') || key.startsWith('sem')  ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {verificationStatus[key] || '❓'}
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* PDF Viewer Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default ViewAssignedRecords;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [verifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [verificationStatus, setVerificationStatus] = useState({});
//     const [userId] = useState(sessionStorage.getItem('userId'));

//     useEffect(() => {
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     const fetchRecords = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
//             setRecords(response.data);
//             console.log(response.data);

//             const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
//             setVerifyRecords(response.data);
//             console.log(response.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record) => {
//         setSelectedDocument(record);
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//     };

//     const handleVerifyRecord = (record) => {
//         const verifyData = verifyRecords.find(v => v.id === record.id);

//         if (verifyData) {
//             const status = {};
//             const fields = [
//                 'resume', 'educationTenth', 'educationTwelth',
//                 'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
//                 'drivingLicense', 'aadhaar'
//             ];

//             fields.forEach(field => {
//                 if (verifyData[field] && record[field]) {
//                     status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
//                 } else {
//                     status[field] = '❓';
//                 }
//             });

//             setVerificationStatus(status);
//         } else {
//             setError('No verification data found.');
//         }
//     };

//     const handleVerifyAll = () => {
//         records.forEach(record => handleVerifyRecord(record));
//         expRecords.forEach(record => handleVerifyRecord(record));
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             {/* Common Verify Button */}
//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={handleVerifyAll}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                     Verify All
//                 </button>
//             </div>

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         {/* <button
//                                             onClick={() => handleVerifyRecord(record)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Verify
//                                         </button> */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                         {/* <button
//                                             onClick={() => handleVerifyRecord(record)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Verify
//                                         </button> */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Documents Modal */}
//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                  key.startsWith('education') || key.startsWith('sem')  ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {verificationStatus[key] || '❓'}
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* PDF Viewer Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default ViewAssignedRecords;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [verifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [verificationStatus, setVerificationStatus] = useState({});
//     const [reportContent, setReportContent] = useState('');
//     const [userId] = useState(sessionStorage.getItem('userId'));

//     useEffect(() => {
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     const fetchRecords = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
//             setRecords(response.data);
//             console.log(response.data);

//             const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
//             setVerifyRecords(response.data);
//             console.log(response.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record) => {
//         setSelectedDocument(record);
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//     };

//     const handleGenerateReport = () => {
//         setShowReportModal(true);
//     };

//     const handleCloseReportModal = () => {
//         setShowReportModal(false);
//         setReportContent('');
//     };

//     const handleSubmitReport = async () => {
//         try {
//             const reportData = {
//                 content: reportContent,
//                 documentId: selectedDocument ? selectedDocument.agentOnboardingEmployeeId || selectedDocument.agentOnboardingExpEmployeeId : null,
//                 hrId: selectedDocument.hrId
//             };

//             console.log(JSON.stringify(reportData,null,2));

//             await axios.post('http://localhost:1230/verifier/generateReport', reportData);
//             alert('Report generated successfully');
//             handleCloseReportModal();
//         } catch (err) {
//             console.error('Error generating report:', err);
//             setError('Failed to generate report.');
//         }
//     };

//     const handleVerifyRecord = (record) => {
//         const verifyData = verifyRecords.find(v => v.id === record.id);

//         if (verifyData) {
//             const status = {};
//             const fields = [
//                 'resume', 'educationTenth', 'educationTwelth',
//                 'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
//                 'drivingLicense', 'aadhaar'
//             ];

//             fields.forEach(field => {
//                 if (verifyData[field] && record[field]) {
//                     status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
//                 } else {
//                     status[field] = '❓';
//                 }
//             });

//             setVerificationStatus(status);
//         } else {
//             setError('No verification data found.');
//         }
//     };

//     const handleVerifyAll = () => {
//         records.forEach(record => handleVerifyRecord(record));
//         expRecords.forEach(record => handleVerifyRecord(record));
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={handleVerifyAll}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                     Verify All
//                 </button>
//             </div>

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                 key.startsWith('education') || key.startsWith('sem') ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {verificationStatus[key] || '❓'}
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="flex justify-end mt-4">
//                         <button
//                             onClick={handleGenerateReport}
//                             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                         >
//                             Generate Report
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={showReportModal}
//                 onRequestClose={handleCloseReportModal}
//                 contentLabel="Generate Report"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full max-w-md p-4">
//                     <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
//                     <textarea
//                         value={reportContent}
//                         onChange={(e) => setReportContent(e.target.value)}
//                         rows="6"
//                         className="w-full border border-gray-300 rounded p-2 mb-4"
//                         placeholder="Enter report details..."
//                     />
//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleSubmitReport}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseReportModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default ViewAssignedRecords;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [verifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [recordType, setRecordType] = useState(null); // New state for record type
//     const [verificationStatus, setVerificationStatus] = useState({});
//     const [reportContent, setReportContent] = useState('');
//     const [userId] = useState(sessionStorage.getItem('userId'));

//     useEffect(() => {
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     const fetchRecords = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
//             setRecords(response.data);
//             console.log(response.data);

//             const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
//             setVerifyRecords(response.data);
//             console.log(response.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record, type) => {
//         setSelectedDocument(record);
//         setRecordType(type); // Set the record type
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//         setRecordType(null); // Reset the record type
//     };

//     const handleGenerateReport = () => {
//         setShowReportModal(true);
//     };

//     const handleCloseReportModal = () => {
//         setShowReportModal(false);
//         setReportContent('');
//     };

//     const handleSubmitReport = async () => {
//         try {
//             // Prepare the reportData object
//             const reportData = {
//                 content: reportContent,
//                 documentId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.agentOnboardingEmployeeId : selectedDocument.agentOnboardingExpEmployeeId) : null,
//                 onboardingEmployeeId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.onboardingEmployeeId : selectedDocument.onboardingExpEmployeeId) : null,
//                 hrId: selectedDocument.hrId,
//                 recordType: recordType 
//             };

//             // Convert reportData object to URL query parameters
//             const params = new URLSearchParams(reportData).toString();

//             // Make the GET request with query parameters
//             await axios.post(`http://localhost:1230/verifier/addReportEmployee?${params}`);

//             alert('Report generated successfully');
//             handleCloseReportModal();
//         } catch (err) {
//             console.error('Error generating report:', err);
//             setError('Failed to generate report.');
//         }
//     };

//     const handleVerifyRecord = (record) => {
//         const verifyData = verifyRecords.find(v => v.id === record.id);

//         if (verifyData) {
//             const status = {};
//             const fields = [
//                 'resume', 'educationTenth', 'educationTwelth',
//                 'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
//                 'drivingLicense', 'aadhaar'
//             ];

//             fields.forEach(field => {
//                 if (verifyData[field] && record[field]) {
//                     status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
//                 } else {
//                     status[field] = '❓';
//                 }
//             });

//             setVerificationStatus(status);
//         } else {
//             setError('No verification data found.');
//         }
//     };

//     const handleVerifyAll = () => {
//         records.forEach(record => handleVerifyRecord(record));
//         expRecords.forEach(record => handleVerifyRecord(record));
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={handleVerifyAll}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                     Verify All
//                 </button>
//             </div>

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records.map((record) => (
//                                 <tr key={record.onboardingEmployeeId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record, 'Employee')} // Pass record type
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords.map((record) => (
//                                 <tr key={record.experienceId}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.agentOnboardingExpEmployeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDocuments(record, 'Experience')} // Pass record type
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                         >
//                                             View Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                 key.startsWith('education') || key.startsWith('sem') ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {verificationStatus[key] || '❓'}
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="flex justify-end mt-4">
//                         <button
//                             onClick={handleGenerateReport}
//                             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                         >
//                             Generate Report
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={showReportModal}
//                 onRequestClose={handleCloseReportModal}
//                 contentLabel="Generate Report"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full max-w-md p-4">
//                     <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
//                     <textarea
//                         value={reportContent}
//                         onChange={(e) => setReportContent(e.target.value)}
//                         rows="6"
//                         className="w-full border border-gray-300 rounded p-2 mb-4"
//                         placeholder="Enter report details..."
//                     />
//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleSubmitReport}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseReportModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default ViewAssignedRecords;


// upto correct code for all except checkbox approved rejected

//----------------------------------------------------------------------------------------------------------
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewAssignedRecords = () => {
//     const [records, setRecords] = useState([]);
//     const [verifyRecords, setVerifyRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [recordType, setRecordType] = useState(null); // New state for record type
//     const [verificationStatus, setVerificationStatus] = useState({});
//     const [reportContent, setReportContent] = useState('');
//     const [userId] = useState(sessionStorage.getItem('userId'));
//     const [status, setStatus] = useState(''); // State to track selected status

//     const companyName = sessionStorage.getItem('companyname');

//     // Filter states
//     const [employeeFilter, setEmployeeFilter] = useState('All');
//     const [experienceFilter, setExperienceFilter] = useState('All');

//     useEffect(() => {
//         fetchRecords();
//         fetchVerifySource();
//     }, [userId]);

//     const fetchRecords = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
//             setRecords(response.data);
//             console.log(response.data);

//             const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
//             setExpRecords(expResponse.data);
//             console.log(expResponse.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const fetchVerifySource = async () => {
//         try {
//             const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
//             setVerifyRecords(response.data);
//             console.log(response.data);
//         } catch (err) {
//             console.error('API error:', err);
//             setError('Error fetching records.');
//         }
//     };

//     const getFileDataURL = (base64String) => {
//         if (base64String && typeof base64String === 'string') {
//             return `data:application/pdf;base64,${base64String.trim()}`;
//         }
//         return null;
//     };

//     const handleViewClick = (base64String) => {
//         const pdfURL = getFileDataURL(base64String);
//         if (pdfURL) {
//             setSelectedPdf(pdfURL);
//             setModalIsOpen(true);
//         } else {
//             setError('Invalid PDF data.');
//         }
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//         setSelectedPdf(null);
//     };

//     const handleViewDocuments = (record, type) => {
//         setSelectedDocument(record);
//         setRecordType(type); // Set the record type
//         setShowDocumentsModal(true);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//         setSelectedDocument(null);
//         setRecordType(null); // Reset the record type
//     };

//     const handleGenerateReport = () => {
//         setShowReportModal(true);
//     };

//     const handleCloseReportModal = () => {
//         setShowReportModal(false);
//         setReportContent('');
//     };

//     const handleSubmitReport = async () => {
//         try {
//             // Prepare the reportData object
//             const reportData = {
//                 content: reportContent,
//                 documentId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.agentOnboardingEmployeeId : selectedDocument.agentOnboardingExpEmployeeId) : null,
//                 onboardingEmployeeId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.onboardingEmployeeId : selectedDocument.onboardingExpEmployeeId) : null,
//                 hrId: selectedDocument.hrId,
//                 recordType: recordType,
//                 status: status
//             };

//             // Convert reportData object to URL query parameters
//             const params = new URLSearchParams(reportData).toString();

//             // Make the GET request with query parameters
//             await axios.post(`http://localhost:1230/verifier/addReportEmployee?${params}`);

//             alert('Report generated successfully');
//             handleCloseReportModal();
//         } catch (err) {
//             console.error('Error generating report:', err);
//             setError('Failed to generate report.');
//         }
//     };

//     const handleVerifyRecord = (record) => {
//         const verifyData = verifyRecords.find(v => v.id === record.id);

//         if (verifyData) {
//             const status = {};
//             const fields = [
//                 'resume', 'educationTenth', 'educationTwelth',
//                 'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
//                 'drivingLicense', 'aadhaar'
//             ];

//             fields.forEach(field => {
//                 if (verifyData[field] && record[field]) {
//                     status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
//                 } else {
//                     status[field] = '❓';
//                 }
//             });

//             setVerificationStatus(status);
//         } else {
//             setError('No verification data found.');
//         }
//     };

//     const handleVerifyAll = () => {
//         records.forEach(record => handleVerifyRecord(record));
//         expRecords.forEach(record => handleVerifyRecord(record));
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">View Employee</h1>

//             {error && <div className="text-red-500 mb-4">{error}</div>}

//             <div className="flex mb-4">
//                 <div className="mr-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Filter Employee Records:</label>
//                     <select
//                         value={employeeFilter}
//                         onChange={(e) => setEmployeeFilter(e.target.value)}
//                         className="px-4 py-2 border border-gray-300 rounded"
//                     >
//                         <option value="All">All</option>
//                         <option value="Approved">Approved</option>
//                         <option value="Rejected">Rejected</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Filter Experience Records:</label>
//                     <select
//                         value={experienceFilter}
//                         onChange={(e) => setExperienceFilter(e.target.value)}
//                         className="px-4 py-2 border border-gray-300 rounded"
//                     >
//                         <option value="All">All</option>
//                         <option value="Approved">Approved</option>
//                         <option value="Rejected">Rejected</option>
//                     </select>
//                 </div>
//             </div>

//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={handleVerifyAll}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                     Verify All
//                 </button>
//             </div>

//             {records.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Employees Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {records
//                                 .filter(record => employeeFilter === 'All' || record.verifyFromVerifier === employeeFilter)
//                                 .map((record) => (
//                                     <tr key={record.onboardingEmployeeId}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <button
//                                                 onClick={() => handleViewDocuments(record, 'Employee')} // Pass record type
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 View Documents
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {expRecords.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Experience Employees Records</h2>
//                     <table className="min-w-full divide-y divide-gray-200 mb-8">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {expRecords
//                                 .filter(record => experienceFilter === 'All' || record.verifyFromVerifier === experienceFilter)
//                                 .map((record) => (
//                                     <tr key={record.experienceId}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.agentOnboardingExpEmployeeId}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <button
//                                                 onClick={() => handleViewDocuments(record, 'Experience')} // Pass record type
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 View Documents
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//              <Modal
//                 isOpen={showDocumentsModal}
//                 onRequestClose={handleCloseDocumentsModal}
//                 contentLabel="Documents"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-semibold mb-4">Documents</h2>
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {Object.entries(selectedDocument || {}).map(([key, value]) =>
//                                 key.startsWith('education') || key.startsWith('sem') ? (
//                                     <tr key={key}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
//                                             <a
//                                                 href={getFileDataURL(value)}
//                                                 download={`${selectedDocument.onboardingEmployeeId}_${key}.pdf`}
//                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                             >
//                                                 Download
//                                             </a>
//                                             <button
//                                                 onClick={() => handleViewClick(value)}
//                                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {verificationStatus[key] || '❓'}
//                                         </td>
//                                     </tr>
//                                 ) : null
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="flex justify-end mt-4">
//                         <button
//                             onClick={handleGenerateReport}
//                             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                         >
//                             Generate Report
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseDocumentsModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={showReportModal}
//                 onRequestClose={handleCloseReportModal}
//                 contentLabel="Generate Report"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full max-w-md p-4">
//                     <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
//                     <textarea
//                         value={reportContent}
//                         onChange={(e) => setReportContent(e.target.value)}
//                         rows="6"
//                         className="w-full border border-gray-300 rounded p-2 mb-4"
//                         placeholder="Enter report details..."
//                     />
//                     <div className="flex items-center mb-4">
//                         <label className="flex items-center mr-6">
//                             <input
//                                 type="radio"
//                                 value="Approved"
//                                 checked={status === 'Approved'}
//                                 onChange={() => setStatus('Approved')}
//                                 className="mr-2"
//                             />
//                             Approved
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 value="Rejected"
//                                 checked={status === 'Rejected'}
//                                 onChange={() => setStatus('Rejected')}
//                                 className="mr-2"
//                             />
//                             Rejected
//                         </label>
//                     </div>
//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleSubmitReport}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleCloseReportModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="PDF Viewer"
//                 className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
//                 overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
//             >
//                 <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
//                     {selectedPdf ? (
//                         <iframe
//                             src={selectedPdf}
//                             width="100%"
//                             height="100%"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         ></iframe>
//                     ) : (
//                         <p className="text-gray-500">Loading PDF...</p>
//                     )}
//                     <button
//                         onClick={handleCloseModal}
//                         className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//         </div>
//     );
// };

// export default ViewAssignedRecords;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set up modal root
Modal.setAppElement('#root');

const ViewAssignedRecords = () => {
    const [records, setRecords] = useState([]);
    const [verifyRecords, setVerifyRecords] = useState([]);
    const [expRecords, setExpRecords] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [recordType, setRecordType] = useState(null); // New state for record type
    const [verificationStatus, setVerificationStatus] = useState({});
    const [reportContent, setReportContent] = useState('');
    const [userId] = useState(sessionStorage.getItem('userId'));
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
    const [successMessage, setSuccessMessage] = useState(''); // Success message content
    const [status, setStatus] = useState(''); // State to track selected status

    const companyName = sessionStorage.getItem('companyname');

    // Filter states
    const [employeeFilter, setEmployeeFilter] = useState('All');
    const [experienceFilter, setExperienceFilter] = useState('All');

    useEffect(() => {
        fetchRecords();
        fetchVerifySource();
    }, [userId]);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:1230/verifier/getAllEmployee');
            setRecords(response.data);
            console.log(response.data);

            const expResponse = await axios.get('http://localhost:1230/verifier/getAllExpEmployee');
            setExpRecords(expResponse.data);
            console.log(expResponse.data);
        } catch (err) {
            console.error('API error:', err);
            setError('Error fetching records.');
        }
    };

    const fetchVerifySource = async () => {
        try {
            const response = await axios.get('http://localhost:1230/verifier/getAllVerifyResource');
            setVerifyRecords(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('API error:', err);
            setError('Error fetching records.');
        }
    };

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

    const handleViewDocuments = (record, type) => {
        setSelectedDocument(record);
        setRecordType(type); // Set the record type
        setShowDocumentsModal(true);
    };

    const handleCloseDocumentsModal = () => {
        setShowDocumentsModal(false);
        setSelectedDocument(null);
        setRecordType(null); // Reset the record type
    };

    const handleGenerateReport = () => {
        setShowReportModal(true);
    };

    const handleCloseReportModal = () => {
        setShowReportModal(false);
        setReportContent('');
    };

    const handleSubmitReport = async () => {
        try {
            // Prepare the reportData object
            const reportData = {
                content: reportContent,
                documentId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.agentOnboardingEmployeeId : selectedDocument.agentOnboardingExpEmployeeId) : null,
                onboardingEmployeeId: selectedDocument ? (recordType === 'Employee' ? selectedDocument.onboardingEmployeeId : selectedDocument.onboardingExpEmployeeId) : null,
                hrId: selectedDocument.hrId,
                recordType: recordType,
                status: status,
                companyName: companyName
            };

            // Convert reportData object to URL query parameters
            const params = new URLSearchParams(reportData).toString();

            // Make the GET request with query parameters
            await axios.post(`http://localhost:1230/verifier/addReportEmployee?${params}`);

            // alert('Report generated successfully');
            setSuccessMessage("Report generated successfully");
            setShowSuccessModal(true);
            handleCloseReportModal();
        } catch (err) {
            console.error('Error generating report:', err);
            setError('Failed to generate report.');
        }
    };

    const handleVerifyRecord = (record) => {
        const verifyData = verifyRecords.find(v => v.id === record.id);

        if (verifyData) {
            const status = {};
            const fields = [
                'resume', 'educationTenth', 'educationTwelth',
                'sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8',
                'drivingLicense', 'aadhaar','expRecord'
            ];

            fields.forEach(field => {
                if (verifyData[field] && record[field]) {
                    status[field] = verifyData[field] === record[field] ? '✔️' : '❌';
                } else {
                    status[field] = '❓';
                }
            });

            setVerificationStatus(status);
        } else {
            setError('No verification data found.');
        }
    };

    const handleVerifyAll = () => {
        records.forEach(record => handleVerifyRecord(record));
        expRecords.forEach(record => handleVerifyRecord(record));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View Employee</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="flex mb-4">
                <div className="mr-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Filter Employee Records:</label>
                    <select
                        value={employeeFilter}
                        onChange={(e) => setEmployeeFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Filter Experience Records:</label>
                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleVerifyAll}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Verify All
                </button>
            </div>

            {companyName !== 'company' && records.length > 0 && (
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
                            {records
                                .filter(record => employeeFilter === 'All' || record.verifyFromVerifier === employeeFilter)
                                .map((record) => (
                                    <tr key={record.onboardingEmployeeId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.onboardingEmployeeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            <button
                                                onClick={() => handleViewDocuments(record, 'Employee')} // Pass record type
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                            >
                                                View Documents
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expRecords
                                .filter(record => experienceFilter === 'All' || record.verifyFromVerifier === experienceFilter)
                                .map((record) => (
                                    <tr key={record.experienceId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.agentOnboardingExpEmployeeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employeeDob}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phoneNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            <button
                                                onClick={() => handleViewDocuments(record, 'Experience')} // Pass record type
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                            >
                                                View Documents
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            

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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(selectedDocument || {}).filter(([key]) => {
                                // Get the company name
                                const companyName = sessionStorage.getItem('companyname');
                                // Show documents based on company name
                                if (companyName === 'school') {
                                    return key.startsWith('education');
                                } else if (companyName === 'college') {
                                    return key.startsWith('sem');
                                } else if(companyName ==='company'){
                                    return key.startsWith('expRecord') && !key.startsWith('expRecordStatus');
                                }
                                return false;
                            }).map(([key, value]) => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {verificationStatus[key] || '❓'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleGenerateReport}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Generate Report
                        </button>
                    </div>
                    <button
                        onClick={handleCloseDocumentsModal}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>


            <Modal
                isOpen={showReportModal}
                onRequestClose={handleCloseReportModal}
                contentLabel="Generate Report"
                className="absolute inset-0 flex items-center justify-center p-4 bg-white border border-gray-300"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
            >
                <div className="relative w-full max-w-md p-4">
                    <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
                    <textarea
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        rows="6"
                        className="w-full border border-gray-300 rounded p-2 mb-4"
                        placeholder="Enter report details..."
                    />
                    <div className="flex items-center mb-4">
                        <label className="flex items-center mr-6">
                            <input
                                type="radio"
                                value="Approved"
                                checked={status === 'Approved'}
                                onChange={() => setStatus('Approved')}
                                className="mr-2"
                            />
                            Approved
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Rejected"
                                checked={status === 'Rejected'}
                                onChange={() => setStatus('Rejected')}
                                className="mr-2"
                            />
                            Rejected
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmitReport}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                    <button
                        onClick={handleCloseReportModal}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>

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

export default ViewAssignedRecords;





