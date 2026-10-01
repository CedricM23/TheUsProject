export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 text-4xl space-y-4">
            <img
                src="https://media.tenor.com/kX-3mhPxc3MAAAAi/milk-and-mocha.gif"
                alt="Sad Bear"
                className="w-65"
            />
            <div>
                <p className="font-bold">403</p>
                <span className="font-bold text-2xl text-gray-500">Forbidden</span>
            </div>
            <a href="/" className="mt-6 px-4 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Go Back Home
            </a>
        </div>
    )
}