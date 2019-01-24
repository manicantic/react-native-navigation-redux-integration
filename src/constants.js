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