import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  hoverEffect = false,
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-braj-cream-300/80 shadow-sm overflow-hidden ${
        hoverEffect
          ? "transition-all duration-300 hover:shadow-md hover:border-braj-gold-400 hover:-translate-y-0.5"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`p-5 pb-3 border-b border-braj-cream-200/60 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <h3
      className={`font-semibold text-lg text-braj-indigo-900 flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <p className={`text-sm text-braj-cream-800 mt-1 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`p-5 pt-3 border-t border-braj-cream-200/60 bg-braj-cream-50/50 ${className}`} {...props}>
      {children}
    </div>
  );
};
