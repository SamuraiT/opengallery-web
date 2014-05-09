'use strict';

import listTemplate from './list';
import contentTemplate from './content';
import reactive from 'reactive';
import $ from 'jquery';

// Models
var data = {
  exhibitions: []
};

// Views
var listView = reactive(listTemplate, data);
var contentView = reactive(contentTemplate, {active: ""});
var frag = document.createDocumentFragment();
frag.appendChild(contentView.el);
frag.appendChild(listView.el);

var $doc = $(document);
var $list = $(listView.el);
var $content = $(contentView.el);
var scrollTop = null;

$list.on('click' ,'.ex-item:not(.selected)', function(e) {
  if (scrollTop !== null) {
    closeContent();
  }

  $(e.currentTarget).addClass('selected');
  contentView.set('active', 'active');

  scrollTop = $doc.scrollTop();
  $list.css({
    position: 'fixed',
    top: -scrollTop
  }).addClass('shrink');
  $doc.scrollTop(0);
});

$list.on('click', '.ex-item.selected', closeContent);

function closeContent() {
  contentView.set('active', '');
  $('.ex-item.selected').removeClass('selected');
  $list.css({
    position: '',
    top: ''
  }).removeClass('shrink');
  $doc.scrollTop(scrollTop);
  scrollTop = null;
}

$content.on('click', '.ex-content-close', closeContent);
var exports = {
  data: data,
  el: frag
};

export default exports;
