import React from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "7xl" | "full";
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  as?: React.ElementType;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  size = "7xl",
  paddingY = "none",
  as: Component = "div",
  className = "",
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  const paddingYStyles = {
    none: "",
    sm: "py-4 sm:py-6",
    md: "py-8 sm:py-12",
    lg: "py-12 sm:py-16",
    xl: "py-16 sm:py-24",
  };

  return (
    <Component
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${paddingYStyles[paddingY]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
