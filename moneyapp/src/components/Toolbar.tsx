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

import "./Toolbar.css";

const Toolbar: React.FC = () => {
  const navigateToProfile = () => {
    window.location.href = "/profile";    
  };

  return (
    <IonToolbar>
      <IonGrid>
        <IonRow>
          <IonButtons>
            <IonThumbnail slot="start">
              <img className="logo" src={logo} alt="MoneyApp Logo"></img>
            </IonThumbnail>
          </IonButtons>
          <IonTitle>MoneyApp</IonTitle>
          {UserRepository.instance.isLogin() && (<>
            <FlexSpacer flex={1} />
            <IonButton color="primary" onClick={navigateToProfile}>
              Profile
            </IonButton>
            </>
          )}
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
