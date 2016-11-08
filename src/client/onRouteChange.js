require('smoothscroll-polyfill').polyfill();

// if (window.ga) window.ga('send', 'pageview');

export default (prevState, nextState, replace) => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  if (window.ga) {
    window.ga('set', window.location.pathname);
    window.ga('send', 'pageview', window.location.pathname);
  }
};
