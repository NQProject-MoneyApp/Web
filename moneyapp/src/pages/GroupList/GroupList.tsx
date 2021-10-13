import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonList,
  IonButton,
} from "@ionic/react";
import Toolbar from "../../components/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./GroupList.css";
import ApiClient from "../../services/ApiClient";
import { useEffect, useState } from "react";
import GroupComponent from "./GroupComponent";
import Group from "../../domain/groups/Group";
import { Redirect } from "react-router";

const GroupList: React.FC = () => {
  const [groupList, setGroupList] = useState(new Array<Group>());

  const fetchGroups = async () => {
    const groups = await ApiClient.instance.getGroups();
    setGroupList(groups);
    console.log(groups);
  };

  const navigateToAddGroup = () => {
    window.location.href = "/add-group";
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
        <IonList lines="none">
          <IonItem>
            <IonButton
              onClick={navigateToAddGroup}
              icon-only
              fill="clear"
              size="default"
            >
              <FontAwesomeIcon
                className="addGroupIcon"
                icon={faPlusCircle}
              ></FontAwesomeIcon>
            </IonButton>
          </IonItem>
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
