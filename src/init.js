import {subscribeToEvents} from './listeners';

export let navigator = null;
export let store = null;

export const initNavigatorListeners = (RNN, store) => {
  navigator = RNN;
  store = store;
  subscribeToEvents(navigator, store);
}
