export type RootStackParamList = {
    Main: undefined;
    Tracking: undefined;
    CMR: undefined;
    PLOMOS: undefined;
    TruckDetails: { truck: Truck };
  };
  
  export interface Truck {
    date: string;
    matricule: string;
    numeroDeDossier: string;
    trajet: string;
    chargement: string;
    dechargement: string;
    status: string;
  }
  