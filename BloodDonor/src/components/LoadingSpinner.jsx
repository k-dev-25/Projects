function LoadingSpinner() {
	return (
		<div className="mt-8 flex justify-center">
			<div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-red-500 animate-spin" />
		</div>
	);
}

export default LoadingSpinner;
