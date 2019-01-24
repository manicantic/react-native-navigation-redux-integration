import invariant from 'invariant';
import {subscribeToEvents} from './listeners';

export let navigator = null;
export let store = null;

export const initNavigatorListeners = (RNN, store) => {
  navigator = RNN;
  store = store;
  subscribeToEvents(navigator, store);
}

export const getNavigator = () => {
  invariant(navigator, "You probably forgot to call initNavigatorListeners with parameters Navigator ( i" +
      "mport { Navigator } from 'react-native-navigation).");
  return navigator;
}