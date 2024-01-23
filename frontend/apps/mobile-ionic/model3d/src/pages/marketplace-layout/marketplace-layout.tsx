import React from 'react';
import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar} from '@ionic/react';

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
        <Catalog></Catalog>
      </IonContent>
    </IonPage>
  );
};

export default MarketplaceLayout;
