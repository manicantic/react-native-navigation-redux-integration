import invariant from 'invariant';

import {actionsPrefix} from './constants';
import {activeTabIndexSelector} from './selectors';
import {getNavigator} from './init';
import {getActiveComponentId, getTabsId} from './helpers';
import {middlewareActionTypes, middlewareActionTypesArray, tabChanged} from './actions';

export const navigatorMiddleware = store => next => action => {
  if (!action || !action.type || !typeof(action.type) === 'string' || !action.type.startsWith(actionsPrefix) || !middlewareActionTypesArray.includes(action.type)) {
    return next(action);
  }
  const navigator = getNavigator();
  const state = store.getState();
  const {navigation} = state;
  invariant(navigation, "You probably didn't import and apply navigation reducer");
  switch (action.type) {
    case middlewareActionTypes.push:
      {
        const {tabIndex} = action.payload.options;
        const componentId = getActiveComponentId(navigation.root, tabIndex !== undefined
          ? tabIndex
          : activeIndex);
        if (tabIndex !== undefined) {
          const activeIndex = activeTabIndexSelector(state);
          const tabsId = getTabsId(navigation.root)
          navigator.mergeOptions(tabsId, {
            bottomTabs: {
              currentTabIndex: tabIndex
            }
          });
          store.dispatch(tabChanged({selectedTabIndex: tabIndex}));
        }
        navigator.push(componentId, action.payload.layout);
      }
  }
}