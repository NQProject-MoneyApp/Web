import {
  IonGrid,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonThumbnail,
} from "@ionic/react";
import logo from "../images/logo.png";

import "./Toolbar.css";

const Toolbar: React.FC = () => {
  return (
    <IonToolbar>
      <IonGrid>
        <IonRow>
          <IonButtons>
            <IonThumbnail slot="start">
              <img className="logo" src={logo} alt='MoneyApp Logo'></img>
            </IonThumbnail>
          </IonButtons>
          <IonTitle>MoneyApp</IonTitle>
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
