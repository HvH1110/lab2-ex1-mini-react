import './styles.css';
import { App } from './app';
import { auditMount, createElement, mount } from './mini-react';

const root = document.getElementById('app');
if (root === null) throw new Error('Mount target #app not found');

const vApp = createElement(App);
mount(vApp, root);

// Checkpoint verification — results are visible in the DevTools Console.
const report = auditMount(vApp, root);
console.assert(root.querySelector('button') !== null, 'Mount Failed');
console.assert(root.querySelector('script, img') === null, 'XSS: payload was parsed into elements');
console.assert(root.querySelector('div, span') === null, 'div-soup detected');
console.assert(report.ok, 'VNode/DOM parity audit failed', report.issues);
console.info(`[audit] ${report.ok ? 'PASS' : 'FAIL'}: ${report.vnodeCount} VNodes ↔ ${report.domNodeCount} DOM nodes`);
if (!report.ok) console.table(report.issues);
// Expanded VNode tree to compare against the Elements panel.
console.dir(App(), { depth: null });
