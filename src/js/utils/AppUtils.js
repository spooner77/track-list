var _ = require('underscore');

module.exports = {
  generateHash: function(str) {
    if ( !_.isString(str) )
      throw "Invalid parameter str:"+str;

    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    };
    return hash;
  }
};
