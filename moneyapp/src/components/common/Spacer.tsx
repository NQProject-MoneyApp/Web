import { IonContent } from "@ionic/react";

type FlexSpacerProps = {
  flex?: number;
  width?: string;
  height?: string;
};

const FlexSpacer: React.FC<FlexSpacerProps> = ({ flex, width, height }: FlexSpacerProps) => {
  return (
    <div
      style={{
        flex: flex,
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default FlexSpacer;
