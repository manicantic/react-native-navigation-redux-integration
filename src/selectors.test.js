import {getActiveStackArray} from './selectors';
import {state, activeStackChildrens} from './testStates/bottomTabsWithStack';

test('Getting active stack childrens', () => {
  expect(getActiveStackArray(state,)).toEqual(activeStackChildrens)
});