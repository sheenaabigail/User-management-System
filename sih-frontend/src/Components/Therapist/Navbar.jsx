// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import logo from "../../voicelift_logo2.jpg"; 
// const Navbar = () => {
//   const therapistId = "673de347173bfb0272228fef";
//   const [name, setName] = useState(null);

//   useEffect(() => {
//     const getName = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getName?id=${therapistId}`);
//         setName(response.data);
//       } catch (err) {
//         console.error("Unable to fetch the name of the therapist", err);
//       }
//     };
//     getName();
//   }, []);  

//   return (
//     <nav className="t-navbar">
//       <div className="t-navbar-logo">
//         <a href="/">
//           <img src={logo} alt="VoiceLift Logo" className="logo-image" />
//         </a>
//       </div>
//       <div className="t-navbar-links">
//         {name ? <h1>Welcome, {name.name}!</h1> : <h1>Loading...</h1>}
//         <a href="/therapist/report">Report</a>
//         <a href="/logout">Logout</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
