export const LayoutType = {
  Component: 'Component',
  Stack: 'Stack',
  BottomTabs: 'BottomTabs',
  SideMenuRoot: 'SideMenuRoot',
  SideMenuCenter: 'SideMenuCenter',
  SideMenuLeft: 'SideMenuLeft',
  SideMenuRight: 'SideMenuRight',
  TopTabs: 'TopTabs',
  ExternalComponent: 'ExternalComponent',
  SplitView: 'SplitView'
}

export const actionsPrefix = '@NAVIGATOR/';

export const actionNameCreator = name => `${actionsPrefix}${name}`;

export const isTabsType = type => type === LayoutType.BottomTabs || type === LayoutType.TopTabs;

export const Events = {
  setRoot: 'setRoot',
  mergeOptions: 'mergeOptions',
  showModal: 'showModal',
  dismissModal: 'dismissModal',
  dismissAllModals: 'dismissAllModals',
  push: 'push',
  pop: 'pop',
  popTo: 'popTo',
  popToRoot: 'popToRoot',
  setStackRoot: 'setStackRoot',
  showOverlay: 'showOverlay',
  dismissOverlay: 'dismissOverlay'
}