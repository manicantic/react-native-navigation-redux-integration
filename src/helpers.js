import {LayoutType} from './constants';

export const processLayout = (incomeLayout) => {
  let layout = {};
  layout.type = incomeLayout.type;
  layout.id = incomeLayout.id;
  if (incomeLayout.type === LayoutType.BottomTabs) {
    layout.activeIndex = 0;
  }
  if (incomeLayout.data && incomeLayout.data.name) {
    layout.name = incomeLayout.data.name;
  }
  if (incomeLayout.children && incomeLayout.children.length) {
    layout.children = [];
    for (var i = 0; i < incomeLayout.children.length; i++) 
      layout.children[i] = processLayout(incomeLayout.children[i])
  }
  return layout;
}

export const processRoot = incomeLayout => {
  const root = processLayout(incomeLayout.root);
  const modals = [];
  const overlays = [];
  return {root, modals, overlays};
}

export const findStackInTab = (tabs, componentId) => {
  if (tabs.children && tabs.children.length) {
    for (var i = 0; i < tabs.children.length; i++) 
      if (tabs.children[i].type === LayoutType.Stack) {
        for (var j = 0; j < tabs.children[i].children.length; j++) {
          if (tabs.children[i].children[j].id === componentId) {
            return i;
          }
        }
      }
    }
}

export const isLastScreenInStack = (stack, componentId) => {
  if (stack.children && stack.children.length) {
    if (stack.children[stack.children.length - 1].id === componentId) {
      return true;
    }
  }
}

export const getLastComponentIdOfTab = (root, tabIndex) => {
  if (root.type !== LayoutType.BottomTabs) {
    return null;
  }
  return getLastComponentIdInStack(root.children[tabIndex]);
}

export const getLastComponentIdInStack = (stack) => {
  if (stack.type !== LayoutType.Stack) {
    return null;
  }
  return stack.children[stack.children.length - 1].id;
}

export const getTabsId = root => {
  if (root.type !== LayoutType.BottomTabs) {
    return null;
  }
  return root.id;
}

export const getActiveComponentId = (root, tabIndex) => {
  if (root.type === LayoutType.Component) {
    return root.id;
  }
  if (root.type === LayoutType.Stack) {
    return getLastComponentIdInStack(root);
  }
  if (root.type === LayoutType.BottomTabs) {
    const activeTabId = root.activeIndex;
    return getLastComponentIdInStack(root.children[tabIndex !== undefined
        ? tabIndex
        : activeTabId]);
  }
}

export const pushToStack = (tree, componentId, layout, stack) => {
  if (tree.id === componentId) {
    stack = [
      ...stack,
      layout
    ];
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      pushToStack(tree.children[i], componentId, layout, tree.children);
    }
  return tree;
}