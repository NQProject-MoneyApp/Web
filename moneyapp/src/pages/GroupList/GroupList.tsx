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
import { Redirect } from "react-router";

const GroupList: React.FC = () => {
  const [groupList, setGroupList] = useState(new Array<any>());

  const fetchGroups = async () => {
    const response = await ApiClient.instance.getGroups();
    setGroupList(response.data);
    console.log(response.data);
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
              key={group.pk}
              name={group.name}
              icon={group.icon}
              balance={group.user_balance}
              createDate={group.create_date}
              isFavourite={group.is_favourite}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupList;
