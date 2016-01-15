var i18n = require('i18n');

module.exports = {
  loadPriority:  1,
  initialize: function(api, next){
    api.i18n = {
      i18n: i18n,

      // simplistic determination of locale for connection
      determineConnectionLocale: function(connection){
        // perhpas you want to look at the `accept-language` headers from a web requests
        // perhaps your API can use a certain cookie or URL to determine locale
        return 'en';
      },

      invokeConnectionLocale: function(connection){
        var cmdParts = api.config.i18n.determineConnectionLocale.split('.');
        var cmd = cmdParts.shift();
        if(cmd !== 'api'){ throw new Error('cannot operate on a method outside of the api object') }
        var method = api.utils.stringToHash(cmdParts.join('.'));
        var locale = method(connection);
        api.i18n.i18n.setLocale(connection, locale);
      }
    }

    var options = api.config.i18n
    options.directory = api.config.general.paths.locale[0];
    i18n.configure(options);
    i18n.setLocale( api.config.i18n.serverLocale );

    api.i18n.i18n = i18n;
    // console.log( api.i18n.i18n.getCatalog() );

    next();
  }
}
