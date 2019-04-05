/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object that has a URL defined
         * and that the URL is not empty.
         */
         it('all feeds has url defined and its not empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           })
         });


        /*  test that loops through each feed
         * in the allFeeds object and it has a name defined
         * and that the name is not empty.
         */
         it('all feeds has name defined and its not empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           })
         });
    });


    /* new test suite named "The menu" */
    describe('The menu', function() {


        /* test that ensures the menu element is
         * hidden by default.
         */
         it('menu element is hidden by default',function() {
           expect($("body").hasClass("menu-hidden")).toBe(true);
         })

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('menu changes visibility on click', function() {
            //when menu clicked
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            //when menu clicked again, should close
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
          })
    });

    describe('initial entries', function(){
      /* a new test suite named "Initial Entries" */

          /* a test that ensures when the loadFeed
           * function is called and completes its work, there is at least
           * a single .entry element within the .feed container.
           */
           beforeEach(function(done) {
             loadFeed(0, done);
           });

           it('at least 1 entry is found when loadfeed is called',function(){
             expect($(".feed .entry").length).toBeGreaterThan(0);
           });

    })

    describe('New Feed Selection', function() {
          /* a new test suite named "New Feed Selection" */

          /* test that ensures when a new feed is loaded
           * by the loadFeed function that the content actually changes.
           */
           let feedOne;
           let feedTwo;
           beforeEach(function(done) {
             loadFeed(0, function(){
               feedOne = $(".feed").html();
               loadFeed(1,function(){
                 feedTwo = $(".feed").html();
                 done();
               });
             });
           })


           it("content changes when new feed is loaded", function(){
             expect(feedOne === feedTwo).toBe(false);
           });
    })

}());
