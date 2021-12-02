import {
  CreateAnimation,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { SelectedParticipant } from "../../components/ParticipantsComponent";
import Toolbar from "../../components/Toolbar";
import ApiClient, { ExpenseType } from "../../services/ApiClient";

const AddPayment: React.FC<RouteComponentProps> = ({ history }) => {
  interface RouteParams {
    groupId: string;
  }

  const { groupId } = useParams<RouteParams>();
  const [showToast, setShowToast] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [isWrongAmount, setIsWrongAmount] = useState(false);
  const [paidBy, setPaidBy] = useState<number|null>(null);
  const [paidTo, setPaidTo] = useState<number|null>(null);
  const [participants, setParticipants] = useState(
    new Array<SelectedParticipant>()
  );

  const validateAmount = (amount: number) => {
    setIsWrongAmount(!amount || amount < 0);
  };

  const submitSave = async () => {
    setIsLoading(true);
    const result = await ApiClient.instance.addExpense(
      parseInt(groupId),
      `${participants.find(p => p.id === paidBy)!.name} -> ${participants.find(p => p.id === paidTo)!.name}`,
      parseFloat(amount),
      [],
      paidBy,
      ExpenseType.payment,
      paidTo
    );

    setIsLoading(false);

    if (result.success) {
      history.goBack();
    } else {
      setShowToast(true);
    }
  };

  const fetchParticipants = async () => {
    console.log("fetchParticipants");

    const groups = await ApiClient.instance.getGroups();
    const fetchedParticipants: SelectedParticipant[] = groups
      .find((g) => g.id === parseInt(groupId))!
      .members.map((e) => ({ id: e.id, name: e.name, selected: true }));
    setParticipants(fetchedParticipants);
    setPageLoading(false);
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
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Something went wrong"
        position="top"
        color="danger"
        duration={1000}
      />
      <IonList>
        <IonItem lines="none">
          <IonLabel>Paid by</IonLabel>
          <IonSelect
            placeholder="choose"
            value={paidBy}
            onIonChange={(e) => {
              setPaidBy(e.detail.value!);
            }}
          >
            {participants.map((p) => {
              return <IonSelectOption value={p.id}>{p.name}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>

        <IonItem lines="none">
          <IonLabel>Paid To</IonLabel>
          <IonSelect
            placeholder="choose"
            value={paidTo}
            onIonChange={(e) => {
              console.log((e.detail.value!))
              setPaidTo(e.detail.value!);
            }}
          >
            {participants.map((p) => {
              return <IonSelectOption value={p.id}>{p.name}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>
        <IonItem className={isWrongAmount ? "ion-invalid" : ""}>
          <IonInput
            type="number"
            placeholder="Amount"
            value={amount}
            onIonChange={(e) => {
              setAmount(e.detail.value!);
              validateAmount(parseFloat(e.detail.value!));
            }}
          />
        </IonItem>

        <IonButton
          color="primary"
          onClick={submitSave}
          disabled={pageLoading || isLoading}
        >
          Save
        </IonButton>
      </IonList>
    </CreateAnimation>
  );

  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <IonHeader>
        <Toolbar history={history} />
      </IonHeader>
      <IonContent fullscreen>
        {pageLoading ? loadingContent : content}
      </IonContent>
    </IonPage>
  );
};

export default AddPayment;
