import {
  rootSet,
  screenDisappeared,
  screenPushed,
  tabChanged,
  screenPopped,
  stackPoppedToRoot,
  poppedToScreen,
  screenAppeared,
  stackRootSet,
  tabChangedWithMergeOptions,
  modalShown,
  modalDismissed,
  allModalsDismissed,
  overlayShown,
  overlayDismissed
} from './actions';
import {processRoot, processLayout} from './helpers';
import {Events} from './constants';

let commandListener = null;
let navigationButtonEventListener = null;
let bottomTabEventListener = null;
let screenDidAppearEventListener = null;

const subscribeCommandListener = (navigator, store) => {
  commandListener = navigator
    .events()
    .registerCommandListener((name, params) => {
      switch (name) {
        case Events.setRoot:
          {
            const initState = processRoot(params.layout);
            return store.dispatch(rootSet(initState))
          }
        case Events.push:
          const componentId = params.componentId;
          const layout = processLayout(params.layout);
          return store.dispatch(screenPushed({componentId, layout}));
        case Events.pop:
          return store.dispatch(screenPopped({componentId: params.componentId}));
        case Events.popToRoot:
          return store.dispatch(stackPoppedToRoot({componentId: params.componentId}));
        case Events.popTo:
          return store.dispatch(poppedToScreen({componentId: params.componentId}));
        case Events.setStackRoot:
          {
            const componentId = params.componentId;
            const layout = params
              .layout
              .map(layout => processLayout(layout));
            return store.dispatch(stackRootSet({componentId, layout}));
          }
        case Events.mergeOptions:
          {
            if (params && params.options && params.options.bottomTabs && params.options.bottomTabs.currentTabIndex !== undefined) {
              return store.dispatch(tabChangedWithMergeOptions({componentId: params.componentId, currentTabIndex: params.options.bottomTabs.currentTabIndex}));
            }
            if (params && params.options && params.options.topTabs && params.options.topTabs.currentTabIndex !== undefined) {
              return store.dispatch(tabChangedWithMergeOptions({componentId: params.componentId, currentTabIndex: params.options.topTabs.currentTabIndex}));
            }
            return;
          }
        case Events.showModal:
          const modalLayout = processLayout(params.layout);
          return store.dispatch(modalShown(modalLayout));
        case Events.dismissModal:
          return store.dispatch(modalDismissed({componentId: params.componentId}));
        case Events.dismissAllModals:
          return store.dispatch(allModalsDismissed());
        case Events.showOverlay:
          {
            const overlayLayout = processLayout(params.layout);
            return store.dispatch(overlayShown(overlayLayout));
          }
        case Events.dismissOverlay:
          return store.dispatch(overlayDismissed({componentId: params.componentId}));
        default:
          return;
      }
    })
};

const subscribeToBottomTabEvent = (navigator, store) => {
  bottomTabEventListener = navigator
    .events()
    .registerBottomTabSelectedListener((params) => {
      store.dispatch(tabChanged(params));
    })
}

const subscribeToScreenDidAppear = (navigator, store) => {
  screenDidAppearEventListener = navigator
    .events()
    .registerComponentDidAppearListener(({componentId}) => {
      store.dispatch(screenAppeared({componentId}));
    })
}

const subscribeToScreenDisappear = (navigator, store) => {
  screenDisappearEventListener = navigator
    .events()
    .registerComponentDidDisappearListener(({componentId}) => {
      store.dispatch(screenDisappeared({componentId}));
    })
}

export const subscribeToEvents = (navigator, store) => {
  subscribeCommandListener(navigator, store);
  subscribeToBottomTabEvent(navigator, store);
  subscribeToScreenDisappear(navigator, store);
  subscribeToScreenDidAppear(navigator, store);
}

export const unsubscribe = () => {
  commandListener && commandListener.remove();
  navigationButtonEventListener && navigationButtonEventListener.remove();
  bottomTabEventListener && bottomTabEventListener.remove();
  screenDidAppearEventListener && screenDidAppearEventListener.remove();
}