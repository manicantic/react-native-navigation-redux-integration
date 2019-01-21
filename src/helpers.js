export const processLayout = (incomeLayout) => {
  let layout = {};
  layout.type = incomeLayout.type;
  layout.id = incomeLayout.id;
  if (incomeLayout.type === 'BottomTabs') {
    layout.activeIndex = 0;
  }
  if (incomeLayout.data && incomeLayout.data.name) {
    layout.name = incomeLayout.data.name;
  }
  if (incomeLayout.children && incomeLayout.children.length) {
    layout.children = [];
    for (var i = 0; i < incomeLayout.children.length; i++) 
      layout.children[i] = processLayout(incomeLayout.children[i])
  }
  return layout;
}

export const processRoot = incomeLayout => {
  const root = processLayout(incomeLayout.root);
  const modals = [];
  const overlays = [];
  return {root, modals, overlays};
}

export const findStackInTab = (tabs, componentId) => {
  if (tabs.children && tabs.children.length) {
    for (var i = 0; i < tabs.children.length; i++) 
      if (tabs.children[i].type === 'Stack') {
        for (var j = 0; j < tabs.children[i].children.length; j++) {
          if (tabs.children[i].children[j].id === componentId) {
            return i;
          }
        }
      }
    }
}

export const isLastScreenInStack = (stack, componentId) => {
  if (stack.children && stack.children.length) {
    if (stack.children[stack.children.length - 1].id === componentId) {
      return true;
    }
  }
}