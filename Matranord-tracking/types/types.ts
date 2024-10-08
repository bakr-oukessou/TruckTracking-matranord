import { StackScreenProps } from "@react-navigation/stack";
import { Animated, StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
    Welcome: undefined;
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
    TaskScreen:undefined;
    AssignTask:{driverCin:string};
    TaskDetails:{task:Tasks};
  };
  
  export interface Truck {
    id:number;
    date: string;
    matricule: string;
    numero_dossier: string;
    trajet: string;
    chargement: string;
    dechargement: string;
    status: string;
  };

  export interface Driver {
    id:number;
    cin:string;
    nom: string;
    email: string;
    mobileNumber: string;
    adresse: string;
    validitePermit: string;
    idVehicule: string;
    experience:string;
    profilePicture:string | undefined ;
  };

  export interface Tasks {
    id: number;
    details: string;
    provider: string;
    observation: string;
    cloture: Date;
    dateheurecreation: string;
    assignedAt: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
    driver: Driver | null;
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

  export interface TasksProps extends BaseProps, Partial<StackScreenProps<RootStackParamList, 'TaskScreen'>> {}

  // export interface AssignTasksProps extends BaseProps, Partial<StackScreenProps<RootStackParamList, 'AssignTask'>> {}

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