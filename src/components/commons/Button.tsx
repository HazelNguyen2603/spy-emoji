import React from "react";

interface ButtonProps {
  label: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  severity?: "primary" | "secondary";
}

const Button = ({
  postIcon,
  preIcon,
  className,
  label,
  disabled,
  onClick,
  severity = "primary"
}: ButtonProps) => {
  const baseClasses =
    "flex items-center justify-center px-4 py-2 rounded transition cursor-pointer";
  const severityClasses =
    severity === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "bg-secondary text-white hover:bg-secondary-dark";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${severityClasses} ${className}`}
    >
      {preIcon && <span className="mr-2">{preIcon}</span>}
      {label}
      {postIcon && <span className="ml-2">{postIcon}</span>}
    </button>
  );
};

export default Button;
