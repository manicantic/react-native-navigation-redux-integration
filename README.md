# react-native-navigation-redux-integration
[![npm](https://img.shields.io/npm/v/react-native-navigation-redux-integration.svg?style=flat)](https://www.npmjs.com/package/react-native-navigation-redux-integration)
[![dependencies](https://david-dm.org/manicantic/react-native-navigation-redux-integration/status.svg)](https://david-dm.org/manicantic/react-native-navigation-redux-integration)

 Redux integration for React Native Navigation v2. Keeps all you current navigation state in redux store.


### Prerequisites

This integration works only with react-native-navigation v2 and with redux store configured in a project.

### Installing

```
npm install react-native-navigation-redux-integration
```
```
yarn add react-native-navigation-redux-integration
```

Next, adding initialization for library :

```
import {Navigation} from 'react-native-navigation';
import {initNavigatorListeners} from 'react-native-navigation-redux-integration';
import {store} from '{your path to store here}';

initNavigatorListeners(Navigation, store);
.
.
.
register RNN screen and setRoot here

```

Adding navigation reducer :

```
import {reducer as navigationReducer} from 'react-native-navigation-redux-integration';
.
.
.
export default combineReducers({
  .
  . / other reducers
  .,
  navigation: navigationReducer
})


```

Adding react-native-navigation-redux-integration for navigating with dispatcing store actions : 

```
import {navigatorMiddleware} from 'react-native-navigation-redux-integration';
.
.
.
export const store = createStore(reducers,applyMiddleware(navigatorMiddleware));


```


## Selectors

### `getActiveScreenId(state)`

### `getActiveStackId(state)`

### `getActiveTopTabsId(state)`

### `getActiveBottomTabsId(state)`

### `getActiveSideMenuCenterId(state)`

### `getActiveSideMenuLeftId(state)`

### `getActiveSideMenuRightId(state)`

### `getActiveSideMenuRootId(state)`

### `getActiveStackArray(state)`



## Action creator

Actions are dispatch and handled by navigaton middleware.

### `push(layout: RNN Layout, [options: { [bottomTabIndex]:number, [topTabIndex]:number }])`

> Push new screen on active stack or if tab index defined, push new screen to other tab

### `pop(mergeOptions:RNN mergeOptions)`

> Pop screen from active stack

### `popToRoot(mergeOptions:RNN mergeOptions)`

> Pop active stack to root

### `setStackRoot(params: RNN params for setStackRoot methode)`

> Set root to active stack

### `dismissLastModal(mergeOptions:RNN mergeOptions)`

> Dismiss last active modal



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
