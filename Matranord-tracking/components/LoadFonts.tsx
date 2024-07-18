import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Bold': require('../node_modules/@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
    'Poppins-Regular': require('../node_modules/@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
  });
};

export default loadFonts;