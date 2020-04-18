var html = require('choo/html')
var path = require('path')

var views = require('./')
var format = require('../components/format')

module.exports = wrapper

function wrapper (state, emit) {
  var view = views[state.page().v('view')] || views.notfound
  var title = state.page().v('title') || 'Not Found'

  emit('DOMTitleChange', title + ' | hex22')

  return html`
    <body>
      <div class="w-1 db mw800 mxa p1 mb1">
        ${header()}
        ${view(state, emit)}
      </div>
    </body>
  `

  function header() {
		var isIndex = state.href === '/'
    return html`
      <nav class="w-1 db py2 mb1 clear-float mw500 mxa">
        <ul class="w-1 db fl clean">
          <li class="fl dib clean">
            <a href="/" class="${isIndex ? '' : 'nbb'}" tabindex="1">${state.page('/').v('title')}</a>
          </li>
          ${navigation()}
        </ul>
      </nav>
    `

    function navigation () {
      return html`
        <div class="dib fr">
          ${[state.page('/blog')].map(link)}
        </div>
      `

      function link (link) {
        var activeClass = isActive(link.v('url')) ? '' : 'nbb'
        return html`
          <li class="dib clean">
            <a href="${link.v('url') + '/'}" title="${link.v('title')}" class="${activeClass} ml1">${link.v('title')}</a>
          </li>
        `
       }

       function isActive (pathLink) {
         return state.href === pathLink
       }
    }
  }
}
