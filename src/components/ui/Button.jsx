import { forwardRef } from "react";

const BUTTON_VARIANTS = {
  primary:
    "bg-white text-black border border-white/20 shadow-glow hover:bg-white/90 focus-visible:ring-white/30",
  secondary:
    "bg-white/5 text-white/80 border border-white/10 backdrop-blur hover:text-white hover:bg-white/10 focus-visible:ring-white/20",
  ghost:
    "bg-transparent text-white/60 border border-transparent hover:text-white hover:bg-white/5 focus-visible:ring-white/10",
};

const BUTTON_SIZES = {
  sm: "text-xs tracking-wide px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

/**
 * Accessible button primitive with sensible defaults.
 * @param {object} props
 * @param {React.ReactNode} props.children - Visible label or nested content.
 * @param {"button"|"submit"|"reset"} [props.type="button"] - Native button type.
 * @param {"primary"|"secondary"|"ghost"} [props.variant="primary"] - Visual treatment.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Padding and font sizing scale.
 * @param {string} [props.className] - Optional utility classes appended to the computed style.
 */
const Button = forwardRef(
  (
    {
      children,
      type = "button",
      onClick,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const variantClasses = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
    const sizeClasses = BUTTON_SIZES[size] || BUTTON_SIZES.md;
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-soft disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none hover:scale-[1.02]";

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
