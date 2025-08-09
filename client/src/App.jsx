import { useState } from "react"
import CaseForm from "./components/CaseForm"
import CaseDetails from "./components/CaseDetails"

function App() {
  const [caseData, setCaseData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCaseData = async (formData) => {
    setLoading(true)
    setError(null)
    setCaseData(null)

    try {
      const response = await fetch("/api/case-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch case data.")
      }

      const data = await response.json()
      setCaseData(data)
    } catch (err) {
      console.error("Fetch error:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Court Case Data Fetcher</h1>
        <CaseForm onSubmit={fetchCaseData} loading={loading} />

        {loading && (
          <div className="text-center mt-8 text-lg text-blue-600">
            Fetching data... Please wait. This may take a moment.
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-8" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {caseData && !loading && !error && <CaseDetails data={caseData} />}
      </div>
    </div>
  )
}

export default App
