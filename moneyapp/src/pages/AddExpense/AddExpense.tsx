import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import {
  ParticipantsComponent,
  SelectedParticipant,
} from "../../components/ParticipantsComponent";
import Toolbar from "../../components/Toolbar";
import ApiClient from "../../services/ApiClient";

const AddExpense: React.FC<RouteComponentProps> = ({history}) => {
  interface RouteParams {
    groupId: string;
  }

  const { groupId } = useParams<RouteParams>();

  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedParticipants, setParticipants] = useState(
    new Array<SelectedParticipant>()
  );

  const submitSave = async () => {
      setLoading(true);
    ApiClient.instance
      .addExpense(
        parseInt(groupId),
        expenseName,
        parseFloat(amount),
        selectedParticipants.filter((e) => e.selected).map((e) => e.id)
      )
      .then(() => {
        history.push(`/groups/${groupId}/expenses`);
      });
  };

  const fetchParticipants = async () => {
    console.log("fetchParticipants");

    const groups = await ApiClient.instance.getGroups();
    const participants: SelectedParticipant[] = groups
      .find((g) => g.id == parseInt(groupId))!
      .members.map((e) => ({ id: e.id, name: e.name, selected: true }));
    setParticipants(participants);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonInput
            type="text"
            placeholder="Name"
            value={expenseName}
            onIonChange={(e) => setExpenseName(e.detail.value!)}
          />
          <IonInput
            type="text"
            placeholder="Amount"
            value={amount}
            onIonChange={(e) => setAmount(e.detail.value!)}
          />

          <ParticipantsComponent
            participants={selectedParticipants}
            onChanged={setParticipants}
          />

          <IonButton color="primary" onClick={submitSave} disabled={loading}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddExpense;
