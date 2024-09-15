// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const ViewRecordsToVerify = () => {
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
//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         // Fetch onboarding employee records
//         fetchRecords();
//         // Fetch agent records
//         // fetchAgents();
//     }, [userId]);

//     const fetchRecords = () => {

//         const agentId = sessionStorage.getItem('userId');

//         fetch(`http://localhost:1230/agent/sendAgentIdForEmployee/${agentId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setRecords(data);
//                 console.log(data);
//             })
//             .catch(err => {
//                 console.error('API error:', err);
//                 setError('Error fetching records.');
//             });

//         fetch(`http://localhost:1230/agent/sendAgentIdForExpEmployee/${agentId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setExpRecords(data);
//                 console.log(data);
//             })
//             .catch(err => {
//                 console.error('API error:', err);
//                 setError('Error fetching records.');
//             });
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
//         </div>
//     );
// };

// export default ViewRecordsToVerify;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set up modal root
Modal.setAppElement('#root');

const ViewRecordsToVerify = () => {
    const [records, setRecords] = useState([]);
    const [expRecords, setExpRecords] = useState([]);
    const [agent, setAgent] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedAgentId, setSelectedAgentId] = useState('');
    const [assigningId, setAssigningId] = useState(null);
    const [assigningType, setAssigningType] = useState('');
    const [loading, setLoading] = useState(false); // State for loader

    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
    const [successMessage, setSuccessMessage] = useState(''); // Success message content
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        // Fetch onboarding employee records
        fetchRecords();
        // Fetch agent records
        // fetchAgents();
        pushNotification();
    }, [userId]);

    const fetchRecords = () => {
        const agentId = sessionStorage.getItem('userId');

        fetch(`http://localhost:1230/agent/sendAgentIdForEmployee/${agentId}`)
            .then(response => response.json())
            .then(data => {
                setRecords(data);
                console.log(data);
            })
            .catch(err => {
                console.error('API error:', err);
                setError('Error fetching records.');
            });

        fetch(`http://localhost:1230/agent/sendAgentIdForExpEmployee/${agentId}`)
            .then(response => response.json())
            .then(data => {
                setExpRecords(data);
                console.log(data);
            })
            .catch(err => {
                console.error('API error:', err);
                setError('Error fetching records.');
            });
    };

    const pushNotification = () => {
        axios.post('http://localhost:1230/agent/pushNotification')
            .then(response => {
                console.log("Push notification sent");
            })
            .catch(error => console.error('Error sending push notification:', error));
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

    const handleViewDocuments = (record) => {
        setSelectedDocument(record);
        setShowDocumentsModal(true);
    };

    const handleCloseDocumentsModal = () => {
        setShowDocumentsModal(false);
        setSelectedDocument(null);
    };

    const openAssignModal = (id, type) => {
        setAssigningId(id);
        setAssigningType(type);
        setModalIsOpen(true);
    };

    const sendToVerifier = async (recordId, type) => {
        setLoading(true); // Show loader

        try {
            let url;
            if (type === 'employee') {
                console.log(recordId);
                url = `http://localhost:1230/agent/sendEmployeeToVerifier?recordId=${recordId}`;
            } else if (type === 'experience') {
                console.log(recordId);
                url = `http://localhost:1230/agent/sendExperienceToVerifier?recordId=${recordId}`;
            } else {
                throw new Error('Invalid type provided');
            }

            const response = await axios.post(url);
            if (response.status === 200) {
                // alert('Record sent to verifier successfully.');
                setSuccessMessage("Record sent to verifier successfully");
            setShowSuccessModal(true);
            } else {
                alert('Failed to send record to verifier.');
            }
        } catch (error) {
            console.error('Error sending record to verifier:', error);
            alert('An error occurred while sending the record to verifier.');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View Employee</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {records.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
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
                                            onClick={() => sendToVerifier(record.onboardingEmployeeId, 'employee')}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Send to Verifier
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
                    <h2 className="text-xl font-semibold mb-4">Experience Employee Records</h2>
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
                                            onClick={() => sendToVerifier(record.onboardingExpEmployeeId, 'experience')}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Send to Verifier
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

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            )}
        </div>
    );
};

export default ViewRecordsToVerify;
