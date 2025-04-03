import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-secondary p-4 rounded-sm mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Card;
