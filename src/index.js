// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var resultsWrapper = document.getElementById('results');

var searchString = void 0;

searchInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    var elements = resultsWrapper.getElementsByClassName('result');

    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    doSearch(e.target.value);
  }
});

var doSearch = function doSearch(searchString) {
  var apiUrl = 'https://api.github.com/search/repositories?q=';
  var tempApiSuffix = '&sort=stars&order=desc&page=2&per_page=';
  var maxTempApi = '10';

  if (searchString && searchString.length) {
    var finalApiUrl = '' + apiUrl + searchString + tempApiSuffix + maxTempApi;

    resultsWrapper.classList.add('results--loading');

    fetch(finalApiUrl).then(function (res) {
      if (res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        return;
      }

      res.json().then(function (data) {
        createSearchResults(data);
      });
    }).catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  }
};

var createSearchResults = function createSearchResults(results) {
  var resItems = results.items;
  var c = document.createDocumentFragment();
  console.log(resItems);

  for (var i = 0; i < resItems.length; i++) {
    var title = resItems[i].name;
    var url = resItems[i].homepage || resItems[i].html_url;
    var description = resItems[i].description;

    var w = document.createElement('div');
    w.className = 'result';

    var t = document.createElement('div');
    t.className = 'result__title';
    t.innerHTML = title;

    var u = document.createElement('div');
    u.className = 'result__url';
    u.innerHTML = url;

    // newlink = document.createElement('a');
    // u.appendChild(newlink);

    w.appendChild(t);
    w.appendChild(u);

    if (description) {
      var d = document.createElement('div');
      d.className = 'result__desc';
      d.innerHTML = description;

      w.appendChild(d);
    }

    c.appendChild(w);
  }

  resultsWrapper.classList.remove('results--loading');
  resultsWrapper.appendChild(c);
};

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
