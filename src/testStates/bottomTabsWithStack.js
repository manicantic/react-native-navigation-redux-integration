export const state = {
  navigation: {
    root: {
      type: 'BottomTabs',
      id: 'BottomTabs4',
      activeIndex: 0,
      children: [
        {
          type: 'Stack',
          id: 'Stack5',
          children: [
            {
              type: 'Component',
              id: 'Component6',
              name: 'navigation.playground.TextScreen'
            }, {
              type: 'Component',
              id: 'Component11',
              name: 'navigation.playground.PushedScreen'
            }, {
              type: 'Component',
              id: 'Component13',
              name: 'navigation.playground.PushedScreen'
            }, {
              type: 'Component',
              id: 'Component15',
              name: 'navigation.playground.PushedScreen'
            }, {
              type: 'Component',
              id: 'Component17',
              name: 'navigation.playground.PushedScreen'
            }
          ]
        }, {
          type: 'Stack',
          id: 'Stack7',
          children: [
            {
              type: 'Component',
              id: 'Component8',
              name: 'navigation.playground.TextScreen'
            }
          ]
        }, {
          type: 'Component',
          id: 'Component9',
          name: 'navigation.playground.TextScreen'
        }
      ]
    },
    modals: [],
    overlays: [],
    activeScreenArray: ['Component17', 'Stack5', 'BottomTabs4']
  }
};

export const activeStackChildrens = [
  {
    type: 'Component',
    id: 'Component6',
    name: 'navigation.playground.TextScreen'
  }, {
    type: 'Component',
    id: 'Component11',
    name: 'navigation.playground.PushedScreen'
  }, {
    type: 'Component',
    id: 'Component13',
    name: 'navigation.playground.PushedScreen'
  }, {
    type: 'Component',
    id: 'Component15',
    name: 'navigation.playground.PushedScreen'
  }, {
    type: 'Component',
    id: 'Component17',
    name: 'navigation.playground.PushedScreen'
  }
];

export const activeStackId = 'Stack5';