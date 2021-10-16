import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Login from "./pages/Login/Login";
import GroupList from "./pages/GroupList/GroupList";
import GroupDetails from "./pages/GroupDetails/GroupDetails";
import ExpenseDetails from "./pages/ExpenseDetails/ExpenseDetails";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/styles.css";
import ExpenseList from "./pages/ExpenseList/ExpenseList";
import Profile from "./pages/Profile/Profile";
import AddGroup from "./pages/AddGroup/AddGroup";
import AddExpense from "./pages/AddExpense/AddExpense";
import Register from "./pages/Register/Register";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/groups" component={GroupList}/>
        <Route exact path="/groups/:groupId/expenses" component={ExpenseList} />
        <Route exact path="/groups/:groupId/add-expense" component={AddExpense} />
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/add-group" component={AddGroup}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/groups/:groupId" component={GroupDetails} />
        <Route exact path="/groups/:groupId/expenses/:expenseId" component={ExpenseDetails} />
        <Route exact path="/group-details" component={GroupDetails}/>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
