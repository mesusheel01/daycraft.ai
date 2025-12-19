export default function Error(
    { error, reset }
        : {
            error: Error,
            reset: () => void
        }
) {

    return <div className="flex items-center justify-center h-screen">
        <div>
            <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
            <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Try again</button>
        </div>
    </div>
}