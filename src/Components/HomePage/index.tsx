"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

const vehicleTypes = [
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

const HomePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    vehicleType: "",
    phone: "",
  });

  const handleMail = async (payload) => {
    const res = await fetch("/api/quote-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      // console.log("Email sent successfully:", data);
      // toast.success("Your request has been sent successfully!");
      return true;
    } else {
      toast.error("Failed to send email.");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleType || !formData.phone) {
      toast.error("Please fill all fields to get a quote.");
      return;
    }
    localStorage.setItem("quoteData", JSON.stringify(formData));
    router.push("/quote-options");
    const vehType = formData.vehicleType;
    const phone = formData.phone;
    const payload = {
      vehType,
      phone,
    };
    await handleMail(payload);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-80 md:h-96">
        <Image
          src="/home.png"
          alt="Commercial trucks on a highway at dusk"
          fill
          priority
          className="object-cover h-64 md:h-100"
          style={{ filter: "brightness(0.6)" }}
        />
      </div>
      <main className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Routeway Insurance Group
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Protection for your business vehicles
            </p>
          </div>
          <div className="max-w-5xl mx-auto mb-12 md:mb-16">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                  <div>
                    <label
                      htmlFor="vehicleType"
                      className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                    >
                      VEHICLE TYPE
                    </label>
                    <select
                      id="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="mt-2 block w-full h-11 px-3 rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                    >
                      PHONE
                    </label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-11 pl-10 pr-3 rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full h-10 text-base font-semibold text-white bg-[#254184] hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    >
                      Get a Quote
                    </button>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Or, call{" "}
                    <a
                      href="tel:877-792-9360"
                      className="text-slate-700 hover:text-slate-900 font-semibold"
                    >
                      877-792-9360
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why Routeway?
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Routeway Insurance Group is a national commercial insurance
                broker built for businesses that rely on the road. Whether you
                operate a mobile service company, manage delivery routes, or run
                a fleet of work vehicles—our team is dedicated to helping
                owner-operators and small business owners stay protected and
                compliant without overpaying.
                <br />
                Through our specialized Routeway 360 division, we serve
                contractors, independent distributors, technicians, delivery
                professionals, and mobile businesses of all types. If your
                business runs on wheels, we’re your insurance team.
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                What We Cover
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                We offer fast, tailored quotes on coverage that matters most to
                mobile and route-based businesses, including:
              </p>
              <ul>
                <li>• Commercial Auto Insurance</li>
                <li>• General Liability & Business Owner’s Policies (BOP)</li>
                <li>• Workers’ Compensation</li>
                <li>• Tools, Trailers & Equipment Coverage</li>
                <li>• Occupational Accident & Health Plans</li>
                <li>• Inland Marine & Cargo Protection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why Businesses Choose Us
              </h3>
              <ul>
                <li>✅ Fast Quotes, Same-Day Turnaround</li>
                <li>🚛 Built for Mobile & Route-Based Operators</li>
                <li>
                  🧾 We Know What Your Lenders, Carriers & Contracts Require
                </li>
                <li>📉 We Shop Across Top Carriers to Lower Your Premiums</li>
                <li>
                  🛠️ One-Stop Shop – Insurance, Business Services, Bank Letters,
                  and More
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Let’s Get You Covered
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Once you complete the short form above, a licensed advisor will
                reach out to review your needs and finalize coverage. Whether
                you're starting a new route, switching providers, or adding
                vehicles to your team—we're here to make insurance easy and
                affordable.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default HomePage;
