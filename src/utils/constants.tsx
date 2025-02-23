export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:MM:SS";
export const FULL_DATE_TIME_FORMAT = "MMMM D, YYYY h:mm A";
export const FULL_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

export const THEME = {
	LIGHT: "LIGHT",
	DARK: "DARK",
};

export enum ItemType {
	PROFILE = "profile",
	CERTIFICATION = "certification",
	PUBLICATION = "publication",
	QUALIFICATION = "qualification",
}

export const COURSE_CATEGORIES = [
	{ value: "General Audience", label: "General Audience" },
	{ value: "Freelancing", label: "Freelancing" },
	{
		value: "Specialized Audience Crash Courses",
		label: "Specialized Audience Crash Courses",
	},
	{ value: "Soft Skills", label: "Soft Skills" },
	// { value: "Artificial Intelligence", label: "Artificial Intelligence" },
	// { value: "Programming", label: "Programming" },
	// { value: "Data Analysis", label: "Data Analysis" },
	// { value: "Machine Learning", label: "Machine Learning" },
	// { value: "Web Development", label: "Web Development" },
	// { value: "Artificial Intelligence", label: "Artificial Intelligence" },
];
export const EDUCATION = [
	"High School Diploma",
	"Associate Degree",
	"Bachelor's Degree",
	"Master's Degree",
	"Doctorate (PhD)",
	"Professional Degree",
	"Vocational Training",
	"Certification",
];

export const COUERSE_DIFFICULTY = [
	{
		value: "Basic",
		label: "Basic",
	},
	{
		value: "Intermediate",
		label: "Intermediate",
	},
	{
		value: "Advanced",
		label: "Advanced",
	},
];
