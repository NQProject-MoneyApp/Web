import {
  IonContent,
  IonHeader,
  IonPage,
  IonList,
  IonLoading,
  IonButton,
  useIonAlert,
  IonToast,
} from "@ionic/react";

import Toolbar from "../../components/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./GroupList.css";
import ApiClient from "../../services/ApiClient";
import { useEffect, useState } from "react";
import GroupComponent from "./GroupComponent";
import Group from "../../domain/groups/Group";
import IconButton from "../../components/IconButton";

const GroupList: React.FC = () => {
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
    window.location.href = "/add-group";
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

  const presentJoinAlert = () => {
    present({
      header: "Join",
      inputs: [
        {
          name: "code",
          type: "text",
          placeholder: "Code",
        },
      ],
      buttons: [{ text: "Join", handler: (e) => joinToGroup(e.code) }],
    });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Error"
          position="top"
          color="danger"
          mode="ios"
          duration={1000}
        />
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        <IonList lines="none" className="group-container">
          <IconButton onClick={navigateToAddGroup} justify="center">
            <FontAwesomeIcon
              className="addGroupIcon"
              size="2x"
              icon={faPlusCircle}
            ></FontAwesomeIcon>
          </IconButton>

          <IonButton onClick={presentJoinAlert}>Join</IonButton>

          {groupList.map((group) => (
            <GroupComponent
              key={group.id}
              groupId={group.id}
              name={group.name}
              icon={0}
              balance={group.userBalance}
              createDate={group.createDate}
              isFavourite={false}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupList;
