import React from 'react';

// Define a mapping of button styles to Tailwind classes
const buttonStyles = {
  primary:
    'flex items-center justify-center h-10 px-14 mb-2 bg-secondary text-white w-20 rounded-3xl hover:rounded-xl  hover:shadow-md transition-all duration-200 cursor-pointer',
  secondary: 'bg-green-500 text-white py-2 px-4 rounded-md',
  link: 'text-blue-500 underline py-2 px-4',
  ghost:
    'flex items-center justify-center h-10 px-14 mb-2 bg-[#F2F2F2] text-black w-20 rounded-3xl transition-all duration-200',
  // ... add more styles as needed
};

const Button = ({ children, variant = 'primary', href, ...props }) => {
  const buttonClass = buttonStyles[variant] || buttonStyles.primary;

  // Render a link or a button based on the presence of 'href'
  return href ? (
    <a href={href} className={buttonClass} {...props}>
      {children}
    </a>
  ) : (
    <p className={buttonClass} {...props}>
      {children}
    </p>
  );
};

export default Button;
