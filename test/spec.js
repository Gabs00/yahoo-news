var expect = require('chai').expect;
 require('../app/src/model');

 var App = global.App;

/*
## Specs:
 * Get the ten latest news from the pipe
 * Get a summary of each news item
 * Each Item should have an image and a title
 * Clicking on an item shows its summary and link to original article
 * Must be SPA
 * No back-end allowed
 * Should be fully functional from index.html file
 * **Bonus:**Make it work with W3C widgets
 */

 describe('The App', function(){
   describe('jload', function(){
     /*
        Taking a custom url and callback function allows
        the script to be used with different urls
     */
     it('Should take a url,callback function', function(){

     });

     it('Should get the ten last items',function(){

     });

     describe('Article', function(){
       var data = {
         "title":1,
         "description":2,
         "media:content":{
           url:3,
         },
         "link":4
        };

      var mock = new App.Article();
      mock.init(data);

      it('Have an image and a title', function(){
        expect(mock.title).to.equal(1);
        expect(mock.getImgSrc()).to.equal(3);
      });
      it('Should show summary and link', function(){
        expect(mock.link).to.equal(4);
        expect(mock.summary).to.equal(2);
      });
     });

     it('Should have click event', function(){});

     it('Should work with W3C widgets', function(){});

   });
 });
