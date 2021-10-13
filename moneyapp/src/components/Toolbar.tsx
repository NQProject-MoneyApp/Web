import {
  IonGrid,
  IonRow,
  IonTitle,
  IonToolbar,
  IonItem,
} from "@ionic/react";
import logo from "../images/logo.png";
import UserRepository from "../services/UserRepository";
import FlexSpacer from "./common/Spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import "./Toolbar.css";
import IconButton from "./IconButton";

const Toolbar: React.FC = () => {
  const navigateToProfile = () => {
    window.location.href = "/profile";
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <IonToolbar>
      <IonGrid>
        <IonRow>
          <IonItem lines="none">
            <IconButton onClick={navigateToHome}>
              <img src={logo} alt="MoneyApp Logo"></img>
            </IconButton>
          </IonItem>
          <IonTitle>MoneyApp</IonTitle>
          {UserRepository.instance.isLogin() && (
            <>
              <FlexSpacer flex={1} />
              <IonItem lines="none">
                <IconButton onClick={navigateToProfile}>
                  <FontAwesomeIcon
                    className="profileIcon"
                    size="2x"
                    icon={faUserCircle}
                  ></FontAwesomeIcon>
                </IconButton>
              </IonItem>
            </>
          )}
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
