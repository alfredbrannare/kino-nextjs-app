export const MovieHeader = ({ title, description }) => (
	<div className="mb-6">
		<h1 className="text-4xl font-bold mb-2">{title}</h1>
		<div className="bg-gray-800 rounded-lg p-4 text-gray-200 mb-4">
			<p>{description}</p>
		</div>
	</div>
);
