import { createPortal } from "react-dom";
import { useEffect } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Lightweight modal primitive that renders children inside a centered panel.
 * @param {boolean} props.isOpen - Controls visibility. When false nothing is rendered.
 * @param {() => void} props.onClose - Called when overlay or close button is clicked.
 * @param {React.ReactNode} props.children - Modal body content.
 * @param {string} [props.title] - Optional heading displayed in the header row.
 * @param {string} [props.className] - Utility classes appended to the dialog container.
 * @param {string} [props.ariaLabelledBy] - ID of the heading when the modal needs a custom label source.
 * @param {string} [props.ariaDescribedBy] - ID describing additional context for assistive tech.
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div
        className={`card w-full max-w-lg bg-white shadow-2xl animate-in fade-in ${className}`.trim()}
      >
        <div className="flex items-center justify-between border-b border-muted/40 px-6 py-4">
          {title ? (
            <h2
              id={ariaLabelledBy}
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          ) : (
            <span className="sr-only">Modal dialog</span>
          )}
          <Button
            type="button"
            onClick={onClose}
            className="btn-secondary h-9 w-9 rounded-full bg-muted/20 text-gray-600"
            aria-label="Close modal"
          >
            <Icon icon={faXmark} aria-hidden="true" />
          </Button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
