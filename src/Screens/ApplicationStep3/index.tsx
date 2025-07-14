"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// A small component for the purple help icon, styled to match the image.
const HelpIcon = () => (
  <span
    style={{
      display: "inline-block",
      marginLeft: "8px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "#8a2be2", // A purple color
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontFamily: "sans-serif",
      cursor: "help",
    }}
  >
    ?
  </span>
);

// Define a type for the modal's props
interface VehicleTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentValue: string;
  onSave: (newType: string) => void;
}

// Modal component for changing the vehicle type
const VehicleTypeModal = ({
  isOpen,
  onClose,
  currentValue,
  onSave,
}: VehicleTypeModalProps) => {
  if (!isOpen) return null;

  const [selectedType, setSelectedType] = useState(currentValue);

  const vehicleOptions = [
    "Refrigerated Trucks",
    "Box Trucks",
    "Cargo Vans",
    "Step Vans",
    "SUV, Pickup Truck",
    "Contractor Trucks",
    "Service Trucks",
    "Landscape Trucks",
    "Utility Vans",
    "Dump Trucks",
    "Flatbed Trucks",
    "Cab Chassis",
    "Hauler Trucks",
    "Hooklift Trucks",
    "Mechanic Trucks",
    "Rollback Trucks",
    "Tractor Trucks",
    "Wrecker Trucks",
    "other",
  ];

  const handleSave = () => {
    onSave(selectedType);
    onClose();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Select Vehicle Type</h3>
        <div className="mb-6">
          <label
            htmlFor="vehicleTypeSelect"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vehicle Type
          </label>
          <select
            id="vehicleTypeSelect"
            value={selectedType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedType(e.target.value)
            }
            className="w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
          >
            {vehicleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 h-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 h-10 cursor-pointer rounded-md text-white bg-[#254184] hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationStep3Page = () => {
  const router = useRouter();
  let veh = null;

  useEffect(() => {
    const vType = localStorage.getItem("quoteData");
    veh = JSON.parse(vType);
    console.log(veh);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVin, setIsVin] = useState<boolean>(false);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quoteData");
      const veh = stored ? JSON.parse(stored) : {};
      return {
        vehicleType: veh?.vehicleType ?? "",
        addVehicleBy: "yearMakeModel",
        year: "",
        make: "",
        zipCode: "33316",
        farthestDistance: "",
        antiLockBrakes: "yes",
        antiTheftDevices: [],
        driverAirbag: "no",
        grossVehicleWeight: "",
        rearAxles: "",
        loanLease: "no",
        vin: ""
      };
    } else {
      return (
        {
          vehicleType: veh?.vehicleType ?? "",
        addVehicleBy: "yearMakeModel",
        year: "",
        make: "",
        zipCode: "33316",
        farthestDistance: "",
        antiLockBrakes: "yes",
        antiTheftDevices: [],
        driverAirbag: "no",
        grossVehicleWeight: "",
        rearAxles: "",
        loanLease: "no",
        vin: ""
        }
      )
    }
  });

  const antiTheftOptions = [
  "Alarm System",
  "GPS Tracker",
  "Steering Wheel Lock",
  "Kill Switch",
  "VIN Etching",
  "Remote Immobilizer",
  "OnStar or Equivalent",
  "Smart Key/Keyless Entry",
  "Electronic Engine Immobilizer",
  "Brake Lock",
  "Hood Lock",
  "Wheel Lock",
];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option: string) => {
    const currentSelection = formData.antiTheftDevices || [];

    const updatedSelection = currentSelection.includes(option)
      ? currentSelection.filter((item) => item !== option)
      : [...currentSelection, option];

    setFormData((prev) => ({
      ...prev,
      antiTheftDevices: updatedSelection,
    }));
  };

    // 🔒 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("applicationStep3");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Merge the saved data with the initial state structure.
        // This ensures that if any key is missing from localStorage,
        // it falls back to the default value (e.g., "") instead of becoming undefined.
        setFormData({ ...formData, ...parsedData });
      } catch (error) {
        console.error("Failed to parse form data from localStorage", error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("applicationStep3", JSON.stringify(formData));
    router.push("/application/step-4");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};


  const handleVehicleTypeSave = (newType: string) => {
    setFormData((prev) => ({ ...prev, vehicleType: newType }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg text-black">
      <div className="bg-slate-700 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold">
          Tell us about your vehicle...
        </h2>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Row: Vehicle Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="font-medium">Vehicle Type</label>
            <div className="md:col-span-2 flex justify-between items-center">
              <span>{formData?.vehicleType ?? ""}</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-6 h-9 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Form Row: Add Vehicle By */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="font-medium">
              Add Vehicle By
              <br />
              <span className="text-sm text-gray-500">
                (VIN provides most accurate rate)
              </span>
            </label>
            <div className="md:col-span-2 flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="addVehicleBy"
                  value="yearMakeModel"
                  checked={formData?.addVehicleBy === "yearMakeModel"}
                  onChange={(e) => {
                    handleInputChange(e)
                    setIsVin(false); 
                  }}
                />
                <span>Year, Make, Model</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="addVehicleBy"
                  value="vin"
                  checked={formData?.addVehicleBy === "vin"}
                  onChange={(e) => {
                    handleInputChange(e);
                    setIsVin(true); 
                  }}
                />
                <span>VIN</span>
              </label>
            </div>
          </div>
          {isVin && (
            <div>
              <label htmlFor="vin">Vin:</label>
              <input type="text" max={17} maxLength={17} onChange={handleInputChange} name="vin" className="w-full h-12 px-4 rounded-md border border-gray-300 bg-white" />
            </div>
          )}

          {/* Form Row: Year */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="year" className="font-medium">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData?.year}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              {/* Add year options here */}
            </select>
          </div>

          {/* Form Row: Make */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="make" className="font-medium">
              Make
            </label>
            <select
              id="make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select Make
              </option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="GMC">GMC</option>
              <option value="Ram">Ram</option>
              <option value="Tesla">Tesla</option>
              <option value="Rivian">Rivian</option>
              <option value="Lordstown Motors">Lordstown Motors</option>
              <option value="Peterbilt">Peterbilt</option>
              <option value="Kenworth">Kenworth</option>
              <option value="Freightliner">Freightliner</option>
              <option value="International">International</option>
              <option value="Mack">Mack</option>
              <option value="Western Star">Western Star</option>
            </select>
          </div>

          {/* Form Row: Body Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="font-medium">Body Style</label>
            <input type="text" name="bodyType" onChange={handleInputChange} className="md:col-span-2 h-12 px-4 rounded-md border border-gray-300 bg-white" />
          </div>

          {/* Form Row: Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="zipCode" className="font-medium">
              Zip code where the vehicle is located
              {/* <HelpIcon /> */}
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300"
              required
            />
          </div>

          {/* Form Row: Farthest Distance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="farthestDistance" className="font-medium">
              Farthest one-way distance this vehicle typically travels (90% or
              more of the time)
              {/* <HelpIcon /> */}
            </label>
            <select
              id="farthestDistance"
              name="farthestDistance"
              value={formData.farthestDistance}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select Distance
              </option>
              <option value="0-10 miles">0-10 miles</option>
              <option value="11-20 miles">11-20 miles</option>
              <option value="21-30 miles">21-30 miles</option>
              <option value="31-40 miles">31-40 miles</option>
              <option value="41-50 miles">41-50 miles</option>
              <option value="51+ miles">51+ miles</option>
            </select>
          </div>

          {/* Form Row: Anti-lock Brakes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="font-medium">
              Does this vehicle have anti-lock brakes?
              {/* <HelpIcon /> */}
            </label>
            <div className="md:col-span-2 flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="antiLockBrakes"
                  value="yes"
                  checked={formData.antiLockBrakes === "yes"}
                  onChange={handleInputChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="antiLockBrakes"
                  value="no"
                  checked={formData.antiLockBrakes === "no"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Form Row: Anti-theft Devices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="antiTheftDevices" className="font-medium">
              Is this vehicle equipped with any anti-theft devices?
              {/* <HelpIcon /> */}
              <br />
              <span className="text-sm text-gray-500">
                (Discount available if Comprehensive or Fire & Theft coverage is
                selected.)
              </span>
            </label>
             <div className="relative w-full md:col-span-2" ref={dropdownRef}>
              <label className="block font-medium text-gray-700 mb-1">
                Anti-Theft Devices
              </label>
              <div
                onClick={toggleDropdown}
                className="border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer"
              >
                {formData.antiTheftDevices?.length > 0
                  ? formData.antiTheftDevices.join(", ")
                  : "Select devices"}
              </div>

              {isOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-md">
                  {antiTheftOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.antiTheftDevices?.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Row: Driver-side Airbag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="font-medium">
              Does this vehicle have a driver-side airbag?
            </label>
            <div className="md:col-span-2 flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverAirbag"
                  value="yes"
                  checked={formData.driverAirbag === "yes"}
                  onChange={handleInputChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverAirbag"
                  value="no"
                  checked={formData.driverAirbag === "no"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Form Row: Gross Vehicle Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="grossVehicleWeight" className="font-medium">
              What is the gross vehicle weight?
              {/* <HelpIcon /> */}
            </label>
            <select
              id="grossVehicleWeight"
              name="grossVehicleWeight"
              value={formData.grossVehicleWeight}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select Weight
              </option>
              <option value="0-10,000 lbs">0-10,000 lbs</option>
              <option value="10,001-20,000 lbs">10,001-20,000 lbs</option>
              <option value="20,001-30,000 lbs">20,001-30,000 lbs</option>
              <option value="30,001-40,000 lbs">30,001-40,000 lbs</option>
              <option value="40,001-50,000 lbs">40,001-50,000 lbs</option>
              <option value="50,001+ lbs">50,001+ lbs</option>
              {/* Add weight options here */}
            </select>
          </div>

          {/* Form Row: Rear Axles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label htmlFor="rearAxles" className="font-medium">
              How many rear axles does this vehicle have?
            </label>
            <select
              id="rearAxles"
              name="rearAxles"
              value={formData.rearAxles}
              onChange={handleInputChange}
              className="md:col-span-2 w-full h-12 px-4 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select Axle Count
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              {/* Add axle options here */}
            </select>
          </div>

          {/* Form Row: Loan/Lease */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label className="font-medium pt-1">
              Is there a loan/lease on this vehicle?
            </label>
            <div className="md:col-span-2 flex flex-col space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="loanLease"
                  value="loan"
                  checked={formData.loanLease === "loan"}
                  onChange={handleInputChange}
                />
                <span>Yes, I have a loan</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="loanLease"
                  value="lease"
                  checked={formData.loanLease === "lease"}
                  onChange={handleInputChange}
                />
                <span>Yes, I have a lease</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="loanLease"
                  value="no"
                  checked={formData.loanLease === "no"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
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
              className="px-8 h-10 cursor-pointer rounded-md text-white bg-slate-700 hover:bg-slate-800"
            >
              Continue to Step 4
            </button>
          </div>
        </form>
      </div>

      <VehicleTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentValue={formData?.vehicleType ?? ""}
        onSave={handleVehicleTypeSave}
      />
    </div>
  );
};
export default ApplicationStep3Page;
