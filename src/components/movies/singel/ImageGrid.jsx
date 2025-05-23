export const ImageGrid = ({ imageUrl, imageTitle, children }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
		<div className="col-span-1">{children}</div>
		<div className="col-span-1 flex justify-end">
			<img
				src={imageUrl}
				alt={imageTitle}
				className="w-full max-w-xs md:w-64 md:h-96 object-cover rounded-lg shadow-lg"
			/>
		</div>
	</div>
);
