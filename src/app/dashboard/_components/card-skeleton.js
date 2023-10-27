export default function CardSkeleton() {
    return (
        <a role="status" className="animate-pulse max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <div>
                <h5 className="mt-2 h-3.5 mb-2 bg-gray-200 rounded-full"></h5>
                <h5 className="h-3.5 mb-2 bg-gray-200 rounded-full max-w-[50%]"></h5>
                <p className="h-[0.76rem] mb-2 bg-gray-400 rounded-full max-w-[28%]"></p>
            </div>
            <p className="h-[0.76rem] mb-2 mt-5 bg-gray-400 rounded-full"></p>
            <p className="h-[0.76rem] mb-2 bg-gray-400 rounded-full max-w-[80%]"></p>
            <p className="h-[0.76rem] mb-2 bg-gray-400 rounded-full max-w-[90%]"></p>
            <p className="h-[0.76rem] mb-2 bg-gray-400 rounded-full max-w-[70%]"></p>
        </a>
    )
}