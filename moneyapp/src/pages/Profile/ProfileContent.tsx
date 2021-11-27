import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonContent,
  IonLoading,
  IonCard,
  IonRow,
  IonList,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import "./Profile.css";

const ProfileContent: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pk, setPk] = useState(0);

  const fetchUserProfile = async () => {
    setIsLoading(true);

    let data = await UserRepository.instance.userProfile();

    if (data.success) {
      setUsername(data.result.username);
      setEmail(data.result.email);
      setPk(data.result.pk);
    }
    setIsLoading(false);
  };

  const save = async () => {
    setIsLoading(true);
    let result = await UserRepository.instance.updateUserProfile(
      username,
      pk,
      email
    );

    setIsLoading(false);

    if (result.success) {
      setShowToast(true);
    } else {
      setShowErrorToast(true);
    }
  };

  const logout = async () => {
    UserRepository.instance.logout();
  };

  const usernamePrefix = (): string => {
    return username.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <IonContent>
      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => {
          setShowErrorToast(false);
        }}
        message="Something went wrong"
        position="top"
        color="danger"
        mode="ios"
        duration={1000}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Updated"
        position="top"
        color="primary"
        mode="ios"
        duration={1000}
      />
      <IonLoading isOpen={isLoading} message={"Loading..."} />

      <IonCard color="light" className="border">
        <IonLabel className="initials">{usernamePrefix()}</IonLabel>
      </IonCard>
      <FlexSpacer height="1rem" />

      <IonList lines="none">
        <IonItem>
          <IonLabel>Login</IonLabel>
          <IonInput
            type="text"
            placeholder="username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput type="text" placeholder="email" value={email} disabled />
        </IonItem>
        <FlexSpacer height="1rem" />

        <IonRow className="buttons">
          <IonButton color="primary" onClick={save}>
            Save
          </IonButton>

          <IonButton color="danger" onClick={logout}>
            Log out
          </IonButton>
        </IonRow>
      </IonList>
    </IonContent>
  );
};

export default ProfileContent;
