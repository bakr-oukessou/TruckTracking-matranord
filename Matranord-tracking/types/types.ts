import { StackScreenProps } from "@react-navigation/stack";
import { Animated, StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
    Main: undefined;
    Tracking: undefined;
    CMR: undefined;
    PLOMOS: undefined;
    TruckDetails: { truck: Truck };
    DriverDetails: { driver: Driver };
    MapScreen:{ truck: Truck };
    MainScreen:undefined;
    SignUp:undefined;
    SignIn:undefined;
    Driver:undefined;
    Tasks:undefined;
  };
  
  export interface Truck {
    date: string;
    matricule: string;
    numeroDossier: string;
    trajet: string;
    chargement: string;
    dechargement: string;
    status: string;
  };

  export interface Driver {
    cin:string;
    nom: string;
    email: string;
    mobileNumber: string;
    adresse: string;
    validitePermit: string;
    idVehicule: string;
    experience:string;
  };

  export interface Tasks{
    id:string;
    details:string;
    provider:string;
    Observation:string;
    Cloture:Date;
    DateHeureCreation:string;
    status:string;
    startedAt:string;
    completedAt:string;
    driver:Driver; 
  }

  export interface BaseProps {
    animatedValue: Animated.Value;
    visible: boolean;
    extended: boolean;
    label: string;
    animateFrom: 'left' | 'right';
    style?: StyleProp<ViewStyle>;
    iconMode: 'static' | 'dynamic';
  };

  export interface TrackingProps extends BaseProps, Partial<StackScreenProps<RootStackParamList, 'Tracking'>> {}

  export interface DriverProps extends BaseProps, Partial<StackScreenProps<RootStackParamList, 'Driver'>> {}
  export interface TasksProps extends BaseProps, Partial<StackScreenProps<RootStackParamList, 'Tasks'>> {}

  // export interface MyComponentProps extends Partial<StackScreenProps<RootStackParamList, 'Tracking'>> {
  //   animatedValue: Animated.Value;
  //   visible: boolean;
  //   extended: boolean;
  //   label: string;
  //   animateFrom: 'left' | 'right';
  //   style?: StyleProp<ViewStyle>;
  //   iconMode: 'static' | 'dynamic';
  // };

  export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    saveToken: (key: string, token: string) => Promise<void>;
    clearToken?: (key: string) => void;
  };