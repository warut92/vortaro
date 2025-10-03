// content.js - show the word under the mouse in a small popup (cross-browser)
(function () {
    // Create popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.background = 'rgba(255,255,200,0.95)';
    popup.style.border = '1px solid #333';
    popup.style.padding = '4px 6px';
    popup.style.fontSize = '13px';
    popup.style.zIndex = 2147483647;
    popup.style.pointerEvents = 'none';
    popup.style.display = 'none';
    popup.style.borderRadius = '4px';
    document.documentElement.appendChild(popup);
  
    // Unicode-aware "is word char"
    const isWordChar = ch => !!ch && /\p{L}|\p{N}|_/u.test(ch);
  
    // Polyfill: get a collapsed Range at x,y in a cross-browser way
    function getCaretRangeFromPoint(x, y) {
      if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (!pos) return null;
        const range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse(true);
        return range;
      }
      if (document.caretRangeFromPoint) {
        try {
          return document.caretRangeFromPoint(x, y);
        } catch (e) { return null; }
      }
      return null; // further fallback below could be added (heavier)
    }
  
    // If range.startContainer is not a text node, try to find a close text node
    function normalizeRangeToText(range) {
      let node = range.startContainer;
      let offset = range.startOffset;
  
      if (node.nodeType === Node.TEXT_NODE) return { node, offset };
  
      // Try child at offset
      const child = node.childNodes[offset];
      if (child && child.nodeType === Node.TEXT_NODE) return { node: child, offset: 0 };
  
      // Try previous siblings (search backwards) for a text node
      for (let i = offset - 1; i >= 0; i--) {
        let c = node.childNodes[i];
        // find deepest last text node inside c
        let walker = document.createTreeWalker(c, NodeFilter.SHOW_TEXT, null, false);
        let last = null;
        while (walker.nextNode()) last = walker.currentNode;
        if (last) return { node: last, offset: last.textContent.length };
        if (c.nodeType === Node.TEXT_NODE) return { node: c, offset: c.textContent.length };
      }
  
      // climb up to parent and try a bit more (cheap attempt)
      let parent = node.parentNode;
      while (parent) {
        if (parent.nodeType === Node.TEXT_NODE) return { node: parent, offset: parent.textContent.length };
        parent = parent.parentNode;
      }
  
      return null;
    }
  
    // Extract the word from a text node at a given offset
    function extractWordAt(node, offset) {
      const text = node.textContent || '';
      // clamp offset
      let i = Math.max(0, Math.min(offset, text.length));
      // if offset sits at a non-word char but previous is word, nudge left
      if (i > 0 && !isWordChar(text.charAt(i)) && isWordChar(text.charAt(i - 1))) i = i - 1;
  
      // move start left
      let start = i;
      while (start > 0 && isWordChar(text.charAt(start - 1))) start--;
      // move end right
      let end = Math.max(i, offset);
      while (end < text.length && isWordChar(text.charAt(end))) end++;
  
      const word = text.slice(start, end).trim();
      return word || null;
    }
  
    // Throttle display using requestAnimationFrame
    let lastMouse = { x: 0, y: 0 }, scheduled = false;
  
    document.addEventListener('mousemove', e => {
      // ignore input/textarea so regular forms are unaffected
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        popup.style.display = 'none';
        return;
      }
  
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          handlePointer(lastMouse.x, lastMouse.y);
        });
      }
    });
  
    function handlePointer(clientX, clientY) {
      const range = getCaretRangeFromPoint(clientX, clientY);
      if (!range) {
        popup.style.display = 'none';
        return;
      }
  
      const normalized = normalizeRangeToText(range);
      if (!normalized) {
        popup.style.display = 'none';
        return;
      }
  
      const { node, offset } = normalized;
      const word = extractWordAt(node, offset);
      if (!word) {
        popup.style.display = 'none';
        return;
      }
  
      // Position popup (use client coords + small offset)
      const pageX = clientX + 12;
      const pageY = clientY + 12;
      popup.textContent = word;
      popup.style.left = pageX + 'px';
      popup.style.top = pageY + 'px';
      popup.style.display = 'block';
    }
  
    // Hide popup on scroll/blur
    window.addEventListener('scroll', () => (popup.style.display = 'none'), true);
    window.addEventListener('blur', () => (popup.style.display = 'none'));
  })();
  