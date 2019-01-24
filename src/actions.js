import {actionNameCreator} from './constants';

export const actionTypes = {
  rootSet: actionNameCreator('ROOT_SET'),
  componentPushed: actionNameCreator('COMPONENT_PUSHED'),
  tabChanged: actionNameCreator('TAB_CHANGED'),
  screenDisappeared: actionNameCreator('SCREEN_DISAPPEARED')
}

export const middlewareActionTypes = {
  push: actionNameCreator('PUSH')
}

export const middlewareActionTypesArray = Object.values(middlewareActionTypes);

export const rootSet = payload => ({type: actionTypes.rootSet, payload});
export const componentPushed = payload => ({type: actionTypes.componentPushed, payload});
export const tabChanged = payload => ({type: actionTypes.tabChanged, payload});
export const screenDisappeared = payload => ({type: actionTypes.screenDisappeared, payload});

/**
 *
 * @param {*} layout RNN Component's layout
 * @param {Object} options Options for push action
 * @param {number} [options.tabIndex] Optional tab index component is pushing on another tab
 * @param {boolean} [options.dismissOverlays] Option for dismiss all overlays while pushing new screen
 * @param {boolean} [options.dismissAllModals] Option for dismiss all modals while pushing new screen
 * @returns {Object} Return push action for navigator middleware
 */
export const push = (layout, options) => ({
  type: middlewareActionTypes.push,
  payload: {
    layout,
    options
  }
})