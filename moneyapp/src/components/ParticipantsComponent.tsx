import { faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonList,
  IonCardContent,
  IonLabel,
  IonRow,
} from "@ionic/react";
import FlexSpacer from "./common/Spacer";
import IconButton from "./IconButton";
import "./ParticipantsComponent.css";


export type SelectedParticipant = {
  readonly id: number;
  readonly name: string;
  readonly selected: boolean;
};

export type ParticipantsProps = {
  invalid?: boolean;
  participants: SelectedParticipant[];
  onChanged: (participants: SelectedParticipant[]) => void;
};

export const ParticipantsComponent: React.FC<ParticipantsProps> = ({
  invalid,
  participants,
  onChanged,
}: ParticipantsProps) => {
  const onToggle = (id: number) => {
    const newParticipants = participants.map((e) => {
      if (e.id != id) {
        return e;
      }
      return {
        id: e.id,
        name: e.name,
        selected: !e.selected,
      };
    });
    onChanged(newParticipants);
  };

  return (
    <IonCard className={invalid ? "wrong-input participants-card" : "participants-card"}>
      <IonCardContent>
        <IonList lines="none">
          {participants.map((p) => {
            return (
                <IonRow key={p.id}> 
                    <>
                      <IonLabel>{p.name}</IonLabel>
                      <FlexSpacer flex={1} />
                      <IconButton
                        onClick={() => onToggle(p.id)}
                        justify="center"
                      >
                        <FontAwesomeIcon
                          className={p.selected ? "remove-icon" : "add-icon"}
                          size="2x"
                          icon={faPlus}
                        ></FontAwesomeIcon>
                      </IconButton>
                    </>
                </IonRow>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
