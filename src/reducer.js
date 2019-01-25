import {actionTypes} from './actions';
import {LayoutType} from './constants';
import {
  popFromStack,
  isLastScreenInStack,
  pushToStack,
  popToRoot,
  popToScreen,
  createActiveScreenString
} from './helpers';

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.rootSet:
      return action.payload;
    case actionTypes.componentPushed:
      {
        const root = state.root;
        const newRoot = pushToStack(Object.assign({}, root), action.payload.componentId, action.payload.layout);
        return {
          ...state,
          root: newRoot
        };
      }
    case actionTypes.screenPopped:
      {
        const root = state.root;
        const newRoot = popFromStack(Object.assign({}, root), action.payload.componentId);
        return {
          ...state,
          root: newRoot
        };
      }
    case actionTypes.stackPoppedToRoot:
      {
        const root = state.root;
        const newRoot = popToRoot(Object.assign({}, root), action.payload.componentId);
        return {
          ...state,
          root: newRoot
        };
      }
    case actionTypes.poppedToScreen:
      {
        const root = state.root;
        const newRoot = popToScreen(Object.assign({}, root), action.payload.componentId);
        return {
          ...state,
          root: newRoot
        };
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
        return state;
        const root = state.root;
        const newRoot = popToScreen(Object.assign({}, root), action.payload.componentId);
        return {
          ...state,
          root: newRoot
        };
      }
    case actionTypes.screenAppeared:
      {
        const root = state.root;
        const newActiveScreen = createActiveScreenString(Object.assign({}, root), action.payload.componentId);
        return {
          ...state,
          activeScreen: newActiveScreen
        };
      }
    default:
      return state;
  }
}

export default reducer;