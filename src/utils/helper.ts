import parsePhoneNumberFromString from "libphonenumber-js";

// to get logged in user's details
export const getUser = () => {
	const user = localStorage.getItem("super_user");
	if (user) return JSON.parse(user);
	return null;
};

// to set logged in user's details
export const setUser = (user: object) => {
	localStorage.setItem("super_user", JSON.stringify(user));
};

export const setThemeInLS = (theme: "LIGHT" | "DARK") => {
	localStorage.setItem("theme", theme);
};

// to set logged in user's details
export const removeUser = () => {
	localStorage.removeItem("super_user");
};

// to get logged in user's role
export const getUserRole = () => {
	const user = JSON.parse(localStorage.getItem("super_user") || "");
	if (user) {
		return user?.role;
	} else {
		return null;
	}
};

export function providesList(resultsWithIds: any[], tagType: string) {
	return resultsWithIds
		? [
				{ type: tagType, id: "LIST" },
				...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
			]
		: [{ type: tagType, id: "LIST" }];
}

export const getErrorMessage = (error: any) => {
	if (!error) return "An unknown error occurred";

	const message = error.response?.data?.message;

	if (Array.isArray(message)) {
		return message.map((msg) => msg.toString()).join(", ");
	} else if (message) {
		return message.toString();
	} else if (error.message) {
		return error.message;
	} else {
		return error;
	}
};
export function timeToSeconds(time?: string): number | undefined {
	if (!time) {
		return undefined;
	}

	const [hours, minutes, seconds] = time.split(":").map(Number);

	if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
		throw new Error("Invalid time format. Please use HH:MM:SS format.");
	}

	return hours * 3600 + minutes * 60 + seconds;
}

export const validatePhoneNumber = (_: any, value: any) => {
	if (!value) {
		return Promise.reject(new Error("Enter your phone number"));
	}

	try {
		const phoneNumber = parsePhoneNumberFromString(value);
		if (!phoneNumber || !phoneNumber.isValid()) {
			return Promise.reject(new Error("Valid phone no. required"));
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(new Error("Valid phone no. required"));
	}
};
