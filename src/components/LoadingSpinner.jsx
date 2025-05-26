const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <span className="loading loading-spinner text-warning"></span>
            <p>Laddar in evenemang...</p>
        </div>
    )
}

export default LoadingSpinner;