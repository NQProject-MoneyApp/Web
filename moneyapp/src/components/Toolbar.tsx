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

import "./Toolbar.css";

const Toolbar: React.FC = () => {
  const logout = () => {
    UserRepository.instance.logout();
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
          {UserRepository.instance.isLogin() && (
            <IonButton color="primary" onClick={logout}>
              Logout
            </IonButton>
          )}
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default Toolbar;
