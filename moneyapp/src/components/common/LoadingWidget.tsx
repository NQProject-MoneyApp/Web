import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createAnimation, IonContent, IonModal } from "@ionic/react";
import { faHandHolding as handHolding } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign as dollarSign } from "@fortawesome/free-solid-svg-icons";
import "./LoadingWidget.css";
import logo from "../images/logo.svg";
import "./LoadingWidget.css";

type LoadingWidgetProps = {
  isLoading: boolean;
};

const LoadingWidget: React.FC<LoadingWidgetProps> = ({
  isLoading,
}: LoadingWidgetProps) => {
  return (
    <IonModal
      isOpen={isLoading}
      cssClass="ion-modal-loading"
      backdropDismiss={false}
    >
      <div className="loading-container">
        <FontAwesomeIcon
          size="2x"
          className="loading-dolar-animate"
          icon={dollarSign}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          size="3x"
          className="loading-icon"
          icon={handHolding}
        ></FontAwesomeIcon>
      </div>
    </IonModal>
  );
};

export default LoadingWidget;
