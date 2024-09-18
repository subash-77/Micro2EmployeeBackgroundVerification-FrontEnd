import React, { useEffect, useState } from 'react';

// Modal component
const Modal = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Report Details</h3>
        <p>{report}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TaskStatus = () => {
  const [records, setRecords] = useState([]);
  const [expRecords, setExpRecords] = useState([]);
  const [recordsReport, setRecordsReport] = useState([]);
  const [expRecordsReport, setExpRecordsReport] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetchRecords();
    fetchReport();
  }, [userId]);

  const fetchRecords = () => {
    const agentId = sessionStorage.getItem('userId');

    fetch(`http://localhost:1230/agent/allAgentOnBoardingEmployee`)
      .then(response => response.json())
      .then(data => {
        setRecords(data);
        console.log(data);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Error fetching onboarding employee records.');
      });

    fetch(`http://localhost:1230/agent/allAgentOnBoardingExpEmployee`)
      .then(response => response.json())
      .then(data => {
        setExpRecords(data);
        console.log(data);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Error fetching experienced employee records.');
      });
  };

  const fetchReport = () => {
    fetch(`http://localhost:1230/agent/GetAllReportForEmployee`)
      .then(response => response.json())
      .then(data => {
        setRecordsReport(data);
        console.log(data);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Error fetching onboarding employee reports.');
      });

    fetch(`http://localhost:1230/agent/GetAllReportForExpEmployee`)
      .then(response => response.json())
      .then(data => {
        setExpRecordsReport(data);
        console.log(data);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Error fetching experienced employee reports.');
      });
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  // Function to get styling based on verification status
  const getVerifyStatusStyle = (status) => {
    switch (status) {
      case 'Verified':
        return 'text-green-500';
      case 'Processing':
        return 'text-orange-500';
      default:
        return '';
    }
  };

  // Function to get styling based on verifier approval
  const getVerifierApprovalStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  // Function to get styling based on document status
  const getDocumentStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800'; // For pending status
    }
  };

  const getReportByEmployeeId = (employeeId, reportList) => {
    const report = reportList.find(r => r.agentOnboardingEmployeeId === employeeId);
    return report ? report.report : null;
  };

  const getReportByExpEmployeeId = (employeeId, reportList) => {
    const report = reportList.find(r => r.agentOnboardingExpEmployeeId === employeeId);
    return report ? report.report : null;
  };

  return (
    // <div className="p-6">
    //   <h2 className="text-2xl font-bold mb-4">Pending Records</h2>

    //   {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

    //   <h3 className="text-xl font-semibold mt-6 mb-2">Employees Records</h3>
    //   <table className="min-w-full bg-white border border-gray-200">
    //     <thead className="bg-black text-white">
    //       <tr>
    //         <th className="py-3 px-4 border-b">Employee</th>
    //         <th className="py-3 px-4 border-b">Date of Birth</th>
    //         <th className="py-3 px-4 border-b">Phone Number</th>
    //         <th className="py-3 px-4 border-b">Verification Status</th>
    //         <th className="py-3 px-4 border-b">Processing Status</th>
    //         <th className="py-3 px-4 border-b">Report</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {records.map(record => (
    //         <tr key={record.onboardingEmployeeId} className="hover:bg-gray-100">
    //           <td className="py-2 px-4 border-b">{record.employeeName}</td>
    //           <td className="py-2 px-4 border-b">{record.employeeDob}</td>
    //           <td className="py-2 px-4 border-b">{record.phoneNumber}</td>
    //           <td className={`py-2 px-4 border-b rounded ${getVerifierApprovalStyle(record.verifyFromVerifier)}`}>
    //             {record.verifyFromVerifier}
    //           </td>
    //           <td className={`py-2 px-4 border-b rounded ${getVerifyStatusStyle(record.verifyStatus)}`}>
    //             {record.verifyStatus}
    //           </td>
    //           <td className="py-2 px-4 border-b">
    //             {getReportByEmployeeId(record.onboardingEmployeeId, recordsReport) ? (
    //               <button
    //                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //                 onClick={() => handleViewReport(getReportByEmployeeId(record.onboardingEmployeeId, recordsReport))}
    //               >
    //                 View Report
    //               </button>
    //             ) : (
    //               <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed inline-block">
    //                 No Report
    //               </span>
    //             )}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   <h3 className="text-xl font-semibold mt-6 mb-2">Experience Employees Records</h3>
    //   <table className="min-w-full bg-white border border-gray-200">
    //     <thead className="bg-black text-white">
    //       <tr>
    //         <th className="py-3 px-4 border-b">Employee</th>
    //         <th className="py-3 px-4 border-b">Date of Birth</th>
    //         <th className="py-3 px-4 border-b">Phone Number</th>
    //         <th className="py-3 px-4 border-b">Verification Status</th>
    //         <th className="py-3 px-4 border-b">Processing Status</th>
    //         <th className="py-3 px-4 border-b">Report</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {expRecords.map(record => (
    //         <tr key={record.onboardingEmployeeId} className="hover:bg-gray-100">
    //           <td className="py-2 px-4 border-b">{record.employeeName}</td>
    //           <td className="py-2 px-4 border-b">{record.employeeDob}</td>
    //           <td className="py-2 px-4 border-b">{record.phoneNumber}</td>
    //           <td className={`py-2 px-4 border-b rounded ${getVerifierApprovalStyle(record.verifyFromVerifier)}`}>
    //             {record.verifyFromVerifier}
    //           </td>
    //           <td className={`py-2 px-4 border-b rounded ${getVerifyStatusStyle(record.verifyStatus)}`}>
    //             {record.verifyStatus}
    //           </td>
    //           <td className="py-2 px-4 border-b">
    //             {getReportByExpEmployeeId(record.onboardingExpEmployeeId, expRecordsReport) ? (
    //               <button
    //                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //                 onClick={() => handleViewReport(getReportByExpEmployeeId(record.onboardingExpEmployeeId, expRecordsReport))}
    //               >
    //                 View Report
    //               </button>
    //             ) : (
    //               <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed inline-block">
    //                 No Report
    //               </span>
    //             )}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   {/* Modal for report details */}
    //   <Modal isOpen={modalOpen} onClose={closeModal} report={selectedReport} />
    // </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Records Status</h2>

      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

      <h3 className="text-xl font-semibold mt-6 mb-2">Employees Records</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-black text-white">
          <tr>
            <th className="py-3 px-4 border-b">Employee</th>
            <th className="py-3 px-4 border-b">Date of Birth</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">School Document Status</th>
            <th className="py-3 px-4 border-b">College Document Status</th>
            <th className="py-3 px-4 border-b">Report</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.onboardingEmployeeId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{record.employeeName}</td>
              <td className="py-2 px-4 border-b">{record.employeeDob}</td>
              <td className="py-2 px-4 border-b">{record.phoneNumber}</td>
              <td className={`py-2 px-4 border-b rounded ${getDocumentStatusStyle(record.schoolStatus)}`}>
                {record.schoolStatus || 'Pending'}
              </td>
              <td className={`py-2 px-4 border-b rounded ${getDocumentStatusStyle(record.collegeStatus)}`}>
                {record.collegeStatus || 'Pending'}
              </td>
              <td className="py-2 px-4 border-b">
                {getReportByEmployeeId(record.onboardingEmployeeId, recordsReport) ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewReport(getReportByEmployeeId(record.onboardingEmployeeId, recordsReport))}
                  >
                    View Report
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed inline-block">
                    No Report
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6 mb-2">Experienced Employees Records</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-black text-white">
          <tr>
            <th className="py-3 px-4 border-b">Employee</th>
            <th className="py-3 px-4 border-b">Date of Birth</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">School Document Status</th>
            <th className="py-3 px-4 border-b">College Document Status</th>
            <th className="py-3 px-4 border-b">Comapany Document Status</th>
            <th className="py-3 px-4 border-b">Report</th>
          </tr>
        </thead>
        <tbody>
          {expRecords.map(record => (
            <tr key={record.onboardingExpEmployeeId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{record.employeeName}</td>
              <td className="py-2 px-4 border-b">{record.employeeDob}</td>
              <td className="py-2 px-4 border-b">{record.phoneNumber}</td>
              <td className={`py-2 px-4 border-b rounded ${getDocumentStatusStyle(record.schoolStatus)}`}>
                {record.schoolStatus || 'Pending'}
              </td>
              <td className={`py-2 px-4 border-b rounded ${getDocumentStatusStyle(record.collegeStatus)}`}>
                {record.collegeStatus || 'Pending'}
              </td>
              <td className={`py-2 px-4 border-b rounded ${getDocumentStatusStyle(record.expRecordStatus)}`}>
                {record.expRecordStatus || 'Pending'}
              </td>
              <td className="py-2 px-4 border-b">
                {getReportByExpEmployeeId(record.onboardingExpEmployeeId, expRecordsReport) ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewReport(getReportByExpEmployeeId(record.onboardingExpEmployeeId, expRecordsReport))}
                  >
                    View Report
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed inline-block">
                    No Report
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for report details */}
      <Modal isOpen={modalOpen} onClose={closeModal} report={selectedReport} />
    </div>
  );
};

export default TaskStatus;