/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': 'Home.index',

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  '/overview': 'Home.overview',
  '/doc': 'InterfaceDoc.testService',
  '/task': 'Home.task',
  '/case': 'Home.testcase',
  '/schedule': 'TaskSchedule.refreshView',
  // 'post /doc/query_api':'InterfaceDoc.query',
  'post /base/query': 'InterfaceDoc.query',
  'post /base/remove': 'InterfaceDoc.remove',

  //doc
  'post /doc/save_doc': 'InterfaceDoc.saveDoc',
  'post /doc/save_api': 'InterfaceDoc.saveDocItem',
  'post /doc/savedocwithItem': 'InterfaceDoc.saveDoc2db',
  'post /doc/showmdfile': 'EditDoc.showMdFile',
  'post /doc/query_doc': "EditDoc.queryDoc",
  //'post /doc/remove':"InterfaceDoc.remove",

  //case
  'post /case/save_tc_collection': 'ShowDoc.add_tc_coll_2db',
  'post /case/update_tc_collection':'ShowDoc.save_tc_coll',
  'post /case/save_case': 'ShowDoc.save_case',
  'post /case/query_tc_collection': 'ShowDoc.query_tc_coll',

  //doc test url
  'get /doc/findRequestItemByName': 'DocDemo.findRequestItemByName',
  'post /doc/insertRequestItemService': 'DocDemo.insertRequestItemService',

  //sc
  'post /sc/save': 'TaskSchedule.save',
  'post /sc/remove': 'TaskSchedule.remove',
  'post /sc/edit': 'TaskSchedule.edit',
  'post /sc/editState': 'TaskSchedule.editState',
  'post /sc/start': 'TaskSchedule.start',

  //sc
  'post /log/all': 'LogSchedule.all',

  //'post /doc/remove':"InterfaceDoc.remove",

  '/response': {
    view: 'response'
  },
};
