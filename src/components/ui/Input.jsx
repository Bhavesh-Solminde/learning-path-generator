import { forwardRef } from "react";

/**
 * Controlled input primitive that mirrors native props while enforcing shared styling.
 * @param {string} [props.type="text"] - Native input type.
 * @param {string} [props.className] - Optional utility classes appended after the base style.
 * @param {string} [props.ariaLabel] - Accessible label for inputs without visible labels.
 */
const Input = forwardRef(
  ({ type = "text", className = "", ariaLabel, ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={`input-field ${className}`.trim()}
      {...rest}
    />
  )
);

Input.displayName = "Input";

export default Input;
