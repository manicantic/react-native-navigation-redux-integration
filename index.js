import reducer from './src/reducer';
import {initNavigatorListeners} from './src/init';
import {navigatorMiddleware} from './src/middleware';
import {push, pop, popToRoot, setStackRoot, dismissLastModal} from './src/actions';
import {
  getActiveScreenId,
  getActiveBottomTabsId,
  getActiveSideMenuCenterId,
  getActiveSideMenuLeftId,
  getActiveSideMenuRightId,
  getActiveSideMenuRootId,
  getActiveStackId,
  getActiveTopTabsId
} from './src/selectors';

export {
  reducer,
  initNavigatorListeners,
  navigatorMiddleware,
  push,
  pop,
  popToRoot,
  setStackRoot,
  dismissLastModal,
  getActiveScreenId,
  getActiveBottomTabsId,
  getActiveSideMenuCenterId,
  getActiveSideMenuLeftId,
  getActiveSideMenuRightId,
  getActiveSideMenuRootId,
  getActiveStackId,
  getActiveTopTabsId
};