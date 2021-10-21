import { ReactElement } from "react";
import "./IconButton.css";

type IconButtonProps = {
  children: ReactElement<any, any>;
  onClick: (e: any) => void;
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
    case "tiny":
      iconSize = "1.8rem";
      break;
    case "small":
      iconSize = "2.2rem";
      break;
    case "medium":
      iconSize = "2.6rem";
      break;
    case "big":
      iconSize = "4rem";
      break;
    case "unset":
      iconSize = "unset";
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
        <div className="icon-button clickable" style={styles} onClick={onClick}>
          <div className="clickable-icon-container">{children}</div>
        </div>
      </div>
    </>
  );
};

export default IconButton;
