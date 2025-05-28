import { Wrench } from "lucide-react";

const ErrorMessage = ({ error }) => {
    return (
        <div
            className="flex flex-col items-center justify-center h-64 my-6 text-center border-4 rounded-md border-red-400 shadow-[inset_0_0_10px_#f87171,0_0_20px_#f87171] px-5 mx-auto max-w-lg"
        >
            <Wrench
                width={100}
                height={100}
                className="text-red-400"
            />
            <p className="text-red-400 text-xl font-bold">{error}</p>
        </div>
    )
}

export default ErrorMessage;