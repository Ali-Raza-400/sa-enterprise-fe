export type Teacher = {
	id: string;
	fullName: string;
	email: string;
	cnic: string;
	address: string;
	isActive: boolean;
	imageUrl: string | null;
	role: "Teacher";
	describeYourSelf: string | null;
};
