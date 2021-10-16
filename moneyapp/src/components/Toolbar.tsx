import { IonGrid, IonRow, IonToolbar } from "@ionic/react";
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
    <IonToolbar color="secondary">
      <IonGrid>
        <IonRow>
          <div className="app-title-container">
            <IconButton onClick={navigateToHome} size="medium">
              <img src={logo} alt="MoneyApp Logo"></img>
            </IconButton>
            <h1 className="app-title">MoneyApp</h1>
          </div>

          {UserRepository.instance.isLogin() && (
            <>
              <FlexSpacer flex={1} />
              <IconButton onClick={navigateToProfile}>
                <FontAwesomeIcon
                  className="profileIcon"
                  size="2x"
                  icon={faUserCircle}
                ></FontAwesomeIcon>
              </IconButton>
            </>
          )}
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
