import { forwardRef } from "react";

/**
 * Accessible button primitive with sensible defaults.
 * @param {object} props
 * @param {React.ReactNode} props.children - Visible label or nested content.
 * @param {string} [props.type="button"] - Native button type.
 * @param {function} [props.onClick] - Click handler forwarded to the native button.
 * @param {string} [props.className] - Optional utility classes appended to the default style.
 * @param {boolean} [props.disabled] - Disables the button while preserving aria-disabled semantics.
 * @param {string} [props.ariaLabel] - Accessible label when the visible content is not descriptive.
 */
const Button = forwardRef(
  (
    {
      children,
      type = "button",
      onClick,
      className = "",
      disabled = false,
      ariaLabel,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn-primary inline-flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
