import { IonContent } from "@ionic/react";

type FlexSpacerProps = {
  flex?: number;
  width?: string;
  height?: string;
  className?: string,
};

const FlexSpacer: React.FC<FlexSpacerProps> = ({ flex, width, height, className }: FlexSpacerProps) => {
  return (
    <div
    className={className}
      style={{
        flex: flex,
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default FlexSpacer;
