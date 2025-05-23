const InfoCard = ({ title, description }) => {
	return (
		<div className=" bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
			<div className="max-w-4xl mx-auto p-6">
				{/* Movie title */}
				<h1 className="text-4xl font-bold mb-2">{title}</h1>
				{/* Movie Info */}
				<div className="flex gap-4 mb-4">
					<span className="badge badge-accent">13+</span>
					<span>movie time</span>
					<span className="font-semibold">Aventure action family</span>
				</div>
				{/* Description */}
				<p className="mb-6">{description}</p>
			</div>
			{/* divider */}
			<div className="divider"></div>
		</div>
	);
};

export default InfoCard;
