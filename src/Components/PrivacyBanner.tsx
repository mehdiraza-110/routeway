import { Shield } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const PrivacyBanner = ({ className }) => {
  const router = useRouter();

  const container = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "#f8fafc", // subtle gray/blue
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  };

  const iconWrap = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#e8f0ff",
    color: "#1f6feb",
    flex: "0 0 auto",
  };

  const text = {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.4,
    color: "#0f172a",
  };

  const link = {
    color: "#1f6feb",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  };

  return (
    <div style={container} className={className} role="note" aria-label="Privacy policy notice">
      <span aria-hidden="true" style={iconWrap}>
        <Shield width={18} height={18} />
      </span>

      <p style={text} className="hover:cursor-pointer">
        By sending a quote request, you accept our{" "}
        <span
          style={link}
          onClick={() => router.push("/privacy-policy")} 
        >
          Privacy Policy
        </span>
        .
      </p>
    </div>
  );
};

export default PrivacyBanner;
