import { Spin } from "antd";
type FullScreenProps = {
	forRequest?: boolean;
};
export default function FullScreenLoader({ forRequest }: FullScreenProps) {
	return (
		<div className={`loaderDiv ${forRequest && "for-request"}`}>
			<div className="spinner">
				<Spin className="mx-auto w-full" size="large" />
			</div>
		</div>
	);
}
