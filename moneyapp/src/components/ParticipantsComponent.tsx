import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCheckbox,
  IonItem,
  IonList,
  IonCardContent,
  IonLabel,
  IonRow,
  IonCol,
} from "@ionic/react";
import { attachProps } from "@ionic/react/dist/types/components/utils";
import FlexSpacer from "./common/Spacer";
import IconButton from "./IconButton";

export type SelectedParticipant = {
  readonly id: number;
  readonly name: string;
  readonly selected: boolean;
};

export type ParticipantsProps = {
  participants: SelectedParticipant[];
  onChanged: (participants: SelectedParticipant[]) => void;
};

export const ParticipantsComponent: React.FC<ParticipantsProps> = ({
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
    <IonCard>
      <IonCardContent>
        <IonList lines="none">
          {participants.map((p) => {
            return (
              <IonCol key={p.id}>
                <IonRow>
                  {p.selected && (
                    <>
                      <IonLabel>{p.name}</IonLabel>
                      <FlexSpacer flex={1} />
                      <IconButton
                        onClick={() => onToggle(p.id)}
                        justify="center"
                      >
                        <FontAwesomeIcon
                          className="removeIcon"
                          size="2x"
                          icon={faTimesCircle}
                        ></FontAwesomeIcon>
                      </IconButton>
                    </>
                  )}

                  {!p.selected && (
                    <>
                      <IonLabel>{p.name}</IonLabel>
                      <FlexSpacer flex={1} />
                      <IconButton
                        onClick={() => onToggle(p.id)}
                        justify="center"
                      >
                        <FontAwesomeIcon
                          className="addIcon"
                          size="2x"
                          icon={faPlusCircle}
                        ></FontAwesomeIcon>
                      </IconButton>
                    </>
                  )}
                </IonRow>
              </IonCol>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
