/**
 * Created by Crystian on 10/19/2014.
 */


  //extend array functionality with search by field and key
Object.defineProperty(Array.prototype, 'code', {
  value: function(key){
    'use strict';

    var a = this.find('code', key);
    if(a.length === 1){
      a = a[0];
    }
    return a;
  }
});


Object.defineProperty(Array.prototype, 'find', {
  value: function(field, key){
    'use strict';

    var r = [];

    for(var i in this){
      if(this[i].hasOwnProperty(field)){
        //					console.log(i + ' ' + this[i]);
        if(key === this[i][field]){
          //					console.log('found!');
          r.push(this[i]);
        }
      }
    }

    return r;
  }
});


Object.defineProperty(Array.prototype, 'shuffle', {
  value: function(){
    'use strict';

    var currentIndex = this.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex){

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this[currentIndex];
      this[currentIndex] = this[randomIndex];
      this[randomIndex] = temporaryValue;
    }

    return this;
  }
});
