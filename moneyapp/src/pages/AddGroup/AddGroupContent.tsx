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
  IonImg,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import "./AddGroup.css";
import Icons from "./Icons";

const AddGroupContent: React.FC = () => {
  enum AddGroupContentState {
    loading,
    edit,
  }

  const [state, setState] = useState(AddGroupContentState.loading);
  const [showToast, setShowToast] = useState(false);
  const [friends, setFriends] = useState(new Array<any>());
  const [icons, setIcons] = useState(new Array<any>());
  const [name, setName] = useState("");

  const fetchFriends = async () => {
    let result = await UserRepository.instance.fetchFriends();

    if (result.success) {
      setFriends(result.result);
      return true;
    } else {
      return false;
    }
  };

  const fetchIcons = async () => {
    let result = await UserRepository.instance.fetchIcons();

    if (result.success) {
      setIcons(result.result.icons);
      return true;
    } else {
      return false;
    }
  };

  const init = async () => {
    let friendsResult = await fetchFriends();
    let iconsResult = await fetchIcons();

    if (!friendsResult || !iconsResult) {
      setShowToast(true);
    } else {
      setState(AddGroupContentState.edit);
    }
  };

  useEffect(() => {
    init();
  }, []);

  switch (state) {
    case AddGroupContentState.loading: {
      return (
        <IonContent>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Connection error, check internet and reload page"
            position="top"
            color="danger"
            mode="ios"
            duration={1000}
          />
          <IonLoading isOpen={true} message={"Loading..."} />
        </IonContent>
      );
    }
    case AddGroupContentState.edit: {
      return (
        <IonContent>
          <IonList>
            <IonItem>
              {icons.map((icon) => (
                <IonImg src={Icons.instance.icon(icon)} />
              ))}
            </IonItem>

            <IonItem>
              <IonLabel>Login</IonLabel>
              <IonInput
                type="text"
                placeholder="Name"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              {friends.map((friend) => (
                <IonLabel>{friend.username!}</IonLabel>
              ))}
            </IonItem>
          </IonList>
        </IonContent>
      );
    }
  }
};

export default AddGroupContent;
