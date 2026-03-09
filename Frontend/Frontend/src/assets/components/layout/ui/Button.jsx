const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md";

  const variants = {
    primary:
      "bg-[#41431B] text-white hover:bg-[#2f3112]",
    secondary:
      "bg-[#AEB784] text-[#41431B] hover:opacity-90",
    outline:
      "border border-[#41431B] text-[#41431B] hover:bg-[#E3DBBB]",
    soft:
      "bg-[#E3DBBB] text-[#41431B] hover:bg-[#d6cfaa]",
  };

  const disabledStyle =
    "opacity-50 cursor-not-allowed shadow-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${disabled ? disabledStyle : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;