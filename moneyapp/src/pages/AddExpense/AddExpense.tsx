import {
  CreateAnimation,
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonSpinner,
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

const AddExpense: React.FC<RouteComponentProps> = ({ history }) => {
  interface RouteParams {
    groupId: string;
  }

  const { groupId } = useParams<RouteParams>();

  const [loading, setLoading] = useState(true);
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
        history.goBack();
      });
  };

  const fetchParticipants = async () => {
    console.log("fetchParticipants");

    const groups = await ApiClient.instance.getGroups();
    const participants: SelectedParticipant[] = groups
      .find((g) => g.id == parseInt(groupId))!
      .members.map((e) => ({ id: e.id, name: e.name, selected: true }));
    setParticipants(participants);
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const loadingContent = (
    <CreateAnimation
    key="1"
    play={true}
    delay={500}
    duration={500}
    fromTo={{
      property: "opacity",
      fromValue: "0",
      toValue: "1",
    }}
  >
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonSpinner name="circular" color="primary" />
    </div>
    </CreateAnimation>
  );
  const content = (
    <CreateAnimation
      key="2"
      play={true}
      duration={300}
      fromTo={{
        property: "opacity",
        fromValue: "0",
        toValue: "1",
      }}
    >
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
    </CreateAnimation>
  );

  return (
    <IonPage style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>{loading ? loadingContent : content}</IonContent>
    </IonPage>
  );
};

export default AddExpense;
