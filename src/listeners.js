import {
  rootSet,
  screenDisappeared,
  componentPushed,
  tabChanged,
  screenPopped,
  stackPoppedToRoot,
  poppedToScreen,
  screenAppeared
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
          return store.dispatch(componentPushed({componentId, layout}));
        case Events.pop:
          return store.dispatch(screenPopped({componentId: params.componentId}));
        case Events.popToRoot:
          return store.dispatch(stackPoppedToRoot({componentId: params.componentId}));
        case Events.popTo:
          return store.dispatch(poppedToScreen({componentId: params.componentId}));
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