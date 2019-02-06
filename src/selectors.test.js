import {
  getActiveStackArray,
  getActiveScreenId,
  getActiveBottomTabsId,
  getActiveTopTabsId,
  getActiveStackId,
  getActiveSideMenuCenterId,
  getActiveSideMenuLeftId,
  getActiveSideMenuRightId,
  getActiveSideMenuRootId
} from './selectors';
import {state, activeStackChildrens} from './testStates/bottomTabsWithStack';
import {sideMenuState} from './testStates/sideMenuWithTabs';

test('Getting active stack childrens', () => {
  expect(getActiveStackArray({navigation: state})).toEqual(activeStackChildrens)
});

test('Getting active screen id', () => {
  expect(getActiveScreenId({navigation: state})).toBe('Component17')
  expect(getActiveScreenId({navigation: sideMenuState})).toBe('Component21')
});

test('Getting active bottom tabs id', () => {
  expect(getActiveBottomTabsId({navigation: state})).toBe('BottomTabs4')
  expect(getActiveBottomTabsId({navigation: sideMenuState})).toBe('BottomTabs8')
});

test('Getting active top tabs id', () => {
  expect(getActiveTopTabsId({navigation: state})).toBeUndefined()
  expect(getActiveTopTabsId({navigation: sideMenuState})).toBeUndefined()
});

test('Getting active stack id', () => {
  expect(getActiveStackId({navigation: state})).toBe('Stack5')
  expect(getActiveStackId({navigation: sideMenuState})).toBe('Stack10')
});

test('Getting active side menu center id', () => {
  expect(getActiveSideMenuCenterId({navigation: state})).toBeUndefined()
  expect(getActiveSideMenuCenterId({navigation: sideMenuState})).toBe('SideMenuCenter7')
});

test('Getting active side menu left id', () => {
  expect(getActiveSideMenuLeftId({navigation: state})).toBeUndefined()
  expect(getActiveSideMenuLeftId({navigation: sideMenuState})).toBe('SideMenuLeft5')
});

test('Getting active side menu right id', () => {
  expect(getActiveSideMenuRightId({navigation: state})).toBeUndefined()
  expect(getActiveSideMenuRightId({navigation: sideMenuState})).toBe('SideMenuRight14')
});

test('Getting active side menu root id', () => {
  expect(getActiveSideMenuRootId({navigation: state})).toBeUndefined()
  expect(getActiveSideMenuRootId({navigation: sideMenuState})).toBe('SideMenuRoot4')
});