// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// // Set up modal root
// Modal.setAppElement('#root');

// const AssignTasks = () => {
//     const [records, setRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [agent, setAgent] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         axios
//             .get(`http://localhost:1230/agent/allAgentOnBoardingEmployee`)
//             .then((response) => {
//                 if (response.data) {
//                     if (response.data) {
//                         setRecords(response.data);
//                         console.log(response.data);
//                     }

//                 } else {
//                     console.error('Unexpected response format:', response.data);
//                     setError('Unexpected response format.');
//                 }
//             })
//             .catch((err) => {
//                 console.error('API error:', err);
//                 setError('Error fetching data.');
//             });

//         axios
//             .get(`http://localhost:1230/agent/allAgentOnBoardingExpEmployee`)
//             .then((response) => {
//                 if (response.data) {
//                     if (response.data) {
//                         setExpRecords(response.data);
//                         console.log(response.data);
//                     }

//                 } else {
//                     console.error('Unexpected response format:', response.data);
//                     setError('Unexpected response format.');
//                 }
//             })
//             .catch((err) => {
//                 console.error('API error:', err);
//                 setError('Error fetching data.');
//             });
//     }, [userId]);

//     useEffect(() => {
//         axios.get(`http://localhost:1230/agent/GetAllSubAgentByRole`)
//             .then(response => {
//                 setAgent(response.data);
//                 console.log(JSON.stringify(response.data, null, 2));
//             })
//             .catch(error => console.error('Error fetching Agent records:', error));

//     }, []);

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
//     const handleAssignAgentForEmployee = (id) => {

//             console.log(id);
//     };


//     const handleAssignAgentForExpEmployee = (id) => {
//         console.log(id);
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
//                                             onClick={() => handleAssignAgentForEmployee(record.agentOnboardingEmployeeId, 'employee')}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Assign 
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
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
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
//                                             onClick={() => handleAssignAgentForExpEmployee(record.agentOnboardingExpEmployeeId, 'experience')}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Assign
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

// export default AssignTasks;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set up modal root
Modal.setAppElement('#root');

const AssignTasks = () => {
    const [records, setRecords] = useState([]);
    const [expRecords, setExpRecords] = useState([]);
    const [agent, setAgent] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [assignModalIsOpen, setAssignModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedAgentId, setSelectedAgentId] = useState('');
    const [assigningId, setAssigningId] = useState(null);
    const [assigningType, setAssigningType] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
    const [successMessage, setSuccessMessage] = useState(''); // Success message content

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        // Fetch onboarding employee records
        fetchRecords();
        // Fetch agent records
        fetchAgents();
    }, [userId]);

    const fetchRecords = () => {
        fetch('http://localhost:1230/agent/allAgentOnBoardingEmployee')
            .then(response => response.json())
            .then(data => {
                setRecords(data);
                console.log(data);
            })
            .catch(err => {
                console.error('API error:', err);
                setError('Error fetching records.');
            });

        fetch('http://localhost:1230/agent/allAgentOnBoardingExpEmployee')
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

    const fetchAgents = () => {
        fetch('http://localhost:1230/agent/GetAllSubAgentByRole')
            .then(response => response.json())
            .then(data => {
                setAgent(data);
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(error => console.error('Error fetching Agent records:', error));
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
        setAssignModalIsOpen(true);

    };

    const handleAssign = () => {
        if (selectedAgentId && assigningId) {
            console.log(`Selected Agent ID: ${selectedAgentId}`);
            console.log(`Assigning Record ID: ${assigningId}`);
            console.log(`Assignment Type: ${assigningType}`);
    
            axios.post('http://localhost:1230/agent/getIdForAssignSubAgent', null, {
                params: {
                    agentId: selectedAgentId,
                    recordId: assigningId,
                    type: assigningType
                }
            })
            .then(response => {
                console.log('Assignment successful:', response.data);
                // alert("Assigned");
                setSuccessMessage("Agent Assigned");
            setShowSuccessModal(true);
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error('Error during assignment:', error);
                setError('Failed to assign agent.');
            });
        } else {
            setError('Please select an agent.');
        }
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
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Agent</th> */}
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
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.assignedAgentId ? agent.find(a => a.userId === record.assignedAgentId)?.userName : 'Not Assigned'}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <button
                                            onClick={() => handleViewDocuments(record)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                        >
                                            View Documents
                                        </button>
                                        <button
                                            onClick={() => openAssignModal(record.onboardingEmployeeId, 'employee')}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Assign
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
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Agent</th> */}
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
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.assignedAgentId ? agent.find(a => a.userId === record.assignedAgentId)?.userName : 'Not Assigned'}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <button
                                            onClick={() => handleViewDocuments(record)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                        >
                                            View Documents
                                        </button>
                                        <button
                                            onClick={() => openAssignModal(record.onboardingExpEmployeeId, 'experience')}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Assignment Modal */}
            <Modal
                isOpen={assignModalIsOpen}
                onRequestClose={() => setAssignModalIsOpen(false)}
                className="fixed inset-0 bg-white mt-52 mx-auto w-80 h-64  p-6 rounded-lg shadow-lg z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Assign Agent</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="agent" className="block text-sm font-medium text-gray-700">Select Agent</label>
                    <select
                        id="agent"
                        name="agent"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        value={selectedAgentId}
                        onChange={(e) => setSelectedAgentId(e.target.value)}
                    >
                        <option value="">Select an Agent</option>
                        {agent.map((a) => (
                            <option key={a.userId} value={a.userId}>{a.userName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleAssign}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Assign
                    </button>
                </div>
            </Modal>

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

export default AssignTasks;

// upto this correct code

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import { FaCheckCircle } from 'react-icons/fa'; // Import tick symbol icon

// // Set up modal root
// Modal.setAppElement('#root');

// const AssignTasks = () => {
//     const [records, setRecords] = useState([]);
//     const [expRecords, setExpRecords] = useState([]);
//     const [agent, setAgent] = useState([]);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [successModalIsOpen, setSuccessModalIsOpen] = useState(false); // State for success modal
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
//         fetchAgents();
//     }, [userId]);

//     const fetchRecords = () => {
//         fetch('http://localhost:1230/agent/allAgentOnBoardingEmployee')
//             .then(response => response.json())
//             .then(data => {
//                 setRecords(data);
//                 console.log(data);
//             })
//             .catch(err => {
//                 console.error('API error:', err);
//                 setError('Error fetching records.');
//             });

//         fetch('http://localhost:1230/agent/allAgentOnBoardingExpEmployee')
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

//     const fetchAgents = () => {
//         fetch('http://localhost:1230/agent/GetAllSubAgentByRole')
//             .then(response => response.json())
//             .then(data => {
//                 setAgent(data);
//                 console.log(JSON.stringify(data, null, 2));
//             })
//             .catch(error => console.error('Error fetching Agent records:', error));
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

//     const openAssignModal = (id, type) => {
//         setAssigningId(id);
//         setAssigningType(type);
//         setModalIsOpen(true);
//     };

//     const handleAssign = () => {
//         if (selectedAgentId && assigningId) {
//             console.log(`Selected Agent ID: ${selectedAgentId}`);
//             console.log(`Assigning Record ID: ${assigningId}`);
//             console.log(`Assignment Type: ${assigningType}`);
    
//             axios.post('http://localhost:1230/agent/getIdForAssignSubAgent', null, {
//                 params: {
//                     agentId: selectedAgentId,
//                     recordId: assigningId,
//                     type: assigningType
//                 }
//             })
//             .then(response => {
//                 console.log('Assignment successful:', response.data);
//                 setModalIsOpen(false);
//                 setSuccessModalIsOpen(true); // Open success modal
//             })
//             .catch(error => {
//                 console.error('Error during assignment:', error);
//                 setError('Failed to assign agent.');
//             });
//         } else {
//             setError('Please select an agent.');
//         }
//     };

//     const handleCloseSuccessModal = () => {
//         setSuccessModalIsOpen(false);
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
//                                             onClick={() => openAssignModal(record.onboardingEmployeeId, 'employee')}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Assign
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
//                                             onClick={() => openAssignModal(record.onboardingExpEmployeeId, 'experience')}
//                                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                                         >
//                                             Assign
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Assignment Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={() => setModalIsOpen(false)}
//                 className="fixed inset-0 bg-white mt-52 mx-auto w-80 h-64 p-6 rounded-lg shadow-lg z-50"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//             >
//                 <h2 className="text-xl font-bold mb-4">Assign Agent</h2>
//                 {error && <div className="text-red-500 mb-4">{error}</div>}
//                 <div className="mb-4">
//                     <label htmlFor="agent" className="block text-sm font-medium text-gray-700">Select Agent</label>
//                     <select
//                         id="agent"
//                         name="agent"
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                         value={selectedAgentId}
//                         onChange={(e) => setSelectedAgentId(e.target.value)}
//                     >
//                         <option value="">Select an Agent</option>
//                         {agent.map((a) => (
//                             <option key={a.userId} value={a.userId}>{a.userName}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="flex justify-end">
//                     <button
//                         onClick={handleAssign}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Assign
//                     </button>
//                 </div>
//             </Modal>

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

//             {/* Success Modal */}
//             <Modal
//                 isOpen={successModalIsOpen}
//                 onRequestClose={handleCloseSuccessModal}
//                 className="fixed inset-0 bg-white mt-52 mx-auto w-80 h-64 p-6 rounded-lg shadow-lg z-50"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//             >
//                 <div className="flex items-center justify-center flex-col">
//                     <FaCheckCircle className="text-green-500 text-4xl mb-4" />
//                     <h2 className="text-xl font-bold">Assignment Successful</h2>
//                     <button
//                         onClick={handleCloseSuccessModal}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default AssignTasks;


