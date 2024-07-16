import { StackScreenProps } from "@react-navigation/stack";
import { Animated, StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
    Main: undefined;
    Tracking: undefined;
    CMR: undefined;
    PLOMOS: undefined;
    TruckDetails: { truck: Truck };
    MapScreen:{ truck: Truck };
    MainScreen:undefined;
    SignUp:undefined;
    SignIn:undefined;
  };
  
  export interface Truck {
    date: string;
    matricule: string;
    numeroDossier: string;
    trajet: string;
    chargement: string;
    dechargement: string;
    status: string;
  }
  export interface MyComponentProps {
    animatedValue: Animated.Value;
    visible: boolean;
    extended: boolean;
    label: string;
    animateFrom: 'left' | 'right';
    style?: StyleProp<ViewStyle>;
    iconMode: 'static' | 'dynamic';
  }
  export interface MyComponentProps extends Partial<StackScreenProps<RootStackParamList, 'Tracking'>> {
    animatedValue: Animated.Value;
    visible: boolean;
    extended: boolean;
    label: string;
    animateFrom: 'left' | 'right';
    style?: StyleProp<ViewStyle>;
    iconMode: 'static' | 'dynamic';
  }
  export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    saveToken: (key: string, token: string) => Promise<void>;
    clearToken?: (key: string) => void;
  }