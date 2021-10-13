import { ReactElement } from "react";
import "./IconButton.css";

type IconButtonProps = {
  children: ReactElement<any, any>;
  onClick: () => void;
  size?: string;
  justify?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  size,
  justify = "flex-start",
}: IconButtonProps) => {
  let iconSize: string;
  switch (size) {
    case "small":
      iconSize = "1rem";
      break;
    case "medium":
      iconSize = "2.6rem";
      break;
    case "big":
      iconSize = "4rem";
      break;
    default:
      iconSize = "2.6rem";
  }

  let styles: { width: string; maxWidth: string; height: string } = {
    width: iconSize,
    maxWidth: iconSize,
    height: iconSize,
  };

  let containerStyle: { justifyContent: string } = { justifyContent: justify };

  return (
    <>
      <div className="icon-button-container" style={containerStyle}>
        <div className="icon-button" style={styles} onClick={onClick}>
          {children}
        </div>
      </div>
    </>
  );
};

export default IconButton;
