import Constants from 'expo-constants';

export const getApiUrl = () => {
  if (__DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    return `http://${debuggerHost?.split(':')[0]}:3000/api/`;
  } else {
        const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string
        return BASE_URL;
  }
};