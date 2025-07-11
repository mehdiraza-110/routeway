// src/components/VehicleModal.tsx

import { useState, useEffect, FC, ReactNode } from "react";

// --- Updated Vehicle Interface ---
export interface Vehicle {
  id: number;
  // Fields for the list view on the main page
  name: string;
  year: string;
  make: string;

  // New fields from the detailed form
  vehicleType: string;
  addBy: "year" | "vin";
  bodyStyle: string;
  zipCode: string;
  travelDistance: string;
  hasAbs: "yes" | "no";
  antiTheftDevice: string;
  hasAirbag: "yes" | "no";
  grossWeight: string;
  rearAxles: string;
  loanLeaseStatus: "loan" | "lease" | "no";
}

// --- Helper Components ---
const QuestionMarkIcon: FC = () => (
  <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-600 text-white text-xs font-bold cursor-pointer select-none">
    ?
  </span>
);

interface FormRowProps {
  label: string;
  subLabel?: string;
  children: ReactNode;
}

const FormRow: FC<FormRowProps> = ({ label, subLabel, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 items-start py-3 border-b border-gray-100">
    <div className="font-semibold text-gray-700 pr-4">
      {label}
      {subLabel && (
        <p className="text-xs text-gray-500 font-normal mt-1">{subLabel}</p>
      )}
    </div>
    <div className="flex items-center mt-2 md:mt-0">{children}</div>
  </div>
);

// --- Main Modal Component ---
interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
  initialData: Vehicle | null;
}

const VehicleModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: VehicleModalProps) => {
  // A more detailed default state for a new vehicle
  const defaultVehicleState: Vehicle = {
    id: Date.now(),
    name: "New Vehicle",
    vehicleType: "Tow Truck / Wrecker",
    addBy: "year",
    year: "",
    make: "",
    bodyStyle: "N/A",
    zipCode: "33316",
    travelDistance: "",
    hasAbs: "yes",
    antiTheftDevice: "",
    hasAirbag: "yes",
    grossWeight: "",
    rearAxles: "",
    loanLeaseStatus: "no",
  };

  const [formData, setFormData] = useState<Vehicle>(defaultVehicleState);

  useEffect(() => {
    setFormData(initialData || defaultVehicleState);
  }, [initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Handle radio buttons correctly
    const finalValue =
      type === "radio" ? (e.target as HTMLInputElement).id : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Tell us about your vehicle...
          </h1>

          <FormRow label="Vehicle Type">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-800">{formData.vehicleType}</span>
              <button className="px-6 py-1 cursor-pointer border border-slate-600 text-slate-600 rounded-md text-sm hover:bg-slate-50">
                Edit
              </button>
            </div>
          </FormRow>

          <FormRow
            label="Add Vehicle By"
            subLabel="(VIN provides most accurate rate)"
          >
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="addBy"
                  id="year"
                  checked={formData.addBy === "year"}
                  onChange={handleChange}
                  className="form-radio"
                />{" "}
                <span className="ml-2">Year, Make, Model</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="addBy"
                  id="vin"
                  checked={formData.addBy === "vin"}
                  onChange={handleChange}
                  className="form-radio"
                />{" "}
                <span className="ml-2">VIN</span>
              </label>
            </div>
          </FormRow>

          <FormRow label="Year">
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </FormRow>

          <FormRow label="Make">
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </FormRow>

          <FormRow label="Body Style">
            <span className="text-gray-800">{formData.bodyStyle}</span>
          </FormRow>

          <FormRow label="Zip code where the vehicle is located">
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <QuestionMarkIcon />
          </FormRow>

          <FormRow
            label="Farthest one-way distance this vehicle typically travels"
            subLabel="(90% or more of the time)"
          >
            <select
              name="travelDistance"
              value={formData.travelDistance}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="0-10 miles">0-10 miles</option>
              <option value="11-20 miles">11-20 miles</option>
              <option value="21-30 miles">21-30 miles</option>
              <option value="31-40 miles">31-40 miles</option>
              <option value="41-50 miles">41-50 miles</option>
              <option value="51+ miles">51+ miles</option>
            </select>
            <QuestionMarkIcon />
          </FormRow>

          <FormRow label="Does this vehicle have anti-lock brakes?">
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hasAbs"
                  id="yes"
                  checked={formData.hasAbs === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hasAbs"
                  id="no"
                  checked={formData.hasAbs === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>
            <QuestionMarkIcon />
          </FormRow>

          {/* ... Add other fields following the same pattern ... */}

          <FormRow label="Does this vehicle have a driver-side airbag?">
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hasAirbag"
                  id="yes"
                  checked={formData.hasAirbag === "yes"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hasAirbag"
                  id="no"
                  checked={formData.hasAirbag === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>
          </FormRow>

          <FormRow label="Is there a loan/lease on this vehicle?">
            <div className="flex flex-col space-y-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="loanLeaseStatus"
                  id="loan"
                  checked={formData.loanLeaseStatus === "loan"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes, I have a loan</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="loanLeaseStatus"
                  id="lease"
                  checked={formData.loanLeaseStatus === "lease"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">Yes, I have a lease</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="loanLeaseStatus"
                  id="no"
                  checked={formData.loanLeaseStatus === "no"}
                  onChange={handleChange}
                />{" "}
                <span className="ml-2">No</span>
              </label>
            </div>
          </FormRow>
        </div>
        <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-4 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#254184] cursor-pointer text-white rounded-md font-semibold hover:bg-cyan-700"
          >
            Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
