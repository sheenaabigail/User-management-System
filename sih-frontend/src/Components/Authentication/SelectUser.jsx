
import React from 'react';
import UserCard from './UserCard';
const SelectUser = ({ setUsers }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center font-sans pb-10 bg-background hover:text-primary">
			<h1 className="text-4xl font-bold text-primary m-8">Select User</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{/* Patient Card */}
				<UserCard
					user="Admin"
					setUsers={setUsers}
				/>
				{/* Therapist Card */}
				<UserCard
					user="Therapist"
					setUsers={setUsers}
				/>
				{/*Supervisor Card*/}
				<UserCard
					user="Supervisor"
					setUsers={setUsers}
				/>
	<UserCard
					user="HOD"
					setUsers={setUsers}
				/>
			</div>
		</div>
	);
};

export default SelectUser;

