import { Spin } from "antd";

export default function PageLoader() {
	return (
		<div className={`flex items-center`}>
			<Spin className="mx-auto w-full" size="default" />
		</div>
	);
}
