function CaseDetails({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return <div className="mt-8 text-center text-gray-600">No case data found for the provided details.</div>
    }

    const { petitioner, respondent, filingDate, nextHearingDate, latestOrderPdf, message } = data

    return (
        <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Case Details</h2>

            {message && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="bg-light-gray p-3 rounded-md">
                    <p className="font-medium">Petitioner(s):</p>
                    <p>{petitioner || "N/A"}</p>
                </div>
                <div className="bg-light-gray p-3 rounded-md">
                    <p className="font-medium">Respondent(s):</p>
                    <p>{respondent || "N/A"}</p>
                </div>
                <div className="bg-light-gray p-3 rounded-md">
                    <p className="font-medium">Filing Date:</p>
                    <p>{filingDate || "N/A"}</p>
                </div>
                <div className="bg-light-gray p-3 rounded-md">
                    <p className="font-medium">Next Hearing Date:</p>
                    <p>{nextHearingDate || "N/A"}</p>
                </div>
            </div>

            {latestOrderPdf && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Latest Order/Judgment</h3>
                    <a
                        href={latestOrderPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-success-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-green"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Download PDF
                    </a>
                </div>
            )}

            {!latestOrderPdf && <div className="mt-6 text-gray-600">No recent order or judgment PDF found.</div>}
        </div>
    )
}

export default CaseDetails
