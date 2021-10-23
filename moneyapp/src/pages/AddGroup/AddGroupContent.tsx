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
import { Redirect, RouteComponentProps } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import {
  ParticipantsComponent,
  SelectedParticipant,
} from "../../components/ParticipantsComponent";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import "./AddGroup.css";
import Icons from "./Icons";
import "../validator.css";
import LoadingWidget from "../../components/common/LoadingWidget";

const AddGroupContent: React.FC<any> = ({ history }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [icons, setIcons] = useState(new Array<any>());
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState(
    new Array<SelectedParticipant>()
  );
  const [isWrongName, setIsWrongName] = useState(false);

  const validateName = (name: string) => {
    setIsWrongName((!name || name.trim() === "" || name.trim().length === 0));
  };

  const fetchFriends = async () => {
    let result = await UserRepository.instance.fetchFriends();

    const friends = result.map((e) => ({
      id: e.id,
      name: e.name,
      selected: true,
    }));
    setSelectedFriends(friends);
  };

  const fetchIcons = async () => {
    let result = await UserRepository.instance.fetchIcons();

    if (result.success) {
      setIcons(result.result.icons);
    }
  };

  const submitSave = async () => {
    const result = await ApiClient.instance.addGroup(
      name,
      selectedIcon,
      selectedFriends.filter((e) => e.selected).map((e) => e.id)
    );

    validateName(name);

    if (result.success) {
      history.push("/groups");
    } else {
      setShowErrorToast(true);
    }
  };

  const iconClassName = (icon: number) => {
    if (icon === selectedIcon) {
      return "group-icon-choice selected-icon";
    } else {
      return "group-icon-choice clickable";
    }
  };

  const setIcon = (icon: number) => {
    setSelectedIcon(icon);
  };

  const init = async () => {

    let now = Date.now();
   
    setIsPageLoading(true);

    await fetchFriends();
    await fetchIcons();
    let diff = Date.now().valueOf() - now.valueOf();

    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000 - diff);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <IonContent>
      <LoadingWidget isLoading={isPageLoading}/>

      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        message="Something wrong"
        position="top"
        color="danger"
        mode="ios"
        duration={1000}
      />
      <IonList lines="none">
        <FlexSpacer height="16.rem" />
        <IonRow className="icon-list">
          {icons.map((icon) => (
            <IonCard key={icon} className={iconClassName(icon)}>
              <IonImg
                className="group-image"
                key={icon}
                src={Icons.instance.icon(icon)}
                onClick={() => setIcon(icon)}
              />
            </IonCard>
          ))}
        </IonRow>
        <FlexSpacer height="16.rem" />

        <IonCard className={isWrongName ? "wrong-input" : ""}>
          <IonInput
            type="text"
            placeholder="Name"
            value={name}
            onIonChange={(e) => {
              setName(e.detail.value!);
              validateName(e.detail.value!);
            }}
          />
        </IonCard>
        <FlexSpacer height="16.rem" />

        <ParticipantsComponent
          className={isWrongName ? "wrong-input" : ""}
          participants={selectedFriends}
          onChanged={setSelectedFriends}
        />

        <IonButton color="primary" onClick={submitSave}>
          Save
        </IonButton>
      </IonList>
    </IonContent>
  );
};

export default AddGroupContent;
