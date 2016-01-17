(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', DOMContentLoaded);

  function DOMContentLoaded() {
    window.console.log('DOM content has been loaded. Now lets start running our code!');

    initialize();
    window.TrainingApp.revealHeader();
    window.TrainingApp.revealContent();
  }

  function initialize() {
    window.TrainingApp = (function() {
      var __TrainingApp;

      function TrainingApp() {
        this.contentWrapper = document.querySelector('.content-wrapper');
        this.cache = {};
        this.currentPage = undefined;
      }

      TrainingApp.prototype.revealHeader = revealHeader;
      TrainingApp.prototype.revealContent = revealContent;
      TrainingApp.prototype.showHome = showHome;
      TrainingApp.prototype.showAbout = showAbout;
      TrainingApp.prototype.showPortfolio = showPortfolio;

      __TrainingApp = new TrainingApp();

      return __TrainingApp;

      function revealHeader() {
        setTimeout(function() {
          document.querySelector('header').className = 'active';
        }, 0);
      }

      function revealContent() {
        window.TrainingApp.showHome();

        setTimeout(function() {
          __TrainingApp.contentWrapper.className = 'content-wrapper active';
        }, 200);
      }

      function showHome() {
        if(__TrainingApp.currentPage === 'home') { return; }

        __TrainingApp.currentPage = 'home';

        _get('partials/home.html', function(data) {
          __TrainingApp.contentWrapper.innerHTML = data.response;
        });
      }

      function showAbout() {
        if(__TrainingApp.currentPage === 'about') { return; }

        __TrainingApp.currentPage = 'about';

        _get('partials/about.html', function(data) {
          __TrainingApp.contentWrapper.innerHTML = data.response;
        });
      }

      function showPortfolio() {
        if(__TrainingApp.currentPage === 'portfolio') { return; }

        __TrainingApp.currentPage = 'portfolio';

        _get('partials/portfolio.html', function(data) {
          __TrainingApp.contentWrapper.innerHTML = data.response;
        });
      }

      function _get(url, cb) {
        if(__TrainingApp.cache[url]) {
          cb(__TrainingApp.cache[url]);
        } else {
          var http = new XMLHttpRequest();

          http.onreadystatechange = _fireCallback;
          http.open('GET', url, true);
          http.send();
        }

        function _fireCallback() {
          if(http.readyState === 4 && http.status === 200) {
            __TrainingApp.cache[url] = http;
            cb(__TrainingApp.cache[url]);
          }
        }
      }
    })();
  }
})();