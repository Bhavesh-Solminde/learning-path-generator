import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

const AnimatedIcon = ({
  iconData,
  size = 24,
  trigger = "hover",
  colors = {},
}) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Play animation on mount
    if (trigger === "loop") {
      playerRef.current?.playFromBeginning();
    }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      playerRef.current?.playFromBeginning();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Player
        ref={playerRef}
        size={size}
        icon={iconData}
        colorize={colors.primary || "#FF7A00"}
      />
    </div>
  );
};

export default AnimatedIcon;
