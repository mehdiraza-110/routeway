"use client";

import { useState, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// --- Helper Component ---
const QuestionMarkIcon: FC = () => (
  <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-600 text-white text-xs font-bold cursor-pointer select-none">
    ?
  </span>
);

// --- Main Page Component ---
const ApplicationStep6Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hasAutoInsurance: "no",
    otherCoverageType: [],
    numNamedInsureds: "0",
    numWaiverHolders: "0",
    requiresBlanketInsured: "no",
    requiresBlanketWaiver: "no",
    requiresFiling: "no",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    // Corrected key to 'applicationStep6'
    const saved = localStorage.getItem("applicationStep6");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      let updatedCoverage = [...prev.otherCoverageType];

      if (value === "none") {
        // If "None" is selected, clear all selections
        updatedCoverage = [];
      } else {
        // Deselect "None" if any other option is selected
        updatedCoverage = updatedCoverage.filter((v) => v !== "none");

        if (checked) {
          if (!updatedCoverage.includes(value)) {
            updatedCoverage.push(value);
          }
        } else {
          updatedCoverage = updatedCoverage.filter((v) => v !== value);
        }
      }

      return { ...prev, otherCoverageType: updatedCoverage };
    });
  };

   const handleMail = async (payload) => {
  
      const res = await fetch('/api/sheetmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (data.success) {
        console.log('Email sent successfully:', data);
        toast.success("Your request has been sent successfully!");
        return true;
      } else {
        toast.error('Failed to send email.');
        return false;
      }
  
    }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Corrected key to 'applicationStep6'
    localStorage.setItem("applicationStep6", JSON.stringify(formData));

     const applicationData = {
      quoteRequest: JSON.parse(localStorage.getItem("quoteData") || "{}"),
      step1: JSON.parse(localStorage.getItem("applicationStep1") || "{}"),
      step2: JSON.parse(localStorage.getItem("applicationStep2") || "{}"),
      step3: JSON.parse(localStorage.getItem("applicationStep3") || "{}"),
      vehicles: JSON.parse(localStorage.getItem("vehicles") || "[]"),
      step5: JSON.parse(localStorage.getItem("applicationStep5") || "{}"),
      step6: JSON.parse(localStorage.getItem("applicationStep6") || "{}"),
    };

    handleMail(applicationData);

    console.log("Submitting full application:", applicationData);
    toast.success("Application Submitted! We will contact you soon.");

    // Clear stored data
    Object.keys(applicationData).forEach((key) =>
      localStorage.removeItem(
        key.startsWith("step")
          ? `application${key.charAt(0).toUpperCase() + key.slice(1)}`
          : "quoteData"
      )
    );

    localStorage.removeItem("vehicles");

    // setTimeout(() => {
    //   router.push("/");
    // }, 3000);

    router.push("/application/step-7"); // Assuming next step is a summary page
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="bg-slate-700 text-white p-6 rounded-t-lg">
        <h1 className="text-large md:text-2xl font-semibold">
          Insurance History
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        {/* --- Insurance History --- */}
        <section className="mb-5">
          <h2 className="text-large font-bold text-cyan-800 mb-4">
            Insurance History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start">
            <label className="font-semibold text-sm text-gray-700">
              Do you currently have an auto insurance policy?
              <p className="text-sm text-gray-500 font-normal mt-1">
                (Personal Auto policies qualify—except for For-Hire Passenger
                Transportation businesses.)
              </p>
            </label>
            <div className="flex items-center gap-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="hasAutoInsurance"
                  value="yes"
                  checked={formData.hasAutoInsurance === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="hasAutoInsurance"
                  value="no"
                  checked={formData.hasAutoInsurance === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </section>

        {/* --- Other Business Insurance --- */}
        <section className="mb-5">
          <h2 className="text-large font-bold text-cyan-800 mb-2">
            Other Business Insurance
          </h2>
        <label className="font-semibold text-sm text-gray-700 mb-2">
              Do you currently have other coverages for your business?
              {/* <QuestionMarkIcon /> */}
        </label>
          <div className="flex flex-col gap-y-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="otherCoverageType"
                value="generalLiability"
                checked={formData.otherCoverageType.includes("generalLiability")}
                onChange={handleCoverageChange}
              />
              <span className="ml-2">General Liability</span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="otherCoverageType"
                value="businessOwnerPolicy"
                checked={formData.otherCoverageType.includes("businessOwnerPolicy")}
                onChange={handleCoverageChange}
              />
              <span className="ml-2">Business Owner's Policy</span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="otherCoverageType"
                value="none"
                checked={formData.otherCoverageType.length === 0}
                onChange={handleCoverageChange}
              />
              <span className="ml-2">None</span>
            </label>
          </div>
        </section>

        {/* --- Named Additional Insureds & Waivers of Subrogation --- */}
        <section className="mb-5">
          <h2 className="text-large font-bold text-cyan-800 mb-4">
            Named Additional Insureds & Waivers of Subrogation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
            <label className="font-semibold text-sm text-gray-700">
              Number of Named Additional Insureds
              {/* <QuestionMarkIcon /> */}
            </label>
            <select
              name="numNamedInsureds"
              value={formData.numNamedInsureds}
              onChange={handleChange}
              className="w-full max-w-xs p-2 border border-gray-400 rounded-md bg-white shadow-inner"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            <label className="font-semibold text-sm text-gray-700">
              Number of Named Waiver of Subrogation Holders
              {/* <QuestionMarkIcon /> */}
            </label>
            <select
              name="numWaiverHolders"
              value={formData.numWaiverHolders}
              onChange={handleChange}
              className="w-full max-w-xs p-2 border border-gray-400 rounded-md bg-white shadow-inner"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* --- Blanket Endorsements --- */}
        <section className="mb-5">
          <h2 className="text-large font-bold text-cyan-800 mb-2">
            Blanket Additional Insured & Waiver of Subrogation Endorsements
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Blanket endorsements will not provide any notice of cancellation to
            any third-parties.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-center">
            <label className="font-semibold text-sm text-gray-700">
              Do you have a contract that requires a blanket additional insured
              endorsement?
            </label>
            <div className="flex items-center gap-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresBlanketInsured"
                  value="yes"
                  checked={formData.requiresBlanketInsured === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresBlanketInsured"
                  value="no"
                  checked={formData.requiresBlanketInsured === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>

            <label className="font-semibold text-sm text-gray-700">
              Blanket Additional Insured Endorsement:
            </label>
            <p className="text-gray-800">
              {formData.requiresBlanketInsured === "yes"
                ? "Included"
                : "Not Included"}
            </p>

            <label className="font-semibold text-sm text-gray-700">
              Do you have a contract that requires a blanket waiver of
              subrogation endorsement?
            </label>
            <div className="flex items-center gap-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresBlanketWaiver"
                  value="yes"
                  checked={formData.requiresBlanketWaiver === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresBlanketWaiver"
                  value="no"
                  checked={formData.requiresBlanketWaiver === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>

            <label className="font-semibold  text-sm text-gray-700">
              Blanket Waiver of Subrogation Endorsement:
            </label>
            <p className="text-gray-800">
              {formData.requiresBlanketWaiver === "yes"
                ? "Included"
                : "Not Included"}
            </p>
          </div>
        </section>

        {/* --- Filing/Proof of Insurance --- */}
        <section className="mb-5">
          <h2 className="text-large font-bold text-cyan-800 mb-4">
            Filing/Proof of Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start">
            <label className="font-semibold text-sm text-gray-700">
              Is your business required to provide a state or federal agency
              proof of insurance/filings?
              {/* <QuestionMarkIcon /> */}
            </label>
            <div className="flex items-center gap-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresFiling"
                  value="yes"
                  checked={formData.requiresFiling === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requiresFiling"
                  value="no"
                  checked={formData.requiresFiling === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </section>

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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationStep6Page;
