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
  removeScreenIfNeeded
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
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.screenPopped:
      {
        const root = state.root;
        const newRoot = popFromStack(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popFromStack(Object.assign({}, modal), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.stackPoppedToRoot:
      {
        const root = state.root;
        const newRoot = popToRoot(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popToRoot(Object.assign({}, modal), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.poppedToScreen:
      {
        const root = state.root;
        const newRoot = popToScreen(Object.assign({}, root), action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => popToScreen(Object.assign({}, modal), action.payload.componentId));
        return {
          ...state,
          root: newRoot,
          modals: newModals
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
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.stackRootSet:
      {
        const root = state.root;
        const newRoot = setStackRoot(Object.assign({}, root), action.payload.componentId, action.payload.layout);
        const newModals = state
          .modals
          .map(modal => (setStackRoot(Object.assign({}, modal), action.payload.componentId, action.payload.layout)));
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.screenDisappeared:
      {
        const root = state.root;
        const rootCopy = Object.assign({}, root);
        const newRoot = state.modals.length
          ? root
          : removeScreenIfNeeded(rootCopy, rootCopy, action.payload.componentId);
        const newModals = state
          .modals
          .map(modal => {
            modalCopy = Object.assign({}, modal)
            return removeScreenIfNeeded(modalCopy, modalCopy, action.payload.componentId)
          })
          .filter(modal => Object.keys(modal).length);
        return {
          ...state,
          root: newRoot,
          modals: newModals
        };
      }
    case actionTypes.screenAppeared:
      {
        const root = state.root;
        const modals = state.modals;
        let newActiveScreen = createActiveScreenArray(root, action.payload.componentId);
        if (!newActiveScreen) {
          newActiveScreen = createActiveScreenArray(modals[modals.length - 1], action.payload.componentId);
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
        return {
          ...state,
          root: newRoot,
          modals: newModals
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
    default:
      return state;
  }
}

export default reducer;