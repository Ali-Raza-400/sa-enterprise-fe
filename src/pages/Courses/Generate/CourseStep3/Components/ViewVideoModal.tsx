import ReactPlayer from "react-player";
import GenericModal from "../../../../../components/UI/GenericModal";
// import GenericButton from "../../../../../components/UI/GenericButton";

type showProps = { show: boolean; url: string };

interface ViewVideoModalProps {
	data: showProps;
	onClose: () => void;
}

const ViewVideoModal = ({ data, onClose }: ViewVideoModalProps) => {
	return (
		<GenericModal show={data?.show} onClose={onClose} width={800} footer={null}>
			<div className="my-10">
				<ReactPlayer url={data?.url} controls={true} className="!w-full" />
			</div>
		</GenericModal>
	);
};

export default ViewVideoModal;
