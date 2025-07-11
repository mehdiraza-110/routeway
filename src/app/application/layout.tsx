"use client";

import { usePathname } from "next/navigation";
import Wrapper from "@/Components/Wrapper";

const steps = [
  {
    path: "/application/step-1",
    name: "Business Information",
    progress: 16.67,
  },
  { path: "/application/step-2", name: "Vehicle Information", progress: 33.33 },
  { path: "/application/step-3", name: "Driver Information", progress: 50 },
  { path: "/application/step-4", name: "Coverage Options", progress: 66.67 },
  {
    path: "/application/step-5",
    name: "Additional Information",
    progress: 83.33,
  },
  { path: "/application/step-6", name: "Review & Submit", progress: 100 },
];

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) => step.path === pathname);
  const stepInfo = steps[currentStepIndex] ?? {
    name: "Application",
    progress: 0,
  };

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {currentStepIndex !== -1 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Step {currentStepIndex + 1} of {steps.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {stepInfo.name}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-slate-700 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stepInfo.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </Wrapper>
  );
}
