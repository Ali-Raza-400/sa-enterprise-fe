// TeacherTypes.ts

export interface Qualification {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Institute: string;
  Degree: string;
  startingDate: string;
  endingDate: string;
}

// Generic publication type
export interface Publication {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Title: string;
  Journal: string;
  URL: string;
  publishDate: string;
  issuedDate?: string;
}

// Generic certification type
export interface Certification {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  certificateTitle: string;
  issuer: string;
  certificationDate: string;
  uploadedDocument?: string;
}

// Main teacher data type
export interface TeacherData<
  TQualification = Qualification,
  TPublication = Publication,
  TCertification = Certification,
> {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fullName: string;
  email: string;
  cnic: string;
  address: string;
  isActive: boolean;
  isApproved: boolean;
  imageUrl: string;
  socialId: string | null;
  loginType: string | null;
  password: string;
  role: string;
  describeYourSelf: string;
  age: number;
  phoneNumber: string;
  facebookProfileLink: string;
  linkedinProfileLink: string;
  twitterProfileLink: string;
  teacherQualifications: TQualification[];
  teacherPublications: TPublication[];
  teacherCertifications: TCertification[];
}

export interface PublicationPayload {
  Title: string;
  Journal: string;
  publishDate: string;
  URL: string;
}

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fullName: string;
  email: string;
  cnic: string;
  address: string;
  isActive: boolean;
  isApproved: boolean;
  imageUrl: string;
  socialId: string | null;
  loginType: string | null;
  password: string;
  role: string;
  describeYourSelf: string;
  age: number;
  phoneNumber: string;
  facebookProfileLink: string;
  linkedinProfileLink: string;
  twitterProfileLink: string;
}

interface PublicationData {
  Title: string;
  Journal: string;
  URL: string;
  publishDate: string;
  user: User;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SavePublicationResponse {
  statusCode: number;
  message: string;
  data: PublicationData;
}

// Payload structure for updating a publication
export interface UpdatePublicationPayload {
  Title: string;
  Journal: string;
  URL: string;
  publishDate: string;
}

// Expected response structure for the update publication mutation
export interface UpdatePublicationResponse {
  statusCode: number;
  message: string;
  data: {
    Title: string;
    Journal: string;
    URL: string;
    publishDate: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface DeletePublicationResponse {
  statusCode: number;
  message: string;
  data: null;
}

// Expected payload structure for saving a qualification
export interface SaveQualificationPayload {
  Institute: string;
  Degree: string;
  startingDate: string;
  endingDate: string;
}

// Reusable type for user details in the response

// Expected response structure for saving a qualification
export interface SaveQualificationResponse {
  statusCode: number;
  message: string;
  data: {
    Institute: string;
    Degree: string;
    startingDate: string;
    endingDate: string;
    user: User;
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface UpdateQualificationPayload {
  Institute: string;
  Degree: string;
  startingDate: string;
  endingDate: string;
}

export interface UpdateQualificationResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    Institute: string;
    Degree: string;
    startingDate: string;
    endingDate: string;
  };
}

export interface DeleteQualificationResponse {
  statusCode: number;
  message: string;
  data: null;
}

export interface SaveCertificationPayload {
  certificateTitle: string;
  issuer: string;
  uploadedDocument: string;
  certificationDate: string;
}
// Type for the response after saving the certification
export interface SaveCertificationResponse {
  statusCode: number;
  message: string;
  data: {
    certificateTitle: string;
    issuer: string;
    certificationDate: string;
    uploadedDocument: string;
    user: {
      id: string;
    };
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface UpdateCertificationPayload {
  certificateTitle: string;
  issuer: string;
  uploadedDocument: string;
  certificationDate: string;  // This will be an ISO string (e.g., "2024-11-06T08:05:14.872Z")
}

export interface UpdateCertificationResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    certificateTitle: string;
    issuer: string;
    certificationDate: string;
    uploadedDocument: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface DeleteCertificationResponse {
  statusCode: number;
  message: string;
  data: null;
}

export interface TableOptions {
	filters?: Record<string, unknown>;
	pagination: {
		page: number;
		pageSize: number;
	};
}


export interface GetAllStudentsParams {
	id?: string;
	tableOptions: TableOptions;
}
