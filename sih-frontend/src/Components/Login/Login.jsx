import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isRegistered, setIsRegistered, users }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [error, setError] = useState(null); // For server errors

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Real-time validation
		if (name === "email" && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
			setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
		} else if (name === "password" && value.length < 6) {
			setErrors((prev) => ({
				...prev,
				password: "Password must be at least 6 characters.",
			}));
		} else {
			setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error
		}
	};

	const validateInputs = () => {
		const newErrors = {};
		if (!formData.email) {
			newErrors.email = "Email is required.";
		} else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
			newErrors.email = "Enter a valid email address.";
		}

		if (!formData.password) {
			newErrors.password = "Password is required.";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
	console.log(users);
		console.log(formData);

		if (!validateInputs()) return; // Stop if validation fails
			try {
			const response = await fetch(`http://localhost:5000/api/${users}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json"},
				body: JSON.stringify(formData),
			});
			console.log(response);
			const result = await response.json();
			console.log(result);
			if (response.status === 200) {
				const data = { 'user': users, 'id': result.id };
				localStorage.setItem("data", JSON.stringify(data));
				console.log(users);
				navigate(`/${users}/${result.id}`);
			} else {
				setError(result.message || "Login failed.");
			}
		} catch (error) {
			console.log(error);
			setError("An unexpected error occurred. Please try again later.");
		}
	};

	const handleToggle = () => {
		setIsRegistered(!isRegistered);
	};

	return (
		<div className="h-screen md:flex">
			{/* Left section */}
			<div className="flex md:w-1/2 justify-center items-center bg-white">
				<form className="bg-white" onSubmit={handleSubmit}>
					<h1 className="text-gray-800 font-bold text-2xl mb-1">
						Welcome to VoiceLift
					</h1>
					<p className="text-sm font-normal text-gray-600 mb-7">Let's Begin</p>

					{/* Email Field */}
					<div className="flex flex-col mb-4">
						<div className="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
								/>
							</svg>
							<input
								className="pl-2 outline-none border-none w-full"
								type="text"
								placeholder="Email Address"
								name="email"
								value={formData.email}
								onChange={handleChange}
								aria-label="Email Address"
							/>
						</div>
						{errors.email && (
							<span className="text-red-500 text-sm mt-1">{errors.email}</span>
						)}
					</div>

					{/* Password Field */}
					<div className="flex flex-col mb-4">
						<div className="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								className="pl-2 outline-none border-none w-full"
								type="password"
								placeholder="Password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								aria-label="Password"
							/>
						</div>
						{errors.password && (
							<span className="text-red-500 text-sm mt-1">{errors.password}</span>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
					>
						Login
					</button>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}

					{/* Other Options */}
					<span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
						Forgot Password?
					</span>
					<span
						className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
						onClick={handleToggle}
					>
						Register
					</span>
				</form>
			</div>
			{/* Left section */}
			<div className="relative md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
				<div>
					<h1 className="text-white font-bold text-4xl font-sans">VoiceLift</h1>
					<p className="text-white mt-1">The one-stop solution to recall stuff.</p>
					<button
						type="submit"
						className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
					>
						Read More
					</button>
				</div>

				{/* Floating circles */}
				<div
					className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-30"
					style={{
						width: "150px",
						height: "150px",
						top: "10%",
						left: "15%",
					}}
				></div>
				<div
					className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-30"
					style={{
						width: "200px",
						height: "200px",
						bottom: "5%",
						right: "10%",
					}}
				></div>
				<div
					className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-30"
					style={{
						width: "180px",
						height: "180px",
						top: "30%",
						right: "5%",
					}}
				></div>
				<div
					className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-30"
					style={{
						width: "120px",
						height: "120px",
						bottom: "15%",
						left: "20%",
					}}
				></div>
			</div>


		</div>
	);
};

export default Login;

