/**
 * Created by Crystian on 2/20/2015.
 */


//shortcuts:
var byId = function(id){
  'use strict';
  return document.getElementById(id);
};

//jshint unused:false
var byClass = function(_class){
  'use strict';
  return document.getElementsByClassName(_class)[0];
};

/* insert html in id sent */
//jshint unused:false
var h = function(id, v){
  'use strict';
  var el = byId(id);
  if(el){
    el.innerHTML = v;
  }
};
//jshint unused:false
var hp = function(id, v){
  'use strict';
  var el = byId(id);
  if(el){
    el.placeholder = v;
  }
};
//jshint unused:false
var t = function(id, v){
  'use strict';
  var el = byId(id);
  if(el){
    el.innerText = v;
  }
};

//show message in debug zone
//jshint unused:false
var d = function(m){
  'use strict';
  loader.debugAdd(m);
};

