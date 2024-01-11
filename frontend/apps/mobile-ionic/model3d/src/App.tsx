import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import MainPage from './pages/Tab1';
import Cart from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {history} from "./history";
import 'src/libs/styles'
import MarketplaceLayout from "./pages/marketplace-layout/marketplace-layout";


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter history={history}>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/main">
            <MainPage />
          </Route>
          <Route exact path="/catalog">
            <MarketplaceLayout />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/account">
            <Cart />
          </Route>
          <Route exact path="/">
            <Redirect to="/catalog" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="main" href="/main">
            <IonIcon aria-hidden="true" icon={triangle} />
          </IonTabButton>
          <IonTabButton tab="catalog" href="/catalog">
            <IonIcon aria-hidden="true" icon={ellipse} />
          </IonTabButton>
          <IonTabButton tab="catalog" href="/catalog">
            <button>asfasdfas</button>
          </IonTabButton>
          <IonTabButton tab="cart" href="/cart">
            <IonIcon aria-hidden="true" icon={square} />
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon aria-hidden="true" icon={square} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
