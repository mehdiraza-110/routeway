"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CheckCircle, Undo2 } from "lucide-react";
import { useEffect } from "react";

const QuickRequestLanding = () => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <CheckCircle className="h-6 w-6" />
          <span>Status</span>
        </h2>
      </div>
      <div className="p-8">
        <form className="space-y-6">
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick Request Submitted
            </h3>
            <p className="text-gray-600">
              Your quick request has been submitted successfully!
            </p>
          </div>
          {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Important:</h4>
            <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
              <li>Your information will be sent via email for processing.</li>
              <li>Data will be entered into our Google Sheets database.</li>
              <li>
                Our team will use this to prepare your personalized quote.
              </li>
            </ul>
          </div> */}
          <div className="flex justify-center items-center w-full pt-6">
            {/* <button
              type="button"
              onClick={() => router.push("/application/step-6")}
              className="px-8 h-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button> */}
            <button
              type="button"
              onClick={() => {
                router.push("/");
              }}
              className="px-6 h-10 flex items-center gap-2 cursor-pointer rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              <Undo2 />
              Go To Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default QuickRequestLanding;
