import { Col, Form, Row, Select } from "antd";
import Typography from "../../components/UI/Typography";
import GenericButton from "../../components/UI/GenericButton";
import STRINGS from "../../utils/strings";
import InputField from "../../components/Form/InputField";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
	MdOutlineLocationOn,
	MdOutlineMail,
	MdOutlineNumbers,
} from "react-icons/md";
import { useRegisterMutation } from "../../redux/slices/auth";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage, setUser } from "../../utils/helper";
import { AuthResponseDTO, RegisterRequestDTO } from "./type";
import PATH from "../../navigation/Path";
import GenericUpload from "../../components/UI/uploadCertificates";
import { setCredentials } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { COURSE_CATEGORIES, EDUCATION } from "../../utils/constants";
import { IoBook } from "react-icons/io5";
import IMAGES from "../../assets/images";
import {
	useLazyGetCitiesQuery,
	useLazyGetCountriesQuery,
	useLazyGetStatesQuery,
} from "../../redux/slices/user";
import { useEffect, useRef, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const Index = () => {
	const [form] = Form.useForm();
	const [registerFunc, { isLoading }] = useRegisterMutation();
	const { openNotification, contextHolder } = useNotification();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const signinRedirect = () => {
		navigate("/");
	};

	const handleFormFinish = async (values: RegisterRequestDTO) => {
		const payload: any = {
			fullName: values?.fullName,
			email: values.email,
			age: values?.age,
			password: values.password,
			phoneNumber: form?.getFieldValue("phoneNumber"),
			address: values?.address,
			role: "Student",
			education: values?.education,
			interest: values?.interest,
			certitifications: values?.files,
			stateName: values?.province,
			countryName: values?.country,
			cityName: values?.city,
		};

		try {
			const response = await registerFunc(payload).unwrap();
			if (response) {
				setUser(response as AuthResponseDTO);
				dispatch(setCredentials(response));
				navigate("/");
			} else {
				openNotification({
					type: "error",
					title: getErrorMessage(response),
				});
			}
			openNotification({
				type: "success",
				title: "OTP send to email successfully",
			});
			navigate(PATH.OTP_SCREEN), form.resetFields();
		} catch (error: unknown) {
			openNotification({
				type: "error",
				title: getErrorMessage(error),
			});
		}
	};

	const { Option } = Select;
	const [getStates, { data: statesData }] = useLazyGetStatesQuery();
	const [getCountries, { data: countriesData }] = useLazyGetCountriesQuery();
	const [getCities, { data: citiesData }] = useLazyGetCitiesQuery();
	const [selected, setSelected] = useState({
		province: "",
		country: 167,
	});

	const [options, setOptions] = useState<any>({
		countryOptions: {
			filters: {},
			pagination: { page: 1, pageSize: 10 },
		},
		provinceOptions: {
			filters: {},
			pagination: { page: 1, pageSize: 10 },
		},
		cityOptions: {
			filters: {},
			pagination: { page: 1, pageSize: 5000 },
		},
	});

	const debounceTimeoutRef = useRef<any | null>(null);

	const onSearch = (name: string, type: "country" | "province" | "city") => {
		if (debounceTimeoutRef?.current) {
			clearTimeout(debounceTimeoutRef?.current);
		}

		debounceTimeoutRef.current = setTimeout(() => {
			setOptions((prevState: any) => {
				const updatedOptions = { ...prevState };

				if (type === "country") {
					getCountries({
						tableOptions: {
							...updatedOptions?.countryOptions,
							filters: {
								...updatedOptions?.countryOptions?.filters,
								name: name,
							},
						},
					});
				} else if (type === "province") {
					getStates({
						tableOptions: {
							...updatedOptions?.provinceOptions,
							filters: {
								...updatedOptions?.provinceOptions?.filters,
								name: name,
							},
						},
						id: selected?.country,
					});
				} else if (type === "city") {
					getCities({
						tableOptions: {
							...updatedOptions?.cityOptions,
							filters: {
								...updatedOptions?.cityOptions?.filters,
								name: name,
							},
						},
						id: selected?.province,
					});
				}

				return updatedOptions;
			});
		}, 500);
	};

	const handleDropdownVisibleChange = (open: boolean) => {
		if (open) {
			getCountries({ tableOptions: options?.countryOptions });
		}
	};

	const handleCountryOnChange = (_val: unknown, obj: any) => {
		form?.setFieldValue("province", null);
		form?.setFieldValue("city", null);
		setSelected((prev) => {
			return {
				...prev,
				country: obj?.key,
			};
		});
		getStates({
			id: obj?.key,
			tableOptions: options?.provinceOptions,
		});
	};

	const handleProvinceChange = (_val: unknown, obj: any) => {
		form?.setFieldValue("city", null);
		setSelected((prev) => {
			return {
				...prev,
				province: obj?.key,
			};
		});

		getCities({
			id: obj?.key,
			tableOptions: {
				filters: {},
				pagination: { page: 1, pageSize: 5000 },
			},
		});
	};

	useEffect(() => {
		getStates({
			id: selected?.country,
			tableOptions: options?.provinceOptions,
		});
	}, [selected?.country]);

	const validatePhoneNumber = (_: any, value: any) => {
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

	return (
		<>
			{contextHolder}
			<div
				className="form-fields-custom-css justify-center flex custom-select-height h-screen "
				style={{
					backgroundImage: `url(${IMAGES.LMS_IMAGE})`,
				}}
			>
				<div className="absolute inset-0 bg-[#8970d6] opacity-95" />
				<Row gutter={24} className="flex justify-center w-full  ">
					<Col
						sm={24}
						lg={12}
						xl={12}
						md={24}
						span={24}
						className="hidden md:block"
					>
						<div className="w-full relative bg-contain bg-center ">
							<div
								className="flex w-full h-full lg:justify-start justify-center
							 lg:items-center items-start  translate-x-2 lg:translate-x-28 
							 lg:translate-y-[35vh] xl:translate-y-[29vh] sm:translate-y-[2vh] translate-y-10"
							>
								{/* <img
									src={IMAGES.ALMS_LOGO_NEW2}
									alt="LMS Logo"
									className="z-10"
									style={{
										width: "clamp(100px, 25vw, 500px)",
										height: "clamp(50px, 15vw, 500px)",
									}}
								/> */}
							</div>
						</div>
					</Col>
					<Col
						sm={24}
						lg={12}
						md={24}
						className="overflow-scroll h-[calc(100vh-8rem)] m-auto"
						span={24}
					>
						<div className="w-full flex flex-col justify-center items-center ">
							<Typography
								variant="headingOneLight"
								noMargin
								className="text-center dark:text-white justify-center  text-white"
							>
								Sign Up
							</Typography>

							<div className="flex justify-center items-center">
								<span className="text-base font-normal text-white">
									Already a member?
								</span>
								<GenericButton
									color="primary"
									variant="link"
									label="Sign in"
									className="p-1 !min-w-0"
									onClick={signinRedirect}
								/>
							</div>

							<Form
								name="normal_login"
								form={form}
								className="login-form mt-0"
								initialValues={{
									country: "Pakistan",
								}}
								autoComplete="off"
								onFinish={handleFormFinish}
							>
								<InputField
									name="fullName"
									rules={[
										{
											required: true,
											message: `Full name is required`,
										},
									]}
									autoComplete="off"
									inputPrefix={<UserOutlined />}
									placeholder={STRINGS.FULLNAME}
									inputType="input"
									margin="medium"
								/>

								<div>
									<InputField
										name="email"
										rules={[
											{
												required: true,
												message: `${STRINGS.EMAIL} is required`,
											},
										]}
										autoComplete="off"
										inputPrefix={<MdOutlineMail />}
										placeholder="Email"
										inputType="input"
										margin="medium"
									/>
								</div>
								<Row gutter={16}>
									<Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
										<InputField
											name="age"
											rules={[
												{
													required: false,
													message: `${STRINGS.AGE} is required`,
												},
											]}
											autoComplete="off"
											prefix={(<MdOutlineNumbers />) as any}
											placeholder="Age (optional)"
											inputType="number"
											margin="medium"
										/>
									</Col>

									<Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
										{/* <InputField
											name="phoneNumber"
											rules={[
												{
													required: false,
													message: `${STRINGS.PHONE} is required`,
												},
											]}
											autoComplete="off"
											inputPrefix={<MdOutlinePhoneCallback />}
											placeholder="Phone No"
											inputType="input"
											margin="medium"
										/> */}
										<Form.Item
											name="phoneNumber"
											rules={[
												{
													required: true,
													message: `${STRINGS.PHONE} is required`,
												},
												{ validator: validatePhoneNumber },
											]}
											// validateTrigger={["onBlur", "onSubmit", "onKeyPress"]}
										>
											<PhoneInput
												defaultCountry="pk"
												// onChange={(phone) =>
												// 	form?.setFieldValue("phoneNumber", phone)
												// }
												className="custom-phone"
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="country"
											rules={[
												{
													required: true,
													message: `${STRINGS.COUNTRY} is required`,
												},
											]}
										>
											<Select
												placeholder="Type to search country"
												style={{ width: "100%" }}
												suffixIcon={<MdOutlineMail />} // Note: Ant Design uses `suffixIcon` for icon on the right
												onDropdownVisibleChange={handleDropdownVisibleChange}
												onSearch={(a: string) => onSearch(a, "country")}
												onChange={(value, obj) =>
													handleCountryOnChange(value, obj)
												}
												showSearch
											>
												{countriesData?.map((country: any) => (
													<Option key={country?.id} value={country?.name}>
														{country?.name}
													</Option>
												))}
											</Select>
										</Form.Item>
									</Col>

									<Col span={12}>
										<Form.Item
											name="province"
											rules={[
												{
													required: true,
													message: `${STRINGS.PROVINCE} is required`,
												},
											]}
										>
											<Select
												placeholder="Type to search province"
												style={{ width: "100%" }}
												suffixIcon={<MdOutlineMail />}
												disabled={!form?.getFieldValue("country")}
												onSearch={(a: string) => onSearch(a, "province")}
												onChange={(val, obj) => handleProvinceChange(val, obj)}
												showSearch
											>
												{statesData?.map((province: any) => (
													<Option key={province?.id} value={province?.name}>
														{province?.name}
													</Option>
												))}
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Form.Item
									name="city"
									rules={[
										{
											required: true,
											message: `${STRINGS.CITY} is required`,
										},
									]}
								>
									<Select
										placeholder="Type to search city"
										disabled={!form?.getFieldValue("province")}
										style={{ width: "100%" }}
										onSearch={(a: string) => onSearch(a, "city")}
										showSearch
										suffixIcon={<MdOutlineMail />} // Note: Ant Design uses `suffixIcon` for icon on the right
									>
										{citiesData?.map((city: any) => (
											<Option key={city?.id} value={city?.name}>
												{city?.name}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									className="interest-input-style"
									name="interest"
									rules={[
										{
											required: true,
											message: `${STRINGS.INTERESTS} is required`,
										},
									]}
								>
									<Select
										mode="multiple"
										maxTagCount={2}
										placeholder="Select Interest"
										style={{ width: "100%" }}
										suffixIcon={<MdOutlineMail />} // Note: Ant Design uses `suffixIcon` for icon on the right
									>
										{COURSE_CATEGORIES.map((interest) => (
											<Option key={interest.value} value={interest.value}>
												{interest.label}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name="education"
									rules={[
										{
											required: true,
											message: `${STRINGS.EDUCATION} is required`,
										},
									]}
								>
									<Select
										placeholder={"Select Education"}
										style={{ width: "100%" }}
										suffixIcon={<IoBook fill="gray" />}
									>
										{EDUCATION.map((education) => (
											<Option key={education} value={education}>
												{education}
											</Option>
										))}
									</Select>
								</Form.Item>
								<div>
									<InputField
										name="address"
										rules={[
											{
												required: true,
												message: `${STRINGS.ADDRESS} is required`,
											},
										]}
										autoComplete="off"
										inputPrefix={<MdOutlineLocationOn />}
										placeholder="Address"
										inputType="input"
										margin="medium"
									/>
								</div>
								<Row gutter={16}>
									<Col span={12}>
										<InputField
											name="password"
											rules={[
												{
													required: true,
													message: `${STRINGS.PASSWORD} is required`,
												},
												{
													pattern:
														/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
													message: (
														<>
															Must be 8+ characters - combination of uppercase
															(A-Z), lowercase (a-z), number (0-9), special
															character (e.g., @, #, $, %)
														</>
													),
												},
											]}
											autoComplete="off"
											placeholder="Password"
											inputType="password"
											inputPrefix={<LockOutlined />}
											margin="medium"
										/>
									</Col>

									<Col span={12}>
										<InputField
											name="confirmPassword"
											// dependencies={["password"]}
											rules={[
												{
													required: true,
													message: `Confirm password is required`,
												},
												({ getFieldValue }) => ({
													validator(_, value) {
														if (!value || getFieldValue("password") === value) {
															return Promise.resolve();
														}
														return Promise.reject(
															new Error("Passwords do not match")
														);
													},
												}),
											]}
											autoComplete="off"
											placeholder="Confirm Password"
											inputType="password"
											inputPrefix={<LockOutlined />}
											margin="medium"
										/>
									</Col>
								</Row>
								<div className="uploader-css">
									<Form.Item
										name="files"
										rules={[
											{
												required: false,
												message: "Please upload at least one file!",
											},
										]}
									>
										<GenericUpload form={form} name="files" />
									</Form.Item>
								</div>

								<div className="mt-2 gap-1 space-y-5 ">
									<GenericButton
										color="primary"
										block={false}
										label="Sign Up"
										htmlType="submit"
										disabled={isLoading}
										loading={isLoading}
										className="p-1 !w-[100%] !h-12"
									/>

									{/* <GenericButton
                    color="primary"
                    label="Continue with Google"
                    block={false}
                    icon={<FcGoogle size={24} />}
                    variant="outlined"
                    disabled={isLoading}
                    loading={isLoading}
                  /> */}
								</div>
							</Form>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Index;
