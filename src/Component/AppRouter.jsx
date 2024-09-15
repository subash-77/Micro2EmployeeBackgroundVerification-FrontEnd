// // App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PatientNavbar from './Navbar/PatientNavbar';
// import Appointment from './PatientPages/Appointment';
// import EHR from './PatientPages/EHR';
// import AllLandingComponent from '../LandingComponent/AllLandingComponent';
// import Register from '../LandingComponent/Register';
// import Login from '../LandingComponent/Login';

// const App = () => {
//   return (
//     <Router>
//         <Routes>
//             <Route path='/' element={<AllLandingComponent/>} />
//             <Route path='/register' element={<Register/>} />
//             <Route path='/login' element={<Login/>} />
//             <Route path='/login/register' element={<Register/>} />

//         </Routes>
//       <div className="flex h-screen">
//         <PatientNavbar />
//         <div className="flex-1 p-7">
//           <Routes>
//             <Route path="/appointment" element={<Appointment />} />
//             <Route path="/ehr" element={<EHR />} />

//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AllLandingComponent from '../LandingComponent/AllLandingComponent';
import Register from '../LandingComponent/Register';
import Login from '../LandingComponent/Login';

import { useEffect, useState } from 'react';
import HrLayout from './Layout/HrLayout';
import ViewEmployee from './HrPages/ViewEmployee';
import PendingVerificationRecord from './HrPages/PendingVerificationRecord';
import VerificationReport from './HrPages/VerificationReport';
import HeadHrLayout from './Layout/HeadHrLayout';
import RecordStatus from './HeadHrPages/RecordStatus';
import RecordReport from './HeadHrPages/RecordReport';
import HeadHrPendingVerificationRecords from './HeadHrPages/HeadHrPendingVerificationRecords';
import HeadAgentLayout from './Layout/HeadAgentLayout';
import AddAgents from './HeadAgentPages/AddAgents';
import AssignTasks from './HeadAgentPages/AssignTasks';
import TaskStatus from './HeadAgentPages/TaskStatus';
import AgentLayout from './Layout/AgentLayout';
import ViewRecordsToVerify from './AgentPages/ViewRecordsToVerify';
import AgentRecordStatus from './AgentPages/AgentRecordStatus';
import ReferenceCheck from './AgentPages/ReferenceCheck';
import ViewAssignedRecords from './VerifierPages/ViewAssignedRecords';
import VerifierLayout from './Layout/VerifierLayout';
import ProtectedRoute from './ProtectedRoute';


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<AllLandingComponent />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/login/register' element={<Register />} /> */}
                {/* <Route path='/patientlayout' element={<PatientLayout />} /> */}

            </Routes>

            {/* <Routes>
                <Route element={<PatientLayout />}>
                    <Route path="/appointment" element={<ProtectedRoute element={<Appointment />} />} />
                    <Route path="/book-appointment" element={<ProtectedRoute element={<BookAppointment />} />} />
                    <Route path="/ehr"  element={<ProtectedRoute element={<EHR />} />} />
                    <Route path="/waitingroom"  element={<ProtectedRoute element={<WaitingRoom />} />}  />
                    <Route path="/patientengagement"  element={<ProtectedRoute element={<PatientEngagement />} />} />
                    <Route path="/careplan"  element={<ProtectedRoute element={<CarePlan />} />} />
                </Route>
            </Routes> */}
            <Routes>
                <Route element={<HrLayout />}>
                {/* <Route path='/viewemployee' element={<ViewEmployee/>} />
                <Route path='/pendingverificationrecord' element={<PendingVerificationRecord/>} />
                <Route path='/verificationreport' element={<VerificationReport/>} /> */}

                <Route path='/viewemployee' element={<ProtectedRoute element={<ViewEmployee />} requiredRole="hr" />} />
                <Route path='/pendingverificationrecord' element={<ProtectedRoute element={<PendingVerificationRecord />} requiredRole="hr" />} />
                <Route path='/verificationreport' element={<ProtectedRoute element={<VerificationReport />} requiredRole="hr" />} />
                
                </Route>
            </Routes>

            <Routes>
                <Route element={<HeadHrLayout />}>
                {/* <Route path='/recordstatus' element={<RecordStatus/>} />
                <Route path='/recordreport' element={<RecordReport/>} />
                <Route path='/headhrpendingverificationrecords' element={<HeadHrPendingVerificationRecords/>} /> */}

                <Route path='/recordstatus' element={<ProtectedRoute element={<RecordStatus />} requiredRole="headhr" />} />
                <Route path='/recordreport' element={<ProtectedRoute element={<RecordReport />} requiredRole="headhr" />} />
                <Route path='/headhrpendingverificationrecords' element={<ProtectedRoute element={<HeadHrPendingVerificationRecords />} requiredRole="headhr" />} />

                </Route>
            </Routes>
            <Routes>
                <Route element={<HeadAgentLayout />}>
                {/* <Route path='/addagent' element={<AddAgents/>} />
                <Route path='/assigntasks' element={<AssignTasks/>} />
                <Route path='/taskstatus' element={<TaskStatus/>} /> */}

                <Route path='/addagent' element={<ProtectedRoute element={<AddAgents />} requiredRole="headagent" />} />
                <Route path='/assigntasks' element={<ProtectedRoute element={<AssignTasks />} requiredRole="headagent" />} />
                <Route path='/taskstatus' element={<ProtectedRoute element={<TaskStatus />} requiredRole="headagent" />} />
                </Route>
            </Routes>

            <Routes>
                <Route element={<AgentLayout />}>
                {/* <Route path='/viewrecordstoverify' element={<ViewRecordsToVerify/>} />
                <Route path='/agentrecordstatus' element={<AgentRecordStatus/>} />
                <Route path='/referencecheck' element={<ReferenceCheck/>} /> */}

                <Route path='/viewrecordstoverify' element={<ProtectedRoute element={<ViewRecordsToVerify />} requiredRole="agent" />} />
                <Route path='/agentrecordstatus' element={<ProtectedRoute element={<AgentRecordStatus />} requiredRole="agent" />} />
                <Route path='/referencecheck' element={<ProtectedRoute element={<ReferenceCheck />} requiredRole="agent" />} />
                </Route>
            </Routes>

            <Routes>
                <Route element={<VerifierLayout />}>
                <Route path='/viewassignedrecords' element={<ProtectedRoute element={<ViewAssignedRecords />} requiredRole="verifier" />}  />
                
                </Route>
            </Routes>

            {/* <Routes>
                <Route element={<PsychiatristLayout />}>
                    <Route path="/patientehr" element={<ProtectedRoute element={<PatientEhr />} />} />
                    <Route path="/viewassignedappointment" element={<ProtectedRoute element={<ViewAppointment />} />} />
                    <Route path="/careplanschedule" element={<ProtectedRoute element={<CarePlanSchedule />} />} />
                </Route>
            </Routes> */}
            {/* <Routes>
                <Route element={<PsychiatristLayout />}>
                    
                </Route>
            </Routes> */}

            {/* <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/adminappointment" element={<ProtectedRoute element={<AdminAppointment />} />} />
                    <Route path="/psychiatristrecord" element={<ProtectedRoute element={<PsychiatristRecords />} />} />
                    <Route path="/patientrecord" element={<ProtectedRoute element={<PatientRecords />} />} />
                </Route>
            </Routes> */}
            {/* <Routes>
                <Route element={<AdminLayout />}>
                    
                </Route>
            </Routes> */}


        </Router>
    );
};

export default App;

