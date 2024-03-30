import React from "react";
import className from "classnames";
function Button({
  children,
  primary,
  secondary,
  info,
  danger,
  outline,
  rounded,
  warning,
  roundedMedium,
  ...rest
}) {
  const classes = className(
    rest.className,
    "flex items-center px-3 py-1.6 border m-2",
    {
      /// creating the logic for the primary secondary and others
      "border-[#05B058] bg-[#05B058]  font-medium drop-shadow-2xl": primary,
      "border-black bg-black text-white font-medium drop-shadow-2xl": secondary,
      "border-[#05B058] bg-slate-100 text-[#05B058] font-medium drop-shadow-2xl":
        info,
      //   "border-green-600 bg-green-600 text-white": warning,
      //   "border-red-600 bg-red-600 text-white": danger,
      "rounded-full": rounded,
      "rounded-md": roundedMedium,
      "bg-[#fff]": outline,
      "text-[#05B058]": outline && primary,
      "text-gray-600": outline && secondary,
      "text-green-600": outline && info,
      "text-red-600": outline && warning,
      "text-yellow-600": outline && danger,
    }
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkingTheUniqueness: ({ primary, secondary, success, danger, warning }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!danger) +
      Number(!!warning);
    if (count > 1) {
      throw new Error(
        "choose one of the primary,secondary,success,danger,warning"
      );
    }
  },
};
export default Button;
