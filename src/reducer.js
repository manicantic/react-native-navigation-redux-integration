import {actionTypes} from './actions';
import {LayoutType} from './constants';
import {findStackInTab, isLastScreenInStack} from './helpers';

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.rootSet:
      return action.payload;
    case actionTypes.componentPushed:
      {
        const root = state.root;
        if (root.type === LayoutType.BottomTabs) {
          const tabIndex = findStackInTab(root, action.payload.componentId);
          const newTabs = [...root.children];
          newTabs[tabIndex].children = [
            ...newTabs[tabIndex].children,
            action.payload.layout
          ];
          return {
            ...state,
            root: {
              ...root,
              children: newTabs
            }
          };
        }
      }
    case actionTypes.screenDisappeared:
      {
        const root = state.root;
        let isBottomTabs = false;
        let shouldRemoveLastChildren = null;
        if (root.type === LayoutType.BottomTabs) {
          isBottomTabs = true;
          shouldRemoveLastChildren = isLastScreenInStack(root.children[root.activeIndex], action.payload.componentId)
        } else if (root.type === LayoutType.Stack) {
          shouldRemoveLastChildren = isLastScreenInStack(root.children, action.payload.componentId)
        } else {
          return state;
        }
        if (shouldRemoveLastChildren) {
          if (isBottomTabs) {
            const newTabs = [...root.children];
            newTabs[root.activeIndex].children = [
              ...newTabs[root.activeIndex]
                .children
                .slice(0, -1)
            ];
            return {
              ...state,
              root: {
                ...root,
                children: newTabs
              }
            };
          } else {
            return {
              ...state,
              root: {
                ...root,
                children: children.slice(0, -1)
              }
            };
          }
        } else {
          return state;
        }
      }
    case actionTypes.tabChanged:
      {
        return {
          ...state,
          root: {
            ...state.root,
            activeIndex: action.payload.selectedTabIndex
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;