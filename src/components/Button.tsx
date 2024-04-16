import React from 'react';

// Define your style object
const buttonStyles = {
  primary:
    'inline-flex items-center justify-center h-10 px-4 bg-secondary text-white rounded-3xl hover:rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap font-semibold',
  secondary:
    'inline-flex items-center justify-center h-8 px-4 bg-secondary/20 text-[#36413E] rounded-3xl whitespace-nowrap text-xs font-semibold',
};

interface ButtonProps {
  variant: 'primary' | 'secondary'; // Assuming variant can only be 'primary' or 'secondary'
  children: React.ReactNode;
  onClick?: () => void; // Optional
  href?: string; // Optional
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  href,
}) => {
  const className = buttonStyles[variant] || buttonStyles.secondary;

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
