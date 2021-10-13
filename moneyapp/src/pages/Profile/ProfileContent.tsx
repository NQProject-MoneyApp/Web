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
  enum ProfileContentState {
    loading,
    error,
    edit,
  }

  const [state, setState] = useState(ProfileContentState.loading);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pk, setPk] = useState(0);

  const fetchUserProfile = async () => {
    let now = Date.now();
    setState(ProfileContentState.loading);

    let data = await UserRepository.instance.userProfile();
    let diff = Date.now().valueOf() - now.valueOf();

    if (data.success) {
      setTimeout(() => {
        setUsername(data.result.username);
        setEmail(data.result.email);
        setPk(data.result.pk);

        setState(ProfileContentState.edit);
      }, 1000 - diff);
    } else  {
      setTimeout(() => {
        setState(ProfileContentState.error);
      }, 1000 - diff);
    }
  };

  const save = async () => {
    setState(ProfileContentState.loading);
    let result = await UserRepository.instance.updateUserProfile(username, pk ,email);

    if (result.success) {
      fetchUserProfile();
    } else {
      console.log("EROR");
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

  switch (state) {
    case ProfileContentState.loading: {
      return (
        <IonContent>
          <IonLoading isOpen={true} message={"Loading..."} />
        </IonContent>
      );
    }
    case ProfileContentState.edit: {
      return (
        <IonContent>
          <IonCard color="light" className="border">
            <IonLabel className="initials">{usernamePrefix()}</IonLabel>
          </IonCard>
          <FlexSpacer height="1rem" />

          <IonList>
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
              <IonInput
                type="text"
                placeholder="email"
                value={email}
                disabled
              />
            </IonItem>
            <FlexSpacer height="1rem" />
            <IonButton color="primary" onClick={save}>
              Save
            </IonButton>

            <IonButton color="danger" onClick={logout}>
              Logout
            </IonButton>
          </IonList>
        </IonContent>
      );
    }
    default: {
      return (
        <IonContent>
          <IonList>
            <FlexSpacer height="1rem" />
            <IonItem className="error">
              <IonLabel>Connection error</IonLabel>
            </IonItem>
            <FlexSpacer height="1rem" />
            <IonButton color="danger" onClick={fetchUserProfile}>
              Try again
            </IonButton>
          </IonList>
        </IonContent>
      );
    }
  }
};

export default ProfileContent;
