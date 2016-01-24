/**
 * Created by Crystian on 3/3/14.
 */

loader.events = (function(){
  'use strict';

  //jshint validthis:true
  function init(){
    //no customEvent porque no es soportado por android browser
    this.loaderFinished.initEvent('loaderFinished', false, false);
    this.newVersionDetected.initEvent('newVersionDetected', false, false);
    this.appOnline.initEvent('appOnline', false, false);
    this.appOffline.initEvent('appOffline', false, false);
  }

  return {
    loaderFinished: document.createEvent('Events'),
    newVersionDetected: document.createEvent('Events'),
    appOnline: document.createEvent('Events'),
    appOffline: document.createEvent('Events'),
    init: init
  };
}());
