import React from 'react'

const overflowScrollReg = /scroll|auto/i;
const defaultRoot = typeof window !== 'undefined' ? window : undefined;

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el, root = defaultRoot) {
  if (root === undefined) {
    root = window;
  }
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      const htmlOverflowY = window.getComputedStyle(node.parentNode).overflowY;
      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }
  return root;
}

function useScrollParent(el) {
  const [scrollParent, setScrollParent] = React.useState();

  React.useEffect(() => {
    if (el) {
      setScrollParent(getScrollParent(el.current));
    }
  }, []);

  return scrollParent;
}

export default useScrollParent;