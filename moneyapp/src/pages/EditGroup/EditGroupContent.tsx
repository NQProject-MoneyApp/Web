import {
  IonItem,
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
import { useParams } from "react-router";
import FlexSpacer from "../../components/common/Spacer";
import ApiClient from "../../services/ApiClient";
import UserRepository from "../../services/UserRepository";
import Icons from "../AddGroup/Icons";

const EditGroupContent: React.FC<any> = ({ history }) => {
  interface RouteParams {
    groupId: string;
  }
  enum EditGroupContentState {
    pageLoading,
    edit,
  }

  const { groupId } = useParams<RouteParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(EditGroupContentState.pageLoading);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [icons, setIcons] = useState(new Array<any>());
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [isWrongName, setIsWrongName] = useState(false);

  const fetchIcons = async () => {
    let result = await UserRepository.instance.fetchIcons();

    if (result.success) { 
      setIcons(result.result.icons);
      return true;
    } else {
      return false;
    }
  };

  const submitSave = async () => {
    setIsLoading(true);
    const result = await ApiClient.instance.editGroup(
      parseInt(groupId),
      name,
      selectedIcon
    );

    validateName(name);
    setIsLoading(false);

    if (result.success) {
      history.goBack();
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

  const validateName = (name: string) => {
    setIsWrongName(!name || name.trim() === "" || name.trim().length === 0);
  };

  const setIcon = (icon: number) => {
    setSelectedIcon(icon);
  };

  const init = async () => {
    let iconsResult = await fetchIcons();
    const group = await ApiClient.instance.getGroup(parseInt(groupId));

    if (!iconsResult || group == null) {
      setShowToast(true);
    } else {
      setName(group.name);
      setIcon(group.icon);
      setState(EditGroupContentState.edit);
    }
  };

  useEffect(() => {
    init();
  }, []);

  switch (state) {
    case EditGroupContentState.pageLoading: {
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
    case EditGroupContentState.edit: {
      return (
        <IonContent>
          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={() => setShowErrorToast(false)}
            message="Something went wrong"
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
                    key={icon}
                    src={Icons.instance.icon(icon)}
                    onClick={() => setIcon(icon)}
                  />
                </IonCard>
              ))}
            </IonRow>
            <FlexSpacer height="16.rem" />

            <IonItem className={isWrongName ? "ion-invalid" : ""}>
              <IonInput
                type="text"
                placeholder="Name"
                value={name}
                onIonChange={(e) => {
                  setName(e.detail.value!);
                  validateName(e.detail.value!);
                }}
              />
            </IonItem>
            <FlexSpacer height="16.rem" />

            <IonButton
              color="primary"
              onClick={submitSave}
              disabled={isLoading}
            >
              Save
            </IonButton>
          </IonList>
        </IonContent>
      );
    }
  }
};

export default EditGroupContent;
