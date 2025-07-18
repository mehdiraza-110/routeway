"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VehicleModal, { Vehicle } from "@/Components/Modal"; // Ensure this path is correct

const ApplicationStep4Page = () => {
  // Initial data to match the new detailed vehicle interface
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const test = () => {
    const vehs = localStorage.getItem("applicationStep3") || "";
    const initialVehicles: Vehicle[] = [
      {
        id: 1,
        name: "Vehicle 1",
        year: JSON.parse(vehs).year || "",
        make: JSON.parse(vehs).make || "",
        vehicleType: JSON.parse(vehs).vehicleType || "",
        addBy: "year",
        bodyStyle: "N/A",
        zipCode: JSON.parse(vehs).zipCode || "",
        travelDistance: JSON.parse(vehs).farthestDistance || "",
        hasAbs: "yes",
        antiTheftDevice: JSON.parse(vehs).antiTheftDevices || "",
        hasAirbag: JSON.parse(vehs).driverAirbag || "",
        grossWeight: JSON.parse(vehs).grossVehicleWeight || "",
        rearAxles: JSON.parse(vehs).rearAxles || "",
        loanLeaseStatus: "no",
        vin: JSON.parse(vehs).vin || ""
      },
    ];
    return initialVehicles;
  }
  useEffect(() => {
    const a = test();
    setVehicles(a);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    router.push("/application/step-5");
  };

  const handleBack = () => router.push("/application/step-3");

  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (vehicle: Vehicle) => {
    console.log("VEHP: ", vehicle);
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleRemoveVehicle = (vehicleId: number) => {
    const updatedVehicles = vehicles.filter((v) => v.id !== vehicleId);
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
  };

  const handleSaveVehicle = (savedVehicle: Vehicle) => {
    if (editingVehicle) {
      setVehicles(
        vehicles.map((v) => (v.id === savedVehicle.id ? savedVehicle : v))
      );
    } else {
      const newVehicle = {
        ...savedVehicle,
        id: vehicles.length + 1,
        name: `Vehicle ${vehicles.length + 1}`,
      };
      const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('vehicles');
    if (stored) {
      setVehicles(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
        <div className="bg-slate-700 text-white p-6 rounded-t-lg">
          <h1 className="text-xl md:text-2xl font-semibold">
            Here are the vehicles on your quote:
          </h1>
        </div>

        <form onSubmit={handleContinue} className="p-4 md:p-8">
          {/* <div className="text-right text-xs md:text-sm text-gray-500 mb-6">
            <p>Named Insured: ccc</p>
            <p>Quote Number: CA113449493</p>
          </div> */}

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Vehicles on your quote:
            </h2>
            {/* --- Vehicle List --- */}
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-4 border-b last:border-b-0"
                >
                  {/* Vehicle Details */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {vehicle.name}
                    </p>
                    <p className="text-gray-600">{vehicle.year}</p>
                    <p className="text-gray-600">{vehicle.make}</p>
                  </div>
                  {/* Action Buttons - Stacks on mobile, aligns right on desktop */}
                  <div className="flex flex-col sm:flex-row gap-3 md:justify-self-end">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(vehicle)}
                      className="px-8 py-2 w-full sm:w-auto cursor-pointer border border-slate-600 text-slate-600 rounded-md hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                      className="px-8 py-2 w-full sm:w-auto cursor-pointer border border-slate-600 text-slate-600 rounded-md hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* --- Add Another Button --- */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-8 py-2 cursor-pointer border border-slate-600 text-slate-600 rounded-md hover:bg-slate-50 w-full md:w-80"
              >
                Add another vehicle
              </button>
            </div>
          </section>

          {/* --- Add Vehicle Banner --- */}
          <section className="bg-slate-100 p-6 rounded-lg grid grid-cols-1 gap-4 items-center mb-12">
            <div className="lg:col-span-2">
              <p className="font-semibold text-gray-800">
                Add another vehicle by year, make, model or VIN
              </p>
              <p className="text-sm text-gray-600 mt-1">
                You should include all vehicles/trailers used in your business
                that will be in your possession for greater than 30 days.
              </p>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-3 lg:justify-self-end w-full">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-6 py-2 cursor-pointer border border-slate-600 text-slate-600 rounded-md hover:bg-slate-50 w-full"
              >
                Add Vehicle
              </button>
              <button
                type="button"
                className="cursor-pointer px-6 py-2 border border-slate-600 text-slate-600 rounded-md hover:bg-slate-50 w-full"
              >
                Add Trailer
              </button>
            </div> */}
          </section>

          {/* --- Navigation Buttons --- */}
          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4 items-center pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              className="px-8 h-10 w-full md:w-auto cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 h-10 w-full md:w-auto cursor-pointer rounded-md text-white bg-[#254184] hover:bg-slate-800"
            >
              Continue to Step 5
            </button>
          </div>
        </form>
      </div>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
        initialData={editingVehicle}
      />
    </>
  );
};

export default ApplicationStep4Page;
