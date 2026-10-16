import { createElement, type VNode } from './mini-react';

export const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)> Safe Text',
] as const;

const Hero = (): VNode =>
  createElement('header', { className: 'hero' },
    createElement('h1', null, 'Mini React Engine'),
    createElement('p', { className: 'hero__lead' }, 'VNode factory and recursive DOM mounting, built from scratch.'),
  );

const SecurityCheckpoint = (): VNode =>
  createElement('section', { className: 'panel', 'aria-labelledby': 'xss-title' },
    createElement('h2', { id: 'xss-title' }, 'Security checkpoint'),
    createElement('p', null, 'These payloads are passed as children. They must appear as plain text:'),
    createElement('ul', { className: 'payloads' },
      XSS_PAYLOADS.map((payload) => createElement('li', null, createElement('code', null, payload))),
    ),
  );

const EventCheckpoint = (): VNode =>
  createElement('section', { className: 'panel', 'aria-labelledby': 'events-title' },
    createElement('h2', { id: 'events-title' }, 'Event checkpoint'),
    createElement('p', null, 'The listener is attached with addEventListener, not an inline attribute.'),
    createElement('button', { type: 'button', className: 'btn', onClick: () => console.log('Ping') }, 'Click'),
  );

const AuditNotes = (): VNode =>
  createElement('section', { className: 'panel', 'aria-labelledby': 'audit-title' },
    createElement('h2', { id: 'audit-title' }, 'DevTools audit'),
    createElement('p', null, 'Open the Console for the VNode ↔ DOM parity report, then compare the Elements panel with the logged VNode tree.'),
  );

export const App = (): VNode =>
  createElement('main', { id: 'root-view', className: 'layout' },
    createElement(Hero),
    createElement(SecurityCheckpoint),
    createElement(EventCheckpoint),
    createElement(AuditNotes),
    createElement('footer', { className: 'footer' }, createElement('p', null, 'Lab 02 · Exercise 1')),
  );
