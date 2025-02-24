import axios from "axios";
import { LoginRespDTO } from "../pages/Auth/type";

const user = localStorage.getItem("super_user");
const parsedUser: LoginRespDTO | null = user ? JSON.parse(user) : null;

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
	Authorization: "",
};
if (parsedUser) headers.Authorization = `Bearer ${parsedUser.access_token}`;

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	// baseURL: "http://localhost:5000/api/",
	headers,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401 && parsedUser) {
			window.location.href = "/";
		}
		let { message } = error.response.data;

		if (!message) {
			message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
		}

		const errors = {
			errors: error.response.data.errors,
			message,
		};

		// toast.error(message);

		throw errors;
	}
);

export default api;
