"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ApplicationStep2Page = () => {
  const router = useRouter();
  const initialFormData = {
  firstName: "",
  middleInitial: "",
  lastName: "",
  suffix: "",
  streetAddress: "",
  email: "",
  zipCode: "33316",
  city: "",
  dob: "",
  phone1: "",
  phone2: "",
  phone3: "",
  ssn: "",
};
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const savedData = localStorage.getItem("applicationStep2");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prevData) => ({ ...prevData, ...parsedData }));
      } catch (error) {
        console.error("Failed to parse form data from localStorage", error);
      }
    }
  }, []);
  useEffect(() => {
     const stored = localStorage.getItem("quoteData");
      let phone1 = "", phone2 = "", phone3 = "";

      if (stored) {
          const data = JSON.parse(stored);
          const phone = data?.phone || "";
          if (phone) {
            phone1 = phone.slice(0, 3);
            phone2 = phone.slice(3, 6);
            phone3 = phone.slice(6);
          }
        }
        setFormData({ ...formData, phone1: phone1, phone2: phone2, phone3: phone3 })
        console.log(phone1, phone2, phone3);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("applicationStep2", JSON.stringify(formData));
    router.push("/application/step-3");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg text-black">
      <div className="bg-slate-700 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold">Business Information</h2>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Owner's Name */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Business Owner's Name
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="relative sm:col-span-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-300"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  id="middleInitial"
                  placeholder="MI"
                  type="text"
                  value={formData.middleInitial}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-gray-300"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-gray-300"
                />
              </div>
              <div className="sm:col-span-2">
                <select
                  id="suffix"
                  value={formData.suffix}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-gray-50"
                >
                  <option value="">Suffix</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                </select>
              </div>
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Street Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <input
                id="streetAddress"
                type="text"
                placeholder="Home Address"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* ZIP, City, State */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="space-y-2 sm:col-span-3">
              <label
                htmlFor="zipCode"
                className="block font-medium text-gray-700"
              >
                ZIP Code
              </label>
              <input
                id="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="space-y-2 sm:col-span-5">
              <label htmlFor="city" className="block font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="space-y-2 sm:col-span-4">
              <label className="block font-medium text-gray-700">State</label>
              <p className="w-full h-10 px-3 flex items-center">FL</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label htmlFor="dob" className="block font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date" // ✅ key change
              placeholder="MM/DD/YYYY"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full h-10 px-3 rounded-md border border-gray-300"
            />
          </div>


          {/* Primary Phone Number */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Primary Phone Number
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="phone1"
                type="tel"
                maxLength={3}
                value={formData.phone1}
                onChange={handleInputChange}
                className="md:w-20 w-full h-10 px-3 text-center rounded-md border border-gray-300"
              />
              <span>-</span>
              <input
                id="phone2"
                type="tel"
                maxLength={3}
                value={formData.phone2}
                onChange={handleInputChange}
                className="md:w-30 w-full h-10 px-3 text-center rounded-md border border-gray-300"
              />
              <span>-</span>
              <input
                id="phone3"
                type="tel"
                maxLength={4}
                value={formData.phone3}
                onChange={handleInputChange}
                className="md:w-50 w-full h-10 px-3 text-center rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* Email Address Header */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="text"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-10 pl-4 pr-3 rounded-md border border-gray-300"
                required={true}
              />
            </div>
          </div>

          {/* Social Security Number */}
          {/* <div className="space-y-2">
            <label htmlFor="ssn" className="block font-medium text-gray-700">
              Social Security Number
              <span className="block text-sm font-normal text-gray-500">
                (Recommended for most accurate quote)
              </span>
            </label>
            <div className="flex items-center gap-4">
              <input
                id="ssn"
                type="password"
                value={formData.ssn}
                onChange={handleInputChange}
                className="w-full sm:w-1/2 h-10 px-3 rounded-md border border-gray-300"
              />
              <div className="flex items-center gap-2">
                <img
                  src="https://w7.pngwing.com/pngs/664/876/png-transparent-norton-antivirus-hd-logo.png"
                  alt="Norton Secured"
                  className="h-6"
                />
                <img
                  src="https://static.thenounproject.com/png/13309-200.png"
                  alt="Lock"
                  className="h-5"
                />
              </div>
            </div>
          </div> */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/application/step-1")}
              className="px-8 h-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 h-10 cursor-pointer rounded-md text-white bg-[#254184] hover:bg-slate-800"
            >
              Continue to Step 3
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationStep2Page;
