// import { createSlice } from "@reduxjs/toolkit";
// import { THEME } from "../../utils/constants";

// let user = localStorage.getItem("super_user");
// if (user) {
// 	user = JSON.parse(user);
// } else {
// 	user = null;
// }

// let theme = localStorage.getItem("theme") || null;

// if (!theme) {
// 	localStorage.setItem("theme", THEME.LIGHT);
// 	theme = THEME.LIGHT;
// }

// const initialState = {
// 	user: user,
// 	theme: theme,
// };

// const slice = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		setCredentials: (state, user) => {
// 			state.user = user.payload;
// 		},
// 		setTheme: (state, theme) => {
// 			state.theme = theme.payload;
// 		},
// 	},
// });

// export const { setCredentials, setTheme } = slice.actions;

// export default slice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

// ✅ Add `selectedZoneId` in initial state
const initialState = {
	user: user,
	theme: theme,
	selectedZoneId: null as number | null, // New field
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
		// ✅ New action for setting zoneId
		setZoneId: (state, action: PayloadAction<number | null>) => {
			state.selectedZoneId = action.payload;
		},
	},
});

export const { setCredentials, setTheme, setZoneId } = slice.actions;
export default slice.reducer;