"use client";

import { useState, useEffect, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

// --- Helper Component ---
const QuestionMarkIcon: FC = () => (
  <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-600 text-white text-xs font-bold cursor-pointer select-none">
    ?
  </span>
);

// --- State Interface and Initial Data ---
interface DriverData {
  licenseState: string;
  isExcluded: "yes" | "no";
  hasCdl: "yes" | "no";
  hasAccidents: "yes" | "no";
}

const initialDriverData: DriverData = {
  licenseState: "Florida",
  isExcluded: "no",
  hasCdl: "no",
  hasAccidents: "no",
};

// --- Main Page Component ---
const ApplicationStep5Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<DriverData>(initialDriverData);

  useEffect(() => {
    const savedData = localStorage.getItem("applicationStep5");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("applicationStep5", JSON.stringify(formData));
    router.push("/application/step-6");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "radio" ? (e.target as HTMLInputElement).value : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  // Dynamically calculate the date for "past 5 years"
  const fiveYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 5)
  ).toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="bg-slate-700 text-white p-6 rounded-t-lg">
        <h1 className="text-xl md:text-2xl font-semibold">
          A few more questions about x:
        </h1>
      </div>
      <div className="md:p-8 p-4">
        <form onSubmit={handleSubmit}>
          {/* Main form grid starts here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
            {/* --- Row 1: Driver's License State --- */}
            <label className="font-semibold text-gray-700">
              Driver's License State
              {/* <QuestionMarkIcon /> */}
            </label>
            <div>
              <select
                name="licenseState"
                value={formData.licenseState}
                onChange={handleChange}
                className="w-full max-w-xs p-2 border border-gray-400 rounded-md bg-white shadow-inner"
              >
                <option value="">Select a state</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>
            </div>

            {/* --- Row 2: Exclude Driver --- */}
            <label className="font-semibold text-gray-700">
              Exclude this driver from the policy?
              {/* <QuestionMarkIcon /> */}
              <p className="text-sm text-gray-500 font-normal mt-1">
                (No Coverage)
              </p>
            </label>
            <div className="flex items-center gap-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isExcluded"
                  value="yes"
                  checked={formData.isExcluded === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isExcluded"
                  value="no"
                  checked={formData.isExcluded === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* --- Driving History Section --- */}
          <div className="pt-6">
            <h2 className="text-1xl font-bold text-cyan-800 mb-4">
              Driving History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
              {/* --- Row 3: CDL --- */}
              <label className="font-semibold text-gray-700 flex items-center">
                Does this driver have a Commercial Driver's License (CDL)?{" "}
              </label>
              <div className="flex items-center gap-x-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="hasCdl"
                    value="yes"
                    checked={formData.hasCdl === "yes"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="hasCdl"
                    value="no"
                    checked={formData.hasCdl === "no"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>

              {/* --- Row 4: Accidents --- */}
              <label className="font-semibold text-gray-700">
                Has this driver had any accidents, claims or violations in the
                past 5 years?{" "}
                <span className="font-normal">(since {fiveYearsAgo})</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  e.g. car hit you, hitting an object, speeding, weather damage,
                  vandalism, theft
                </p>
              </label>
              <div className="flex items-center gap-x-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="hasAccidents"
                    value="yes"
                    checked={formData.hasAccidents === "yes"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="hasAccidents"
                    value="no"
                    checked={formData.hasAccidents === "no"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/application/step-2")}
              className="px-8 h-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 h-10 cursor-pointer rounded-md text-white bg-[#254184] hover:bg-slate-800"
            >
              Continue to Step 6
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationStep5Page;
