import {
  IonGrid,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonThumbnail,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import logo from "../images/logo.png";
import UserRepository from "../services/UserRepository";
import FlexSpacer from "./common/Spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import "./Toolbar.css";

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
          <IonButtons onClick={navigateToHome}>
            <IonThumbnail slot="start">
              <img className="logo" src={logo} alt="MoneyApp Logo"></img>
            </IonThumbnail>
          </IonButtons>
          <IonTitle>MoneyApp</IonTitle>
          {UserRepository.instance.isLogin() && (<>
            <FlexSpacer flex={1} />
            <IonButton icon-only fill="clear" className="profileIcon" onClick={navigateToProfile}>
              <FontAwesomeIcon size="2x" icon={faUserCircle}></FontAwesomeIcon>
            </IonButton>
            </>
          )}
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
