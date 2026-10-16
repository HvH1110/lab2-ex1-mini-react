import { App, XSS_PAYLOADS } from '../src/app';
import { auditMount, createElement, mount } from '../src/mini-react';

const render = () => {
  const container = document.createElement('body');
  const vApp = createElement(App);
  mount(vApp, container);
  return { container, vApp };
};

describe('Checkpoint 1: semantic demo app', () => {
  it('mounts with a button (slide test-runner assertion)', () => {
    expect(render().container.querySelector('button')).not.toBeNull();
  });

  it('uses semantic landmarks and zero div-soup', () => {
    const { container } = render();
    expect(container.querySelector('main#root-view')).not.toBeNull();
    expect(container.querySelector('main > header > h1')).not.toBeNull();
    expect(container.querySelectorAll('main > section[aria-labelledby]')).toHaveLength(3);
    expect(container.querySelector('main > footer')).not.toBeNull();
    expect(container.querySelector('div, span')).toBeNull();
  });

  it('labels every section with an existing heading id', () => {
    const { container } = render();
    for (const section of container.querySelectorAll('section')) {
      const heading = container.querySelector(`#${section.getAttribute('aria-labelledby')}`);
      expect(heading?.tagName).toBe('H2');
    }
  });

  it('renders XSS payloads as text only', () => {
    const { container } = render();
    expect(container.querySelector('script, img')).toBeNull();
    const codes = [...container.querySelectorAll('code')].map((c) => c.textContent);
    expect(codes).toEqual([...XSS_PAYLOADS]);
  });

  it('wires the button through addEventListener', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const button = render().container.querySelector('button');
    expect(button?.hasAttribute('onclick')).toBe(false);
    button?.click();
    expect(log).toHaveBeenCalledWith('Ping');
    log.mockRestore();
  });

  it('passes the VNode ↔ DOM parity audit with no orphan nodes', () => {
    const { container, vApp } = render();
    const report = auditMount(vApp, container);
    expect(report.issues).toEqual([]);
    expect(report.vnodeCount).toBe(report.domNodeCount);
  });
});
