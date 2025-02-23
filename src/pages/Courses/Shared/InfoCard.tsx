import Typography from "../../../components/UI/Typography";

export type dataType = {
	title: string;
	type: "list" | "tags";
	items: string[];
};

interface InfoCardProps {
	data: dataType[];
}

const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
	return (
		<div className="my-6">
			{data?.map((d, index) => (
				<div key={index} className="mb-4">
					<Typography variant="bodyXLargeBold">{d.title}</Typography>
					{d.type === "list" ? (
						<ul className="list-[circle] pl-5 mt-3 space-y-4">
							{d.items.map((item, itemIndex) => (
								<li key={itemIndex}>{item}</li>
							))}
						</ul>
					) : (
						<div className="flex flex-wrap gap-2 mt-3">
							{d.items.map((item, itemIndex) => (
								<span
									key={itemIndex}
									className="bg-[#E6E6E6] rounded-full px-3 py-1 text-sm font-normal "
								>
									{item}
								</span>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default InfoCard;
