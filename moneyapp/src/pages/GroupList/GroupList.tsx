import { IonContent, IonHeader, IonPage, IonList, IonLoading } from "@ionic/react";
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

  const fetchGroups = async () => {
    setIsLoading(true);
    const groups = await ApiClient.instance.getGroups();
    setGroupList(groups);
    console.log(groups);
    setIsLoading(false);
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
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        <IonList lines="none" className="group-container">
          <IconButton onClick={navigateToAddGroup} justify="center">
            <FontAwesomeIcon
              className="addGroupIcon"
              size="2x"
              icon={faPlusCircle}
            ></FontAwesomeIcon>
          </IconButton>
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
