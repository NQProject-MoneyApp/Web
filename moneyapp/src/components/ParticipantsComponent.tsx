import {
  IonCard,
  IonCheckbox,
  IonItem,
  IonList,
  IonCardContent,
  IonLabel,
} from "@ionic/react";
import { attachProps } from "@ionic/react/dist/types/components/utils";

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
    console.log("onToggle");
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
            <IonItem key={p.id}>
                <IonCheckbox
                  checked={p.selected}
                  onIonChange={() => onToggle(p.id)}
                />
                <IonLabel>{p.name}</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
      </IonCardContent>
    </IonCard>
  );
};
