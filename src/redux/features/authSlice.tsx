import { createSlice } from "@reduxjs/toolkit";
import { THEME } from "../../utils/constants";

let user = localStorage.getItem("super_user");
if (user) {
	user = JSON.parse(user);
} else {
	user = null;
}

let theme = localStorage.getItem("theme") || null;

if (!theme) {
	localStorage.setItem("theme", THEME.LIGHT);
	theme = THEME.LIGHT;
}

const initialState = {
	user: user,
	theme: theme,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, user) => {
			state.user = user.payload;
		},
		setTheme: (state, theme) => {
			state.theme = theme.payload;
		},
	},
});

export const { setCredentials, setTheme } = slice.actions;

export default slice.reducer;
