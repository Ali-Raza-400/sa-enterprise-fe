import {
	Form,
	Upload,
	message,
	UploadProps,
	FormInstance,
	Flex,
	Skeleton,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload/interface";
import GenericButton from "../../../components/UI/GenericButton";
import {
	useDeleteFileMutation,
	useUploadFileMutation,
} from "../../../redux/slices/file";
import IMAGES from "../../../assets/images";
import ImgCrop from "antd-img-crop";

interface ImageUploadProps {
	form?: FormInstance;
	name?: string;
	guidelines?: string;
	supportedFormat?: string;
	className?: string;
	isBanner?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	form,
	name,
	guidelines,
	supportedFormat,
	isBanner,
	// className,
}) => {
	const [uploadFile, { isLoading }] = useUploadFileMutation();
	const [deleteFile] = useDeleteFileMutation();
	Form.useWatch(name, form);

	const beforeUpload: UploadProps["beforeUpload"] = (file: RcFile) => {
		const isValidType =
			file.type === "image/jpeg" ||
			file.type === "image/jpg" ||
			file.type === "image/png";
		if (!isValidType) {
			message.error("You can only upload JPG, JPEG, or PNG files!");
			return Upload.LIST_IGNORE;
		}

		const isValidSize = file.size / 1024 / 1024 < 5;
		if (!isValidSize) {
			message.error("Image must be smaller than 5MB!");
			return Upload.LIST_IGNORE;
		}

		return true;
	};

	const onImageChange = (file: RcFile): Promise<RcFile> => {
		return new Promise<RcFile>((resolve) => {
			const img = new Image();
			img.src = URL.createObjectURL(file);

			img.onload = () => {
				uploadFile({
					file: file as RcFile,
				})
					.unwrap()
					.then((res) => {
						// console.log(img.width, img.height, "HWHW", img);
						console.log(res, "RES");
						form?.setFieldsValue({
							[name as string]: res?.[0],
						});
					});
				resolve(file);
			};
		});
	};

	const handleDelete = async () => {
		await deleteFile({
			file: form?.getFieldValue([name])?.key,
		})
			.unwrap()
			.then(() => {
				form?.resetFields([name]);
			});
	};

	return (
		<Flex gap={24} align="center">
			<div className="relative w-[16rem] h-[11rem]">
				{isLoading ? (
					<Skeleton.Image active className="!w-[16rem] !h-[11rem]" />
				) : (
					<img
						src={form?.getFieldValue([name])?.url || IMAGES.FAULT_IMG}
						alt="Preview"
						className="w-full h-full border border-[#d9d9d9] rounded object-cover"
					/>
				)}
				{form?.getFieldValue([name])?.url && (
					<div className="absolute top-1 right-1 flex space-x-2">
						<DeleteOutlined
							className="text-white bg-[#BA2A2A] rounded-full p-2 cursor-pointer"
							onClick={handleDelete}
							title="Delete"
						/>
					</div>
				)}
			</div>
			<Form.Item name={name} rules={[{ required: true, message: "*Required" }]}>
				<ImgCrop
					showGrid
					aspect={isBanner ? 1200 / 200 : 360 / 280}
					minZoom={1}
					maxZoom={2}
					quality={1}
					modalClassName="custom-modal"
					modalProps={{ closable: false }}
				>
					<Upload
						listType="text"
						maxCount={1}
						beforeUpload={beforeUpload}
						customRequest={({ file, onSuccess }) => {
							onImageChange(file as RcFile)
								.then(() => {
									if (onSuccess) {
										onSuccess("ok");
									}
								})
								.catch(() => {});
						}}
						showUploadList={false}
					>
						<div className="mt-5 space-y-5">
							<div className="whitespace-break-spaces">
								<div>
									<span className="text-sm font-normal">
										Upload your course Thumbnail here.
									</span>
									<br />
									<span className="text-sm font-semibold ">
										Important guidelines:
									</span>{" "}
									<span className="text-sm font-medium">
										{guidelines} pixels
									</span>
									<br />
									<span className="text-sm font-semibold ">
										Supported format:
									</span>
									<span className="text-sm font-medium ">
										{supportedFormat}
									</span>
								</div>
							</div>

							<GenericButton
								icon={<UploadOutlined />}
								iconPosition="end"
								label="Upload Image"
								className="w-[189px]"
							/>
						</div>
					</Upload>
				</ImgCrop>
			</Form.Item>
		</Flex>
		// <Row className="">
		//   <Col span={4}>

		//   </Col>

		//   <Col span={20} className="flex items-center">

		//   </Col>
		// </Row>
	);
};

export default ImageUpload;
