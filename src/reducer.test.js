import reducer from './reducer';
import {
  screenDisappeared,
  screenPushed,
  screenAppeared,
  screenPopped,
  stackPoppedToRoot,
  poppedToScreen,
  stackRootSet,
  tabChangedWithMergeOptions,
  tabChanged,
  modalShown,
  modalDismissed,
  overlayDismissed
} from './actions';
import {
  state,
  poppedReducerState,
  pushedState,
  componentToPush,
  poppedState,
  poppedToRootState,
  poppedToComponentState,
  setStackRootState,
  stackToSetForRoot,
  changedTabState
} from './testStates/bottomTabsWithStack';
import {stateWithModals, showModalLayout, showModalState, stateWithDismissedModals} from './testStates/twoActiveModals';
import {
  sideMenuState,
  sideMenuComponentToPush,
  sideMenuPushedState,
  sideMenuPoppedState,
  sideMenuSetStackRootState,
  sideMenuStackToSetForRoot,
  sideMenuPoppedToScreenState,
  sideMenuChangedTabState
} from './testStates/sideMenuWithTabs';
import {bottomTabsWithStateAndOneOverlayState} from './testStates/bottomTabsWithActiveOverlay';
import {objectClone} from './helpers';

describe('Testing reducer handling screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    expect(reducer(clonedState, screenDisappeared({componentId: 'Component17'}))).toMatchObject(poppedReducerState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(state);
    expect(reducer(clonedState, screenDisappeared({componentId: 'Component10'}))).toMatchObject(state)
  });
});

describe('Testing reducer handling screenPushed, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const pushed = reducer(clonedState, screenPushed({componentId: 'Component17', layout: componentToPush}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component19'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(pushedState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, screenPushed({componentId: 'Component21', layout: sideMenuComponentToPush}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component23'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPushedState)
  });
});

describe('Testing reducer handling screenPopped, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const popped = reducer(clonedState, screenPopped({componentId: 'Component17'}));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component15'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(poppedState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, screenPopped({componentId: 'Component21'}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component19'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPoppedState)
  });
});

describe('Testing reducer handling screenPoppedToRoot, screenAppeared and screenDisappeare' +
    'd',
() => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const popped = reducer(clonedState, stackPoppedToRoot({componentId: 'Component17'}));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component6'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(poppedToRootState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, stackPoppedToRoot({componentId: 'Component21'}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component11'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPoppedToScreenState)
  });
});

describe('Testing reducer handling poppedToScreen, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const popped = reducer(clonedState, poppedToScreen({componentId: 'Component11'}));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component11'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(poppedToComponentState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, poppedToScreen({componentId: 'Component11'}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component11'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPoppedToScreenState)
  });
});

describe('Testing reducer handling stackRootSet, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const popped = reducer(clonedState, stackRootSet({componentId: 'Component17', layout: stackToSetForRoot}));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component34'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(setStackRootState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const setStackRoot = reducer(clonedState, stackRootSet({componentId: 'Component21', layout: sideMenuStackToSetForRoot}));
    const appeared = reducer(setStackRoot, screenAppeared({componentId: 'Component34'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuSetStackRootState)
  });
});

describe('Testing reducer handling tabChangedWithMergeOptions, screenAppeared and screenDi' +
    'sappeared',
() => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const changedTab = reducer(clonedState, tabChangedWithMergeOptions({componentId: 'BottomTabs4', currentTabIndex: 1}));
    const appeared = reducer(changedTab, screenAppeared({componentId: 'Component10'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(changedTabState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const changedTab = reducer(clonedState, tabChangedWithMergeOptions({componentId: 'BottomTabs8', currentTabIndex: 0}));
    const appeared = reducer(changedTab, screenAppeared({componentId: 'Component9'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuChangedTabState)
  });
});

describe('Testing reducer handling tabChanged, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const changedTab = reducer(clonedState, tabChanged({selectedTabIndex: 1, unselectedTabIndex: 0}));
    const appeared = reducer(changedTab, screenAppeared({componentId: 'Component10'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(changedTabState)
  });
  test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const changedTab = reducer(clonedState, tabChanged({selectedTabIndex: 0, unselectedTabIndex: 1}));
    const appeared = reducer(changedTab, screenAppeared({componentId: 'Component9'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuChangedTabState)
  });
});

describe('Testing reducer handling modalShown, screenAppeared and screenDisappeared', () => {
  test('for two active modal app', () => {
    const clonedState = objectClone(stateWithModals);
    const popped = reducer(clonedState, modalShown(showModalLayout));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component58'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component56'}));
    expect(final).toMatchObject(showModalState)
  });
});

describe('Testing reducer handling screenDisappeared for last children in stack of modal', () => {
  test('for two active modal app', () => {
    const clonedState = objectClone(showModalState);
    const popped = reducer(clonedState, screenAppeared({componentId: 'Component56'}));
    const final = reducer(popped, screenDisappeared({componentId: 'Component58'}));
    expect(final).toMatchObject(stateWithModals)
  });
});

describe('Testing reducer handling modalDismissed, screenAppeared and screenDisappeared', () => {
  test('for two active modal app', () => {
    const clonedState = objectClone(stateWithModals);
    const modalDismissedState = reducer(clonedState, modalDismissed({componentId: 'Component56'}))
    const appeared = reducer(modalDismissedState, screenAppeared({componentId: 'Component52'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component56'}));
    expect(final).toMatchObject(stateWithDismissedModals)
  });
});

describe('Testing reducer handling overlayDismissed without screenAppeared', () => {
  test('for bottom tabs with active one overlay', () => {
    const clonedState = objectClone(bottomTabsWithStateAndOneOverlayState);
    const overlayDismissedState = reducer(clonedState, overlayDismissed({componentId: 'Component19'}))
    expect(overlayDismissedState).toMatchObject(state);
  });
});