import React from 'react'
import { useState } from "react";
import Login from "./Login";
import SelectUser from "./SelectUser";

const User = ({ setQuery, Register ,setPatientId}) => {
	const [isRegistered, setIsRegistered] = useState(Register);
	const [users, setUsers] = useState("select");
	console.log(users,"sadyhfhg")
	return (
		<div>
			{users === "select" ? (
				<SelectUser setUsers={setUsers} />
			) : (
				<section className=' h-screen bg-primary'>
					<main className="relative h-[100%] overflow-hidden">
						
						<div
							className={`absolute inset-0 transition-transform duration-500 ${isRegistered ? "translate-x-0" : "translate-x-full"
								}`}
						>
							<Login
								isRegistered={isRegistered}
								setIsRegistered={setIsRegistered}
									users={users}
									setPatientId={setPatientId}
							/>
						</div>
					</main>
				</section>
			)}
		</div>
	);
};

export default User;

