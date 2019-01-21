export const actionTypes = {
  rootSet: '@NAVIGATOR/ROOT_SET',
  componentPushed: '@NAVIGATOR/COMPONENT_PUSHED',
  tabChanged: '@NAVIGATOR/TAB_CHANGED',
  screenDisappeared: '@NAVIGATOR/SCREEN_DISAPPEARED'
}

export const rootSet = payload => ({type: actionTypes.setRoot, payload});
export const componentPushed = payload => ({type: actionTypes.componentPushed, payload});
export const tabChanged = payload => ({type: actionTypes.tabChange, payload});
export const screenDisappeared = payload => ({type: actionTypes.screenDisappeared, payload});