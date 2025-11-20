import { forwardRef } from "react";

const INPUT_VARIANTS = {
  primary:
    "border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:border-white/30 focus-visible:ring-white/20",
  secondary:
    "border border-white/5 bg-white/10 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/30",
  ghost:
    "border border-transparent bg-transparent text-white placeholder:text-zinc-600 focus-visible:border-white/30 focus-visible:ring-white/10",
};

const INPUT_SIZES = {
  sm: "text-xs px-3.5 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

/**
 * Controlled input primitive that mirrors native props while enforcing shared styling.
 * @param {string} [props.type="text"] - Native input type.
 * @param {"primary"|"secondary"|"ghost"} [props.variant="primary"] - Visual treatment.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Padding and font sizing scale.
 * @param {string} [props.className] - Optional utility classes appended after the computed style.
 */
const Input = forwardRef(
  (
    { type = "text", variant = "primary", size = "md", className = "", ariaLabel, ...rest },
    ref,
  ) => {
    const variantClasses = INPUT_VARIANTS[variant] || INPUT_VARIANTS.primary;
    const sizeClasses = INPUT_SIZES[size] || INPUT_SIZES.md;
    const baseClasses =
      "w-full rounded-2xl shadow-outline backdrop-blur transition-all duration-300 ease-soft focus-visible:outline-none focus-visible:ring-2";

    return (
      <input
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
