import { actionNameCreator } from './constants';

export const actionTypes = {
  rootSet: actionNameCreator('ROOT_SET'),
  screenPushed: actionNameCreator('SCREEN_PUSHED'),
  tabChanged: actionNameCreator('TAB_CHANGED'),
  screenAppeared: actionNameCreator('SCREEN_APPEARED'),
  screenDisappeared: actionNameCreator('SCREEN_DISAPPEARED'),
  screenPopped: actionNameCreator('SCREEN_POPPED'),
  stackPoppedToRoot: actionNameCreator('POPPED_TO_ROOT'),
  poppedToScreen: actionNameCreator('POPPED_TO_SCREEN'),
  stackRootSet: actionNameCreator('STACK_ROOT_SET'),
  tabChangedWithMergeOptions: actionNameCreator('TAB_CHANGED_WITH_OPTIONS'),
  modalShown: actionNameCreator('MODAL_SHOWN'),
  modalDismissed: actionNameCreator('MODAL_DISMISSED'),
  allModalsDismissed: actionNameCreator('ALL_MODALS_DISMISSED'),
  overlayShown: actionNameCreator('OVERLAY_SHOWN'),
  overlayDismissed: actionNameCreator('OVERLAY_DISMISSED')
}

export const middlewareActionTypes = {
  push: actionNameCreator('PUSH'),
  pop: actionNameCreator('POP'),
  popToRoot: actionNameCreator('POP_TO_ROOT'),
  setStackRoot: actionNameCreator('SET_STACK_ROOT'),
  dismissLastModal: actionNameCreator('DISMISS_LAST_MODAL'),
  showModal: actionNameCreator('SHOW_MODAL'),
  showOverlay: actionNameCreator('SHOW_OVERLAY')
}

export const middlewareActionTypesArray = Object.values(middlewareActionTypes);

export const rootSet = payload => ({ type: actionTypes.rootSet, payload });
export const screenPushed = payload => ({ type: actionTypes.screenPushed, payload });
export const tabChanged = payload => ({ type: actionTypes.tabChanged, payload });
export const screenDisappeared = payload => ({ type: actionTypes.screenDisappeared, payload });
export const screenAppeared = payload => ({ type: actionTypes.screenAppeared, payload });
export const screenPopped = payload => ({ type: actionTypes.screenPopped, payload });
export const stackPoppedToRoot = payload => ({ type: actionTypes.stackPoppedToRoot, payload });
export const poppedToScreen = payload => ({ type: actionTypes.poppedToScreen, payload });
export const stackRootSet = payload => ({ type: actionTypes.stackRootSet, payload });
export const tabChangedWithMergeOptions = payload => ({ type: actionTypes.tabChangedWithMergeOptions, payload });
export const modalShown = payload => ({ type: actionTypes.modalShown, payload });
export const modalDismissed = payload => ({ type: actionTypes.modalDismissed, payload });
export const allModalsDismissed = payload => ({ type: actionTypes.allModalsDismissed, payload });
export const overlayShown = payload => ({ type: actionTypes.overlayShown, payload });
export const overlayDismissed = payload => ({ type: actionTypes.overlayDismissed, payload });

/**
 * Push component on active stack
 * @param {*} layout RNN Component's layout
 * @param {Object} options Options for push action
 * @param {number} [options.bottomTabIndex] Push to specific bottom tabs tab with changing tab
 * @param {number} [options.topTabIndex] Push to specific top tabs tab with changing tab
 * @returns {Object} Return push action for navigator middleware
 */
export const push = (layout, options) => ({
  type: middlewareActionTypes.push,
  payload: {
    layout,
    options
  }
});

/**
 * Pop component from active stack
 * @param {*} [mergeOptions] Merge options from RNN
 * @returns {Object} Return pop action for navigator middleware
 */
export const pop = (mergeOptions) => ({
  type: middlewareActionTypes.pop, payload: {
    mergeOptions
  }
});

/**
 * Pop to root of active stack
 * @param {*} [mergeOptions] Merge options from RNN
 * @returns {Object} Return popToRoot action for navigator middleware
 */
export const popToRoot = (mergeOptions) => ({
  type: middlewareActionTypes.popToRoot, payload: {
    mergeOptions
  }
});

/**
 * Set root of active stack
 * @param {*} [params] Array of children
 * @returns {Object} Return setStackRoot action for navigator middleware
 */
export const setStackRoot = (params) => ({
  type: middlewareActionTypes.setStackRoot, payload: {
    params
  }
});

/**
 * Dismiss last active modal
 * @param {*} [mergeOptions] Merge options from RNN
 * @returns {Object} Return dismissModal action for navigator middleware
 */
export const dismissLastModal = (mergeOptions) => ({
  type: middlewareActionTypes.dismissLastModal, payload: {
    mergeOptions
  }
});

/**
 * Show modal
 * @param {*} layout RNN Component's layout
 * @returns {Object} Return showModal action for navigator middleware
 */
export const showModal = (layout) => ({
  type: middlewareActionTypes.showModal, payload: {
    layout
  }
});

/**
 * Show overlay
 * @param {*} layout RNN Component's layout
 * @returns {Object} Return showOverlay action for navigator middleware
 */
export const showOverlay = (layout) => ({
  type: middlewareActionTypes.showOverlay, payload: {
    layout
  }
});