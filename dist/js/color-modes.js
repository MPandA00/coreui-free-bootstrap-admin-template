/* eslint-disable unicorn/no-array-for-each */
/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict';

  const storedTheme = localStorage.getItem('theme');
  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-coreui-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-coreui-theme', theme);
    }
    const event = new Event('ColorSchemeChange');
    document.documentElement.dispatchEvent(event);
  };
  setTheme(getPreferredTheme());
  const showActiveTheme = theme => {
    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-coreui-theme-value="${theme}"]`);
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('xlink:href');
    document.querySelectorAll('[data-coreui-theme-value]').forEach(element => {
      element.classList.remove('active');
    });
    btnToActive.classList.add('active');
    activeThemeIcon.setAttribute('xlink:href', svgOfActiveBtn);
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });
  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());
    document.querySelectorAll('[data-coreui-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-coreui-theme-value');
        localStorage.setItem('theme', theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
//# sourceMappingURL=color-modes.js.map