/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			screens: {
				xs: "480px", // Example: for screens smaller than `sm`
			},
		},
	},
	plugins: [],
};
