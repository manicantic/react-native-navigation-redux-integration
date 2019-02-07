import reducer from './reducer';
import {screenDisappeared, screenPushed, screenAppeared} from './actions';
import {state, poppedReducerState, pushedState, componentToPush} from './testStates/bottomTabsWithStack';
import {sideMenuState, sideMenuComponentToPush, sideMenuPushedState} from './testStates/sideMenuWithTabs';
import {objectClone} from './helpers';

describe('Testing reducer handling screenDisappeared', () => {
  test('', () => {
    const clonedState = objectClone(state);
    expect(reducer(clonedState, screenDisappeared({componentId: 'Component17'}))).toMatchObject(poppedReducerState)
  });
  test('', () => {
    const clonedState = objectClone(state);
    expect(reducer(clonedState, screenDisappeared({componentId: 'Component10'}))).toMatchObject(state)
  });
});

describe('Testing reducer handling screenPushed, screenAppeared and screenDisappeared', () => {
  test('', () => {
    const clonedState = objectClone(state);
    const pushed = reducer(clonedState, screenPushed({componentId: 'Component17', layout: componentToPush}));
    const appeared = reducer(pushed, screenAppeared({componentId: 'Component19'}));
    const final = reducer(appeared, screenDisappeared({componentId: 'Component17'}));
    expect(final).toMatchObject(pushedState)
  });
  test('', () => {
    const clonedState = objectClone(sideMenuState);
    expect(reducer(clonedState, screenPushed({componentId: 'Component21', layout: sideMenuComponentToPush}))).toMatchObject(sideMenuPushedState)
  });
});