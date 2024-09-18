import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set up modal root
Modal.setAppElement('#root');

const HeadHrPendingVerificationRecords = () => {
    const [records, setRecords] = useState([]);
    const [expRecords, setExpRecords] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const userId = sessionStorage.getItem('userId');

    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal visibility
const [successMessage, setSuccessMessage] = useState(''); // Success message content

    useEffect(() => {
        axios
            .get(`http://localhost:1230/hr/allResolvedOnBoardingEmployee`)
            .then((response) => {
                if (response.data) {
                    if (response.data) {
                        setRecords(response.data);
                        console.log(response.data);
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

            axios
            .get(`http://localhost:1230/hr/allResolvedOnBoardingExpEmployee`)
            .then((response) => {
                if (response.data) {
                    if (response.data) {
                        setExpRecords(response.data);
                        console.log(response.data);
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
    // const handleProceedToVerifyEmployee = (id) => {
    //     const formData = new FormData();
    //     const hrId = sessionStorage.getItem('userId');
    //     const selectedRecord = records.find(record => record.onboardingEmployeeId === id);
    
    //     if (selectedRecord) {
    //         formData.append("resume", new Blob([selectedRecord.resume], { type: 'application/pdf' }), "resume.pdf");
    //         formData.append("educationTenth", new Blob([selectedRecord.educationTenth], { type: 'application/pdf' }), "educationTenth.pdf");
    //         formData.append("educationTwelth", new Blob([selectedRecord.educationTwelth], { type: 'application/pdf' }), "educationTwelth.pdf");
    //         formData.append("sem1", new Blob([selectedRecord.sem1], { type: 'application/pdf' }), "sem1.pdf");
    //         formData.append("sem2", new Blob([selectedRecord.sem2], { type: 'application/pdf' }), "sem2.pdf");
    //         formData.append("sem3", new Blob([selectedRecord.sem3], { type: 'application/pdf' }), "sem3.pdf");
    //         formData.append("sem4", new Blob([selectedRecord.sem4], { type: 'application/pdf' }), "sem4.pdf");
    //         formData.append("sem5", new Blob([selectedRecord.sem5], { type: 'application/pdf' }), "sem5.pdf");
    //         formData.append("sem6", new Blob([selectedRecord.sem6], { type: 'application/pdf' }), "sem6.pdf");
    //         formData.append("sem7", new Blob([selectedRecord.sem7], { type: 'application/pdf' }), "sem7.pdf");
    //         formData.append("sem8", new Blob([selectedRecord.sem8], { type: 'application/pdf' }), "sem8.pdf");
    //         formData.append("drivingLicense", new Blob([selectedRecord.drivingLicense], { type: 'application/pdf' }), "drivingLicense.pdf");
    //         formData.append("aadhaar", new Blob([selectedRecord.aadhaar], { type: 'application/pdf' }), "aadhaar.pdf");
    //         formData.append("type", selectedRecord.type);
    //         formData.append("employeeName", selectedRecord.employeeName);
    //         formData.append("employeeDob", selectedRecord.employeeDob);
    //         formData.append("phoneNumber", selectedRecord.phoneNumber);
    //         formData.append("hrId", hrId);
    //         formData.append("onboardingEmployeeId", id);
    //         formData.append("verifyStatus", "pending");
    //         formData.append("agentAppoint", "5"); //default Head Agent
    //         formData.append("subAgentAppoint", "");
    //         formData.append("assignToVerify", "");
    //         formData.append("verifyFromVerifier", "");
    
    //         axios.post("http://localhost:1230/agent/addAgentOnboardingEmployee", formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         })
    //         .then(response => {
    //             alert("Records Assigned To Head Agent");
    //             console.log('Response:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    
    //         console.log('Request made for employee ID:', id);
    //     }
    // };
    
    
    // const handleProceedToVerifyExpEmployee = (id) => {
    //     const hrId = sessionStorage.getItem('userId');
    //     const selectedRecord = expRecords.find(record => record.onboardingExpEmployeeId === id);
    
    //     if (selectedRecord) {
    //         const formData = new FormData();
    
    //         // Append files
    //         formData.append("resume", new Blob([selectedRecord.resume], { type: 'application/pdf' }), "resume.pdf");
    //         formData.append("educationTenth", new Blob([selectedRecord.educationTenth], { type: 'application/pdf' }), "educationTenth.pdf");
    //         formData.append("educationTwelth", new Blob([selectedRecord.educationTwelth], { type: 'application/pdf' }), "educationTwelth.pdf");
    //         formData.append("sem1", new Blob([selectedRecord.sem1], { type: 'application/pdf' }), "sem1.pdf");
    //         formData.append("sem2", new Blob([selectedRecord.sem2], { type: 'application/pdf' }), "sem2.pdf");
    //         formData.append("sem3", new Blob([selectedRecord.sem3], { type: 'application/pdf' }), "sem3.pdf");
    //         formData.append("sem4", new Blob([selectedRecord.sem4], { type: 'application/pdf' }), "sem4.pdf");
    //         formData.append("sem5", new Blob([selectedRecord.sem5], { type: 'application/pdf' }), "sem5.pdf");
    //         formData.append("sem6", new Blob([selectedRecord.sem6], { type: 'application/pdf' }), "sem6.pdf");
    //         formData.append("sem7", new Blob([selectedRecord.sem7], { type: 'application/pdf' }), "sem7.pdf");
    //         formData.append("sem8", new Blob([selectedRecord.sem8], { type: 'application/pdf' }), "sem8.pdf");
    //         formData.append("drivingLicense", new Blob([selectedRecord.drivingLicense], { type: 'application/pdf' }), "drivingLicense.pdf");
    //         formData.append("aadhaar", new Blob([selectedRecord.aadhaar], { type: 'application/pdf' }), "aadhaar.pdf");
    
    //         // Append other fields
    //         formData.append("type", selectedRecord.type);
    //         formData.append("employeeName", selectedRecord.employeeName);
    //         formData.append("employeeDob", selectedRecord.employeeDob);
    //         formData.append("phoneNumber", selectedRecord.phoneNumber);
    //         formData.append("referenceName", selectedRecord.referenceName);
    //         formData.append("referencePosition", selectedRecord.referencePosition);
    //         formData.append("workDuration", selectedRecord.workDuration);
    //         formData.append("referenceNumber", selectedRecord.referenceNumber);
    //         formData.append("hrId", hrId);
    //         formData.append("onboardingExpEmployeeId", id);
    //         formData.append("verifyStatus", "pending");
    //         formData.append("agentAppoint", "5");  //default Head Agent
    //         formData.append("subAgentAppoint", "");
    //         formData.append("assignToVerify", "");
    //         formData.append("verifyFromVerifier", "");
    
    //         axios.post("http://localhost:1230/agent/addAgentOnboardingExpEmployee", formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         })
    //         .then(response => {
    //             alert("Records Assigned To Head HR");
    //             console.log('Response:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    
    //         console.log('Request made for exp employee ID:', id);
    //     } else {
    //         console.error('Record not found for exp employee ID:', id);
    //     }
    // };
    const handleProceedToVerifyEmployee = (id) => {
        const formData = new FormData();
        const hrId = sessionStorage.getItem('userId');
        const selectedRecord = records.find(record => record.onboardingEmployeeId === id);
        
        if (selectedRecord) {
            // Function to create Blob from base64 string
            const createBlob = (base64String, fileName) => {
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray], { type: 'application/pdf' });
            };
            
            // Create blobs for each document
            formData.append("resume", createBlob(selectedRecord.resume, "resume.pdf"), "resume.pdf");
            formData.append("educationTenth", createBlob(selectedRecord.educationTenth, "educationTenth.pdf"), "educationTenth.pdf");
            formData.append("educationTwelth", createBlob(selectedRecord.educationTwelth, "educationTwelth.pdf"), "educationTwelth.pdf");
            formData.append("sem1", createBlob(selectedRecord.sem1, "sem1.pdf"), "sem1.pdf");
            formData.append("sem2", createBlob(selectedRecord.sem2, "sem2.pdf"), "sem2.pdf");
            formData.append("sem3", createBlob(selectedRecord.sem3, "sem3.pdf"), "sem3.pdf");
            formData.append("sem4", createBlob(selectedRecord.sem4, "sem4.pdf"), "sem4.pdf");
            formData.append("sem5", createBlob(selectedRecord.sem5, "sem5.pdf"), "sem5.pdf");
            formData.append("sem6", createBlob(selectedRecord.sem6, "sem6.pdf"), "sem6.pdf");
            formData.append("sem7", createBlob(selectedRecord.sem7, "sem7.pdf"), "sem7.pdf");
            formData.append("sem8", createBlob(selectedRecord.sem8, "sem8.pdf"), "sem8.pdf");
            formData.append("drivingLicense", createBlob(selectedRecord.drivingLicense, "drivingLicense.pdf"), "drivingLicense.pdf");
            formData.append("aadhaar", createBlob(selectedRecord.aadhaar, "aadhaar.pdf"), "aadhaar.pdf");
    
            // Append other fields
            formData.append("type", selectedRecord.type);
            formData.append("employeeName", selectedRecord.employeeName);
            formData.append("employeeDob", selectedRecord.employeeDob);
            formData.append("phoneNumber", selectedRecord.phoneNumber);
            formData.append("hrId", selectedRecord.hrId);
            formData.append("onboardingEmployeeId", id);
            formData.append("verifyStatus", "pending");
            formData.append("agentAppoint", "5"); //default Head Agent
            formData.append("subAgentAppoint", "");
            formData.append("assignToVerify", "");
            formData.append("verifyFromVerifier", "");
    
            axios.post("http://localhost:1230/agent/addAgentOnboardingEmployee", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                // alert("Records Assigned To Head Agent");
                setSuccessMessage("Records Assigned To Head Agent");
            setShowSuccessModal(true);
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
            console.log('Request made for employee ID:', id);
        } else {
            console.error('No record found with ID:', id);
        }
    };
    
    const handleProceedToVerifyExpEmployee = (id) => {
        const hrId = sessionStorage.getItem('userId');
        const selectedRecord = expRecords.find(record => record.onboardingExpEmployeeId === id);
        
        if (selectedRecord) {
            const formData = new FormData();
            
            // Function to create Blob from base64 string
            const createBlob = (base64String, fileName) => {
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray], { type: 'application/pdf' });
            };
            
            // Create blobs for each document
            formData.append("resume", createBlob(selectedRecord.resume, "resume.pdf"), "resume.pdf");
            formData.append("educationTenth", createBlob(selectedRecord.educationTenth, "educationTenth.pdf"), "educationTenth.pdf");
            formData.append("educationTwelth", createBlob(selectedRecord.educationTwelth, "educationTwelth.pdf"), "educationTwelth.pdf");
            formData.append("sem1", createBlob(selectedRecord.sem1, "sem1.pdf"), "sem1.pdf");
            formData.append("sem2", createBlob(selectedRecord.sem2, "sem2.pdf"), "sem2.pdf");
            formData.append("sem3", createBlob(selectedRecord.sem3, "sem3.pdf"), "sem3.pdf");
            formData.append("sem4", createBlob(selectedRecord.sem4, "sem4.pdf"), "sem4.pdf");
            formData.append("sem5", createBlob(selectedRecord.sem5, "sem5.pdf"), "sem5.pdf");
            formData.append("sem6", createBlob(selectedRecord.sem6, "sem6.pdf"), "sem6.pdf");
            formData.append("sem7", createBlob(selectedRecord.sem7, "sem7.pdf"), "sem7.pdf");
            formData.append("sem8", createBlob(selectedRecord.sem8, "sem8.pdf"), "sem8.pdf");
            formData.append("expRecord", createBlob(selectedRecord.sem8, "expRecord.pdf"), "expRecord.pdf");
            formData.append("drivingLicense", createBlob(selectedRecord.drivingLicense, "drivingLicense.pdf"), "drivingLicense.pdf");
            formData.append("aadhaar", createBlob(selectedRecord.aadhaar, "aadhaar.pdf"), "aadhaar.pdf");
    
            // Append other fields
            formData.append("type", selectedRecord.type);
            formData.append("employeeName", selectedRecord.employeeName);
            formData.append("employeeDob", selectedRecord.employeeDob);
            formData.append("phoneNumber", selectedRecord.phoneNumber);
            formData.append("referenceName", selectedRecord.referenceName);
            formData.append("referencePosition", selectedRecord.referencePosition);
            formData.append("workDuration", selectedRecord.workDuration);
            formData.append("referenceNumber", selectedRecord.referenceNumber);
            formData.append("hrId", selectedRecord.hrId);
            formData.append("onboardingExpEmployeeId", id);
            formData.append("verifyStatus", "pending");
            formData.append("agentAppoint", "5"); //default Head Agent
            formData.append("subAgentAppoint", "");
            formData.append("assignToVerify", "");
            formData.append("verifyFromVerifier", "");
    
            axios.post("http://localhost:1230/agent/addAgentOnboardingExpEmployee", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                // alert("Records Assigned To Head HR");
            setSuccessMessage("Records Assigned To Head Agent");
            setShowSuccessModal(true);
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
            console.log('Request made for exp employee ID:', id);
        } else {
            console.error('No record found with ID:', id);
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
                                            Send To Agency
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
                                            Send To Agency
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

export default HeadHrPendingVerificationRecords;