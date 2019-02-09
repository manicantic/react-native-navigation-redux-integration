import reducer from './reducer';
import {
  screenDisappeared,
  screenPushed,
  screenAppeared,
  screenPopped,
  stackPoppedToRoot,
  poppedToScreen
} from './actions';
import {
  state,
  poppedReducerState,
  pushedState,
  componentToPush,
  poppedState,
  poppedToRootState,
  poppedToComponentState
} from './testStates/bottomTabsWithStack';
import {sideMenuState, sideMenuComponentToPush, sideMenuPushedState, sideMenuPoppedState} from './testStates/sideMenuWithTabs';
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
  /**test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, stackPoppedToRoot({componentId: 'Component21'}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component19'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPoppedState)
  }); */
});

describe('Testing reducer handling poppedToScreen, screenAppeared and screenDisappeared', () => {
  test('for tabbed app', () => {
    const clonedState = objectClone(state);
    const popped = reducer(clonedState, poppedToScreen({componentId: 'Component11'}));
    const appeared = reducer(popped, screenAppeared({componentId: 'Component11'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(poppedToComponentState)
  });
  /**test('for side menu app', () => {
    const clonedState = objectClone(sideMenuState);
    const pushed = reducer(clonedState, stackPoppedToRoot({componentId: 'Component21'}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component19'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component21'}));
    expect(final).toMatchObject(sideMenuPoppedState)
  }); */
});