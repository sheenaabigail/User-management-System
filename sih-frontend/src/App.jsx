import { useState } from 'react'
import Admin from './Components/Admin/Admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Therapist from './Components/Therapist/Therapist';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import HOD from './Components/HOD/HOD';
import SupervisorDashboard from './Components/Supervisor/SupervisorDashboard';
import SupervisorSidebar from './Components/Supervisor/SupervisorSidebar';
import User from './Components/Authentication/User';

function App() {
  const [count, setCount] = useState(0)

  return (
  
<div>
			<BrowserRouter>
				<Routes>
					<Route path="/Admin/:id" element={<Admin/>} />
					<Route path="/Supervisor/:id" element={<SupervisorDashboard/>} />
					<Route path="/HOD/:id" element={<HOD/>} />
					<Route path="SupervisorDashboard" element={<SupervisorSidebar/>} />
					<Route path="/Therapist/:id" element={<Therapist></Therapist>} />
					<Route path="/Login" element={<Login/>} />
					<Route path="/" element={<Landing/>} />
					<Route path="/Auth" element={<User Register={true} />} />
				</Routes>
			</BrowserRouter>
			
		</div>
	)
};

export default App;
