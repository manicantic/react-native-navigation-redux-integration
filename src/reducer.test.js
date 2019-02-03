import reducer from './reducer';
import {screenDisappeared} from './actions';
import {state, poppedReducerState} from './testStates/bottomTabsWithStack';

describe('Testing reducer handling screenDisappeared', () => {
  test('', () => {
    expect(reducer(state, screenDisappeared({componentId: 'Component17'}))).toMatchObject(poppedReducerState)
  });

  test('', () => {
    expect(reducer(state, screenDisappeared({componentId: 'Component10'}))).toMatchObject(state)
  });

});