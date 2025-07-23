"use client";

import {
  useState,
  Fragment,
  forwardRef,
  FC,
  ComponentProps,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon } from "lucide-react";

// Import the datepicker's base stylesheet
import "react-datepicker/dist/react-datepicker.css";

// --- Reusable UI Components ---

interface QuoteOptionCardProps {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  isPrimary?: boolean;
}

const QuoteOptionCard: FC<QuoteOptionCardProps> = ({
  title,
  description,
  features,
  buttonText,
  onButtonClick,
  isPrimary = false,
}) => {
  const baseBg = isPrimary ? "bg-[#254184]" : "bg-slate-700";
  const hoverBg = isPrimary ? "hover:bg-slate-800" : "hover:bg-slate-800";

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className={`${baseBg} text-white text-center p-4 rounded-t-lg`}>
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
      </div>
      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-gray-600 mb-6 text-center">{description}</p>
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 mt-2 shrink-0"></span>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onButtonClick}
          className={`w-full h-10 cursor-pointer ${baseBg} ${hoverBg} text-white font-semibold rounded-md transition-colors`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// --- Modal Component ---

interface QuickRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickRequestModal: FC<QuickRequestModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    policyStartDate: undefined as Date | undefined,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      policyStartDate: date || undefined,
    }));
  };

  const handleMail = async () => {
    const mailPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: "Hello from the contact form!",
      Date: formData.policyStartDate,
    };

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailPayload),
    });

    const data = await res.json();

    if (data.success) {
      console.log("Email sent successfully:", data);
      toast.success("Your request has been sent successfully!");
      return true;
    } else {
      toast.error("Failed to send email.");
      return false;
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("quoteData");
    let phone = "";

    if (stored) {
      const data = JSON.parse(stored);
      const phoneNum = data?.phone || "";
      phone = phoneNum;
    }
    console.log(phone);
    setFormData({ ...formData, phone: phone });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.policyStartDate) {
      toast.error("Please fill all fields to submit your request.");
      return;
    }
    const isMailSent = handleMail();
    if (!isMailSent) {
      toast.error("Failed to send your request. Please try again later.");
      return;
    }
    console.log("Quick request submitted:", formData);
    toast.success("Request submitted! We'll email your quote shortly.");
    router.push("/application/quick-landing");
    onClose();
  };

  const CustomDateInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
    ({ value, onClick }, ref) => (
      <div className="relative">
        <input
          onClick={onClick}
          value={value}
          ref={ref}
          readOnly
          className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 cursor-pointer focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          placeholder="Select a start date"
        />
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    )
  );
  CustomDateInput.displayName = "CustomDateInput";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Quick Quote Request
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-1 w-full h-11 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="mt-1 w-full h-11 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      maxLength={12}
                      max={12}
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-1 w-full h-11 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      required={true}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Policy Start Date
                    </label>
                    <DatePicker
                      selected={formData.policyStartDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      customInput={<CustomDateInput />}
                      popperClassName="custom-datepicker-popper"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-6 pt-2">
                    <button
                      type="submit"
                      className=" cursor-pointer w-full h-10 inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Main Page Component ---

const QuoteOptionsPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickRequestFeatures = [
    "Fast and simple process",
    "Basic coverage estimate",
    "Delivered directly to your email",
  ];

  const completeAppFeatures = [
    "Comprehensive coverage options",
    "Detailed, personalized quote",
    "Guided 6-step application process",
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-10 md:mb-14">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Choose Your Path to a Quote
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                We offer two convenient options to get you started.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <QuoteOptionCard
                title="Quick Request"
                description="Get a basic quote estimate quickly via email."
                features={quickRequestFeatures}
                buttonText="Request a Quick Quote"
                onButtonClick={() => setIsModalOpen(true)}
              />
              <QuoteOptionCard
                title="Complete Application"
                description="Receive a detailed, accurate quote by completing our full application."
                features={completeAppFeatures}
                buttonText="Start Full Application"
                onButtonClick={() => router.push("/application/step-1")}
                isPrimary
              />
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => router.push("/")}
                className="px-8 h-10 cursor-pointer border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-md font-semibold transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>

      <QuickRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default QuoteOptionsPage;
