
import { useState } from "react"

export default function CaseForm({ onSubmit, isLoading, error, caseDetails }) {
    const [caseType, setCaseType] = useState("W.P.(C)")
    const [caseNumber, setCaseNumber] = useState("")
    const [filingYear, setFilingYear] = useState("2023")

    const caseTypes = [
        { value: "", label: "Select" },
        { value: "ADMIN.REPORT", label: "ADMIN.REPORT" },
        { value: "ARB.A.", label: "ARB.A." },
        { value: "ARB. A. (COMM.)", label: "ARB. A. (COMM.)" },
        { value: "ARB.P.", label: "ARB.P." },
        { value: "BAIL APPLN.", label: "BAIL APPLN." },
        { value: "CA", label: "CA" },
        { value: "W.P.(C)", label: "W.P.(C) - Writ Petition (Civil)" },
        { value: "CRL.M.C.", label: "CRL.M.C. - Criminal Misc. Case" },
        { value: "CS(OS)", label: "CS(OS) - Civil Suit (Original Side)" },

    ]

    const years = [
        { value: "", label: "Select" },
        { value: "2025", label: "2025" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
        { value: "2020", label: "2020" },
        { value: "2019", label: "2019" },
        { value: "2018", label: "2018" },
        { value: "2017", label: "2017" },
        { value: "2016", label: "2016" },
        { value: "2015", label: "2015" },
        { value: "2014", label: "2014" },
        { value: "2013", label: "2013" },
        { value: "2012", label: "2012" },
        { value: "2011", label: "2011" },
        { value: "2010", label: "2010" },
        { value: "2009", label: "2009" },
        { value: "2008", label: "2008" },
        { value: "2007", label: "2007" },
        { value: "2006", label: "2006" },
        { value: "2005", label: "2005" },
        { value: "2004", label: "2004" },
        { value: "2003", label: "2003" },
        { value: "2002", label: "2002" },
        { value: "2001", label: "2001" },
        { value: "2000", label: "2000" },
        { value: "1999", label: "1999" },
        { value: "1998", label: "1998" },
        { value: "1997", label: "1997" },
        { value: "1996", label: "1996" },
        { value: "1995", label: "1995" },
        { value: "1994", label: "1994" },
        { value: "1993", label: "1993" },
        { value: "1992", label: "1992" },
        { value: "1991", label: "1991" },
        { value: "1990", label: "1990" },
        { value: "1989", label: "1989" },
        { value: "1988", label: "1988" },
        { value: "1987", label: "1987" },
        { value: "1986", label: "1986" },
        { value: "1985", label: "1985" },
        { value: "1984", label: "1984" },
        { value: "1983", label: "1983" },
        { value: "1982", label: "1982" },
        { value: "1981", label: "1981" },
        { value: "1980", label: "1980" },
        { value: "1979", label: "1979" },
        { value: "1978", label: "1978" },
        { value: "1977", label: "1977" },
        { value: "1976", label: "1976" },
        { value: "1975", label: "1975" },
        { value: "1974", label: "1974" },
        { value: "1973", label: "1973" },
        { value: "1972", label: "1972" },
        { value: "1971", label: "1971" },
        { value: "1970", label: "1970" },
        { value: "1969", label: "1969" },
        { value: "1968", label: "1968" },
        { value: "1967", label: "1967" },
        { value: "1966", label: "1966" },
        { value: "1965", label: "1965" },
        { value: "1964", label: "1964" },
        { value: "1963", label: "1963" },
        { value: "1962", label: "1962" },
        { value: "1961", label: "1961" },
        { value: "1960", label: "1960" },
        { value: "1959", label: "1959" },
        { value: "1958", label: "1958" },
        { value: "1957", label: "1957" },
        { value: "1956", label: "1956" },
        { value: "1955", label: "1955" },
        { value: "1954", label: "1954" },
        { value: "1953", label: "1953" },
        { value: "1952", label: "1952" },
        { value: "1951", label: "1951" },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ caseType, caseNumber, filingYear })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Fetch Case Data</h2>
            <div className="mb-4">
                <label htmlFor="caseType" className="block text-gray-700 text-sm font-bold mb-2">
                    Case Type:
                </label>
                <select
                    id="caseType"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    required
                >
                    {caseTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="caseNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Case Number:
                </label>
                <input
                    type="text"
                    id="caseNumber"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Case Number"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="filingYear" className="block text-gray-700 text-sm font-bold mb-2">
                    Filing Year:
                </label>
                <select
                    id="filingYear"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={filingYear}
                    onChange={(e) => setFilingYear(e.target.value)}
                    required
                >
                    {years.map((year) => (
                        <option key={year.value} value={year.value}>
                            {year.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    {isLoading ? "Fetching..." : "Fetch Case Data"}
                </button>
            </div>
            {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
    )
}
