import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './marketplace-layout.css';
import {Catalog} from "../catalog/catalog";
import {Header} from "./components/header/header";

const MarketplaceLayout: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
          <Header></Header>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Catalog></Catalog>
      </IonContent>
    </IonPage>
  );
};

export default MarketplaceLayout;
