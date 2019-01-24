import {LayoutType} from './constants';

/**
 * Selector returning active screen's component id
 * @param state redux store state
 * @param {number} [index] Index of a wanted tab
 * @returns {string} Id of active screen's component
 */
export const activeScreenIdSelector = (state, index) => {
  const {root} = state.navigation;
  if (!root) 
    return null;
  switch (root.type) {
    case LayoutType.BottomTabs:
      {
        const activeIndex = index !== undefined
          ? index
          : root.activeIndex;
        const activeChildren = root.children[activeIndex];
        switch (activeChildren.type) {
          case LayoutType.Component:
            return activeChildren.id;
          case LayoutType.Stack:
            return activeChildren[activeChildren.length - 1].id;
        }
      }
    case LayoutType.Stack:
      return root.children[root.children.length - 1].id;
    case LayoutType.Component:
      return root.id;
    default:
      return null;
  }
}

/**
 * Selector returning active tab index
 * @param state redux store state
 * @returns {number} Active tab index, null if no tabs
 */
export const activeTabIndexSelector = state => state.navigation.root.activeIndex;