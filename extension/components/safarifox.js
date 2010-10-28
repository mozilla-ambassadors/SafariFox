const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import('resource://gre/modules/XPCOMUtils.jsm');
Cu.import('resource://gre/modules/Services.jsm');

const CP = Ci.nsIContentPolicy;

function SafariFox() {}
SafariFox.prototype = {
  classDescription:  "SafarifoxService",
  classID:           Components.ID("{04ffc7e3-e235-11df-85ca-0800200c9a66}"),
  contractID:        "@safarifox.mozilla.org/safarifox-service;1",
  QueryInterface: XPCOMUtils.generateQI([
      Ci.nsISupports, Ci.nsISupportsWeakReference, Ci.nsIContentPolicy]),

  shouldLoad: function(ct, cl, org, ctx, mt, ext) {
    if (ct != CP.TYPE_DOCUMENT || !/\.safariextz$/.test(cl.spec))
      return CP.ACCEPT;
    return CP.REJECT_REQUEST;
  },

  shouldProcess: function(ct, cl, org, ctx, mt, ext) CP.ACCEPT,
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([SafariFox]);
