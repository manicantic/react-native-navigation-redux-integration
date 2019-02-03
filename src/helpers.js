import {LayoutType, isTabsType} from './constants';

export const objectClone = object => JSON.parse(JSON.stringify(object));

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

export const pushToStack = (tree, componentId, layout, stack) => {
  if (tree.id === componentId) {
    stack.push(layout);
    return;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      pushToStack(tree.children[i], componentId, layout, tree.children);
    }
  return tree;
}

export const popFromStack = (tree, componentId, stack) => {
  if (tree.id === componentId) {
    stack.pop();
    return;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      popFromStack(tree.children[i], componentId, tree.children);
    }
  return tree;
}

export const popToRoot = (tree, componentId, stack) => {
  if (tree.id === componentId) {
    while (stack.length > 1) {
      stack.pop();
    }
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      popToRoot(tree.children[i], componentId, tree.children);
    }
  return tree;
}

export const popToScreen = (tree, componentId, stack) => {
  if (tree.id === componentId) {
    while (stack[stack.length - 1].id !== componentId) {
      stack.pop();
    }
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      popToScreen(tree.children[i], componentId, tree.children);
    }
  return tree;
}

export const setStackRoot = (tree, componentId, layoutArray, parentTree) => {
  if (tree.id === componentId && parentTree.type === LayoutType.Stack) {
    parentTree.children = layoutArray.map(layout => processLayout(layout));
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      setStackRoot(tree.children[i], componentId, layoutArray, tree);
    }
  return tree;
}

export const changeTabIndex = (tree, screensArray, selectedTabIndex, unselectedTabIndex, parentTree) => {
  if (screensArray.includes(tree.id)) {
    if (tree.children && tree.children.length) {
      for (var i = 0; i < tree.children.length; i++) {
        const isChanged = changeTabIndex(tree.children[i], screensArray, selectedTabIndex, unselectedTabIndex, tree);
        if (isChanged) 
          return tree;
        }
      }
    if (parentTree && isTabsType(parentTree.type) && parentTree.activeIndex === unselectedTabIndex) {
      parentTree.activeIndex = selectedTabIndex;
      return tree;
    }
  }
}

export const changeTabIndexToComponent = (tree, componentId, currentTabIndex) => {
  if (tree.id === componentId && isTabsType(tree.type)) {
    tree.activeIndex = currentTabIndex;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) 
      changeTabIndexToComponent(tree.children[i], componentId, currentTabIndex);
    }
  return tree;
}

export const createActiveScreenArray = (tree, componentId) => {
  if (tree.id === componentId) {
    return [tree.id];
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      const array = createActiveScreenArray(tree.children[i], componentId);
      if (array) {
        array.push(tree.id);
        return array;
      } else {
        continue;
      }
    }
  }
}

export const hasComponentWithId = (tree, componentId) => {
  if (tree.id === componentId) {
    return true;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      const hasComponent = hasComponentWithId(tree.children[i], componentId);
      if (hasComponent) {
        return true;
      }
    }
  }
}

export const removeScreenIfNeeded = (tree, currentTree, componentId, parentTree) => {
  if (currentTree.id === componentId) {
    if (parentTree) {
      if (parentTree.type === LayoutType.Stack && parentTree.children.length > 1) {
        parentTree
          .children
          .pop();
        return tree;
      } else if (parentTree.type === LayoutType.Stack || isTabsType(parentTree.type)) {
        return removeScreenIfNeeded(tree, tree, parentTree.id);
      } else {
        return tree;
      }
    } else {
      return tree;
    }
  }
  if (isTabsType(currentTree.type)) {
    removeScreenIfNeeded(tree, currentTree.children[currentTree.activeIndex], componentId, currentTree);
  } else if (currentTree.type === LayoutType.Stack) {
    removeScreenIfNeeded(tree, currentTree.children[currentTree.children.length - 1], componentId, currentTree);
  }
  return tree;
}

export const isComponentOfType = (tree, componentId, type) => {
  if (tree.id === componentId) {
    return tree.type === type;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      const isType = isComponentOfType(tree.children[i], componentId, type);
      if (isType) {
        return isType;
      }
    }
  }
}

export const getActiveComponentId = (root) => {
  if (root.type === LayoutType.Component) {
    return root.id;
  }
  if (root.type === LayoutType.Stack) {
    return getActiveComponentId(root.children[root.children.length - 1]);
  }
  if (isTabsType(root.type)) {
    return getActiveComponentId(root.children[root.activeIndex]);
  }
}

export const getActiveScreenOfTab = (tree, tabId, tabIndex) => {
  if (tree.id === tabId) {
    return getActiveComponentId(tree.children[tabIndex !== undefined
        ? tabIndex
        : tree.activeIndex]);
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      const id = getActiveScreenOfTab(tree.children[i], tabId, tabIndex);
      if (id) {
        return id;
      }
    }
  }
}

export const getActiveChildrens = (tree, componentId) => {
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      const id = getActiveChildrens(tree.children[i], componentId);
      if (id) {
        return id;
      }
    }
  }
  if (tree.id === componentId) {
    if (tree.type === LayoutType.Stack) {
      return [...tree.children]
    } else if (isTabsType(tree.children)) {
      return [...tree.children[tree.activeIndex]]
    }
  }
}