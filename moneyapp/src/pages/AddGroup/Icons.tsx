import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonContent,
  IonLoading,
  IonCard,
  IonRow,
  IonList,
  IonImg,
} from "@ionic/react";

import beers from "../../images/icons/Beers.svg";
import bowling from "../../images/icons/Bowling.svg";
import burgers from "../../images/icons/Burgers.svg";
import burgerSet from "../../images/icons/BurgerSet.svg";
import cups from "../../images/icons/Cups.svg";
import kite from "../../images/icons/Kite.svg";
import wine from "../../images/icons/Wine.svg";

class Icons {
  static instance: Icons = new Icons();
  // todo sort!
  private icons = [beers, bowling, burgers, burgerSet, cups, kite, wine];

  icon(from: number): string {
    return this.icons[from - 1];
  }

  index(from: string): number {
    return this.icons.indexOf(from);
  }
}

export default Icons;
