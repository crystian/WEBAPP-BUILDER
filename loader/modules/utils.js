/**
 * Created by Crystian on 3/3/14.
 */

  //jshint maxstatements:false
loader.utils = (function(){
  'use strict';

  var _cache = [];

  //return 0 === equals, 1 === a > b, -1 === a < b
  function compareSemVer(a, b){
    if(a === b){
      return 0;
    }

    var aComponents = a.split('.');
    var bComponents = b.split('.');

    var len = Math.min(aComponents.length, bComponents.length);

    // loop while the components are equal
    for(var i = 0; i < len; i++){
      // A bigger than B
      if(parseInt(aComponents[i], 10) > parseInt(bComponents[i], 10)){
        return 1;
      }

      // B bigger than A
      if(parseInt(aComponents[i], 10) < parseInt(bComponents[i], 10)){
        return -1;
      }
    }

    // If one's a prefix of the other, the longer one is greater.
    if(aComponents.length > bComponents.length){
      return 1;
    }

    if(aComponents.length < bComponents.length){
      return -1;
    }

    // Otherwise they are the same.
    return 0;
  }

  function getExtensionFilename(s){
    var arr = s.split('.');
    if(arr.length === 0){
      return s;
    }
    return arr[arr.length - 1];
  }

  function setExtensionFilename(s, extension){
    var arr = s.split('.');
    if(arr.length <= 1){
      console.logRed('Extension not found!');
      return s;
    }

    arr.pop();
    arr.push(extension);

    return arr.join('.');
  }

  function setNewResourceByTag(resourceLoader, tagWhere){
    var tag = document.getElementsByTagName(tagWhere)[0];
    tag.appendChild(resourceLoader);
  }

  function setNewResourceById(resourceLoader, id, _clear){
    var el       = document.getElementById(id),
        i = 0, l = el.childNodes.length,
        clear    = (_clear === undefined);

    if(clear && l > 0){
      for(; i < l; i++){
        el.removeChild(el.childNodes[i]);
      }
    }

    el.appendChild(resourceLoader);
  }

  function showSkeletor(){
    toggleSkeletor(false);
  }

  function hideSkeletor(){
    toggleSkeletor(true);
  }

  function toggleSkeletor(v){
    //removeIf(production)
    var el        = document.getElementsByTagName('body')[0],
        className = 'skeletor',
        byValue   = false;

    byValue = (v === true || v === false) ? v : el.classList.contains(className);

    if(byValue){
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
    //endRemoveIf(production)
  }

  function showPanicError(m){
    if(window.console){
      window.console.error(m);
    }
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML = m;
    loader.hide();
  }

  function getRandomInt(max){
    return Math.round(getRandomRange(0, max));
  }

  function getRandom(max){
    return getRandomRange(0, max);
  }

  function getRandomRange(min, max){
    return Math.random() * (max - min) + min;
  }

  function decompress(data){
    console.log('Resource compressed');
    return LZString.decompressFromUTF16(data);
  }

  function compress(data){
    console.log('Resource compressed');
    return LZString.decompressFromUTF16(data);
  }

  return {
    showSkeletor: showSkeletor,
    hideSkeletor: hideSkeletor,
    toggleSkeletor: toggleSkeletor,
    getExtensionFilename: getExtensionFilename,
    setExtensionFilename: setExtensionFilename,
    compress: compress,
    decompress: decompress,
    compareSemVer: compareSemVer,
    showPanicError: showPanicError,
    setNewResourceByTag: setNewResourceByTag,
    setNewResourceById: setNewResourceById,
    getRandom: getRandom,
    getRandomInt: getRandomInt,
    getRandomRange: getRandomRange
  };

})();
