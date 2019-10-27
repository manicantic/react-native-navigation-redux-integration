import {actionTypes} from './actions';
import {
  popFromStack,
  pushToStack,
  popToRoot,
  popToScreen,
  createActiveScreenArray,
  changeTabIndex,
  setStackRoot,
  changeTabIndexToComponent,
  hasComponentWithId,
  removeScreenIfNeeded,
  getActiveComponentId
} from './helpers';

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.rootSet:
      return action.payload;
    case actionTypes.screenPushed:
      {
        const root = state.root;
        const newRoot = pushToStack(Object.assign({}, root), action.payload.componentId, action.payload.layout);
        const newModals = state
          .modals
          .map(modal => pushToStack(Object.assign({}, modal), action.payload.componentId, action.payload.layout));
        const newOverlays = state
          .overlays
          .map(overlay => pushToStack(Object.assign({}, overlay), action.payload.componentId, action.payload.layout));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.screenPopped:
      {
        const root = state.root;
        const newRoot = popFromStack(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popFromStack(Object.assign({}, modal), action.payload.componentId));
        const newOverlays = state
          .overlays
          .map(overlay => popFromStack(Object.assign({}, overlay), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.stackPoppedToRoot:
      {
        const root = state.root;
        const newRoot = popToRoot(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popToRoot(Object.assign({}, modal), action.payload.componentId));
        const newOverlays = state
          .overlays
          .map(overlay => popToRoot(Object.assign({}, overlay), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.poppedToScreen:
      {
        const root = state.root;
        const newRoot = popToScreen(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popToScreen(Object.assign({}, modal), action.payload.componentId));
        const newOverlays = state
          .overlays
          .map(overlay => popToScreen(Object.assign({}, overlay), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.tabChanged:
      {
        const root = state.root;
        const activeScreenArray = state.activeScreenArray;
        const newRoot = changeTabIndex(Object.assign({}, root), activeScreenArray, action.payload.selectedTabIndex, action.payload.unselectedTabIndex);
        const newModals = state
          .modals
          .map(modal => changeTabIndex(Object.assign({}, modal), activeScreenArray, action.payload.selectedTabIndex, action.payload.unselectedTabIndex));
        const newOverlays = state
          .overlays
          .map(overlay => changeTabIndex(Object.assign({}, overlay), activeScreenArray, action.payload.selectedTabIndex, action.payload.unselectedTabIndex));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.stackRootSet:
      {
        const root = state.root;
        const newRoot = setStackRoot(Object.assign({}, root), action.payload.componentId, action.payload.layout);
        const newModals = state
          .modals
          .map(modal => (setStackRoot(Object.assign({}, modal), action.payload.componentId, action.payload.layout)));
        const newOverlays = state
          .overlays
          .map(overlay => (setStackRoot(Object.assign({}, overlay), action.payload.componentId, action.payload.layout)));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.screenDisappeared:
      {
        const root = state.root;
        const rootCopy = Object.assign({}, root);
        const newRoot = state.modals.length
          ? root
          : removeScreenIfNeeded(rootCopy, rootCopy, action.payload.componentId);
        const modalsLength = state.modals.length;
        const newModals = state
          .modals
          .map((modal, index) => {
            const modalCopy = Object.assign({}, modal);
            return index + 1 === modalsLength
              ? removeScreenIfNeeded(modalCopy, modalCopy, action.payload.componentId)
              : modalCopy;
          })
          .filter(modal => Object.keys(modal).length);
        const newOverlays = state
          .overlays
          .map(overlay => {
            const overlayCopy = Object.assign({}, overlay)
            return removeScreenIfNeeded(overlayCopy, overlayCopy, action.payload.componentId)
          })
          .filter(overlay => Object.keys(overlay).length);
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.screenAppeared:
      {
        const root = state.root;
        const modals = state.modals;
        const overlays = state.overlays;
        let newActiveScreen = createActiveScreenArray(root, action.payload.componentId);
        if(!modals.length && !overlays.length && !newActiveScreen) {
          newActiveScreen = [...state.activeScreenArray];
        }
        if (!newActiveScreen && modals.length) {
          let i = 0;
          while (!newActiveScreen && state.modals[i]) {
            newActiveScreen = createActiveScreenArray(modals[i], action.payload.componentId);
            i++;
          }
        }
        if (!newActiveScreen && overlays.length) {
          newActiveScreen = createActiveScreenArray(overlays[overlays.length - 1], action.payload.componentId);
        }
        return {
          ...state,
          activeScreenArray: newActiveScreen
        };
      }
    case actionTypes.tabChangedWithMergeOptions:
      {
        const root = state.root;
        const newRoot = changeTabIndexToComponent(Object.assign({}, root), action.payload.componentId, action.payload.currentTabIndex);
        const newModals = state
          .modals
          .map(modal => (changeTabIndexToComponent(Object.assign({}, modal), action.payload.componentId, action.payload.currentTabIndex)));
        const newOverlays = state
          .overlays
          .map(overlay => (changeTabIndexToComponent(Object.assign({}, overlay), action.payload.componentId, action.payload.currentTabIndex)));
        return {
          ...state,
          root: newRoot,
          modals: newModals,
          overlays: newOverlays
        };
      }
    case actionTypes.modalShown:
      {
        const modals = state.modals;
        const newModals = [
          ...modals,
          action.payload
        ]
        return {
          ...state,
          modals: newModals
        };
      }
    case actionTypes.modalDismissed:
      {
        const modals = state.modals;
        const newModals = modals.filter(modal => !hasComponentWithId(modal, action.payload.componentId));
        return {
          ...state,
          modals: newModals
        };
      }
    case actionTypes.allModalsDismissed:
      {
        return {
          ...state,
          modals: []
        };
      }
    case actionTypes.overlayShown:
      {
        const overlays = state.overlays;
        const newOverlays = [
          ...overlays,
          action.payload
        ]
        return {
          ...state,
          overlays: newOverlays
        };
      }
    case actionTypes.overlayDismissed:
      {
        const overlays = state.overlays;
        const modals = state.modals;
        const newOverlays = overlays.filter(overlay => !hasComponentWithId(overlay, action.payload.componentId));
        let newActiveComponentId = null;
        let activeScreenArray = null;
        if (newOverlays.length) {
          newActiveComponentId = getActiveComponentId(newOverlays[newOverlays.length - 1]);
          activeScreenArray = createActiveScreenArray(newOverlays[newOverlays.length - 1], newActiveComponentId);
        } else if (modals.length) {
          newActiveComponentId = getActiveComponentId(modals[modals.length - 1]);
          activeScreenArray = createActiveScreenArray(modals[modals.length - 1], newActiveComponentId);
        } else {
          newActiveComponentId = getActiveComponentId(state.root);
          activeScreenArray = createActiveScreenArray(state.root, newActiveComponentId);
        }
        return {
          ...state,
          overlays: newOverlays,
          activeScreenArray
        };
      }
    default:
      return state;
  }
}

export default reducer;
