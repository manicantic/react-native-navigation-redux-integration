import {getActiveChildrens} from './helpers';
import {state, activeStackChildrens} from './testStates/bottomTabsWithStack';

test('Getting active stack childrens', () => {
  expect(getActiveChildrens(state.navigation.root, 'Stack5')).toEqual(activeStackChildrens)
});