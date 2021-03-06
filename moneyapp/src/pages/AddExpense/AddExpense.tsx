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
import {
  ParticipantsComponent,
  SelectedParticipant,
} from "../../components/ParticipantsComponent";
import "./AddExpense.css";
import Toolbar from "../../components/Toolbar";
import ApiClient from "../../services/ApiClient";

const AddExpense: React.FC<RouteComponentProps> = ({ history }) => {
  interface RouteParams {
    groupId: string;
  }

  const { groupId } = useParams<RouteParams>();
  const [showToast, setShowToast] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isWrongName, setIsWrongName] = useState(false);
  const [isWrongAmount, setIsWrongAmount] = useState(false);
  const [isWrongFriends, setIsWrongFriends] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(null);
  const [selectedParticipants, setParticipants] = useState(
    new Array<SelectedParticipant>()
  );

  const validateAmount = (amount: number) => {
    setIsWrongAmount(!amount || amount < 0);
  };

  const validateName = (name: string) => {
    setIsWrongName(!name || name.trim() === "" || name.trim().length === 0);
  };

  const validateFriends = (friends: Array<SelectedParticipant>) => {
    var count = 0;
    friends.forEach((element) => {
      if (element.selected) {
        count += 1;
      }
    });
    setIsWrongFriends(count <= 0);
  };

  const submitSave = async () => {
    setIsLoading(true);
    validateAmount(parseFloat(amount));
    validateName(expenseName);
    validateFriends(selectedParticipants);
    const result = await ApiClient.instance.addExpense(
      parseInt(groupId),
      expenseName,
      parseFloat(amount),
      selectedParticipants.filter((e) => e.selected).map((e) => e.id),
      paidBy
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
    const participants: SelectedParticipant[] = groups
      .find((g) => g.id == parseInt(groupId))!
      .members.map((e) => ({ id: e.id, name: e.name, selected: true }));
    setParticipants(participants);
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
        <IonItem className={isWrongName ? "ion-invalid" : ""}>
          <IonInput
            type="text"
            placeholder="Name"
            required={true}
            value={expenseName}
            onIonChange={(e) => {
              setExpenseName(e.detail.value!);
              validateName(e.detail.value!);
            }}
          />
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

        <IonItem lines="none" className={isWrongAmount ? "ion-invalid" : ""}>
          <IonLabel>Paid by</IonLabel>
          <IonSelect
            placeholder="choose"
            value={paidBy}
            onIonChange={(e) => {
              setPaidBy(e.detail.value!);
            }}
          >
            {selectedParticipants.map((p) => {
              return <IonSelectOption value={p.id}>{p.name}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>

        <ParticipantsComponent
          invalid={isWrongFriends}
          participants={selectedParticipants}
          onChanged={(e) => {
            setParticipants(e);
            validateFriends(e);
          }}
        />

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

export default AddExpense;
