import {
  IonContent,
  IonHeader,
  IonPage,
  IonList,
  IonLoading,
  IonButton,
  useIonAlert,
  IonToast,
  IonRow,
  IonImg,
  useIonModal,
  IonModal,
} from "@ionic/react";

import Toolbar from "../../components/Toolbar";
import "./GroupList.css";
import ApiClient from "../../services/ApiClient";
import { useEffect, useState } from "react";
import GroupComponent from "./GroupComponent";
import Group from "../../domain/groups/Group";
import { RouteComponentProps } from "react-router";
import IconButton from "../../components/IconButton";
import Icons from "../AddGroup/Icons";
import LoadingWidget from "../../components/common/LoadingWidget";

const GroupList: React.FC<RouteComponentProps> = ({ history }) => {
  const [groupList, setGroupList] = useState(new Array<Group>());
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonAlert();
  const [showToast, setShowToast] = useState(false);

  const fetchGroups = async () => {
    setIsLoading(true);
    const groups = await ApiClient.instance.getGroups();
    setGroupList(groups);
    setIsLoading(false);
  };

  const navigateToAddGroup = () => {
    history.push("/add-group");
  };

  const joinToGroup = async (code: string) => {
    setIsLoading(true);
    const result = await ApiClient.instance.join(code);
    if (result.success) {
      fetchGroups();
    } else {
      setIsLoading(false);
      setShowToast(true);
    }
  };

  const markGroupAsFavourite = async (
    groupId: number,
    isFavourite: boolean
  ) => {
    setIsLoading(true);
    const result = await ApiClient.instance.markGroupAsFavourite(
      groupId,
      isFavourite
    );
    if (result.success) {
      fetchGroups();
    } else {
      setIsLoading(false);
      setShowToast(true);
    }
  };

  const presentJoinAlert = () => {
    present({
      header: "Join a group",
      inputs: [
        {
          name: "code",
          type: "text",
          placeholder: "Code",
        },
      ],
      buttons: [{ text: "Ok", handler: (e) => joinToGroup(e.code) }],
    });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <LoadingWidget isLoading={isLoading} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Something wrong"
          position="top"
          color="danger"
          mode="ios"
          duration={1000}
        />
        <IonList lines="none" className="group-container">
          <IonRow>
            <IonButton onClick={navigateToAddGroup}>Add group</IonButton>
            <IonButton onClick={presentJoinAlert}>Join group</IonButton>
          </IonRow>

          {groupList.map((group) => (
            <GroupComponent
              key={group.id}
              groupId={group.id}
              name={group.name}
              icon={group.icon}
              balance={group.userBalance}
              createDate={group.createDate}
              isFavourite={group.isFavourite}
              markGroupAsFavourite={markGroupAsFavourite}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupList;
