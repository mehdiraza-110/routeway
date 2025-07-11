"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// A sample list of keywords for the search functionality
const BUSINESS_KEYWORDS = [
  "Accountant",
  "Accounting Service",
  "Actor/Actress",
  "Acupuncturist",
  "Ad Agency",
  "Contractor",
  "Consulting",
  "Electrician",
  "Landscaping",
  "Plumbing",
  "Restaurant",
  "Retail",
  "Trucking",
];

const ApplicationStep1Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usDotNumber: "",
    usdotNumberStatus: "no",
    businessStructure: "corporation",
    businessName: "",
    dbaName: "",
    businessKeyword: "",
  });
  const [keywordResults, setKeywordResults] = useState<string[]>([]);
  const [showDotInput, setShowDotInput] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem("applicationStep1");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // **FIX:** Merge the loaded data with the previous state.
      // This ensures that if a key is missing from localStorage,
      // it falls back to the defined value in the state instead of becoming undefined.
      setFormData((prevData) => ({ ...prevData, ...parsedData }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("applicationStep1", JSON.stringify(formData));
    router.push("/application/step-2");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Handle the keyword search
    if (name === "businessKeyword") {
      if (value) {
        const filteredKeywords = BUSINESS_KEYWORDS.filter((keyword) =>
          keyword.toLowerCase().includes(value.toLowerCase())
        );
        setKeywordResults(filteredKeywords);
      } else {
        setKeywordResults([]); // Clear results if input is empty
      }
    }
    if (name == "usdotNumberStatus") {
      setShowDotInput(true);
    }
  };

  const handleKeywordSelect = (keyword: string) => {
    setFormData((prev) => ({ ...prev, businessKeyword: keyword }));
    setKeywordResults([]); // Hide the dropdown after selection
  };

  return (
    <div className="bg-white rounded-lg shadow-lg text-black">
      <div className="bg-slate-700 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold">Business Information</h2>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block font-medium">
              Do you have a USDOT Number?
            </label>
            <p className="text-sm text-gray-500">
              The number is registered to your business and displayed on the
              side of your vehicle.
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center">
                <input
                  id="usdot-yes"
                  name="usdotNumberStatus"
                  type="radio"
                  value="yes"
                  checked={formData.usdotNumberStatus === "yes"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label htmlFor="usdot-yes" className="ml-3 block text-sm">
                  Yes - I have a USDOT number
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="usdot-no"
                  name="usdotNumberStatus"
                  type="radio"
                  value="no"
                  checked={formData.usdotNumberStatus === "no"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label htmlFor="usdot-no" className="ml-3 block text-sm">
                  No - and I will not have a USDOT number
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="usdot-not-yet"
                  name="usdotNumberStatus"
                  type="radio"
                  value="not_yet"
                  checked={formData.usdotNumberStatus === "not_yet"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label htmlFor="usdot-not-yet" className="ml-3 block text-sm">
                  Not Yet - but I have applied/will apply for a USDOT number
                  within 60 days
                </label>
              </div>
            </div>
            {showDotInput == true && (
              <div className="mt-2 mb-2">
                <p className="mt-2 mb-2">What is the DOT number?</p>
                <input
                  type="text"
                  id="usDotNumber"
                  name="usDotNumber"
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block font-medium">
              How is your business structured?
            </label>
            <div className="space-y-2 pt-1">
              <div className="flex items-center">
                <input
                  id="struct-sole-prop"
                  name="businessStructure"
                  type="radio"
                  value="sole_proprietor"
                  checked={formData.businessStructure === "sole_proprietor"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label
                  htmlFor="struct-sole-prop"
                  className="ml-3 block text-sm"
                >
                  Individual / Sole Proprietor
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="struct-partnership"
                  name="businessStructure"
                  type="radio"
                  value="partnership"
                  checked={formData.businessStructure === "partnership"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label
                  htmlFor="struct-partnership"
                  className="ml-3 block text-sm"
                >
                  Partnership
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="struct-corp"
                  name="businessStructure"
                  type="radio"
                  value="corporation"
                  checked={formData.businessStructure === "corporation"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <label htmlFor="struct-corp" className="ml-3 block text-sm">
                  Corporation or LLC / Non-Profit
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="businessName" className="block font-medium">
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dbaName" className="block font-medium">
              DBA Name (Optional)
            </label>
            <input
              id="dbaName"
              name="dbaName"
              type="text"
              value={formData.dbaName}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="businessKeyword" className="block font-medium">
              Keyword describing your business
            </label>
            <input
              id="businessKeyword"
              name="businessKeyword"
              type="text"
              autoComplete="off"
              value={formData.businessKeyword}
              onChange={handleInputChange}
              placeholder="e.g. Contractor, Trucking, etc."
              className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {keywordResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <ul>
                  {keywordResults.map((keyword) => (
                    <li
                      key={keyword}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleKeywordSelect(keyword)}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/quote-options")}
              className="px-8 h-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 h-10 cursor-pointer rounded-md bg-[#254184] hover:bg-slate-800 text-white"
            >
              Continue to Step 2
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationStep1Page;
