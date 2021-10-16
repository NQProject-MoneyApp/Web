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

import beers from "../../images/icons/Beers.png";
import bowling from "../../images/icons/Bowling.png";
import burgers from "../../images/icons/Burgers.png";
import burgerSet from "../../images/icons/BurgerSet.png";
import cups from "../../images/icons/Cups.png";
import kite from "../../images/icons/Kite.png";
import wine from "../../images/icons/Wine.png";

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
