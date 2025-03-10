import React from 'react'

const UserCard = ({ user, setUsers }) => {
	return (
		<div
			className="group bg-white rounded-lg shadow-md p-8 w-60 h-60 sm:w-72 sm:h-72 ml-10 mr-10 flex flex-col items-center justify-center transition-transform transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
			onClick={() => setUsers(user)}
		>
			<img src={`${user}.png`} alt={`${user}`} className="w-20 h-20 mb-4 sm:w-24 sm:h-24" />
			<h2 className="text-xl font-semibold text-gray-700 group-hover:text-primary sm:text-lg">
				{user}
			</h2>
		</div>


	)
}

export default UserCard
