/**
 * Created by Crystian on 20/12/2015.
 */
beforeEach(function(){
  jasmine.addMatchers({
    toBeMoreLess: function(){
      return {
        compare: function(actual, expected, range){
          var pass    = false,
              message = '';
          if(expected - range <= actual && expected + range >= actual){
            pass = true
          } else {
            message = 'expected value "' + expected + '" (' + range + '+-) not in range: ' + actual;
          }
          return {
            pass: pass,
            message: message
          }
        }
      };
    }
  });
});