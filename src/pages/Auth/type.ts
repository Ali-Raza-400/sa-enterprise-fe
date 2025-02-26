export type LoginRequestDTO = {
	email: string;
	password: string;
};

export type LoginRespDTO = {
	access_token: string;
	token_type: string;
	name?: string;
};
export interface truckFormValues {
	name: string;
	supervisor_id: string;
	license_plate: string;
	driver_id?: string;
}

export type RegisterRequestDTO = {
	province: string;
	country: string;
	city: string;
	fullName: string;
	email: string;
	password?: string;
	confirmPassword?: string;
	role: string;
	address?: string;
	loginType?: string | null;
	describeYourSelf?: string | null;
	phoneNumber?: string;
	cnic?: string;
	age?: string;
	facebookProfileLink?: string;
	linkedinProfileLink?: string;
	twitterProfileLink?: string;
	profileImage?: string;
	interest?: string[];
	education?: string;
	files?: string[];
};
export type ForgotRequestDTO = {
	email: string;
};
export type ForgotResponseDTO = {
	statusCode: number;
	message: string;
	data: [];
};
export interface AuthResponseDTO {
	id: string;
	fullName: string;
	email?: string;
	role: string;
	cnic: string | null;
	address: string;
	isActive: boolean;
	isApproved: boolean;
	imageUrl: string | null;
	socialId: string | null;
	loginType: string | null;
	describeYourSelf: string | null;
	age: number | null;
	phoneNumber: string;
	facebookProfileLink: string;
	linkedinProfileLink: string;
	twitterProfileLink: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	access_token: string;
	password?: string;
	interest?: UserInterest[];
}
export interface UserFormValues {
	first_name: string;
	last_name: string;
	email: string;
	address?: string;
	phone_number: string;
	cnic_number: string;
	role: "admin" | "superadmin" | "worker";
	password: string;
  }
export interface UpdatePasswordResponseDTO {
	email: string;
	password: string;
	confirmPassword?: string;
}
export interface UserFormValues {
	first_name: string;
	last_name: string;
	email: string;
	address?: string;
	phone_number: string;
	cnic_number: string;
	role: "admin" | "superadmin" | "worker";
	password: string;
  }
export type UpdatePasswordRequestDTO = LoginRequestDTO;

export interface UserInterest {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	interest: string[];
}
