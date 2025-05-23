export const MovieHeader = ({ title, description }) => (
	<div className="mb-6">
		<h1 className="text-4xl font-bold mb-2">{title}</h1>
		<div className="bg-[#2B0404] text-xl rounded-2xl shadow-lg p-4 text-gray-200 mb-4 border border-yellow-400">
			<p>{description}</p>
		</div>
	</div>
);
