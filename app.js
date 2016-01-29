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
      var pageMap = {
        home: {
          linkName: 'homeLink',
          pageName: 'home',
          partial: 'partials/home.html'
        },
        about: {
          linkName: 'aboutLink',
          pageName: 'about',
          partial: 'partials/about.html'
        },
        portfolio: {
          linkName: 'portfolioLink',
          pageName: 'portfolio',
          partial: 'partials/portfolio.html'
        }
      };

      function TrainingApp() {
        this.contentWrapper = document.querySelector('.content-wrapper');
        this.homeLink = document.querySelector('#' + pageMap.home.linkName);
        this.aboutLink = document.querySelector('#' + pageMap.about.linkName);
        this.portfolioLink = document.querySelector('#' + pageMap.portfolio.linkName);
        this.cache = {};
        this.currentPage = undefined;
      }

      TrainingApp.prototype.revealHeader = revealHeader;
      TrainingApp.prototype.revealContent = revealContent;
      TrainingApp.prototype.goTo = goTo;

      __TrainingApp = new TrainingApp();

      return __TrainingApp;

      function revealHeader() {
        setTimeout(function() {
          document.querySelector('header').className = 'active';
        }, 0);
      }

      function revealContent() {
        window.TrainingApp.goTo('home');

        setTimeout(function() {
          __TrainingApp.contentWrapper.className = 'content-wrapper active';
        }, 200);
      }

      function goTo(name) {
        _setPage(pageMap[name].pageName, function() {
          _setLinks(pageMap[name].linkName);

          _get(pageMap[name].partial, function(data) {
            __TrainingApp.contentWrapper.innerHTML = data.response;
          });
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

      function _resetLinks() {
        __TrainingApp.homeLink.className = '';
        __TrainingApp.aboutLink.className = '';
        __TrainingApp.portfolioLink.className = '';
      }

      function _setPage(name, cb) {
        if(__TrainingApp.currentPage === name) { return; }

        __TrainingApp.currentPage = name;

        if(cb && cb instanceof Function) {
          cb.call(this);
        }
      }

      function _setLinks(name) {
        _resetLinks();
        __TrainingApp[name].className = 'current';
      }
    })();
  }
})();