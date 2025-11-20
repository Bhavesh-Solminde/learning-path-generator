import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { faXmark } from "../../icons";

/**
 * Lightweight modal primitive that renders children inside a centered panel.
 * @param {boolean} props.isOpen - Controls visibility. When false nothing is rendered.
 * @param {() => void} props.onClose - Called when overlay or close button is clicked.
 * @param {React.ReactNode} props.children - Modal body content.
 * @param {string} [props.title] - Optional heading displayed in the header row.
 * @param {string} [props.className] - Utility classes appended to the dialog container.
 * @param {string} [props.ariaLabelledBy] - ID of the heading when the modal needs a custom label source.
 * @param {string} [props.ariaDescribedBy] - ID describing additional context for assistive tech.
 * @param {boolean} [props.closeOnOverlayClick=true] - Controls whether tapping the scrim closes the modal.
 * @param {boolean} [props.closeOnEscape=true] - Controls whether the Escape key dismisses the modal.
 */
const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  ariaLabelledBy,
  ariaDescribedBy,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const dialogRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement;
    const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
    const firstFocusable = focusable && focusable[0];

    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      dialogRef.current?.focus();
    }

    return () => {
      if (
        previouslyFocusedElement.current &&
        typeof previouslyFocusedElement.current.focus === "function"
      ) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, isOpen, onClose]);

  const handleTrapFocus = useCallback((event) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
    if (!focusable || focusable.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  const handleOverlayInteraction = (event) => {
    if (!closeOnOverlayClick) {
      return;
    }

    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onMouseDown={handleOverlayInteraction}
    >
      <div
        ref={dialogRef}
        className={`w-full max-w-xl rounded-[32px] border border-white/10 bg-night-soft/80 text-white shadow-glass backdrop-blur-3xl animate-in fade-in ${className}`.trim()}
        tabIndex={-1}
        onKeyDown={handleTrapFocus}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          {title ? (
            <h2 id={ariaLabelledBy} className="text-lg font-semibold text-white">
              {title}
            </h2>
          ) : (
            <span className="sr-only">Modal dialog</span>
          )}
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15"
            aria-label="Close modal"
          >
            <Icon icon={faXmark} aria-hidden="true" />
          </Button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
