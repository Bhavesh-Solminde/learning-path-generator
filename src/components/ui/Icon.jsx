import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Consistent wrapper around FontAwesomeIcon to simplify aria handling.
 * @param {import("@fortawesome/fontawesome-svg-core").IconProp} props.icon - Icon definition.
 * @param {string} [props.label] - Accessible label describing the glyph. Falls back to aria-hidden when omitted.
 * @param {string} [props.className] - Optional utility classes for sizing/color.
 */
const Icon = ({ icon, label, className = "", ...rest }) => (
  <FontAwesomeIcon
    icon={icon}
    className={className}
    aria-hidden={label ? undefined : "true"}
    aria-label={label}
    role="img"
    {...rest}
  />
);

export default Icon;
