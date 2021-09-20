/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const Package = require('../package.json');

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/


  '/': {
    view: 'pages/homepage',
    locals: {
      api: {
        title: 'Gumroad Product',
        name: 'gumroad-product-api',
        version: Package.version,
        docs: 'https://documenter.getpostman.com/view/914502/UUxtGBMa'
      }
    }
  },

  'GET /health': 'health/index',


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  /*
   * Product Routes
   */
  'GET /product/:id': 'product/read',


  /*
   * Review Routes
   */
  'POST /review': 'review/create'
};
