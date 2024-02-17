// Instantiate the object
var I18n = I18n || {};

// Set default locale to english
I18n.defaultLocale = "en";

// Set default pluralization rule
I18n.pluralizationRules = {
  en(n) {
    return n === 0 ? ["zero", "none", "other"] : n === 1 ? "one" : "other";
  },
};

// Set current locale to null
I18n.locale = null;
I18n.fallbackLocale = null;

// Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
I18n.PLACEHOLDER = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm;

I18n.SEPARATOR = ".";

I18n.noFallbacks = false;

I18n.isValidNode = function (obj, node, undefined) {
  return obj[node] !== null && obj[node] !== undefined;
};

I18n.lookup = function (scope, options) {
  options = options || {};

  var translations = this.prepareOptions(I18n.translations),
    locale = options.locale || I18n.currentLocale(),
    messages = translations[locale] || {},
    currentScope;

  options = this.prepareOptions(options);

  if (typeof scope === "object") {
    scope = scope.join(this.SEPARATOR);
  }

  if (options.scope) {
    scope = options.scope.toString() + this.SEPARATOR + scope;
  }

  var originalScope = scope;
  scope = scope.split(this.SEPARATOR);

  if (scope.length > 0 && scope[0] !== "js") {
    scope.unshift("js");
  }

  while (messages && scope.length > 0) {
    currentScope = scope.shift();
    messages = messages[currentScope];
  }

  if (messages === undefined && this.extras && this.extras[locale]) {
    messages = this.extras[locale];
    scope = originalScope.split(this.SEPARATOR);

    while (messages && scope.length > 0) {
      currentScope = scope.shift();
      messages = messages[currentScope];
    }
  }

  if (messages === undefined) {
    messages = options.defaultValue;
  }

  return messages;
};

// Merge several hash options, checking if value is set before
// overwriting any value. The precedence is from left to right.
//
//   I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
//   #=> {name: "John Doe", role: "user"}
//
I18n.prepareOptions = function () {
  var options = {},
    opts,
    count = arguments.length;

  for (var i = 0; i < count; i++) {
    opts = arguments[i];

    if (!opts) {
      continue;
    }

    for (var key in opts) {
      if (!this.isValidNode(options, key)) {
        options[key] = opts[key];
      }
    }
  }

  return options;
};

I18n.interpolate = function (message, options) {
  options = this.prepareOptions(options);

  var matches = message.match(this.PLACEHOLDER),
    placeholder,
    value,
    name;

  if (!matches) {
    return message;
  }

  for (var i = 0; (placeholder = matches[i]); i++) {
    name = placeholder.replace(this.PLACEHOLDER, "$1");

    if (typeof options[name] === "string") {
      // The dollar sign (`$`) is a special replace pattern, and `$&` inserts
      // the matched string. Thus dollars signs need to be escaped with the
      // special pattern `$$`, which inserts a single `$`.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
      value = options[name].replace(/\$/g, "$$$$");
    } else {
      value = options[name];
    }

    if (!this.isValidNode(options, name)) {
      value = "[missing " + placeholder + " value]";
    }

    var regex = new RegExp(
      placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")
    );
    message = message.replace(regex, value);
  }

  return message;
};

I18n.translate = function (scope, options) {
  options = this.prepareOptions(options);
  options.needsPluralization = typeof options.count === "number";
  options.ignoreMissing = !this.noFallbacks;

  var translation = this.findTranslation(scope, options);

  if (!this.noFallbacks) {
    if (!translation && this.fallbackLocale) {
      options.locale = this.fallbackLocale;
      translation = this.findTranslation(scope, options);
    }

    options.ignoreMissing = false;

    if (!translation && this.currentLocale() !== this.defaultLocale) {
      options.locale = this.defaultLocale;
      translation = this.findTranslation(scope, options);
    }

    if (!translation && this.currentLocale() !== "en") {
      options.locale = "en";
      translation = this.findTranslation(scope, options);
    }
  }

  try {
    return this.interpolate(translation, options);
  } catch (error) {
    return (
      options.translatedFallback ||
      this.missingTranslation(scope, null, options)
    );
  }
};

I18n.findTranslation = function (scope, options) {
  var translation = this.lookup(scope, options);

  if (translation && options.needsPluralization) {
    translation = this.pluralize(translation, scope, options);
  }

  return translation;
};

I18n.toNumber = function (number, options) {
  options = this.prepareOptions(options, this.lookup("number.format"), {
    precision: 3,
    separator: this.SEPARATOR,
    delimiter: ",",
    strip_insignificant_zeros: false,
  });

  var negative = number < 0,
    string = Math.abs(number).toFixed(options.precision).toString(),
    parts = string.split(this.SEPARATOR),
    buffer = [],
    formattedNumber;

  number = parts[0];

  while (number.length > 0) {
    var pos = Math.max(0, number.length - 3);
    buffer.unshift(number.slice(pos, pos + 3));
    number = number.slice(0, -3);
  }

  formattedNumber = buffer.join(options.delimiter);

  if (options.precision > 0) {
    formattedNumber += options.separator + parts[1];
  }

  if (negative) {
    formattedNumber = "-" + formattedNumber;
  }

  if (options.strip_insignificant_zeros) {
    var regex = {
      separator: new RegExp(options.separator.replace(/\./, "\\.") + "$"),
      zeros: /0+$/,
    };

    formattedNumber = formattedNumber
      .replace(regex.zeros, "")
      .replace(regex.separator, "");
  }

  return formattedNumber;
};

I18n.toHumanSize = function (number, options) {
  var kb = 1024,
    size = number,
    iterations = 0,
    unit,
    precision;

  while (size >= kb && iterations < 4) {
    size = size / kb;
    iterations += 1;
  }

  if (iterations === 0) {
    unit = this.t("number.human.storage_units.units.byte", { count: size });
    precision = 0;
  } else {
    unit = this.t(
      "number.human.storage_units.units." +
        [null, "kb", "mb", "gb", "tb"][iterations]
    );
    precision = size - Math.floor(size) === 0 ? 0 : 1;
  }

  options = this.prepareOptions(options, {
    precision: precision,
    format: this.t("number.human.storage_units.format"),
    delimiter: "",
  });

  number = this.toNumber(size, options);
  number = options.format.replace("%u", unit).replace("%n", number);

  return number;
};

I18n.listJoiner = function (listOfStrings, delimiter) {
  if (listOfStrings.length === 1) {
    return listOfStrings[0];
  }

  if (listOfStrings.length === 2) {
    return listOfStrings[0] + " " + delimiter + " " + listOfStrings[1];
  }

  var lastString = listOfStrings.pop();
  return listOfStrings.concat(delimiter).join(`, `) + " " + lastString;
};

I18n.pluralizer = function (locale) {
  var pluralizer = this.pluralizationRules[locale];
  if (pluralizer !== undefined) return pluralizer;
  return this.pluralizationRules["en"];
};

I18n.findAndTranslateValidNode = function (keys, translation) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (this.isValidNode(translation, key)) return translation[key];
  }
  return null;
};

I18n.pluralize = function (translation, scope, options) {
  if (typeof translation !== "object") return translation;

  options = this.prepareOptions(options);
  var count = options.count.toString();

  var pluralizer = this.pluralizer(options.locale || this.currentLocale());
  var key = pluralizer(Math.abs(count));
  var keys = typeof key === "object" && key instanceof Array ? key : [key];

  var message = this.findAndTranslateValidNode(keys, translation);

  if (message !== null || options.ignoreMissing) {
    return message;
  }

  return this.missingTranslation(scope, keys[0]);
};

I18n.missingTranslation = function (scope, key, options) {
  var message = "[" + this.currentLocale() + this.SEPARATOR + scope;

  if (key) {
    message += this.SEPARATOR + key;
  }

  if (options && options.hasOwnProperty("count")) {
    message += " count=" + JSON.stringify(options.count);
  }

  return message + "]";
};

I18n.currentLocale = function () {
  return I18n.locale || I18n.defaultLocale;
};

I18n.enableVerboseLocalization = function () {
  var counter = 0;
  var keys = {};
  var t = I18n.t;

  I18n.noFallbacks = true;

  I18n.t = I18n.translate = function (scope, value) {
    var current = keys[scope];
    if (!current) {
      current = keys[scope] = ++counter;
      var message = "Translation #" + current + ": " + scope;
      if (value && Object.keys(value).length > 0) {
        message += ", parameters: " + JSON.stringify(value);
      }
      // eslint-disable-next-line no-console
      console.info(message);
    }
    return t.apply(I18n, [scope, value]) + " (#" + current + ")";
  };
};

I18n.enableVerboseLocalizationSession = function () {
  sessionStorage.setItem("verbose_localization", "true");
  I18n.enableVerboseLocalization();

  return "Verbose localization is enabled. Close the browser tab to turn it off. Reload the page to see the translation keys.";
};

// shortcuts
I18n.t = I18n.translate;



MessageFormat = {locale: {}};
I18n._compiledMFs = {"user.messages.read_more_group_pm_MF" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "HAS_UNREAD_AND_NEW";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "and <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> message remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
},
"other" : function(d){
var r = "";
r += "and <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> messages remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> message remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> messages remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> message remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/group/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += "/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> messages remaining, or browse other messages in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupLink"];
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_0[ k_1 ] || pf_0[ "other" ])( d );
r += "\n";
return r;
}, "user.messages.read_more_personal_pm_MF" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "HAS_UNREAD_AND_NEW";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "and <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> message remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
},
"other" : function(d){
var r = "";
r += "and <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> messages remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> message remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/unread'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> messages remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> message remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages/new'>" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> messages remaining, or browse other <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/u/";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["username"];
r += "/messages'>personal messages</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_0[ k_1 ] || pf_0[ "other" ])( d );
r += "\n";
return r;
}, "too_few_topics_and_posts_notice_MF" : function(d){
var r = "";
r += "Let's <a href=\"https://blog.discourse.org/2014/08/building-a-discourse-community/\" target=\"_blank\" rel=\"noopener noreferrer\">start the discussion!</a> There ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "currentTopics";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "is <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topic";
return r;
},
"other" : function(d){
var r = "";
r += "are <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "currentPosts";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> post";
return r;
},
"other" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Visitors need more to read and reply to – we recommend at least ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "requiredTopics";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topic";
return r;
},
"other" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "requiredPosts";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> post";
return r;
},
"other" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Only staff can see this message.\n";
return r;
}, "too_few_topics_notice_MF" : function(d){
var r = "";
r += "Let's <a href=\"https://blog.discourse.org/2014/08/building-a-discourse-community/\" target=\"_blank\" rel=\"noopener noreferrer\">start the discussion!</a> There ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "currentTopics";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "is <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topic";
return r;
},
"other" : function(d){
var r = "";
r += "are <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Visitors need more to read and reply to – we recommend at least ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "requiredTopics";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topic";
return r;
},
"other" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Only staff can see this message.\n";
return r;
}, "too_few_posts_notice_MF" : function(d){
var r = "";
r += "Let's <a href=\"https://blog.discourse.org/2014/08/building-a-discourse-community/\" target=\"_blank\" rel=\"noopener noreferrer\">start the discussion!</a> There ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "currentPosts";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "is <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> post";
return r;
},
"other" : function(d){
var r = "";
r += "are <strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Visitors need more to read and reply to – we recommend at least ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "requiredPosts";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> post";
return r;
},
"other" : function(d){
var r = "";
r += "<strong>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</strong> posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Only staff can see this message.\n";
return r;
}, "logs_error_rate_notice.reached_hour_MF" : function(d){
var r = "";
r += "<b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["relativeAge"];
r += "</b> – <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["url"];
r += "' target='_blank'>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "rate";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/hour";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/hour";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</a> reached site setting limit of ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "limit";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/hour";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/hour";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ".\n";
return r;
}, "logs_error_rate_notice.reached_minute_MF" : function(d){
var r = "";
r += "<b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["relativeAge"];
r += "</b> – <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["url"];
r += "' target='_blank'>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "rate";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/minute";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/minute";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</a> reached site setting limit of ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "limit";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/minute";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/minute";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ".\n";
return r;
}, "logs_error_rate_notice.exceeded_hour_MF" : function(d){
var r = "";
r += "<b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["relativeAge"];
r += "</b> – <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["url"];
r += "' target='_blank'>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "rate";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/hour";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/hour";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</a> exceeded site setting limit of ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "limit";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/hour";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/hour";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ".\n";
return r;
}, "logs_error_rate_notice.exceeded_minute_MF" : function(d){
var r = "";
r += "<b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["relativeAge"];
r += "</b> – <a href='";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["url"];
r += "' target='_blank'>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "rate";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/minute";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/minute";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</a> exceeded site setting limit of ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "limit";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " error/minute";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " errors/minute";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ".\n";
return r;
}, "summary.description_time_MF" : function(d){
var r = "";
r += "There ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "replyCount";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "is <b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> reply";
return r;
},
"other" : function(d){
var r = "";
r += "are <b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> replies";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " with an estimated read time of <b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "readingTime";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " minute";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " minutes";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</b>.\n";
return r;
}, "topic.read_more_MF" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "HAS_UNREAD_AND_NEW";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/unread\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/unread\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a>";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "and <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/new\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> topic remaining,";
return r;
},
"other" : function(d){
var r = "";
r += "and <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/new\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> topics remaining,";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "UNREAD";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/unread\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> topic remaining,";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/unread\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " unread</a> topics remaining,";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n    ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "NEW";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"0" : function(d){
var r = "";
return r;
},
"one" : function(d){
var r = "";
r += "There is <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/new\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> topic remaining,";
return r;
},
"other" : function(d){
var r = "";
r += "There are <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/new\">" + (function(){ var x = k_2 - off_1;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_2+"` isnt a number.");
}
return x;
})() + " new</a> topics remaining,";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n  ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_0[ k_1 ] || pf_0[ "other" ])( d );
r += "\n";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "HAS_CATEGORY";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"true" : function(d){
var r = "";
r += "or browse other topics in ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["categoryLink"];
return r;
},
"false" : function(d){
var r = "";
r += "or <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["basePath"];
r += "/latest\">view latest topics</a>";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_0[ k_1 ] || pf_0[ "other" ])( d );
r += "\n";
return r;
}, "flagging.delete_confirm_MF" : function(d){
var r = "";
r += "You are about to delete ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "POSTS";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> post";
return r;
},
"other" : function(d){
var r = "";
r += "<b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "TOPICS";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "<b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> topic";
return r;
},
"other" : function(d){
var r = "";
r += "<b>" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + "</b> topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " from this user, remove their account, block signups from their IP address <b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["ip_address"];
r += "</b>, and add their email address <b>";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["email"];
r += "</b> to a permanent block list. Are you sure this user is really a spammer?\n";
return r;
}, "posts_likes_MF" : function(d){
var r = "";
r += "This topic has ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "count";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " reply";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " replies";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "ratio";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"low" : function(d){
var r = "";
r += "with a high like to post ratio";
return r;
},
"med" : function(d){
var r = "";
r += "with a very high like to post ratio";
return r;
},
"high" : function(d){
var r = "";
r += "with an extremely high like to post ratio";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_0[ k_1 ] || pf_0[ "other" ])( d );
r += "\n";
return r;
}, "chat.mention_warning.groups.too_many_members_MF" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "groupCount";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"1" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "isAdmin";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_1[ k_2 ] || pf_1[ "other" ])( d );
r += "\n        ";
return r;
},
"2" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "isAdmin";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " and @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group2"];
r += " exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " and @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group2"];
r += " exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " and @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group2"];
r += " exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group1"];
r += " and @";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["group2"];
r += " exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_1[ k_2 ] || pf_1[ "other" ])( d );
r += "\n        ";
return r;
},
"other" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "isAdmin";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"true" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning these ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " groups exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning these ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " groups exceeds the <a href=\"";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["siteSettingUrl"];
r += "\" target=\"_blank\">notification limit</a> of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"false" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_3 = "notificationLimit";
var k_3=d[lastkey_3];
var off_2 = 0;
var pf_2 = { 
"one" : function(d){
var r = "";
r += "Mentioning these ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " groups exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " user.";
return r;
},
"other" : function(d){
var r = "";
r += "Mentioning these ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " groups exceeds the notification limit of " + (function(){ var x = k_3 - off_2;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_3+"` isnt a number.");
}
return x;
})() + " users.";
return r;
}
};
if ( pf_2[ k_3 + "" ] ) {
r += pf_2[ k_3 + "" ]( d ); 
}
else {
r += (pf_2[ MessageFormat.locale["en"]( k_3 - off_2 ) ] || pf_2[ "other" ] )( d );
}
r += "\n            ";
return r;
},
"other" : function(d){
var r = "";
return r;
}
};
r += (pf_1[ k_2 ] || pf_1[ "other" ])( d );
r += "\n        ";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "\n";
return r;
}, "chat.create_channel.auto_join_users.warning_multiple_groups_MF" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "groupCount";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "userCount";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"one" : function(d){
var r = "";
r += "Automatically add ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["userCount"];
r += " user from ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " other group?";
return r;
},
"other" : function(d){
var r = "";
r += "Automatically add ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["userCount"];
r += " users from ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " other group?";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n        ";
return r;
},
"other" : function(d){
var r = "";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_2 = "userCount";
var k_2=d[lastkey_2];
var off_1 = 0;
var pf_1 = { 
"one" : function(d){
var r = "";
r += "Automatically add ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["userCount"];
r += " user from ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " other groups?";
return r;
},
"other" : function(d){
var r = "";
r += "Automatically add ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["userCount"];
r += " users from ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupName"];
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
r += d["groupCount"];
r += " other groups?";
return r;
}
};
if ( pf_1[ k_2 + "" ] ) {
r += pf_1[ k_2 + "" ]( d ); 
}
else {
r += (pf_1[ MessageFormat.locale["en"]( k_2 - off_1 ) ] || pf_1[ "other" ] )( d );
}
r += "\n        ";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "\n";
return r;
}, "admin.user.penalty_history_MF" : function(d){
var r = "";
r += "In the past 6 months this user has been <b>suspended ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "SUSPENDED";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " time";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " times";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</b> and <b>silenced ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "SILENCED";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " time";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " times";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += "</b>.";
return r;
}, "admin.user.delete_all_posts_confirm_MF" : function(d){
var r = "";
r += "You are about to delete ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "POSTS";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " post";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " posts";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += " and ";
if(!d){
throw new Error("MessageFormat: No data passed to function.");
}
var lastkey_1 = "TOPICS";
var k_1=d[lastkey_1];
var off_0 = 0;
var pf_0 = { 
"one" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " topic";
return r;
},
"other" : function(d){
var r = "";
r += "" + (function(){ var x = k_1 - off_0;
if( isNaN(x) ){
throw new Error("MessageFormat: `"+lastkey_1+"` isnt a number.");
}
return x;
})() + " topics";
return r;
}
};
if ( pf_0[ k_1 + "" ] ) {
r += pf_0[ k_1 + "" ]( d ); 
}
else {
r += (pf_0[ MessageFormat.locale["en"]( k_1 - off_0 ) ] || pf_0[ "other" ] )( d );
}
r += ". Are you sure?\n";
return r;
}};
MessageFormat.locale.en = function ( n ) {
  if ( n === 1 ) {
    return "one";
  }
  return "other";
};

(function () {
  I18n.messageFormat = function (key, options) {
    var fn = I18n._compiledMFs[key];
    if (fn) {
      try {
        return fn(options);
      } catch (err) {
        return err.message;
      }
    } else {
      return "Missing Key: " + key;
    }
  };
})();

I18n.translations = {"en":{"js":{"number":{"format":{"separator":".","delimiter":","},"human":{"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"short":{"thousands":"%{number}k","millions":"%{number}M"}},"dates":{"time":"h:mm a","time_with_zone":"hh:mm a (z)","time_short_day":"ddd, h:mm a","timeline_date":"MMM YYYY","long_no_year":"MMM D, h:mm a","long_no_year_no_time":"MMM D","full_no_year_no_time":"MMMM Do","long_with_year":"MMM D, YYYY h:mm a","long_with_year_no_time":"MMM D, YYYY","full_with_year_no_time":"MMMM Do, YYYY","long_date_with_year":"MMM D, 'YY LT","long_date_without_year":"MMM D, LT","long_date_with_year_without_time":"MMM D, 'YY","long_date_without_year_with_linebreak":"MMM D \u003cbr/\u003eLT","long_date_with_year_with_linebreak":"MMM D, 'YY \u003cbr/\u003eLT","wrap_ago":"%{date} ago","wrap_on":"on %{date}","tiny":{"half_a_minute":"\u003c 1m","less_than_x_seconds":{"one":"\u003c %{count}s","other":"\u003c %{count}s"},"x_seconds":{"one":"%{count}s","other":"%{count}s"},"less_than_x_minutes":{"one":"\u003c %{count}m","other":"\u003c %{count}m"},"x_minutes":{"one":"%{count}m","other":"%{count}m"},"about_x_hours":{"one":"%{count}h","other":"%{count}h"},"x_days":{"one":"%{count}d","other":"%{count}d"},"x_months":{"one":"%{count}mon","other":"%{count}mon"},"about_x_years":{"one":"%{count}y","other":"%{count}y"},"over_x_years":{"one":"\u003e %{count}y","other":"\u003e %{count}y"},"almost_x_years":{"one":"%{count}y","other":"%{count}y"},"date_month":"MMM D","date_year":"MMM 'YY"},"medium":{"less_than_x_minutes":{"one":"less than %{count} min","other":"less than %{count} mins"},"x_minutes":{"one":"%{count} min","other":"%{count} mins"},"x_hours":{"one":"%{count} hour","other":"%{count} hours"},"about_x_hours":{"one":"about %{count} hour","other":"about %{count} hours"},"x_days":{"one":"%{count} day","other":"%{count} days"},"x_months":{"one":"%{count} month","other":"%{count} months"},"about_x_years":{"one":"about %{count} year","other":"about %{count} years"},"over_x_years":{"one":"over %{count} year","other":"over %{count} years"},"almost_x_years":{"one":"almost %{count} year","other":"almost %{count} years"},"date_year":"MMM D, 'YY"},"medium_with_ago":{"x_minutes":{"one":"%{count} min ago","other":"%{count} mins ago"},"x_hours":{"one":"%{count} hour ago","other":"%{count} hours ago"},"x_days":{"one":"%{count} day ago","other":"%{count} days ago"},"x_months":{"one":"%{count} month ago","other":"%{count} months ago"},"x_years":{"one":"%{count} year ago","other":"%{count} years ago"}},"later":{"x_days":{"one":"%{count} day later","other":"%{count} days later"},"x_months":{"one":"%{count} month later","other":"%{count} months later"},"x_years":{"one":"%{count} year later","other":"%{count} years later"}},"previous_month":"Previous Month","next_month":"Next Month","placeholder":"date","from_placeholder":"from date","to_placeholder":"to date"},"share":{"topic_html":"Topic: \u003cspan class=\"topic-title\"\u003e%{topicTitle}\u003c/span\u003e","post":"post #%{postNumber} by @%{username}","close":"close","twitter":"Share on Twitter","facebook":"Share on Facebook","email":"Send via email","url":"Copy and share URL"},"word_connector":{"comma":", "},"action_codes":{"public_topic":"Made this topic public %{when}","open_topic":"Converted this to a topic %{when}","private_topic":"Made this topic a personal message %{when}","split_topic":"Split this topic %{when}","invited_user":"Invited %{who} %{when}","invited_group":"Invited %{who} %{when}","user_left":"%{who} removed themselves from this message %{when}","removed_user":"Removed %{who} %{when}","removed_group":"Removed %{who} %{when}","autobumped":"Automatically bumped %{when}","tags_changed":"Tags updated %{when}","category_changed":"Category updated %{when}","autoclosed":{"enabled":"Closed %{when}","disabled":"Opened %{when}"},"closed":{"enabled":"Closed %{when}","disabled":"Opened %{when}"},"archived":{"enabled":"Archived %{when}","disabled":"Unarchived %{when}"},"pinned":{"enabled":"Pinned %{when}","disabled":"Unpinned %{when}"},"pinned_globally":{"enabled":"Pinned globally %{when}","disabled":"Unpinned %{when}"},"visible":{"enabled":"Listed %{when}","disabled":"Unlisted %{when}"},"banner":{"enabled":"Made this a banner %{when}. It will appear at the top of every page until it is dismissed by the user.","disabled":"Removed this banner %{when}. It will no longer appear at the top of every page."},"forwarded":"Forwarded the above email","chat":{"enabled":"%{who} enabled \u003cbutton class=\"btn-link open-chat\"\u003echat\u003c/button\u003e %{when}","disabled":"%{who} closed chat %{when}"},"assigned":"Assigned %{who} %{when}","assigned_group":"Assigned %{who} %{when}","assigned_to_post":"Assigned %{who} to \u003ca href='%{path}'\u003epost\u003c/a\u003e %{when}","assigned_group_to_post":"Assigned %{who} to \u003ca href='%{path}'\u003epost\u003c/a\u003e %{when}","unassigned":"Unassigned %{who} %{when}","unassigned_group":"Unassigned %{who} %{when}","unassigned_from_post":"Unassigned %{who} from \u003ca href='%{path}'\u003epost\u003c/a\u003e %{when}","unassigned_group_from_post":"Unassigned %{who} from \u003ca href='%{path}'\u003epost\u003c/a\u003e %{when}","reassigned":"Reassigned %{who} %{when}","reassigned_group":"Reassigned %{who} %{when}","details_change":"Changed assignment details for %{who} %{when}","note_change":"Changed assignment note for %{who} %{when}","status_change":"Changed assignment status for %{who} %{when}"},"topic_admin_menu":"topic actions","skip_to_main_content":"Skip to main content","skip_user_nav":"Skip to profile content","emails_are_disabled":"All outgoing email has been globally disabled by an administrator. No email notifications of any kind will be sent.","emails_are_disabled_non_staff":"Outgoing email has been disabled for non-staff users.","software_update_prompt":{"message":"We've updated this site, \u003cspan\u003eplease refresh\u003c/span\u003e, or you may experience unexpected behavior.","dismiss":"Dismiss"},"bootstrap_mode":"Bootstrap mode","themes":{"default_description":"Default","broken_theme_alert":"Your site may not work because a theme / component has errors.","error_caused_by":"Caused by '%{name}'. \u003ca target='blank' href='%{path}'\u003eClick here\u003c/a\u003e to update, reconfigure or disable.","only_admins":"(this message is only shown to site administrators)"},"broken_decorator_alert":"Posts may not display correctly because one of the post content decorators on your site raised an error.","s3":{"regions":{"ap_northeast_1":"Asia Pacific (Tokyo)","ap_northeast_2":"Asia Pacific (Seoul)","ap_east_1":"Asia Pacific (Hong Kong)","ap_south_1":"Asia Pacific (Mumbai)","ap_southeast_1":"Asia Pacific (Singapore)","ap_southeast_2":"Asia Pacific (Sydney)","ca_central_1":"Canada (Central)","cn_north_1":"China (Beijing)","cn_northwest_1":"China (Ningxia)","eu_central_1":"EU (Frankfurt)","eu_north_1":"EU (Stockholm)","eu_south_1":"EU (Milan)","eu_west_1":"EU (Ireland)","eu_west_2":"EU (London)","eu_west_3":"EU (Paris)","sa_east_1":"South America (São Paulo)","us_east_1":"US East (N. Virginia)","us_east_2":"US East (Ohio)","us_gov_east_1":"AWS GovCloud (US-East)","us_gov_west_1":"AWS GovCloud (US-West)","us_west_1":"US West (N. California)","us_west_2":"US West (Oregon)"}},"clear_input":"Clear input","edit":"edit the title and category of this topic","expand":"Expand","not_implemented":"That feature hasn't been implemented yet, sorry!","no_value":"No","yes_value":"Yes","ok_value":"OK","cancel_value":"Cancel","submit":"Submit","delete":"Delete","generic_error":"Sorry, an error has occurred.","generic_error_with_reason":"An error occurred: %{error}","multiple_errors":"Multiple errors occurred: %{errors}","sign_up":"Sign Up","log_in":"Log In","age":"Age","joined":"Joined","admin_title":"Admin","show_more":"show more","show_help":"options","links":"Links","links_lowercase":{"one":"link","other":"links"},"faq":"FAQ","guidelines":"Guidelines","privacy_policy":"Privacy Policy","privacy":"Privacy","tos":"Terms of Service","rules":"Rules","conduct":"Code of Conduct","mobile_view":"Mobile View","desktop_view":"Desktop View","now":"just now","read_more":"read more","more":"More","x_more":{"one":"%{count} More","other":"%{count} More"},"never":"never","every_30_minutes":"every 30 minutes","every_hour":"every hour","daily":"daily","weekly":"weekly","every_month":"every month","every_six_months":"every six months","max_of_count":"max of %{count}","character_count":{"one":"%{count} character","other":"%{count} characters"},"period_chooser":{"aria_label":"Filter by period"},"related_messages":{"title":"Related Messages","see_all":"See \u003ca href=\"%{path}\"\u003eall messages\u003c/a\u003e from @%{username}..."},"suggested_topics":{"title":"Suggested Topics","pm_title":"Suggested Messages"},"about":{"simple_title":"About","title":"About %{title}","stats":"Site Statistics","our_admins":"Our Admins","our_moderators":"Our Moderators","moderators":"Moderators","stat":{"all_time":"All Time","last_day":"Last 24 hours","last_7_days":"Last 7 days","last_30_days":"Last 30 days"},"like_count":"Likes","topic_count":"Topics","post_count":"Posts","user_count":"Sign-Ups","active_user_count":"Active Users","contact":"Contact Us","contact_info":"In the event of a critical issue or urgent matter affecting this site, please contact us at %{contact_info}.","chat_messages_count":"Chat Messages","chat_channels_count":"Chat Channels","chat_users_count":"Chat Users"},"bookmarked":{"title":"Bookmark","edit_bookmark":"Edit Bookmark","clear_bookmarks":"Clear Bookmarks","help":{"bookmark":"Click to bookmark this topic","edit_bookmark":"Click to edit the bookmark on a post in this topic","edit_bookmark_for_topic":"Click to edit the bookmark for this topic","unbookmark":"Click to remove all bookmarks in this topic","unbookmark_with_reminder":"Click to remove all bookmarks and reminders in this topic"}},"bookmarks":{"created":"You've bookmarked this post. %{name}","created_generic":"You've bookmarked this. %{name}","create":"Create bookmark","edit":"Edit bookmark","not_bookmarked":"bookmark this post","remove_reminder_keep_bookmark":"Remove reminder and keep bookmark","created_with_reminder":"You've bookmarked this post with a reminder %{date}. %{name}","created_with_reminder_generic":"You've bookmarked this with a reminder %{date}. %{name}","delete":"Delete Bookmark","confirm_delete":"Are you sure you want to delete this bookmark? The reminder will also be deleted.","confirm_clear":"Are you sure you want to clear all your bookmarks from this topic?","save":"Save","no_timezone":"You have not set a timezone yet. You will not be able to set reminders. Set one up \u003ca href=\"%{basePath}/my/preferences/profile\"\u003ein your profile\u003c/a\u003e.","invalid_custom_datetime":"The date and time you provided is invalid, please try again.","list_permission_denied":"You do not have permission to view this user's bookmarks.","no_user_bookmarks":"You have no bookmarked posts; bookmarks allow you to quickly refer to specific posts.","auto_delete_preference":{"label":"After you are notified","never":"Keep bookmark","when_reminder_sent":"Delete bookmark","on_owner_reply":"Delete bookmark, once I reply","clear_reminder":"Keep bookmark and clear reminder"},"search_placeholder":"Search bookmarks by name, topic title, or post content","search":"Search","reminders":{"today_with_time":"today at %{time}","tomorrow_with_time":"tomorrow at %{time}","at_time":"at %{date_time}","existing_reminder":"You have a reminder set for this bookmark which will be sent %{at_date_time}"}},"copy_codeblock":{"copied":"copied!","copy":"copy code to clipboard","fullscreen":"show code in full screen"},"drafts":{"label":"Drafts","label_with_count":"Drafts (%{count})","resume":"Resume","remove":"Remove","remove_confirmation":"Are you sure you want to delete this draft?","new_topic":"New topic draft","new_private_message":"New personal message draft","abandon":{"confirm":"You already have a draft in progress. What would you like to do with it?","yes_value":"Discard","no_value":"Resume editing"}},"topic_count_categories":{"one":"See %{count} new or updated topic","other":"See %{count} new or updated topics"},"topic_count_latest":{"one":"See %{count} new or updated topic","other":"See %{count} new or updated topics"},"topic_count_unseen":{"one":"See %{count} new or updated topic","other":"See %{count} new or updated topics"},"topic_count_unread":{"one":"See %{count} unread topic","other":"See %{count} unread topics"},"topic_count_new":{"one":"See %{count} new topic","other":"See %{count} new topics"},"preview":"preview","cancel":"cancel","deleting":"Deleting...","save":"Save Changes","saving":"Saving...","saved":"Saved!","upload":"Upload","uploading":"Uploading...","processing":"Processing...","uploading_filename":"Uploading: %{filename}...","processing_filename":"Processing: %{filename}...","clipboard":"clipboard","uploaded":"Uploaded!","pasting":"Pasting...","enable":"Enable","disable":"Disable","continue":"Continue","switch_to_anon":"Enter Anonymous Mode","switch_from_anon":"Exit Anonymous Mode","banner":{"close":"Dismiss this banner","edit":"Edit"},"pwa":{"install_banner":"Do you want to \u003ca href\u003einstall %{title} on this device?\u003c/a\u003e"},"choose_topic":{"none_found":"No topics found.","title":{"search":"Search for a Topic","placeholder":"type the topic title, url or id here"}},"choose_message":{"none_found":"No messages found.","title":{"search":"Search for a Message","placeholder":"type the message title, url or id here"}},"review":{"order_by":"Order by","date_filter":"Posted between","in_reply_to":"in reply to","explain":{"why":"explain why this item ended up in the queue","title":"Reviewable Scoring","formula":"Formula","subtotal":"Subtotal","total":"Total","min_score_visibility":"Minimum Score for Visibility","score_to_hide":"Score to Hide Post","take_action_bonus":{"name":"took action","title":"When a staff member chooses to take action the flag is given a bonus."},"user_accuracy_bonus":{"name":"user accuracy","title":"Users whose flags have been historically agreed with are given a bonus."},"trust_level_bonus":{"name":"trust level","title":"Reviewable items created by higher trust level users have a higher score."},"type_bonus":{"name":"type bonus","title":"Certain reviewable types can be assigned a bonus by staff to make them a higher priority."}},"stale_help":"This reviewable has been resolved by \u003cb\u003e%{username}\u003c/b\u003e.","claim_help":{"optional":"You can claim this item to prevent others from reviewing it.","required":"You must claim items before you can review them.","claimed_by_you":"You've claimed this item and can review it.","claimed_by_other":"This item can only be reviewed by \u003cb\u003e%{username}\u003c/b\u003e."},"claim":{"title":"claim this topic"},"unclaim":{"help":"remove this claim"},"awaiting_approval":"Awaiting Approval","delete":"Delete","settings":{"saved":"Saved","save_changes":"Save Changes","title":"Settings","priorities":{"title":"Reviewable Priorities"}},"moderation_history":"Moderation History","view_all":"View All","grouped_by_topic":"Grouped by Topic","none":"There are no items to review.","view_pending":"view pending","topic_has_pending":{"one":"This topic has \u003cb\u003e%{count}\u003c/b\u003e post pending approval","other":"This topic has \u003cb\u003e%{count}\u003c/b\u003e posts pending approval"},"title":"Review","topic":"Topic:","filtered_topic":"You have filtered to reviewable content in a single topic.","filtered_user":"User","filtered_reviewed_by":"Reviewed By","show_all_topics":"show all topics","deleted_post":"(post deleted)","deleted_user":"(user deleted)","user":{"bio":"Bio","website":"Website","username":"Username","email":"Email","name":"Name","fields":"Fields","reject_reason":"Reason"},"user_percentage":{"summary":{"one":"%{agreed}, %{disagreed}, %{ignored} (of last flag)","other":"%{agreed}, %{disagreed}, %{ignored} (of last %{count} flags)"},"agreed":{"one":"%{count}% agree","other":"%{count}% agree"},"disagreed":{"one":"%{count}% disagree","other":"%{count}% disagree"},"ignored":{"one":"%{count}% ignore","other":"%{count}% ignore"}},"topics":{"topic":"Topic","reviewable_count":"Count","reported_by":"Reported by","deleted":"[Topic Deleted]","original":"(original topic)","details":"details","unique_users":{"one":"%{count} user","other":"%{count} users"}},"replies":{"one":"%{count} reply","other":"%{count} replies"},"edit":"Edit","save":"Save","cancel":"Cancel","new_topic":"Approving this item will create a new topic","filters":{"all_categories":"(all categories)","type":{"title":"Type","all":"(all types)"},"minimum_score":"Minimum Score:","refresh":"Refresh","status":"Status","category":"Category","orders":{"score":"Score","score_asc":"Score (reverse)","created_at":"Created At","created_at_asc":"Created At (reverse)"},"priority":{"title":"Minimum Priority","any":"(any)","low":"Low","medium":"Medium","high":"High"}},"conversation":{"view_full":"view full conversation"},"scores":{"about":"This score is calculated based on the trust level of the reporter, the accuracy of their previous flags, and the priority of the item being reported.","score":"Score","date":"Report date","type":"Reason","status":"Status","submitted_by":"Reported by","reviewed_by":"Reviewed by","reviewed_timestamp":"Review date"},"statuses":{"pending":{"title":"Pending"},"approved":{"title":"Approved"},"approved_flag":{"title":"Flag approved"},"approved_user":{"title":"User approved"},"approved_post":{"title":"Post approved"},"rejected":{"title":"Rejected"},"rejected_flag":{"title":"Flag rejected"},"rejected_user":{"title":"User rejected"},"rejected_post":{"title":"Post rejected"},"ignored":{"title":"Flag ignored"},"deleted":{"title":"Topic or post deleted"},"reviewed":{"title":"All reviewed"},"all":{"title":"Everything"}},"context_question":{"is_this_post":"Is this post %{reviewable_human_score_types}?","delimiter":"or","something_else_wrong":"Is there something wrong with this post?"},"types":{"reviewable_flagged_post":{"title":"Flagged Post","flagged_by":"Flagged By"},"reviewable_queued_topic":{"title":"Queued Topic"},"reviewable_queued_post":{"title":"Queued Post"},"reviewable_user":{"title":"User"},"reviewable_post":{"title":"Post"},"chat_reviewable_message":{"title":"Flagged Chat Message"},"reviewable_akismet_post":{"title":"Akismet Flagged Post"},"reviewable_akismet_user":{"title":"Akismet Flagged User"}},"approval":{"title":"Post Needs Approval","description":"We've received your new post but it needs to be approved by a moderator before it will appear. Please be patient.","pending_posts":{"one":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e post pending.","other":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e posts pending."},"ok":"OK"},"example_username":"username","reject_reason":{"title":"Why are you rejecting this user?","send_email":"Send rejection email"},"transcript":{"view":"View previous messages transcript"}},"relative_time_picker":{"minutes":{"one":"minute","other":"minutes"},"hours":{"one":"hour","other":"hours"},"days":{"one":"day","other":"days"},"months":{"one":"month","other":"months"},"years":{"one":"year","other":"years"},"relative":"Relative"},"time_shortcut":{"now":"Now","in_one_hour":"In one hour","in_two_hours":"In two hours","later_today":"Later today","two_days":"Two days","next_business_day":"Next business day","tomorrow":"Tomorrow","post_local_date":"Date in post","later_this_week":"Later this week","this_weekend":"This weekend","start_of_next_business_week":"Monday","start_of_next_business_week_alt":"Next Monday","next_week":"Next week","two_weeks":"Two weeks","next_month":"Next month","two_months":"Two months","three_months":"Three months","four_months":"Four months","six_months":"Six months","one_year":"One year","forever":"Forever","relative":"Relative time","none":"None needed","never":"Never","last_custom":"Last custom datetime","custom":"Custom date and time","select_timeframe":"Select a timeframe"},"user_action":{"user_posted_topic":"\u003ca href='%{userUrl}'\u003e%{user}\u003c/a\u003e posted \u003ca href='%{topicUrl}'\u003ethe topic\u003c/a\u003e","you_posted_topic":"\u003ca href='%{userUrl}'\u003eYou\u003c/a\u003e posted \u003ca href='%{topicUrl}'\u003ethe topic\u003c/a\u003e","user_replied_to_post":"\u003ca href='%{userUrl}'\u003e%{user}\u003c/a\u003e replied to \u003ca href='%{postUrl}'\u003e%{post_number}\u003c/a\u003e","you_replied_to_post":"\u003ca href='%{userUrl}'\u003eYou\u003c/a\u003e replied to \u003ca href='%{postUrl}'\u003e%{post_number}\u003c/a\u003e","user_replied_to_topic":"\u003ca href='%{userUrl}'\u003e%{user}\u003c/a\u003e replied to \u003ca href='%{topicUrl}'\u003ethe topic\u003c/a\u003e","you_replied_to_topic":"\u003ca href='%{userUrl}'\u003eYou\u003c/a\u003e replied to \u003ca href='%{topicUrl}'\u003ethe topic\u003c/a\u003e","user_mentioned_user":"\u003ca href='%{user1Url}'\u003e%{user}\u003c/a\u003e mentioned \u003ca href='%{user2Url}'\u003e%{another_user}\u003c/a\u003e","user_mentioned_you":"\u003ca href='%{user1Url}'\u003e%{user}\u003c/a\u003e mentioned \u003ca href='%{user2Url}'\u003eyou\u003c/a\u003e","you_mentioned_user":"\u003ca href='%{user1Url}'\u003eYou\u003c/a\u003e mentioned \u003ca href='%{user2Url}'\u003e%{another_user}\u003c/a\u003e","posted_by_user":"Posted by \u003ca href='%{userUrl}'\u003e%{user}\u003c/a\u003e","posted_by_you":"Posted by \u003ca href='%{userUrl}'\u003eyou\u003c/a\u003e","sent_by_user":"Sent by \u003ca href='%{userUrl}'\u003e%{user}\u003c/a\u003e","sent_by_you":"Sent by \u003ca href='%{userUrl}'\u003eyou\u003c/a\u003e"},"directory":{"username":"Username","filter_name":"filter by username","title":"Users","likes_given":"Given","likes_received":"Received","topics_entered":"Viewed","topics_entered_long":"Topics Viewed","time_read":"Time Read","topic_count":"Topics","topic_count_long":"Topics Created","post_count":"Replies","post_count_long":"Replies Posted","no_results":"No results were found.","days_visited":"Visits","days_visited_long":"Days Visited","posts_read":"Read","posts_read_long":"Posts Read","last_updated":"Last Updated:","total_rows":{"one":"%{count} user","other":"%{count} users"},"edit_columns":{"title":"Edit Directory Columns","save":"Save","reset_to_default":"Reset to default"},"group":{"all":"all groups"},"sort":{"label":"Sort by %{criteria}"}},"group_histories":{"actions":{"change_group_setting":"Change group setting","add_user_to_group":"Add user","remove_user_from_group":"Remove user","make_user_group_owner":"Make owner","remove_user_as_group_owner":"Revoke owner"}},"groups":{"member_added":"Added","member_requested":"Requested at","add_members":{"title":"Add Users to %{group_name}","description":"Enter a list of users you want to invite to the group or paste in a comma separated list:","usernames_placeholder":"usernames","usernames_or_emails_placeholder":"usernames or emails","notify_users":"Notify users","set_owner":"Set users as owners of this group"},"requests":{"title":"Requests","reason":"Reason","accept":"Accept","accepted":"accepted","deny":"Deny","denied":"denied","undone":"request undone","handle":"handle membership request","undo":"Undo"},"manage":{"title":"Manage","name":"Name","full_name":"Full Name","add_members":"Add Users","invite_members":"Invite","delete_member_confirm":"Remove '%{username}' from the '%{group}' group?","profile":{"title":"Profile"},"interaction":{"title":"Interaction","posting":"Posting","notification":"Notification"},"email":{"title":"Email","status":"Synchronized %{old_emails} / %{total_emails} emails via IMAP.","enable_smtp":"Enable SMTP","enable_imap":"Enable IMAP","test_settings":"Test Settings","save_settings":"Save Settings","last_updated":"Last updated:","last_updated_by":"by","settings_required":"All settings are required, please fill in all fields before validation.","smtp_settings_valid":"SMTP settings valid.","smtp_title":"SMTP","smtp_instructions":"When you enable SMTP for the group, all outbound emails sent from the group's inbox will be sent via the SMTP settings specified here instead of the mail server configured for other emails sent by your forum.","imap_title":"IMAP","imap_additional_settings":"Additional Settings","imap_instructions":"When you enable IMAP for the group, emails are synced between the group inbox and the provided IMAP server and mailbox. SMTP must be enabled with valid and tested credentials before IMAP can be enabled. The email username and password used for SMTP will be used for IMAP. For more information see \u003ca target=\"_blank\" href=\"https://meta.discourse.org/t/imap-support-for-group-inboxes/160588\"\u003efeature announcement on Discourse Meta\u003c/a\u003e.","imap_alpha_warning":"Warning: This is an alpha-stage feature. Only Gmail is officially supported. Use at your own risk!","imap_settings_valid":"IMAP settings valid.","smtp_disable_confirm":"If you disable SMTP, all SMTP and IMAP settings will be reset and the associated functionality will be disabled. Are you sure you want to continue?","imap_disable_confirm":"If you disable IMAP all IMAP settings will be reset and the associated functionality will be disabled. Are you sure you want to continue?","imap_mailbox_not_selected":"You must select a Mailbox for this IMAP configuration or no mailboxes will be synced!","prefill":{"title":"Prefill with settings for:","gmail":"GMail"},"credentials":{"title":"Credentials","smtp_server":"SMTP Server","smtp_port":"SMTP Port","smtp_ssl":"Use SSL for SMTP","imap_server":"IMAP Server","imap_port":"IMAP Port","imap_ssl":"Use SSL for IMAP","username":"Username","password":"Password"},"settings":{"title":"Settings","allow_unknown_sender_topic_replies":"Allow unknown sender topic replies.","allow_unknown_sender_topic_replies_hint":"Allows unknown senders to reply to group topics. If this is not enabled, replies from email addresses not already invited to the topic will create a new topic.","from_alias":"From Alias","from_alias_hint":"Alias to use as the from address when sending group SMTP emails. Note this may not be supported by all mail providers, please consult your mail provider's documentation."},"mailboxes":{"synchronized":"Synchronized Mailbox","none_found":"No mailboxes were found in this email account.","disabled":"Disabled"}},"membership":{"title":"Membership","access":"Access"},"categories":{"title":"Categories","long_title":"Category default notifications","description":"When users are added to this group, their category notification settings will be set to these defaults. Afterwards, they can change them.","watched_categories_instructions":"Automatically watch all topics in these categories. Group members will be notified of all new posts and topics, and a count of new posts will also appear next to the topic.","tracked_categories_instructions":"Automatically track all topics in these categories. A count of new posts will appear next to the topic.","watching_first_post_categories_instructions":"Users will be notified of the first post in each new topic in these categories.","regular_categories_instructions":"If these categories are muted, they will be unmuted for group members. Users will be notified if they are mentioned or someone replies to them.","muted_categories_instructions":"Users will not be notified of anything about new topics in these categories, and they will not appear on the categories or latest topics pages."},"tags":{"title":"Tags","long_title":"Tags default notifications","description":"When users are added to this group, their tag notification settings will be set to these defaults. Afterwards, they can change them.","watched_tags_instructions":"Automatically watch all topics with these tags. Group members will be notified of all new posts and topics, and a count of new posts will also appear next to the topic.","tracked_tags_instructions":"Automatically track all topics with these tags. A count of new posts will appear next to the topic.","watching_first_post_tags_instructions":"Users will be notified of the first post in each new topic with these tags.","regular_tags_instructions":"If these tags are muted, they will be unmuted for group members. Users will be notified if they are mentioned or someone replies to them.","muted_tags_instructions":"Users will not be notified of anything about new topics with these tags, and they will not appear in latest."},"logs":{"title":"Logs","when":"When","action":"Action","acting_user":"Acting user","target_user":"Target user","subject":"Subject","details":"Details","from":"From","to":"To"}},"permissions":{"title":"Permissions","none":"There are no categories associated with this group.","description":"Members of this group can access these categories"},"public_admission":"Allow users to join the group freely (Requires publicly visible group)","public_exit":"Allow users to leave the group freely","empty":{"posts":"There are no posts by members of this group.","members":"There are no members in this group.","requests":"There are no membership requests for this group.","mentions":"There are no mentions of this group.","messages":"There are no messages for this group.","topics":"There are no topics by members of this group.","logs":"There are no logs for this group."},"add":"Add","join":"Join","leave":"Leave","request":"Request","message":"Message","confirm_leave":"Are you sure you want to leave this group?","allow_membership_requests":"Allow users to send membership requests to group owners (Requires publicly visible group)","membership_request_template":"Custom template to display to users when sending a membership request","membership_request":{"submit":"Submit Request","title":"Request to join @%{group_name}","reason":"Let the group owners know why you belong in this group"},"membership":"Membership","name":"Name","group_name":"Group name","user_count":"Users","bio":"About Group","selector_placeholder":"enter username","owner":"owner","index":{"title":"Groups","all":"All Groups","empty":"There are no visible groups.","filter":"Filter by group type","owner_groups":"Groups I own","close_groups":"Closed Groups","automatic_groups":"Automatic Groups","automatic":"Automatic","closed":"Closed","public":"Public","private":"Private","public_groups":"Public Groups","my_groups":"My Groups","group_type":"Group type","is_group_user":"Member","is_group_owner":"Owner","search_results":"Search results will appear below."},"title":{"one":"Group","other":"Groups"},"activity":"Activity","members":{"title":"Members","filter_placeholder_admin":"username or email","filter_placeholder":"username","remove_member":"Remove Member","remove_member_description":"Remove \u003cb\u003e%{username}\u003c/b\u003e from this group","make_owner":"Make Owner","make_owner_description":"Make \u003cb\u003e%{username}\u003c/b\u003e an owner of this group","remove_owner":"Remove as Owner","remove_owner_description":"Remove \u003cb\u003e%{username}\u003c/b\u003e as an owner of this group","make_primary":"Make Primary","make_primary_description":"Make this the primary group for \u003cb\u003e%{username}\u003c/b\u003e","remove_primary":"Remove as Primary","remove_primary_description":"Remove this as the primary group for \u003cb\u003e%{username}\u003c/b\u003e","remove_members":"Remove Members","remove_members_description":"Remove selected users from this group","make_owners":"Make Owners","make_owners_description":"Make selected users owners of this group","remove_owners":"Remove Owners","remove_owners_description":"Remove selected users as owners of this group","make_all_primary":"Make All Primary","make_all_primary_description":"Make this the primary group for all selected users","remove_all_primary":"Remove as Primary","remove_all_primary_description":"Remove this group as primary","status":"Status","owner":"Owner","primary":"Primary","forbidden":"You're not allowed to view the members.","no_filter_matches":"No members match that search."},"topics":"Topics","posts":"Posts","aria_post_number":"%{title} - post #%{postNumber}","mentions":"Mentions","messages":"Messages","notification_level":"Default notification level for group messages","alias_levels":{"mentionable":"Who can @mention this group?","messageable":"Who can message this group?","nobody":"Nobody","only_admins":"Only admins","mods_and_admins":"Only moderators and Admins","members_mods_and_admins":"Only group members, moderators and admins","owners_mods_and_admins":"Only group owners, moderators and admins","everyone":"Everyone"},"notifications":{"watching":{"title":"Watching","description":"You will be notified of every new post in every message, and a count of new replies will be shown."},"watching_first_post":{"title":"Watching First Post","description":"You will be notified of new messages in this group but not replies to the messages."},"tracking":{"title":"Tracking","description":"You will be notified if someone mentions your @name or replies to you, and a count of new replies will be shown."},"regular":{"title":"Normal","description":"You will be notified if someone mentions your @name or replies to you."},"muted":{"title":"Muted","description":"You will not be notified of anything about messages in this group."}},"flair_url":"Avatar Flair Image","flair_upload_description":"Use square images no smaller than 20px by 20px.","flair_bg_color":"Avatar Flair Background Color","flair_bg_color_placeholder":"(Optional) Hex color value","flair_color":"Avatar Flair Color","flair_color_placeholder":"(Optional) Hex color value","flair_preview_icon":"Preview Icon","flair_preview_image":"Preview Image","flair_type":{"icon":"Select an icon","image":"Upload an image"},"default_notifications":{"modal_title":"User default notifications","modal_description":"Would you like to apply this change historically? This will change preferences for %{count} existing users.","modal_yes":"Yes","modal_no":"No, only apply change going forward"}},"user_action_groups":{"1":"Likes","2":"Likes","3":"Bookmarks","4":"Topics","5":"Replies","6":"Responses","7":"Mentions","9":"Quotes","11":"Edits","12":"Sent Items","13":"Inbox","14":"Pending","15":"Drafts"},"categories":{"all":"all categories","all_subcategories":"all","no_subcategory":"none","category":"Category","category_list":"Display category list","reorder":{"title":"Reorder Categories","title_long":"Reorganize the category list","save":"Save Order","apply_all":"Apply","position":"Position"},"posts":"Posts","topics":"Topics","latest":"Latest","subcategories":"Subcategories","muted":"Muted categories","topic_sentence":{"one":"%{count} topic","other":"%{count} topics"},"topic_stat":{"one":"%{number} / %{unit}","other":"%{number} / %{unit}"},"topic_stat_unit":{"week":"week","month":"month"},"topic_stat_all_time":{"one":"%{number} total","other":"%{number} total"},"topic_stat_sentence_week":{"one":"%{count} new topic in the past week.","other":"%{count} new topics in the past week."},"topic_stat_sentence_month":{"one":"%{count} new topic in the past month.","other":"%{count} new topics in the past month."},"n_more":"Categories (%{count} more)..."},"ip_lookup":{"title":"IP Address Lookup","hostname":"Hostname","location":"Location","location_not_found":"(unknown)","organisation":"Organization","phone":"Phone","other_accounts":"Other accounts with this IP address:","delete_other_accounts":"Delete %{count}","username":"username","trust_level":"TL","read_time":"read time","topics_entered":"topics entered","post_count":"# posts","confirm_delete_other_accounts":"Are you sure you want to delete these accounts?","powered_by":"using \u003ca href='https://maxmind.com'\u003eMaxMindDB\u003c/a\u003e","copied":"copied"},"user_fields":{"none":"(select an option)","required":"Please enter a value for \"%{name}\"","same_as_password":"Your password should not be repeated in other fields."},"user":{"said":"%{username}:","profile":"Profile","mute":"Mute","edit":"Edit Preferences","download_archive":{"title":"Export your data","description":"Download an archive of your account activity and preferences.","button_text":"Request archive","confirm":"Do you really want to download an archive of your account activity and preferences?","success":"We've started collecting your archive, you will receive a message when the process is complete.","rate_limit_error":"Account archives can be downloaded once per day, please try again tomorrow."},"new_private_message":"New Message","private_message":"Message","private_messages":"Messages","user_notifications":{"filters":{"filter_by":"Filter By","all":"All","read":"Read","unread":"Unread","unseen":"Unseen"},"ignore_duration_title":"Ignore User","ignore_duration_username":"Username","ignore_duration_when":"Duration:","ignore_duration_save":"Ignore","ignore_duration_note":"Please note that all ignores are automatically removed after the ignore duration expires.","ignore_duration_time_frame_required":"Please select a time frame","ignore_no_users":"You have no ignored users.","ignore_option":"Ignored","ignore_option_title":"You will not receive notifications related to this user and all of their topics and replies will be hidden.","add_ignored_user":"Add...","mute_option":"Muted","mute_option_title":"You will not receive any notifications related to this user.","normal_option":"Normal","normal_option_title":"You will be notified if this user replies to you, quotes you, or mentions you."},"notification_schedule":{"title":"Notification Schedule","label":"Enable custom notification schedule","tip":"Outside of these hours your notifications will be paused.","midnight":"Midnight","none":"None","monday":"Monday","tuesday":"Tuesday","wednesday":"Wednesday","thursday":"Thursday","friday":"Friday","saturday":"Saturday","sunday":"Sunday","to":"to"},"activity_stream":"Activity","read":"Read","read_help":"Recently read topics","preferences":"Preferences","feature_topic_on_profile":{"open_search":"Select a New Topic","title":"Select a Topic","search_label":"Search for Topic by title","save":"Save","clear":{"title":"Clear","warning":"Are you sure you want to clear your featured topic?"}},"use_current_timezone":"Use Current Timezone","profile_hidden":"This user's public profile is hidden.","expand_profile":"Expand","sr_expand_profile":"Expand profile details","collapse_profile":"Collapse","sr_collapse_profile":"Collapse profile details","bookmarks":"Bookmarks","bio":"About me","timezone":"Timezone","invited_by":"Invited By","trust_level":"Trust Level","notifications":"Notifications","statistics":"Stats","desktop_notifications":{"label":"Live Notifications","not_supported":"Notifications are not supported on this browser. Sorry.","perm_default":"Turn On Notifications","perm_denied_btn":"Permission Denied","perm_denied_expl":"You denied permission for notifications. Allow notifications via your browser settings.","disable":"Disable Notifications","enable":"Enable Notifications","each_browser_note":"Note: You have to change this setting on every browser you use. All notifications will be disabled if you pause notifications from user menu, regardless of this setting.","consent_prompt":"Do you want live notifications when people reply to your posts?"},"dismiss":"Dismiss","dismiss_notifications":"Dismiss All","dismiss_notifications_tooltip":"Mark all unread notifications as read","dismiss_bookmarks_tooltip":"Mark all unread bookmark reminders as read","dismiss_messages_tooltip":"Mark all unread personal messages notifications as read","no_likes_title":"You haven't received any likes yet","no_likes_body":"You will be notified here any time someone likes one of your posts so you can see what others are finding valuable. Others will see the same when you like their posts too! \u003cbr\u003e\u003cbr\u003e Notifications for likes are never emailed to you, but you can tune how you receive notifications about likes on the site in your \u003ca href='%{preferencesUrl}'\u003enotification preferences\u003c/a\u003e.\n","no_messages_title":"You don’t have any messages","no_messages_body":"Need to have a direct personal conversation with someone, outside the normal conversational flow? Message them by selecting their avatar and using the %{icon} message button.\u003cbr\u003e\u003cbr\u003e If you need help, you can \u003ca href='%{aboutUrl}'\u003emessage a staff member\u003c/a\u003e.\n","no_bookmarks_title":"You haven’t bookmarked anything yet","no_bookmarks_body":"Start bookmarking posts with the %{icon} button and they will be listed here for easy reference. You can schedule a reminder too!\n","no_bookmarks_search":"No bookmarks found with the provided search query.","no_notifications_title":"You don’t have any notifications yet","no_notifications_body":"You will be notified in this panel about activity directly relevant to you, including replies to your topics and posts, when someone \u003cb\u003e@mentions\u003c/b\u003e you or quotes you, and replies to topics you are watching. Notifications will also be sent to your email when you haven’t logged in for a while. \u003cbr\u003e\u003cbr\u003e Look for the %{icon} to decide which specific topics, categories and tags you want to be notified about. For more, see your \u003ca href='%{preferencesUrl}'\u003enotification preferences\u003c/a\u003e.\n","no_other_notifications_title":"You don’t have any other notifications yet","no_other_notifications_body":"You will be notified in this panel about other kinds of activity that may be relevant to you - for example, when someone links to or edits one of your posts.\n","no_notifications_page_title":"You don’t have any notifications yet","no_notifications_page_body":"You will be notified about activity directly relevant to you, including replies to your topics and posts, when someone \u003cb\u003e@mentions\u003c/b\u003e you or quotes you, and replies to topics you are watching. Notifications will also be sent to your email when you haven’t logged in for a while. \u003cbr\u003e\u003cbr\u003e Look for the %{icon} to decide which specific topics, categories and tags you want to be notified about. For more, see your \u003ca href='%{preferencesUrl}'\u003enotification preferences\u003c/a\u003e.\n","dynamic_favicon":"Show counts on browser icon","skip_new_user_tips":{"description":"Skip new user onboarding tips and badges"},"reset_seen_user_tips":"Show user tips again","theme_default_on_all_devices":"Make this the default theme on all my devices","color_scheme_default_on_all_devices":"Set default color scheme(s) on all my devices","color_scheme":"Color Scheme","color_schemes":{"default_description":"Theme default","disable_dark_scheme":"Same as regular","dark_instructions":"You can preview the dark mode color scheme by toggling your device's dark mode.","undo":"Reset","regular":"Regular","dark":"Dark mode","default_dark_scheme":"(site default)"},"dark_mode":"Dark Mode","dark_mode_enable":"Enable automatic dark mode color scheme","text_size_default_on_all_devices":"Make this the default text size on all my devices","allow_private_messages":"Allow other users to send me personal messages and chat direct messages","external_links_in_new_tab":"Open all external links in a new tab","enable_quoting":"Enable quote reply for highlighted text","enable_defer":"Enable defer to mark topics unread","experimental_sidebar":{"enable":"Enable sidebar","options":"Options","categories_section":"Categories Section","categories_section_instruction":"Selected categories will be displayed under Sidebar's categories section.","tags_section":"Tags Section","tags_section_instruction":"Selected tags will be displayed under Sidebar's tags section.","navigation_section":"Navigation","list_destination_instruction":"When there's new content in the sidebar...","list_destination_default":"use the default link and show a badge for new items","list_destination_unread_new":"link to unread/new and show a count of new items"},"change":"change","featured_topic":"Featured Topic","moderator":"%{user} is a moderator","admin":"%{user} is an admin","moderator_tooltip":"This user is a moderator","admin_tooltip":"This user is an admin","silenced_tooltip":"This user is silenced","suspended_notice":"This user is suspended until %{date}.","suspended_permanently":"This user is suspended.","suspended_reason":"Reason: ","github_profile":"GitHub","email_activity_summary":"Activity Summary","mailing_list_mode":{"label":"Mailing list mode","enabled":"Enable mailing list mode","instructions":"This setting overrides the activity summary.\u003cbr /\u003e\nMuted topics and categories are not included in these emails.\n","individual":"Send an email for every new post","individual_no_echo":"Send an email for every new post except my own","many_per_day":"Send me an email for every new post (about %{dailyEmailEstimate} per day)","few_per_day":"Send me an email for every new post (about 2 per day)","warning":"Mailing list mode enabled. Email notification settings are overridden."},"tag_settings":"Tags","watched_tags":"Watched","watched_tags_instructions":"You will automatically watch all topics with these tags. You will be notified of all new posts and topics, and a count of new posts will also appear next to the topic.","tracked_tags":"Tracked","tracked_tags_instructions":"You will automatically track all topics with these tags. A count of new posts will appear next to the topic.","muted_tags":"Muted","muted_tags_instructions":"You will not be notified of anything about new topics with these tags, and they will not appear in latest.","watched_categories":"Watched","watched_categories_instructions":"You will automatically watch all topics in these categories. You will be notified of all new posts and topics, and a count of new posts will also appear next to the topic.","tracked_categories":"Tracked","tracked_categories_instructions":"You will automatically track all topics in these categories. A count of new posts will appear next to the topic.","watched_first_post_categories":"Watching First Post","watched_first_post_categories_instructions":"You will be notified of the first post in each new topic in these categories.","watched_first_post_tags":"Watching First Post","watched_first_post_tags_instructions":"You will be notified of the first post in each new topic with these tags.","muted_categories":"Muted","muted_categories_instructions":"You will not be notified of anything about new topics in these categories, and they will not appear on the categories or latest pages.","muted_categories_instructions_dont_hide":"You will not be notified of anything about new topics in these categories.","regular_categories":"Normal","regular_categories_instructions":"You will see these categories in the “Latest” and “Top” topic lists.","no_category_access":"As a moderator you have limited category access, save is disabled.","delete_account":"Delete My Account","delete_account_confirm":"Are you sure you want to permanently delete your account? This action cannot be undone!","deleted_yourself":"Your account has been deleted successfully.","delete_yourself_not_allowed":"Please contact a staff member if you wish your account to be deleted.","unread_message_count":"Messages","admin_delete":"Delete","users":"Users","muted_users":"Muted","muted_users_instructions":"Suppress all notifications, personal messages, and chat direct messages from these users.","allowed_pm_users":"Allowed","allowed_pm_users_instructions":"Only allow personal messages or chat direct messages from these users.","allow_private_messages_from_specific_users":"Only allow specific users to send me personal messages or chat direct messages","ignored_users":"Ignored","ignored_users_instructions":"Suppress all posts, messages, notifications, personal messages, and chat direct messages from these users.","tracked_topics_link":"Show","automatically_unpin_topics":"Automatically unpin topics when I reach the bottom.","apps":"Apps","revoke_access":"Revoke Access","undo_revoke_access":"Undo Revoke Access","api_approved":"Approved:","api_last_used_at":"Last used at:","theme":"Theme","save_to_change_theme":"Theme will be updated after you click \"%{save_text}\"","home":"Default Home Page","staged":"Staged","staff_counters":{"flags_given":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e helpful flag","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e helpful flags"},"flagged_posts":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e flagged post","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e flagged posts"},"deleted_posts":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e deleted post","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e deleted posts"},"suspensions":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e suspension","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e suspensions"},"warnings_received":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e warning","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e warnings"},"rejected_posts":{"one":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e rejected post","other":"\u003cspan class=\"%{className}\"\u003e%{count}\u003c/span\u003e rejected posts"}},"messages":{"all":"all inboxes","inbox":"Inbox","personal":"Personal","latest":"Latest","sent":"Sent","unread":"Unread","unread_with_count":{"one":"Unread (%{count})","other":"Unread (%{count})"},"new":"New","new_with_count":{"one":"New (%{count})","other":"New (%{count})"},"archive":"Archive","groups":"My Groups","move_to_inbox":"Move to Inbox","move_to_archive":"Archive","failed_to_move":"Failed to move selected messages (perhaps your network is down)","tags":"Tags","all_tags":"All Tags","warnings":"Official Warnings","read_more_in_group":"Want to read more? Browse other messages in %{groupLink}.","read_more":"Want to read more? Browse other messages in \u003ca href='%{basePath}/u/%{username}/messages'\u003epersonal messages\u003c/a\u003e.","assigned_title":"Assigned (%{count})","assigned":"Assigned"},"preferences_nav":{"account":"Account","security":"Security","profile":"Profile","emails":"Emails","notifications":"Notifications","tracking":"Tracking","categories":"Categories","users":"Users","tags":"Tags","interface":"Interface","apps":"Apps","sidebar":"Sidebar"},"change_password":{"success":"(email sent)","in_progress":"(sending email)","error":"(error)","emoji":"lock emoji","action":"Send Password Reset Email","set_password":"Set Password","choose_new":"Choose a new password","choose":"Choose a password"},"second_factor_backup":{"title":"Two-Factor Backup Codes","regenerate":"Regenerate","disable":"Disable","enable":"Create backup codes","enable_long":"Add backup codes","not_enabled":"You haven't created any backup codes yet.","manage":{"one":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e backup code remaining.","other":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e backup codes remaining."},"copy_to_clipboard":"Copy to Clipboard","copy_to_clipboard_error":"Error copying data to Clipboard","copied_to_clipboard":"Copied to Clipboard","download_backup_codes":"Download backup codes","remaining_codes":{"one":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e backup code remaining.","other":"You have \u003cstrong\u003e%{count}\u003c/strong\u003e backup codes remaining."},"use":"Use a backup code","enable_prerequisites":"You must enable a primary two-factor method before generating backup codes.","codes":{"title":"Backup Codes Generated","description":"Each of these backup codes can only be used once. Keep them somewhere safe but accessible."}},"second_factor":{"title":"Two-Factor Authentication","enable":"Manage Two-Factor Authentication","disable_all":"Disable All","forgot_password":"Forgot password?","confirm_password_description":"Please confirm your password to continue","name":"Name","label":"Code","rate_limit":"Please wait before trying another authentication code.","enable_description":"Scan this QR code in a supported app (\u003ca href=\"https://www.google.com/search?q=authenticator+apps+for+android\" target=\"_blank\"\u003eAndroid\u003c/a\u003e – \u003ca href=\"https://www.google.com/search?q=authenticator+apps+for+ios\" target=\"_blank\"\u003eiOS\u003c/a\u003e) and enter your authentication code.\n","disable_description":"Please enter the authentication code from your app","show_key_description":"Enter manually","short_description":"Protect your account with one-time use security codes.\n","extended_description":"Two-factor authentication adds extra security to your account by requiring a one-time token in addition to your password. Tokens can be generated on \u003ca href=\"https://www.google.com/search?q=authenticator+apps+for+android\" target='_blank'\u003eAndroid\u003c/a\u003e and \u003ca href=\"https://www.google.com/search?q=authenticator+apps+for+ios\"\u003eiOS\u003c/a\u003e devices.\n","oauth_enabled_warning":"Please note that social logins will be disabled once two-factor authentication has been enabled on your account.","use":"Use Authenticator app","enforced_notice":"You are required to enable two-factor authentication before accessing this site.","disable":"Disable","disable_confirm":"Are you sure you want to disable two-factor authentication?","delete":"Delete","delete_confirm_header":"These Token-Based Authenticators and Physical Security Keys will be deleted:","delete_confirm_instruction":"To confirm, type \u003cstrong\u003e%{confirm}\u003c/strong\u003e in the box below.","delete_single_confirm_title":"Deleting an authenticator","delete_single_confirm_message":"You are deleting %{name}. You can't undo this action. If you change your mind, you have to register this authenticator again.","delete_backup_codes_confirm_title":"Deleting backup codes","delete_backup_codes_confirm_message":"You are deleting backup codes. You can't undo this action. If you change your mind, you have to regenerate backup codes.","save":"Save","edit":"Edit","edit_title":"Edit Authenticator","edit_description":"Authenticator Name","enable_security_key_description":"When you have your \u003ca href=\"https://www.google.com/search?q=hardware+security+key\" target=\"_blank\"\u003ehardware security key\u003c/a\u003e or compatible mobile device prepared, press the Register button below.\n","totp":{"title":"Token-Based Authenticators","add":"Add Authenticator","default_name":"My Authenticator","name_and_code_required_error":"You must provide a name and the code from your authenticator app."},"security_key":{"register":"Register","title":"Physical Security Keys","add":"Add Physical Security Key","default_name":"Main Security Key","iphone_default_name":"iPhone","android_default_name":"Android","not_allowed_error":"The security key registration process either timed out or was cancelled.","already_added_error":"You have already registered this security key. You don’t have to register it again.","edit":"Edit Physical Security Key","save":"Save","edit_description":"Physical Security Key Name","name_required_error":"You must provide a name for your security key."}},"change_about":{"title":"Change About Me","error":"There was an error changing this value."},"change_username":{"title":"Change Username","confirm":"Are you absolutely sure you want to change your username?","taken":"Sorry, that username is taken.","invalid":"That username is invalid. It must only include numbers and letters"},"add_email":{"title":"Add Email","add":"add"},"change_email":{"title":"Change Email","taken":"Sorry, that email is not available.","error":"There was an error changing your email. Perhaps that address is already in use?","success":"We've sent an email to that address. Please follow the confirmation instructions.","success_via_admin":"We've sent an email to that address. The user will need to follow the confirmation instructions in the email.","success_staff":"We've sent an email to your current address. Please follow the confirmation instructions.","back_to_preferences":"Back to preferences"},"change_avatar":{"title":"Change your profile picture","gravatar":"\u003ca href='//%{gravatarBaseUrl}%{gravatarLoginUrl}' target='_blank'\u003e%{gravatarName}\u003c/a\u003e, based on","gravatar_title":"Change your avatar on %{gravatarName}'s website","gravatar_failed":"We could not find a %{gravatarName} with that email address.","refresh_gravatar_title":"Refresh your %{gravatarName}","letter_based":"System assigned profile picture","uploaded_avatar":"Custom picture","uploaded_avatar_empty":"Add a custom picture","upload_title":"Upload your picture","image_is_not_a_square":"Warning: we've cropped your image; width and height were not equal.","logo_small":"Site's small logo. Used by default.","use_custom":"Or upload a custom avatar:"},"change_profile_background":{"title":"Profile Header","instructions":"Profile headers will be centered and have a default width of 1110px."},"change_card_background":{"title":"User Card Background","instructions":"Background images will be centered and have a default width of 590px."},"change_featured_topic":{"title":"Featured Topic","instructions":"A link to this topic will be on your user card, and profile."},"email":{"title":"Email","primary":"Primary Email","secondary":"Secondary Emails","primary_label":"primary","unconfirmed_label":"unconfirmed","resend_label":"resend confirmation email","resending_label":"sending...","resent_label":"email sent","update_email":"Change Email","set_primary":"Set Primary Email","destroy":"Remove Email","add_email":"Add Alternate Email","auth_override_instructions":"Email can be updated from authentication provider.","no_secondary":"No secondary emails","instructions":"Never shown to the public.","admin_note":"Note: An admin user changing another non-admin user's email indicates the user has lost access to their original email account, so a reset password email will be sent to their new address. The user's email will not change until they complete the reset password process.","ok":"We will email you to confirm","required":"Please enter an email address","invalid":"Please enter a valid email address","authenticated":"Your email has been authenticated by %{provider}","invite_auth_email_invalid":"Your invitation email does not match the email authenticated by %{provider}","authenticated_by_invite":"Your email has been authenticated by the invitation","frequency":{"one":"We'll only email you if we haven't seen you in the last minute.","other":"We'll only email you if we haven't seen you in the last %{count} minutes."}},"associated_accounts":{"title":"Associated Accounts","connect":"Connect","revoke":"Revoke","cancel":"Cancel","not_connected":"(not connected)","confirm_modal_title":"Connect %{provider} Account","confirm_description":{"disconnect":"Your existing %{provider} account '%{account_description}' will be disconnected.","account_specific":"Your %{provider} account '%{account_description}' will be used for authentication.","generic":"Your %{provider} account will be used for authentication."}},"name":{"title":"Name","instructions":"your full name (optional)","instructions_required":"Your full name","required":"Please enter a name","too_short":"Your name is too short","ok":"Your name looks good"},"username":{"title":"Username","instructions":"unique, no spaces, short","short_instructions":"People can mention you as @%{username}","available":"Your username is available","not_available":"Not available. Try %{suggestion}?","not_available_no_suggestion":"Not available","too_short":"Your username is too short","too_long":"Your username is too long","checking":"Checking username availability...","prefilled":"Email matches this registered username","required":"Please enter a username","edit":"Edit username"},"locale":{"title":"Interface language","instructions":"User interface language. It will change when you refresh the page.","default":"(default)","any":"any"},"password_confirmation":{"title":"Password Again"},"invite_code":{"title":"Invite Code","instructions":"Account registration requires an invite code"},"auth_tokens":{"title":"Recently Used Devices","details":"Details","log_out_all":"Log out all","not_you":"Not you?","show_all":"Show all (%{count})","show_few":"Show fewer","was_this_you":"Was this you?","was_this_you_description":"If it wasn’t you, we recommend you change your password and log out everywhere.","browser_and_device":"%{browser} on %{device}","secure_account":"Secure my Account","latest_post":"You last posted…","device_location":"\u003cspan class=\"auth-token-device\"\u003e%{device}\u003c/span\u003e \u0026ndash; \u003cspan title=\"IP: %{ip}\"\u003e%{location}\u003c/span\u003e","browser_active":"%{browser} | \u003cspan class=\"active\"\u003eactive now\u003c/span\u003e","browser_last_seen":"%{browser} | %{date}"},"last_posted":"Last Post","last_seen":"Seen","created":"Joined","log_out":"Log Out","location":"Location","website":"Web Site","email_settings":"Email","hide_profile_and_presence":"Hide my public profile and presence features","enable_physical_keyboard":"Enable physical keyboard support on iPad","text_size":{"title":"Text Size","smallest":"Smallest","smaller":"Smaller","normal":"Normal","larger":"Larger","largest":"Largest"},"title_count_mode":{"title":"Background page title displays count of:","notifications":"New notifications","contextual":"New page content"},"bookmark_after_notification":{"title":"After a bookmark reminder notification is sent:"},"like_notification_frequency":{"title":"Notify when liked","always":"Always","first_time_and_daily":"First time a post is liked and daily","first_time":"First time a post is liked","never":"Never"},"email_previous_replies":{"title":"Include previous replies at the bottom of emails","unless_emailed":"unless previously sent","always":"always","never":"never"},"email_digests":{"title":"When I don’t visit here, send me an email summary of popular topics and replies","every_30_minutes":"every 30 minutes","every_hour":"hourly","daily":"daily","weekly":"weekly","every_month":"every month","every_six_months":"every six months"},"email_level":{"title":"Email me when I am quoted, replied to, my @username is mentioned, or when there is new activity in my watched categories, tags or topics","always":"always","only_when_away":"only when away","never":"never"},"email_messages_level":"Email me when I am sent a personal message","include_tl0_in_digests":"Include content from new users in summary emails","email_in_reply_to":"Include an excerpt of replied to post in emails","other_settings":"Other","categories_settings":"Categories","topics_settings":"Topics","new_topic_duration":{"label":"Consider topics new when","not_viewed":"I haven't viewed them yet","last_here":"created since I was here last","after_1_day":"created in the last day","after_2_days":"created in the last 2 days","after_1_week":"created in the last week","after_2_weeks":"created in the last 2 weeks"},"auto_track_topics":"Automatically track topics I enter","auto_track_options":{"never":"never","immediately":"immediately","after_30_seconds":"after 30 seconds","after_1_minute":"after 1 minute","after_2_minutes":"after 2 minutes","after_3_minutes":"after 3 minutes","after_4_minutes":"after 4 minutes","after_5_minutes":"after 5 minutes","after_10_minutes":"after 10 minutes"},"notification_level_when_replying":"When I post in a topic, set that topic to","invited":{"title":"Invites","pending_tab":"Pending","pending_tab_with_count":"Pending (%{count})","expired_tab":"Expired","expired_tab_with_count":"Expired (%{count})","redeemed_tab":"Redeemed","redeemed_tab_with_count":"Redeemed (%{count})","invited_via":"Invitation","invited_via_link":"link %{key} (%{count} / %{max} redeemed)","groups":"Groups","topic":"Topic","sent":"Created/Last Sent","expires_at":"Expires","edit":"Edit","remove":"Remove","copy_link":"Get Link","reinvite":"Resend Email","reinvited":"Invite re-sent","removed":"Removed","search":"type to search invites...","user":"Invited User","none":"No invites to display.","truncated":{"one":"Showing the first invite.","other":"Showing the first %{count} invites."},"redeemed":"Redeemed Invites","redeemed_at":"Redeemed","pending":"Pending Invites","topics_entered":"Topics Viewed","posts_read_count":"Posts Read","expired":"This invite has expired.","remove_all":"Remove Expired Invites","removed_all":"All Expired Invites removed!","remove_all_confirm":"Are you sure you want to remove all expired invites?","reinvite_all":"Resend All Invites","reinvite_all_confirm":"Are you sure you want to resend all invites?","reinvited_all":"All Invites Sent!","time_read":"Read Time","days_visited":"Days Visited","account_age_days":"Account age in days","create":"Invite","generate_link":"Create Invite Link","link_generated":"Here's your invite link!","valid_for":"Invite link is only valid for this email address: %{email}","single_user":"Invite by email","multiple_user":"Invite by link","invite_link":{"title":"Invite Link","success":"Invite link generated successfully!","error":"There was an error generating Invite link"},"invite":{"new_title":"Create Invite","edit_title":"Edit Invite","instructions":"Share this link to instantly grant access to this site:","copy_link":"copy link","expires_in_time":"Expires in %{time}","expired_at_time":"Expired at %{time}","show_advanced":"Show Advanced Options","hide_advanced":"Hide Advanced Options","restrict":"Restrict to","restrict_email":"Restrict to email","restrict_domain":"Restrict to domain","email_or_domain_placeholder":"name@example.com or example.com","max_redemptions_allowed":"Max uses","add_to_groups":"Add to groups","invite_to_topic":"Arrive at topic","expires_at":"Expire after","custom_message":"Optional personal message","send_invite_email":"Save and Send Email","send_invite_email_instructions":"Restrict invite to email to send an invite email","save_invite":"Save Invite","invite_saved":"Invite saved."},"bulk_invite":{"none":"No invitations to display on this page.","text":"Bulk Invite","instructions":"\u003cp\u003eInvite a list of users to get your community going quickly. Prepare a \u003ca href=\"https://en.wikipedia.org/wiki/Comma-separated_values\" target=\"_blank\"\u003eCSV file\u003c/a\u003e containing at least one row per email address of users you want to invite. The following comma separated information can be provided if you want to add people to groups or send them to a specific topic the first time they sign in.\u003c/p\u003e\n\u003cpre\u003ejohn@smith.com,first_group_name;second_group_name,topic_id\u003c/pre\u003e\n\u003cp\u003eEvery email address in your uploaded CSV file will be sent an invitation, and you will be able to manage it later.\u003c/p\u003e\n","progress":"Uploaded %{progress}%...","success":"File uploaded successfully. You will be notified via message when the process is complete.","error":"Sorry, file should be CSV format."}},"password":{"title":"Password","too_short":"Your password is too short.","common":"That password is too common.","same_as_username":"Your password is the same as your username.","same_as_email":"Your password is the same as your email.","ok":"Your password looks good.","instructions":"at least %{count} characters","required":"Please enter a password"},"summary":{"title":"Summary","stats":"Stats","time_read":"read time","time_read_title":"%{duration} (all time)","recent_time_read":"recent read time","recent_time_read_title":"%{duration} (in the last 60 days)","topic_count":{"one":"topic created","other":"topics created"},"post_count":{"one":"post created","other":"posts created"},"likes_given":{"one":"given","other":"given"},"likes_received":{"one":"received","other":"received"},"days_visited":{"one":"day visited","other":"days visited"},"topics_entered":{"one":"topic viewed","other":"topics viewed"},"posts_read":{"one":"post read","other":"posts read"},"bookmark_count":{"one":"bookmark","other":"bookmarks"},"top_replies":"Top Replies","no_replies":"No replies yet.","more_replies":"More Replies","top_topics":"Top Topics","no_topics":"No topics yet.","more_topics":"More Topics","top_badges":"Top Badges","no_badges":"No badges yet.","more_badges":"More Badges","top_links":"Top Links","no_links":"No links yet.","most_liked_by":"Most Liked By","most_liked_users":"Most Liked","most_replied_to_users":"Most Replied To","no_likes":"No likes yet.","top_categories":"Top Categories","topics":"Topics","replies":"Replies"},"ip_address":{"title":"Last IP Address"},"registration_ip_address":{"title":"Registration IP Address"},"avatar":{"title":"Profile Picture","header_title":"profile, messages, bookmarks and preferences","name_and_description":"%{name} - %{description}","edit":"Edit Profile Picture"},"title":{"title":"Title","none":"(none)","instructions":"appears after your username"},"flair":{"title":"Flair","none":"(none)","instructions":"icon displayed next to your profile picture"},"status":{"title":"Custom Status","not_set":"Not set"},"primary_group":{"title":"Primary Group","none":"(none)"},"filters":{"all":"All"},"stream":{"posted_by":"Posted by","sent_by":"Sent by","private_message":"message","the_topic":"the topic"},"no_assignments_title":"You don’t have any assignments yet","no_assignments_body":"Your assigned topics and messages will be listed here. You will also receive a periodic reminder notification of your assignments, which you can adjust in your \u003ca href='%{preferencesUrl}'\u003euser preferences\u003c/a\u003e. \u003cbr\u003e\u003cbr\u003e To assign a topic or message to yourself or to someone else, look for the %{icon} assign button at the bottom.\n","dismiss_assigned_tooltip":"Mark all unread assign notifications as read","assigned_to_group":"assigned to %{group_name}","assigned_to_you":"assigned to you","date_of_birth":{"user_title":"Today is your birthday!","title":"Today is my birthday!","label":"Date of Birth"},"anniversary":{"user_title":"Today is the anniversary of the day you joined our community!","title":"Today is the anniversary of the day I joined this community!"}},"user_status":{"save":"Save","set_custom_status":"Set custom status","what_are_you_doing":"What are you doing?","pause_notifications":"Pause notifications","remove_status":"Remove status"},"user_tips":{"primary":"Got it!","secondary":"don't show me these tips","first_notification":{"title":"Your first notification!","content":"Notifications are used to keep you up to date with what is happening in the community."},"topic_timeline":{"title":"Topic timeline","content":"Scroll quickly through a post using the topic timeline."},"post_menu":{"title":"Post menu","content":"See how else you can interact with the post by clicking the three dots!"},"topic_notification_levels":{"title":"You are now following this topic","content":"Look for this bell to adjust your notification preferences for specific topics or whole categories."},"suggested_topics":{"title":"Keep reading!","content":"Here are some topics we think you might like to read next."}},"loading":"Loading...","errors":{"prev_page":"while trying to load","reasons":{"network":"Network Error","server":"Server Error","forbidden":"Access Denied","unknown":"Error","not_found":"Page Not Found"},"desc":{"network":"Please check your connection.","network_fixed":"Looks like it's back.","server":"Error code: %{status}","forbidden":"You're not allowed to view that.","not_found":"Oops, the application tried to load a URL that doesn't exist.","unknown":"Something went wrong."},"buttons":{"back":"Go Back","again":"Try Again","fixed":"Load Page"}},"modal":{"close":"close","dismiss_error":"Dismiss error"},"close":"Close","assets_changed_confirm":"This site just received a software upgrade. Get the latest version now?","logout":"You were logged out.","refresh":"Refresh","home":"Home","read_only_mode":{"enabled":"This site is in read only mode. Please continue to browse, but replying, likes, and other actions are disabled for now.","login_disabled":"Login is disabled while the site is in read only mode.","logout_disabled":"Logout is disabled while the site is in read only mode."},"staff_writes_only_mode":{"enabled":"This site is in staff only mode. Please continue to browse, but replying, likes, and other actions are limited to staff members only."},"logs_error_rate_notice":{},"learn_more":"learn more...","mute":"Mute","unmute":"Unmute","last_post":"Posted","local_time":"Local Time","time_read":"Read","time_read_recently":"%{time_read} recently","time_read_tooltip":"%{time_read} total time read","time_read_recently_tooltip":"%{time_read} total time read (%{recent_time_read} in the last 60 days)","last_reply_lowercase":"last reply","replies_lowercase":{"one":"reply","other":"replies"},"signup_cta":{"sign_up":"Sign Up","hide_session":"Maybe later","hide_forever":"no thanks","hidden_for_session":"OK, we'll ask you tomorrow. You can always use 'Log In' to create an account, too.","intro":"Hello! Looks like you’re enjoying the discussion, but you haven’t signed up for an account yet.","value_prop":"Tired of scrolling through the same posts? When you create an account you’ll always come back to where you left off. With an account you can also be notified of new replies, save bookmarks, and use likes to thank others. We can all work together to make this community great. :heart:"},"summary":{"enabled_description":"You're viewing a summary of this topic: the most interesting posts as determined by the community.","description":{"one":"There is \u003cb\u003e%{count}\u003c/b\u003e reply.","other":"There are \u003cb\u003e%{count}\u003c/b\u003e replies."},"enable":"Summarize This Topic","disable":"Show All Posts","short_label":"Summarize","short_title":"Show a summary of this topic: the most interesting posts as determined by the community"},"deleted_filter":{"enabled_description":"This topic contains deleted posts, which have been hidden.","disabled_description":"Deleted posts in the topic are shown.","enable":"Hide Deleted Posts","disable":"Show Deleted Posts"},"private_message_info":{"title":"Message","invite":"Invite Others...","edit":"Add or Remove...","remove":"Remove...","add":"Add...","leave_message":"Do you really want to leave this message?","remove_allowed_user":"Do you really want to remove %{name} from this message?","remove_allowed_group":"Do you really want to remove %{name} from this message?","leave":"Leave","remove_group":"Remove group","remove_user":"Remove user"},"email":"Email","username":"Username","last_seen":"Seen","created":"Created","created_lowercase":"created","trust_level":"Trust Level","search_hint":"username, email or IP address","create_account":{"header_title":"Welcome!","subheader_title":"Let's create your account","disclaimer":"By registering, you agree to the \u003ca href='%{privacy_link}' target='blank'\u003eprivacy policy\u003c/a\u003e and \u003ca href='%{tos_link}' target='blank'\u003eterms of service\u003c/a\u003e.","title":"Create your account","failed":"Something went wrong, perhaps this email is already registered, try the forgot password link","associate":"Already have an account? \u003ca href='%{associate_link}'\u003eLog In\u003c/a\u003e to link your %{provider} account."},"forgot_password":{"title":"Password Reset","action":"I forgot my password","invite":"Enter your username or email address, and we'll send you a password reset email.","invite_no_username":"Enter your email address, and we'll send you a password reset email.","reset":"Reset Password","complete_username":"If an account matches the username \u003cb\u003e%{username}\u003c/b\u003e, you should receive an email with instructions on how to reset your password shortly.","complete_email":"If an account matches \u003cb\u003e%{email}\u003c/b\u003e, you should receive an email with instructions on how to reset your password shortly.","complete_username_found":"We found an account that matches the username \u003cb\u003e%{username}\u003c/b\u003e. You should receive an email with instructions on how to reset your password shortly.","complete_email_found":"We found an account that matches \u003cb\u003e%{email}\u003c/b\u003e. You should receive an email with instructions on how to reset your password shortly.","complete_username_not_found":"No account matches the username \u003cb\u003e%{username}\u003c/b\u003e","complete_email_not_found":"No account matches \u003cb\u003e%{email}\u003c/b\u003e","help":"Email not arriving? Be sure to check your spam folder first.\u003cp\u003eNot sure which email address you used? Enter an email address and we’ll let you know if it exists here.\u003c/p\u003e\u003cp\u003eIf you no longer have access to the email address on your account, please contact \u003ca href='%{basePath}/about'\u003eour helpful staff.\u003c/a\u003e\u003c/p\u003e","button_ok":"OK","button_help":"Help"},"email_login":{"link_label":"Email me a login link","button_label":"with email","login_link":"Skip the password; email me a login link","emoji":"lock emoji","complete_username":"If an account matches the username \u003cb\u003e%{username}\u003c/b\u003e, you should receive an email with a login link shortly.","complete_email":"If an account matches \u003cb\u003e%{email}\u003c/b\u003e, you should receive an email with a login link shortly.","complete_username_found":"We found an account that matches the username \u003cb\u003e%{username}\u003c/b\u003e, you should receive an email with a login link shortly.","complete_email_found":"We found an account that matches \u003cb\u003e%{email}\u003c/b\u003e, you should receive an email with a login link shortly.","complete_username_not_found":"No account matches the username \u003cb\u003e%{username}\u003c/b\u003e","complete_email_not_found":"No account matches \u003cb\u003e%{email}\u003c/b\u003e","confirm_title":"Continue to %{site_name}","logging_in_as":"Logging in as %{email}","confirm_button":"Finish Login"},"login":{"header_title":"Welcome back","subheader_title":"Log in to your account","title":"Log in","username":"User","password":"Password","show_password":"Show","hide_password":"Hide","show_password_title":"Show password","hide_password_title":"Hide password","second_factor_title":"Two-Factor Authentication","second_factor_description":"Please enter the authentication code from your app:","second_factor_backup":"Log in using a backup code","second_factor_backup_title":"Two-Factor Backup","second_factor_backup_description":"Please enter one of your backup codes:","second_factor":"Log in using Authenticator app","security_key_description":"When you have your physical security key or compatible mobile device prepared press the Authenticate with Security Key button below.","security_key_alternative":"Try another way","security_key_authenticate":"Authenticate with Security Key","security_key_not_allowed_error":"The security key authentication process either timed out or was cancelled.","security_key_no_matching_credential_error":"No matching credentials could be found in the provided security key.","security_key_support_missing_error":"Your current device or browser does not support the use of security keys. Please use a different method.","email_placeholder":"Email / Username","caps_lock_warning":"Caps Lock is on","error":"Unknown error","cookies_error":"Your browser seems to have cookies disabled. You might not be able to log in without enabling them first.","rate_limit":"Please wait before trying to log in again.","blank_username":"Please enter your email or username.","blank_username_or_password":"Please enter your email or username, and password.","reset_password":"Reset Password","logging_in":"Signing In...","previous_sign_up":"Already have an account?","or":"Or","authenticating":"Authenticating...","awaiting_activation":"Your account is awaiting activation, use the forgot password link to issue another activation email.","awaiting_approval":"Your account has not been approved by a staff member yet. You will be sent an email when it is approved.","requires_invite":"Sorry, access to this forum is by invite only.","not_activated":"You can't log in yet. We previously sent an activation email to you at \u003cb\u003e%{sentTo}\u003c/b\u003e. Please follow the instructions in that email to activate your account.","not_allowed_from_ip_address":"You can't log in from that IP address.","admin_not_allowed_from_ip_address":"You can't log in as admin from that IP address.","resend_activation_email":"Click here to send the activation email again.","omniauth_disallow_totp":"Your account has two-factor authentication enabled. Please log in with your password.","resend_title":"Resend Activation Email","change_email":"Change Email Address","provide_new_email":"Provide a new address and we'll resend your confirmation email.","submit_new_email":"Update Email Address","sent_activation_email_again":"We sent another activation email to you at \u003cb\u003e%{currentEmail}\u003c/b\u003e. It might take a few minutes for it to arrive; be sure to check your spam folder.","sent_activation_email_again_generic":"We sent another activation email. It might take a few minutes for it to arrive; be sure to check your spam folder.","to_continue":"Please Log In","preferences":"You need to be logged in to change your user preferences.","not_approved":"Your account hasn't been approved yet. You will be notified by email when you are ready to log in.","google_oauth2":{"name":"Google","title":"Sign in with Google","sr_title":"Sign in with Google"},"twitter":{"name":"Twitter","title":"Sign in with Twitter","sr_title":"Sign in with Twitter"},"instagram":{"name":"Instagram","title":"Log in with Instagram","sr_title":"Log in with Instagram"},"facebook":{"name":"Facebook","title":"Log in with Facebook","sr_title":"Log in with Facebook"},"github":{"name":"GitHub","title":"Log in with GitHub","sr_title":"Log in with GitHub"},"discord":{"name":"Discord","title":"Log in with Discord","sr_title":"Log in with Discord"},"second_factor_toggle":{"totp":"Use an authenticator app instead","backup_code":"Use a backup code instead","security_key":"Use a security key instead"},"oauth2_basic":{"name":"OAuth 2"},"oidc":{"name":"OpenID Connect","title":"with OpenID Connect","message":"Authenticating with OpenID Connect"}},"invites":{"accept_title":"Invitation","emoji":"envelope emoji","welcome_to":"Welcome to %{site_name}!","invited_by":"You were invited by:","social_login_available":"You'll also be able to sign in with any social login using that email.","your_email":"Your account email address is \u003cb\u003e%{email}\u003c/b\u003e.","accept_invite":"Accept Invitation","success":"Your account has been created and you're now logged in.","name_label":"Name","password_label":"Password","existing_user_can_redeem":"Redeem your invitation to a topic or group."},"password_reset":{"continue":"Continue to %{site_name}"},"emoji_set":{"apple_international":"Apple/International","google":"Google","twitter":"Twitter","win10":"Win10","google_classic":"Google Classic","facebook_messenger":"Facebook Messenger"},"category_page_style":{"categories_only":"Categories Only","categories_with_featured_topics":"Categories with Featured Topics","categories_and_latest_topics":"Categories and Latest Topics","categories_and_latest_topics_created_date":"Categories and Latest Topics (sort by topic created date)","categories_and_top_topics":"Categories and Top Topics","categories_boxes":"Boxes with Subcategories","categories_boxes_with_topics":"Boxes with Featured Topics","subcategories_with_featured_topics":"Subcategories with Featured Topics"},"shortcut_modifier_key":{"shift":"Shift","ctrl":"Ctrl","alt":"Alt","enter":"Enter"},"conditional_loading_section":{"loading":"Loading..."},"category_row":{"topic_count":{"one":"%{count} topic in this category","other":"%{count} topics in this category"},"plus_subcategories_title":{"one":"%{name} and one subcategory","other":"%{name} and %{count} subcategories"},"plus_subcategories":{"one":"+ %{count} subcategory","other":"+ %{count} subcategories"}},"select_kit":{"delete_item":"Delete %{name}","filter_by":"Filter by: %{name}","select_to_filter":"Select a value to filter","default_header_text":"Select...","no_content":"No matches found","results_count":{"one":"%{count} result","other":"%{count} results"},"filter_placeholder":"Search...","filter_placeholder_with_any":"Search or create...","create":"Create: '%{content}'","max_content_reached":{"one":"You can only select %{count} item.","other":"You can only select %{count} items."},"min_content_not_reached":{"one":"Select at least %{count} item.","other":"Select at least %{count} items."},"components":{"tag_drop":{"filter_for_more":"Filter for more..."},"categories_admin_dropdown":{"title":"Manage categories"}}},"date_time_picker":{"from":"From","to":"To"},"emoji_picker":{"filter_placeholder":"Search for emoji","smileys_\u0026_emotion":"Smileys and Emotion","people_\u0026_body":"People and Body","animals_\u0026_nature":"Animals and Nature","food_\u0026_drink":"Food and Drink","travel_\u0026_places":"Travel and Places","activities":"Activities","objects":"Objects","symbols":"Symbols","flags":"Flags","recent":"Recently used","default_tone":"No skin tone","light_tone":"Light skin tone","medium_light_tone":"Medium light skin tone","medium_tone":"Medium skin tone","medium_dark_tone":"Medium dark skin tone","dark_tone":"Dark skin tone","default":"Custom emojis"},"shared_drafts":{"title":"Shared Drafts","notice":"This topic is only visible to those who can publish shared drafts.","destination_category":"Destination Category","publish":"Publish Shared Draft","confirm_publish":"Are you sure you want to publish this draft?","publishing":"Publishing Topic..."},"composer":{"emoji":"Emoji :)","more_emoji":"more...","options":"Options","whisper":"whisper","unlist":"unlisted","add_warning":"This is an official warning.","toggle_whisper":"Toggle Whisper","toggle_unlisted":"Toggle Unlisted","posting_not_on_topic":"Which topic do you want to reply to?","saved_local_draft_tip":"saved locally","similar_topics":"Your topic is similar to...","drafts_offline":"drafts offline","edit_conflict":"edit conflict","esc":"esc","esc_label":"Click or press Esc to dismiss","ok_proceed":"Ok, proceed","group_mentioned_limit":{"one":"\u003cb\u003eWarning!\u003c/b\u003e You mentioned \u003ca href='%{group_link}'\u003e%{group}\u003c/a\u003e, however this group has more members than the administrator configured mention limit of %{count} user. Nobody will be notified.","other":"\u003cb\u003eWarning!\u003c/b\u003e You mentioned \u003ca href='%{group_link}'\u003e%{group}\u003c/a\u003e, however this group has more members than the administrator configured mention limit of %{count} users. Nobody will be notified."},"group_mentioned":{"one":"By mentioning %{group}, you are about to notify \u003ca href='%{group_link}'\u003e%{count} person\u003c/a\u003e – are you sure?","other":"By mentioning %{group}, you are about to notify \u003ca href='%{group_link}'\u003e%{count} people\u003c/a\u003e – are you sure?"},"cannot_see_mention":{"category":"You mentioned @%{username} but they won't be notified because they do not have access to this category. You will need to add them to a group that has access to this category.","private":"You mentioned @%{username} but they won't be notified because they are unable to see this personal message. You will need to invite them to this personal message.","muted_topic":"You mentioned @%{username} but they won't be notified because they muted this topic.","not_allowed":"You mentioned @%{username} but they won't be notified because they were not invited to this topic."},"cannot_see_group_mention":{"not_mentionable":"You cannot mention group @%{group}.","some_not_allowed":{"one":"You mentioned @%{group} but only %{count} member will be notified because the other members are unable to see this personal message. You will need to invite them to this personal message.","other":"You mentioned @%{group} but only %{count} members will be notified because the other members are unable to see this personal message. You will need to invite them to this personal message."},"not_allowed":"You mentioned @%{group} but none of its members will be notified because they are unable to see this personal message. You will need to invite them to this personal message."},"here_mention":{"one":"By mentioning \u003cb\u003e@%{here}\u003c/b\u003e, you are about to notify %{count} user – are you sure?","other":"By mentioning \u003cb\u003e@%{here}\u003c/b\u003e, you are about to notify %{count} users – are you sure?"},"duplicate_link":"It looks like your link to \u003cb\u003e%{domain}\u003c/b\u003e was already posted in the topic by \u003cb\u003e@%{username}\u003c/b\u003e in \u003ca href='%{post_url}'\u003ea reply on %{ago}\u003c/a\u003e – are you sure you want to post it again?","duplicate_link_same_user":"It looks like you already posted a link to \u003cb\u003e%{domain}\u003c/b\u003e in this topic in \u003ca href='%{post_url}'\u003ea reply on %{ago}\u003c/a\u003e - are you sure you want to post it again?","reference_topic_title":"RE: %{title}","error":{"title_missing":"Title is required","title_too_short":{"one":"Title must be at least %{count} character","other":"Title must be at least %{count} characters"},"title_too_long":{"one":"Title can't be more than %{count} character","other":"Title can't be more than %{count} characters"},"post_missing":"Post can’t be empty","post_length":{"one":"Post must be at least %{count} character","other":"Post must be at least %{count} characters"},"try_like":"Have you tried the %{heart} button?","category_missing":"You must choose a category","tags_missing":{"one":"You must choose at least %{count} tag","other":"You must choose at least %{count} tags"},"topic_template_not_modified":"Please add details and specifics to your topic by editing the topic template."},"save_edit":"Save Edit","overwrite_edit":"Overwrite Edit","reply":"Reply","cancel":"Cancel","create_topic":"Create Topic","create_pm":"Message","create_whisper":"Whisper","create_shared_draft":"Create Shared Draft","edit_shared_draft":"Edit Shared Draft","title":"Or press %{modifier}Enter","users_placeholder":"Add users or groups","title_placeholder":"What is this discussion about in one brief sentence?","title_or_link_placeholder":"Type title, or paste a link here","edit_reason_placeholder":"why are you editing?","topic_featured_link_placeholder":"Enter link shown with title.","remove_featured_link":"Remove link from topic.","reply_placeholder":"Type here. Use Markdown, BBCode, or HTML to format. Drag or paste images.","reply_placeholder_no_images":"Type here. Use Markdown, BBCode, or HTML to format.","reply_placeholder_choose_category":"Select a category before typing here.","view_new_post":"View your new post.","saving":"Saving","saved":"Saved!","saved_draft":"Post draft in progress. Tap to resume.","uploading":"Uploading...","show_preview":"show preview","hide_preview":"hide preview","quote_post_title":"Quote whole post","bold_label":"B","bold_title":"Strong","bold_text":"strong text","italic_label":"I","italic_title":"Emphasis","italic_text":"emphasized text","link_title":"Hyperlink","link_description":"enter link description here","link_dialog_title":"Insert Hyperlink","link_optional_text":"optional title","link_url_placeholder":"Paste a URL or type to search topics","blockquote_title":"Blockquote","blockquote_text":"Blockquote","code_title":"Preformatted text","code_text":"indent preformatted text by 4 spaces","paste_code_text":"type or paste code here","upload_title":"Upload","upload_description":"enter upload description here","olist_title":"Numbered List","ulist_title":"Bulleted List","list_item":"List item","toggle_direction":"Toggle Direction","help":"Markdown Editing Help","collapse":"minimize the composer panel","open":"open the composer panel","abandon":"close composer and discard draft","enter_fullscreen":"enter fullscreen composer","exit_fullscreen":"exit fullscreen composer","exit_fullscreen_prompt":"Press \u003ckbd\u003eESC\u003c/kbd\u003e to exit full screen","show_toolbar":"show composer toolbar","hide_toolbar":"hide composer toolbar","modal_ok":"OK","modal_cancel":"Cancel","cant_send_pm":"Sorry, you can't send a message to %{username}.","yourself_confirm":{"title":"Did you forget to add recipients?","body":"Right now this message is only being sent to yourself!"},"slow_mode":{"error":"This topic is in slow mode. You already posted recently; you can post again in %{timeLeft}."},"user_not_seen_in_a_while":{"single":"The person you are messaging, \u003cb\u003e%{usernames}\u003c/b\u003e, hasn’t been seen here in a very long time – %{time_ago}. They may not receive your message. You may wish to seek out alternate methods of contacting %{usernames}.","multiple":"The following people you are messaging: \u003cb\u003e%{usernames}\u003c/b\u003e, haven’t been seen here in a very long time – %{time_ago}. They may not receive your message. You may wish to seek out alternate methods of contacting them."},"admin_options_title":"Optional staff settings for this topic","composer_actions":{"reply":"Reply","draft":"Draft","edit":"Edit","reply_to_post":{"label":"Reply to a post by %{postUsername}","desc":"Reply to a specific post"},"reply_as_new_topic":{"label":"Reply as linked topic","desc":"Create a new topic linked to this topic","confirm":"You have a new topic draft saved, which will be overwritten if you create a linked topic."},"reply_as_new_group_message":{"label":"Reply as new group message","desc":"Create new message starting with same recipients"},"reply_to_topic":{"label":"Reply to topic","desc":"Reply to the topic, not any specific post"},"toggle_whisper":{"label":"Toggle whisper","desc":"Whispers are only visible to staff members"},"create_topic":{"label":"New Topic"},"shared_draft":{"label":"Shared Draft","desc":"Draft a topic that will only be visible to allowed users"},"toggle_topic_bump":{"label":"Toggle topic bump","desc":"Reply without changing latest reply date"}},"reload":"Reload","ignore":"Ignore","image_alt_text":{"aria_label":"Alt text for image"},"delete_image_button":"Delete Image","details_title":"Summary","details_text":"This text will be hidden"},"notifications":{"tooltip":{"regular":{"one":"%{count} unseen notification","other":"%{count} unseen notifications"},"message":{"one":"%{count} unread message","other":"%{count} unread messages"},"high_priority":{"one":"%{count} unread high priority notification","other":"%{count} unread high priority notifications"},"new_message_notification":{"one":"%{count} new message notification","other":"%{count} new message notifications"},"new_reviewable":{"one":"%{count} new reviewable","other":"%{count} new reviewables"}},"title":"notifications of @name mentions, replies to your posts and topics, messages, etc","none":"Unable to load notifications at this time.","empty":"No notifications found.","post_approved":"Your post was approved","reviewable_items":"items requiring review","watching_first_post_label":"New Topic","user_moved_post":"%{username} moved","mentioned":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","group_mentioned":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","quoted":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","bookmark_reminder":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","replied":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","posted":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","watching_category_or_tag":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","edited":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","liked":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","liked_2":"\u003cspan class='double-user'\u003e%{username}, %{username2}\u003c/span\u003e %{description}","liked_many":{"one":"\u003cspan class='multi-user'\u003e%{username}, %{username2} and %{count} other\u003c/span\u003e %{description}","other":"\u003cspan class='multi-user'\u003e%{username}, %{username2} and %{count} others\u003c/span\u003e %{description}"},"liked_by_2_users":"%{username}, %{username2}","liked_by_multiple_users":{"one":"%{username}, %{username2} and %{count} other","other":"%{username}, %{username2} and %{count} others"},"liked_consolidated_description":{"one":"liked %{count} of your posts","other":"liked %{count} of your posts"},"liked_consolidated":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","private_message":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","invited_to_private_message":"\u003cp\u003e\u003cspan\u003e%{username}\u003c/span\u003e %{description}","invited_to_topic":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","invitee_accepted":"\u003cspan\u003e%{username}\u003c/span\u003e accepted your invitation","invitee_accepted_your_invitation":"accepted your invitation","moved_post":"\u003cspan\u003e%{username}\u003c/span\u003e moved %{description}","linked":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","granted_badge":"Earned '%{description}'","topic_reminder":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","watching_first_post":"\u003cspan\u003eNew Topic\u003c/span\u003e %{description}","membership_request_accepted":"Membership accepted in '%{group_name}'","membership_request_consolidated":{"one":"%{count} open membership request for '%{group_name}'","other":"%{count} open membership requests for '%{group_name}'"},"reaction":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","reaction_2":"\u003cspan\u003e%{username}, %{username2}\u003c/span\u003e %{description}","votes_released":"%{description} - completed","new_features":"New features available!","dismiss_confirmation":{"body":{"default":{"one":"Are you sure? You have %{count} important notification.","other":"Are you sure? You have %{count} important notifications."},"bookmarks":{"one":"Are you sure? You have %{count} unread bookmark reminder.","other":"Are you sure? You have %{count} unread bookmark reminders."},"messages":{"one":"Are you sure? You have %{count} unread personal message.","other":"Are you sure? You have %{count} unread personal messages."},"assigns":{"one":"Are you sure? You have %{count} unread assign notification.","other":"Are you sure? You have %{count} unread assign notifications."}},"dismiss":"Dismiss","cancel":"Cancel"},"group_message_summary":{"one":"%{count} message in your %{group_name} inbox","other":"%{count} messages in your %{group_name} inbox"},"popup":{"mentioned":"%{username} mentioned you in \"%{topic}\" - %{site_title}","group_mentioned":"%{username} mentioned you in \"%{topic}\" - %{site_title}","quoted":"%{username} quoted you in \"%{topic}\" - %{site_title}","replied":"%{username} replied to you in \"%{topic}\" - %{site_title}","posted":"%{username} posted in \"%{topic}\" - %{site_title}","private_message":"%{username} sent you a personal message in \"%{topic}\" - %{site_title}","linked":"%{username} linked to your post from \"%{topic}\" - %{site_title}","watching_first_post":"%{username} created a new topic \"%{topic}\" - %{site_title}","confirm_title":"Notifications enabled - %{site_title}","confirm_body":"Success! Notifications have been enabled.","custom":"Notification from %{username} on %{site_title}","chat_mention":{"direct":"mentioned you in \"%{channel}\"","direct_html":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003ementioned you in \"%{channel}\"\u003c/span\u003e","other_plain":"mentioned %{identifier} in \"%{channel}\"","other_html":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003ementioned %{identifier} in \"%{channel}\"\u003c/span\u003e"},"direct_message_chat_mention":{"direct":"mentioned you in personal chat","direct_html":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003ementioned you in personal chat\u003c/span\u003e","other_plain":"mentioned %{identifier} in personal chat","other_html":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003ementioned %{identifier} in personal chat\u003c/span\u003e"},"chat_message":"New chat message","chat_quoted":"%{username} quoted your chat message","assigned":"%{username} assigned you"},"titles":{"mentioned":"mentioned","replied":"new reply","quoted":"quoted","edited":"edited","liked":"new like","private_message":"new private message","invited_to_private_message":"invited to private message","invitee_accepted":"invite accepted","posted":"new post","watching_category_or_tag":"new post","moved_post":"post moved","linked":"linked","bookmark_reminder":"bookmark reminder","bookmark_reminder_with_name":"bookmark reminder - %{name}","granted_badge":"badge granted","invited_to_topic":"invited to topic","group_mentioned":"group mentioned","group_message_summary":"new group messages","watching_first_post":"new topic","topic_reminder":"topic reminder","liked_consolidated":"new likes","post_approved":"post approved","membership_request_consolidated":"new membership requests","reaction":"new reaction","votes_released":"Vote was released","new_features":"new Discourse features have been released!","chat_mention":"Chat mention","chat_invitation":"Chat invitation","chat_quoted":"Chat quoted","assigned":"Assigned"},"chat_invitation":"invited you to join a chat channel","chat_invitation_html":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003einvited you to join a chat channel\u003c/span\u003e","chat_quoted":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","assigned":"\u003cspan\u003e%{username}\u003c/span\u003e %{description}","alt":{"solved":{"accepted_notification":"accepted"}}},"upload_selector":{"uploading":"Uploading","processing":"Processing Upload","select_file":"Select File","default_image_alt_text":"image"},"search":{"sort_by":"Sort by","relevance":"Relevance","latest_post":"Latest Post","latest_topic":"Latest Topic","most_viewed":"Most Viewed","most_liked":"Most Liked","select_all":"Select All","clear_all":"Clear All","too_short":"Your search term is too short.","open_advanced":"Open advanced search","clear_search":"Clear search","sort_or_bulk_actions":"Sort or bulk select results","result_count":{"one":"\u003cspan\u003e%{count} result for\u003c/span\u003e\u003cspan class='term'\u003e%{term}\u003c/span\u003e","other":"\u003cspan\u003e%{count}%{plus} results for\u003c/span\u003e\u003cspan class='term'\u003e%{term}\u003c/span\u003e"},"title":"Search","full_page_title":"Search","results":"results","no_results":"No results found.","no_more_results":"No more results found.","post_format":"#%{post_number} by %{username}","results_page":"Search results for '%{term}'","more_results":"There are more results. Please narrow your search criteria.","cant_find":"Can’t find what you’re looking for?","start_new_topic":"Perhaps start a new topic?","or_search_google":"Or try searching with Google instead:","search_google":"Try searching with Google instead:","search_google_button":"Google","search_button":"Search","search_term_label":"enter search keyword","categories":"Categories","tags":"Tags","in":"in","in_this_topic":"in this topic","in_this_topic_tooltip":"switch to searching all topics","in_messages":"in messages","in_messages_tooltip":"switch to searching regular topics","in_topics_posts":"in all topics and posts","enter_hint":"or press Enter","in_posts_by":"in posts by %{username}","browser_tip":"%{modifier} + f","browser_tip_description":"again to use native browser search","recent":"Recent Searches","clear_recent":"Clear Recent Searches","type":{"default":"Topics/posts","users":"Users","categories":"Categories","categories_and_tags":"Categories/tags"},"context":{"user":"Search posts by @%{username}","category":"Search the #%{category} category","tag":"Search the #%{tag} tag","topic":"Search this topic","private_messages":"Search messages"},"tips":{"category_tag":"filters by category or tag","author":"filters by post author","in":"filters by metadata (e.g. in:title, in:personal, in:pinned)","status":"filters by topic status","full_search":"launches full page search","full_search_key":"%{modifier} + Enter","me":"shows only your posts"},"advanced":{"title":"Advanced filters","posted_by":{"label":"Posted by","aria_label":"Filter by post author"},"in_category":{"label":"Categorized"},"in_group":{"label":"In Group"},"with_badge":{"label":"With Badge"},"with_tags":{"label":"Tagged","aria_label":"Filter using tags"},"filters":{"label":"Only return topics/posts...","title":"Matching in title only","likes":"I liked","posted":"I posted in","created":"I created","watching":"I'm watching","tracking":"I'm tracking","private":"In my messages","bookmarks":"I bookmarked","first":"are the very first post","pinned":"are pinned","seen":"I read","unseen":"I've not read","wiki":"are wiki","images":"include image(s)","all_tags":"All the above tags"},"statuses":{"label":"Where topics","open":"are open","closed":"are closed","public":"are public","archived":"are archived","noreplies":"have zero replies","single_user":"contain a single user","solved":"are solved","unsolved":"are unsolved"},"post":{"count":{"label":"Posts"},"min":{"placeholder":"minimum","aria_label":"filter by minimum number of posts"},"max":{"placeholder":"maximum","aria_label":"filter by maximum number of posts"},"time":{"label":"Posted","aria_label":"Filter by posted date","before":"before","after":"after"}},"views":{"label":"Views"},"min_views":{"placeholder":"minimum","aria_label":"filter by minimum views"},"max_views":{"placeholder":"maximum","aria_label":"filter by maximum views"},"additional_options":{"label":"Filter by post count and topic views"},"in":{"assigned":"are assigned","unassigned":"are unassigned"},"assigned":{"label":"Assigned to"},"vote":{"count":{"label":"Minimum Vote Count"}}},"most_votes":"Most Votes"},"hamburger_menu":"menu","new_item":"new","go_back":"go back","not_logged_in_user":"user page with summary of current activity and preferences","current_user":"go to your user page","view_all":"view all %{tab}","user_menu":{"generic_no_items":"There are no items in this list.","sr_menu_tabs":"User menu tabs","view_all_notifications":"view all notifications","view_all_bookmarks":"view all bookmarks","view_all_messages":"view all personal messages","tabs":{"all_notifications":"All notifications","replies":"Replies","replies_with_unread":{"one":"Replies - %{count} unread reply","other":"Replies - %{count} unread replies"},"mentions":"Mentions","mentions_with_unread":{"one":"Mentions - %{count} unread mention","other":"Mentions - %{count} unread mentions"},"likes":"Likes","likes_with_unread":{"one":"Likes - %{count} unread like","other":"Likes - %{count} unread likes"},"watching":"Watched topics","watching_with_unread":{"one":"Watched topics - %{count} unread watched topic","other":"Watched topics - %{count} unread watched topics"},"messages":"Personal messages","messages_with_unread":{"one":"Personal messages - %{count} unread message","other":"Personal messages - %{count} unread messages"},"bookmarks":"Bookmarks","bookmarks_with_unread":{"one":"Bookmarks - %{count} unread bookmark","other":"Bookmarks - %{count} unread bookmarks"},"review_queue":"Review queue","review_queue_with_unread":{"one":"Review queue - %{count} item needs review","other":"Review queue - %{count} items need review"},"other_notifications":"Other notifications","other_notifications_with_unread":{"one":"Other notifications - %{count} unread notification","other":"Other notifications - %{count} unread notifications"},"profile":"Profile","chat_notifications":"Chat notifications","chat_notifications_with_unread":{"one":"Chat notifications - %{count} unread notification","other":"Chat notifications - %{count} unread notifications"},"assign_list":"Assign list","assign_list_with_unread":{"one":"Assign list - %{count} unread assignment","other":"Assign list - %{count} unread assignments"}},"reviewable":{"view_all":"view all review items","queue":"Queue","deleted_user":"(deleted user)","deleted_post":"(deleted post)","post_number_with_topic_title":"post #%{post_number} - %{title}","new_post_in_topic":"new post in %{title}","user_requires_approval":"%{username} requires approval","default_item":"reviewable item #%{reviewable_id}"},"no_chat_notifications_title":"You don’t have any chat notifications yet","no_chat_notifications_body":"You will be notified in this panel when someone direct messages you or \u003cb\u003e@mentions\u003c/b\u003e you in chat. Notifications will also be sent to your email when you haven’t logged in for a while. \u003cbr\u003e\u003cbr\u003e Click the title at the top of any chat channel to configure what notifications you receive in that channel. For more, see your \u003ca href='%{preferencesUrl}'\u003enotification preferences\u003c/a\u003e.\n","view_all_assigned":"view all assigned"},"topics":{"new_messages_marker":"last visit","bulk":{"select_all":"Select All","clear_all":"Clear All","unlist_topics":"Unlist Topics","relist_topics":"Relist Topics","reset_bump_dates":"Reset bump dates","defer":"Defer","delete":"Delete Topics","dismiss":"Dismiss","dismiss_read":"Dismiss all unread","dismiss_read_with_selected":{"one":"Dismiss %{count} unread","other":"Dismiss %{count} unread"},"dismiss_button":"Dismiss…","dismiss_button_with_selected":{"one":"Dismiss (%{count})…","other":"Dismiss (%{count})…"},"dismiss_tooltip":"Dismiss just new posts or stop tracking topics","also_dismiss_topics":"Stop tracking these topics so they never show up as unread for me again","dismiss_new":"Dismiss New","dismiss_new_with_selected":{"one":"Dismiss New (%{count})","other":"Dismiss New (%{count})"},"toggle":"toggle bulk selection of topics","actions":"Bulk Actions","change_category":"Set Category...","close_topics":"Close Topics","archive_topics":"Archive Topics","move_messages_to_inbox":"Move to Inbox","notification_level":"Notifications...","change_notification_level":"Change Notification Level","choose_new_category":"Choose the new category for the topics:","selected":{"one":"You have selected \u003cb\u003e%{count}\u003c/b\u003e topic.","other":"You have selected \u003cb\u003e%{count}\u003c/b\u003e topics."},"change_tags":"Replace Tags","append_tags":"Append Tags","choose_new_tags":"Choose new tags for these topics:","choose_append_tags":"Choose new tags to append for these topics:","changed_tags":"The tags of those topics were changed.","remove_tags":"Remove All Tags","confirm_remove_tags":{"one":"All tags will be removed from this topic. Are you sure?","other":"All tags will be removed from %{count} topics. Are you sure?"},"progress":{"one":"Progress: \u003cstrong\u003e%{count}\u003c/strong\u003e topic","other":"Progress: \u003cstrong\u003e%{count}\u003c/strong\u003e topics"},"unassign":"Unassign Topics","assign":"Assign Topics"},"none":{"unread":"You have no unread topics.","unseen":"You have no unseen topics.","new":"You have no new topics.","read":"You haven't read any topics yet.","posted":"You haven't posted in any topics yet.","latest":"You're all caught up!","bookmarks":"You have no bookmarked topics yet.","category":"There are no %{category} topics.","top":"There are no top topics.","filter":"There are no topics.","educate":{"new":"\u003cp\u003eYour new topics will appear here. By default, topics are considered new and will show a \u003cspan class=\"badge new-topic badge-notification\" style=\"vertical-align:middle;line-height:inherit;\"\u003e\u003c/span\u003e indicator if they were created in the last 2 days.\u003c/p\u003e\u003cp\u003eVisit your \u003ca href=\"%{userPrefsUrl}\"\u003epreferences\u003c/a\u003e to change this.\u003c/p\u003e","unread":"\u003cp\u003eYour unread topics appear here.\u003c/p\u003e\u003cp\u003eBy default, topics are considered unread and will show unread counts \u003cspan class=\"badge unread-posts badge-notification\"\u003e1\u003c/span\u003e if you:\u003c/p\u003e\u003cul\u003e\u003cli\u003eCreated the topic\u003c/li\u003e\u003cli\u003eReplied to the topic\u003c/li\u003e\u003cli\u003eRead the topic for more than 4 minutes\u003c/li\u003e\u003c/ul\u003e\u003cp\u003eOr if you have explicitly set the topic to Tracked or Watched via the 🔔 in each topic.\u003c/p\u003e\u003cp\u003eVisit your \u003ca href=\"%{userPrefsUrl}\"\u003epreferences\u003c/a\u003e to change this.\u003c/p\u003e"}},"bottom":{"latest":"There are no more latest topics.","posted":"There are no more posted topics.","read":"There are no more read topics.","new":"There are no more new topics.","unread":"There are no more unread topics.","unseen":"There are no more unseen topics.","category":"There are no more %{category} topics.","tag":"There are no more %{tag} topics.","top":"There are no more top topics.","bookmarks":"There are no more bookmarked topics.","filter":"There are no more topics."}},"topic":{"filter_to":{"one":"%{count} post in topic","other":"%{count} posts in topic"},"create":"New Topic","create_disabled_category":"You're not allowed to create topics in this category","create_long":"Create a new Topic","open_draft":"Open Draft","private_message":"Start a message","archive_message":{"help":"Move message to your archive","title":"Archive"},"move_to_inbox":{"title":"Move to Inbox","help":"Move message back to Inbox"},"defer":{"help":"Mark as unread","title":"Defer"},"list":"Topics","new":"new topic","unread":"unread","new_topics":{"one":"%{count} new topic","other":"%{count} new topics"},"unread_topics":{"one":"%{count} unread topic","other":"%{count} unread topics"},"title":"Topic","invalid_access":{"title":"Topic is private","description":"Sorry, you don't have access to that topic!","login_required":"You need to log in to see that topic."},"server_error":{"title":"Topic failed to load","description":"Sorry, we couldn't load that topic, possibly due to a connection problem. Please try again. If the problem persists, let us know."},"not_found":{"title":"Topic not found","description":"Sorry, we couldn't find that topic. Perhaps it was removed by a moderator?"},"unread_posts":{"one":"you have %{count} unread post in this topic","other":"you have %{count} unread posts in this topic"},"likes":{"one":"there is %{count} like in this topic","other":"there are %{count} likes in this topic"},"back_to_list":"Back to Topic List","options":"Topic Options","show_links":"show links within this topic","collapse_details":"collapse topic details","expand_details":"expand topic details","read_more_in_category":"Want to read more? Browse other topics in %{categoryLink} or \u003ca href='%{latestLink}'\u003eview latest topics\u003c/a\u003e.","read_more":"Want to read more? \u003ca href='%{categoryLink}'\u003eBrowse all categories\u003c/a\u003e or \u003ca href='%{latestLink}'\u003eview latest topics\u003c/a\u003e.","unread_indicator":"No member has read the last post of this topic yet.","bumped_at_title":"First post: %{createdAtDate}\nPosted: %{bumpedAtDate}\n","browse_all_categories_latest":"\u003ca href='%{basePath}/categories'\u003eBrowse all categories\u003c/a\u003e or \u003ca href='%{basePath}/latest'\u003eview latest topics\u003c/a\u003e.","browse_all_categories_latest_or_top":"\u003ca href='%{basePath}/categories'\u003eBrowse all categories\u003c/a\u003e, \u003ca href='%{basePath}/latest'\u003eview latest topics\u003c/a\u003e or see top:","browse_all_tags_or_latest":"\u003ca href='%{basePath}/tags'\u003eBrowse all tags\u003c/a\u003e or \u003ca href='%{basePath}/latest'\u003eview latest topics\u003c/a\u003e.","suggest_create_topic":"Ready to \u003ca href\u003estart a new conversation?\u003c/a\u003e","jump_reply":"Jump to post's original location","jump_reply_aria":"Jump to @%{username}'s post in its original location","deleted":"The topic has been deleted","slow_mode_update":{"title":"Slow Mode","select":"Users may only post in this topic once every:","description":"To promote thoughtful discussion in fast moving or contentious discussions, users must wait before posting again in this topic.","enable":"Enable","update":"Update","enabled_until":"Enabled until:","remove":"Disable","hours":"Hours:","minutes":"Minutes:","seconds":"Seconds:","durations":{"10_minutes":"10 Minutes","15_minutes":"15 Minutes","30_minutes":"30 Minutes","45_minutes":"45 Minutes","1_hour":"1 Hour","2_hours":"2 Hours","4_hours":"4 Hours","8_hours":"8 Hours","12_hours":"12 Hours","24_hours":"24 Hours","custom":"Custom Duration"}},"slow_mode_notice":{"duration":"Please wait %{duration} between posts in this topic"},"topic_status_update":{"title":"Topic Timer","save":"Set Timer","num_of_hours":"Number of hours:","num_of_days":"Number of days:","remove":"Remove Timer","publish_to":"Publish To:","when":"When:","time_frame_required":"Please select a time frame","min_duration":"Duration must be greater than 0","max_duration":"Duration must be less than 20 years","duration":"Duration"},"publish_to_category":{"title":"Schedule Publishing"},"temp_open":{"title":"Open Temporarily"},"auto_reopen":{"title":"Auto-Open Topic"},"temp_close":{"title":"Close Temporarily"},"auto_close":{"title":"Auto-Close Topic","label":"Auto-close topic after:","error":"Please enter a valid value.","based_on_last_post":"Don't close until the last post in the topic is at least this old."},"auto_close_after_last_post":{"title":"Auto-Close Topic After Last Post"},"auto_delete":{"title":"Auto-Delete Topic"},"auto_bump":{"title":"Auto-Bump Topic"},"reminder":{"title":"Remind Me"},"auto_delete_replies":{"title":"Auto-Delete Replies"},"status_update_notice":{"auto_open":"This topic will automatically open %{timeLeft}.","auto_close":"This topic will automatically close %{timeLeft}.","auto_publish_to_category":"This topic will be published to \u003ca href=%{categoryUrl}\u003e#%{categoryName}\u003c/a\u003e %{timeLeft}.","auto_close_after_last_post":"This topic will close %{duration} after the last reply.","auto_delete":"This topic will be automatically deleted %{timeLeft}.","auto_bump":"This topic will be automatically bumped %{timeLeft}.","auto_reminder":"You will be reminded about this topic %{timeLeft}.","auto_delete_replies":"Replies on this topic are automatically deleted after %{duration}."},"auto_close_title":"Auto-Close Settings","auto_close_immediate":{"one":"The last post in the topic is already %{count} hour old, so the topic will be closed immediately.","other":"The last post in the topic is already %{count} hours old, so the topic will be closed immediately."},"auto_close_momentarily":{"one":"The last post in the topic is already %{count} hour old, so the topic will be closed momentarily.","other":"The last post in the topic is already %{count} hours old, so the topic will be closed momentarily."},"timeline":{"back":"Back","back_description":"Go back to your last unread post","replies_short":"%{current} / %{total}"},"progress":{"title":"topic progress","jump_prompt":"jump to...","jump_prompt_of":{"one":"of %{count} post","other":"of %{count} posts"},"jump_prompt_long":"Jump to...","jump_prompt_to_date":"to date","jump_prompt_or":"or"},"notifications":{"title":"change how often you get notified about this topic","reasons":{"mailing_list_mode":"You have mailing list mode enabled, so you will be notified of replies to this topic via email.","3_10":"You will receive notifications because you are watching a tag on this topic.","3_10_stale":"You will receive notifications because you were watching a tag on this topic in the past.","3_6":"You will receive notifications because you are watching this category.","3_6_stale":"You will receive notifications because you were watching this category in the past.","3_5":"You will receive notifications because you started watching this topic automatically.","3_2":"You will receive notifications because you are watching this topic.","3_1":"You will receive notifications because you created this topic.","3":"You will receive notifications because you are watching this topic.","2_8":"You will see a count of new replies because you are tracking this category.","2_8_stale":"You will see a count of new replies because you were tracking this category in the past.","2_4":"You will see a count of new replies because you posted a reply to this topic.","2_2":"You will see a count of new replies because you are tracking this topic.","2":"You will see a count of new replies because you \u003ca href=\"%{basePath}/u/%{username}/preferences/notifications\"\u003eread this topic\u003c/a\u003e.","1_2":"You will be notified if someone mentions your @name or replies to you.","1":"You will be notified if someone mentions your @name or replies to you.","0_7":"You are ignoring all notifications in this category.","0_2":"You are ignoring all notifications on this topic.","0":"You are ignoring all notifications on this topic."},"watching_pm":{"title":"Watching","description":"You will be notified of every new reply in this message, and a count of new replies will be shown."},"watching":{"title":"Watching","description":"You will be notified of every new reply in this topic, and a count of new replies will be shown."},"tracking_pm":{"title":"Tracking","description":"A count of new replies will be shown for this message. You will be notified if someone mentions your @name or replies to you."},"tracking":{"title":"Tracking","description":"A count of new replies will be shown for this topic. You will be notified if someone mentions your @name or replies to you."},"regular":{"title":"Normal","description":"You will be notified if someone mentions your @name or replies to you."},"regular_pm":{"title":"Normal","description":"You will be notified if someone mentions your @name or replies to you."},"muted_pm":{"title":"Muted","description":"You will never be notified of anything about this message."},"muted":{"title":"Muted","description":"You will never be notified of anything about this topic, and it will not appear in latest."}},"actions":{"title":"Actions","recover":"Un-Delete Topic","delete":"Delete Topic","open":"Open Topic","close":"Close Topic","multi_select":"Select Posts…","slow_mode":"Set Slow Mode...","timed_update":"Set Topic Timer...","pin":"Pin Topic…","unpin":"Un-Pin Topic…","unarchive":"Unarchive Topic","archive":"Archive Topic","invisible":"Unlist Topic","visible":"List Topic","reset_read":"Reset Read Data","make_public":"Make Public Topic...","make_private":"Make Personal Message","reset_bump_date":"Reset Bump Date"},"feature":{"pin":"Pin Topic","unpin":"Un-Pin Topic","pin_globally":"Pin Topic Globally","make_banner":"Make Banner Topic","remove_banner":"Remove Banner Topic"},"reply":{"title":"Reply","help":"begin composing a reply to this topic"},"share":{"title":"Share Topic","extended_title":"Share a link","help":"share a link to this topic","instructions":"Share a link to this topic:","copied":"Topic link copied.","restricted_groups":{"one":"Only visible to members of group: %{groupNames}","other":"Only visible to members of groups: %{groupNames}"},"invite_users":"Invite"},"print":{"title":"Print","help":"Open a printer friendly version of this topic"},"flag_topic":{"title":"Flag","help":"privately flag this topic for attention or send a private notification about it","success_message":"You successfully flagged this topic."},"make_public":{"title":"Convert to Public Topic","choose_category":"Please choose a category for the public topic:"},"feature_topic":{"title":"Feature this topic","pin":"Make this topic appear at the top of the %{categoryLink} category until","unpin":"Remove this topic from the top of the %{categoryLink} category.","unpin_until":"Remove this topic from the top of the %{categoryLink} category or wait until \u003cstrong\u003e%{until}\u003c/strong\u003e.","pin_note":"Users can unpin the topic individually for themselves.","pin_validation":"A date is required to pin this topic.","not_pinned":"There are no topics pinned in %{categoryLink}.","already_pinned":{"one":"Topics currently pinned in %{categoryLink}: \u003cstrong class='badge badge-notification unread'\u003e%{count}\u003c/strong\u003e","other":"Topics currently pinned in %{categoryLink}: \u003cstrong class='badge badge-notification unread'\u003e%{count}\u003c/strong\u003e"},"pin_globally":"Make this topic appear at the top of all topic lists until","confirm_pin_globally":{"one":"You already have %{count} globally pinned topic. Too many pinned topics may be a burden for new and anonymous users. Are you sure you want to pin another topic globally?","other":"You already have %{count} globally pinned topics. Too many pinned topics may be a burden for new and anonymous users. Are you sure you want to pin another topic globally?"},"unpin_globally":"Remove this topic from the top of all topic lists.","unpin_globally_until":"Remove this topic from the top of all topic lists or wait until \u003cstrong\u003e%{until}\u003c/strong\u003e.","global_pin_note":"Users can unpin the topic individually for themselves.","not_pinned_globally":"There are no topics pinned globally.","already_pinned_globally":{"one":"Topics currently pinned globally: \u003cstrong class='badge badge-notification unread'\u003e%{count}\u003c/strong\u003e","other":"Topics currently pinned globally: \u003cstrong class='badge badge-notification unread'\u003e%{count}\u003c/strong\u003e"},"make_banner":"Make this topic into a banner that appears at the top of all pages.","remove_banner":"Remove the banner that appears at the top of all pages.","banner_note":"Users can dismiss the banner by closing it. Only one topic can be bannered at any given time.","no_banner_exists":"There is no banner topic.","banner_exists":"There \u003cstrong class='badge badge-notification unread'\u003eis\u003c/strong\u003e currently a banner topic."},"inviting":"Inviting...","automatically_add_to_groups":"This invite also includes access to these groups:","invite_private":{"title":"Invite to Message","email_or_username":"Invitee's Email or Username","email_or_username_placeholder":"email address or username","action":"Invite","success":"We've invited that user to participate in this message.","success_group":"We've invited that group to participate in this message.","error":"Sorry, there was an error inviting that user.","not_allowed":"Sorry, that user can't be invited.","group_name":"group name"},"controls":"Topic Controls","invite_reply":{"title":"Invite","username_placeholder":"username","action":"Send Invite","help":"invite others to this topic via email or notifications","to_forum":"We'll send a brief email allowing your friend to immediately join by clicking a link.","discourse_connect_enabled":"Enter the username of the person you'd like to invite to this topic.","to_topic_blank":"Enter the username or email address of the person you'd like to invite to this topic.","to_topic_email":"You've entered an email address. We'll email an invitation that allows your friend to immediately reply to this topic.","to_topic_username":"You've entered a username. We'll send a notification with a link inviting them to this topic.","to_username":"Enter the username of the person you'd like to invite. We'll send a notification with a link inviting them to this topic.","email_placeholder":"name@example.com","success_email":"We mailed out an invitation to \u003cb\u003e%{invitee}\u003c/b\u003e. We'll notify you when the invitation is redeemed. Check the invitations tab on your user page to keep track of your invites.","success_username":"We've invited that user to participate in this topic.","error":"Sorry, we couldn't invite that person. Perhaps they have already been invited? (Invites are rate limited)","success_existing_email":"A user with email \u003cb\u003e%{emailOrUsername}\u003c/b\u003e already exists. We've invited that user to participate in this topic."},"login_reply":"Log In to Reply","filters":{"n_posts":{"one":"%{count} post","other":"%{count} posts"},"cancel":"Remove filter"},"move_to":{"title":"Move to","action":"move to","error":"There was an error moving posts."},"split_topic":{"title":"Move to New Topic","action":"move to new topic","topic_name":"New Topic Title","radio_label":"New Topic","error":"There was an error moving posts to the new topic.","instructions":{"one":"You are about to create a new topic and populate it with the post you've selected.","other":"You are about to create a new topic and populate it with the \u003cb\u003e%{count}\u003c/b\u003e posts you've selected."}},"merge_topic":{"title":"Move to Existing Topic","action":"move to existing topic","error":"There was an error moving posts into that topic.","radio_label":"Existing Topic","instructions":{"one":"Please choose the topic you'd like to move that post to.","other":"Please choose the topic you'd like to move those \u003cb\u003e%{count}\u003c/b\u003e posts to."}},"move_to_new_message":{"title":"Move to New Message","action":"move to new message","message_title":"New Message Title","radio_label":"New Message","participants":"Participants","instructions":{"one":"You are about to create a new message and populate it with the post you've selected.","other":"You are about to create a new message and populate it with the \u003cb\u003e%{count}\u003c/b\u003e posts you've selected."}},"move_to_existing_message":{"title":"Move to Existing Message","action":"move to existing message","radio_label":"Existing Message","participants":"Participants","instructions":{"one":"Please choose the message you'd like to move that post to.","other":"Please choose the message you'd like to move those \u003cb\u003e%{count}\u003c/b\u003e posts to."}},"merge_posts":{"title":"Merge Selected Posts","action":"merge selected posts","error":"There was an error merging the selected posts."},"publish_page":{"title":"Page Publishing","publish":"Publish","description":"When a topic is published as a page, its URL can be shared and it will displayed with custom styling.","slug":"Slug","public":"Public","public_description":"People can see the page even if the associated topic is private.","publish_url":"Your page has been published at:","topic_published":"Your topic has been published at:","preview_url":"Your page will be published at:","invalid_slug":"Sorry, you can't publish this page.","unpublish":"Unpublish","unpublished":"Your page has been unpublished and is no longer accessible.","publishing_settings":"Publishing Settings"},"change_owner":{"title":"Change Owner","action":"change ownership","error":"There was an error changing the ownership of the posts.","placeholder":"username of new owner","instructions":{"one":"Please choose a new owner for the post by \u003cb\u003e@%{old_user}\u003c/b\u003e","other":"Please choose a new owner for the %{count} posts by \u003cb\u003e@%{old_user}\u003c/b\u003e"},"instructions_without_old_user":{"one":"Please choose a new owner for the post","other":"Please choose a new owner for the %{count} posts"}},"change_timestamp":{"title":"Change Timestamp...","action":"change timestamp","invalid_timestamp":"Timestamp cannot be in the future.","error":"There was an error changing the timestamp of the topic.","instructions":"Please select the new timestamp of the topic. Posts in the topic will be updated to have the same time difference."},"multi_select":{"select":"select","selected":"selected (%{count})","select_post":{"label":"select","title":"Add post to selection"},"selected_post":{"label":"selected","title":"Click to remove post from selection"},"select_replies":{"label":"select +replies","title":"Add post and all its replies to selection"},"select_below":{"label":"select +below","title":"Add post and all after it to selection"},"delete":"delete selected","cancel":"cancel selecting","select_all":"select all","deselect_all":"deselect all","description":{"one":"You have selected \u003cb\u003e%{count}\u003c/b\u003e post.","other":"You have selected \u003cb\u003e%{count}\u003c/b\u003e posts."}},"deleted_by_author_simple":"(topic deleted by author)"},"post":{"confirm_delete":"Are you sure you want to delete this post?","quote_reply":"Quote","quote_reply_shortcut":"Or press q","quote_edit":"Edit","quote_edit_shortcut":"Or press e","quote_share":"Share","edit_reason":"Reason: ","post_number":"post %{number}","ignored":"Ignored content","wiki_last_edited_on":"wiki last edited on %{dateTime}","last_edited_on":"post last edited on %{dateTime}","edit_history":"post edit history","reply_as_new_topic":"Reply as linked Topic","reply_as_new_private_message":"Reply as new message to the same recipients","continue_discussion":"Continuing the discussion from %{postLink}:","follow_quote":"go to the quoted post","show_full":"Show Full Post","show_hidden":"View ignored content.","deleted_by_author_simple":"(post deleted by author)","collapse":"collapse","sr_collapse_replies":"Collapse embedded replies","sr_date":"Post date","sr_expand_replies":{"one":"This post has %{count} reply","other":"This post has %{count} replies"},"expand_collapse":"expand/collapse","sr_below_embedded_posts_description":"post #%{post_number} replies","sr_embedded_reply_description":"reply by @%{username} to post #%{post_number}","locked":"a staff member has locked this post from being edited","gap":{"one":"view %{count} hidden reply","other":"view %{count} hidden replies"},"sr_reply_to":"Reply to post #%{post_number} by @%{username}","notice":{"new_user":"This is the first time %{user} has posted — let’s welcome them to our community!","returning_user":"It’s been a while since we’ve seen %{user} — their last post was %{time}."},"unread":"Post is unread","has_replies":{"one":"%{count} Reply","other":"%{count} Replies"},"has_replies_count":"%{count}","unknown_user":"(unknown/deleted user)","has_likes_title":{"one":"%{count} person liked this post","other":"%{count} people liked this post"},"has_likes_title_only_you":"you liked this post","has_likes_title_you":{"one":"you and %{count} other person liked this post","other":"you and %{count} other people liked this post"},"sr_post_like_count_button":{"one":"%{count} person liked this post. Click to view","other":"%{count} people liked this post. Click to view"},"sr_post_read_count_button":{"one":"%{count} person read this post. Click to view","other":"%{count} people read this post. Click to view"},"filtered_replies_hint":{"one":"View this post and its reply","other":"View this post and its %{count} replies"},"filtered_replies_viewing":{"one":"Viewing %{count} reply to","other":"Viewing %{count} replies to"},"in_reply_to":"Load parent post","view_all_posts":"View all posts","errors":{"create":"Sorry, there was an error creating your post. Please try again.","edit":"Sorry, there was an error editing your post. Please try again.","upload":"Sorry, there was an error uploading that file. Please try again.","file_too_large":"Sorry, that file is too big (maximum size is %{max_size_kb}kb). Why not upload your large file to a cloud sharing service, then paste the link?","file_size_zero":"Sorry, it looks like something has gone wrong, the file you are trying to upload is 0 bytes. Please try again.","file_too_large_humanized":"Sorry, that file is too big (maximum size is %{max_size}). Why not upload your large file to a cloud sharing service, then paste the link?","too_many_uploads":"Sorry, you can only upload one file at a time.","too_many_dragged_and_dropped_files":{"one":"Sorry, you can only upload %{count} file at a time.","other":"Sorry, you can only upload %{count} files at a time."},"upload_not_authorized":"Sorry, the file you are trying to upload is not authorized (authorized extensions: %{authorized_extensions}).","no_uploads_authorized":"Sorry, no files are authorized to be uploaded.","image_upload_not_allowed_for_new_user":"Sorry, new users can not upload images.","attachment_upload_not_allowed_for_new_user":"Sorry, new users can not upload attachments.","attachment_download_requires_login":"Sorry, you need to be logged in to download attachments."},"cancel_composer":{"confirm":"What would you like to do with your post?","discard":"Discard","save_draft":"Save draft for later","keep_editing":"Keep editing"},"via_email":"this post arrived via email","via_auto_generated_email":"this post arrived via an auto generated email","whisper":"this post is a private whisper for moderators","whisper_groups":"this post is a private whisper only visible to %{groupNames}","wiki":{"about":"this post is a wiki"},"few_likes_left":"Thanks for sharing the love! You only have a few likes left for today.","controls":{"reply":"begin composing a reply to this post","like":"like this post","has_liked":"you've liked this post","read_indicator":"members who read this post","undo_like":"undo like","edit":"edit this post","edit_action":"Edit","edit_anonymous":"Sorry, but you need to be logged in to edit this post.","flag":"privately flag this post for attention or send a private notification about it","delete":"delete this post","undelete":"undelete this post","share":"share a link to this post","more":"More","delete_replies":{"confirm":"Do you also want to delete the replies to this post?","direct_replies":{"one":"Yes, and %{count} direct reply","other":"Yes, and %{count} direct replies"},"all_replies":{"one":"Yes, and %{count} reply","other":"Yes, and all %{count} replies"},"just_the_post":"No, just this post"},"admin":"post admin actions","permanently_delete":"Permanently Delete","permanently_delete_confirmation":"Are you sure you permanently want to delete this post? You will not be able to recover it.","wiki":"Make Wiki","unwiki":"Remove Wiki","convert_to_moderator":"Add Staff Color","revert_to_regular":"Remove Staff Color","rebake":"Rebuild HTML","publish_page":"Page Publishing","unhide":"Unhide","change_owner":"Change Ownership...","grant_badge":"Grant Badge...","lock_post":"Lock Post","lock_post_description":"prevent the poster from editing this post","unlock_post":"Unlock Post","unlock_post_description":"allow the poster to edit this post","delete_topic_disallowed_modal":"You don't have permission to delete this topic. If you really want it to be deleted, submit a flag for moderator attention together with reasoning.","delete_topic_disallowed":"you don't have permission to delete this topic","delete_topic_confirm_modal":{"one":"This topic currently has over %{count} view and may be a popular search destination. Are you sure you want to delete this topic entirely, instead of editing it to improve it?","other":"This topic currently has over %{count} views and may be a popular search destination. Are you sure you want to delete this topic entirely, instead of editing it to improve it?"},"delete_topic_confirm_modal_yes":"Yes, delete this topic","delete_topic_confirm_modal_no":"No, keep this topic","delete_topic_error":"An error occurred while deleting this topic","delete_topic":"delete topic","add_post_notice":"Add Staff Notice...","change_post_notice":"Change Staff Notice...","delete_post_notice":"Delete Staff Notice","remove_timer":"remove timer","edit_timer":"edit timer"},"actions":{"people":{"like":{"one":"liked this","other":"liked this"},"read":{"one":"read this","other":"read this"},"like_capped":{"one":"and %{count} other liked this","other":"and %{count} others liked this"},"read_capped":{"one":"and %{count} other read this","other":"and %{count} others read this"},"sr_post_likers_list_description":"users who liked this post","sr_post_readers_list_description":"users who read this post"},"by_you":{"off_topic":"You flagged this as off-topic","spam":"You flagged this as spam","inappropriate":"You flagged this as inappropriate","notify_moderators":"You flagged this for moderation","notify_user":"You sent a message to this user"}},"delete":{"confirm":{"one":"Are you sure you want to delete that post?","other":"Are you sure you want to delete these %{count} posts?"}},"merge":{"confirm":{"one":"Are you sure you want to merge these posts?","other":"Are you sure you want to merge these %{count} posts?"}},"revisions":{"controls":{"first":"First revision","previous":"Previous revision","next":"Next revision","last":"Last revision","hide":"Hide revision","show":"Show revision","destroy":"Delete revisions","destroy_confirm":"Are you sure you want to delete all of the revisions on this post? This action is permanent.","revert":"Revert to revision %{revision}","edit_wiki":"Edit Wiki","edit_post":"Edit Post","comparing_previous_to_current_out_of_total":"\u003cstrong\u003e%{previous}\u003c/strong\u003e %{icon} \u003cstrong\u003e%{current}\u003c/strong\u003e / %{total}"},"displays":{"inline":{"title":"Show the rendered output with additions and removals inline","button":"HTML"},"side_by_side":{"title":"Show the rendered output diffs side-by-side","button":"HTML"},"side_by_side_markdown":{"title":"Show the raw source diffs side-by-side","button":"Raw"}}},"raw_email":{"displays":{"raw":{"title":"Show the raw email","button":"Raw"},"text_part":{"title":"Show the text part of the email","button":"Text"},"html_part":{"title":"Show the html part of the email","button":"HTML"}}},"bookmarks":{"create":"Create bookmark","create_for_topic":"Create bookmark for topic","edit":"Edit bookmark","edit_for_topic":"Edit bookmark for topic","updated":"Updated","name":"Name","name_placeholder":"What is this bookmark for?","name_input_label":"Bookmark name","set_reminder":"Remind me","options":"Options","actions":{"delete_bookmark":{"name":"Delete bookmark","description":"Removes the bookmark from your profile and stops all reminders for the bookmark"},"edit_bookmark":{"name":"Edit bookmark","description":"Edit the bookmark name or change the reminder date and time"},"clear_bookmark_reminder":{"name":"Clear reminder","description":"Clear the reminder date and time"},"pin_bookmark":{"name":"Pin bookmark","description":"Pin the bookmark. This will make it appear at the top of your bookmarks list."},"unpin_bookmark":{"name":"Unpin bookmark","description":"Unpin the bookmark. It will no longer appear at the top of your bookmarks list."}}},"filtered_replies":{"viewing_posts_by":"Viewing %{post_count} posts by","viewing_subset":"Some replies are collapsed","viewing_summary":"Viewing a summary of this topic","post_number":"%{username}, post #%{post_number}","show_all":"Show all"},"share":{"title":"Share Post #%{post_number}","instructions":"Share a link to this post:"}},"category":{"none":"(no category)","all":"All categories","choose":"category\u0026hellip;","edit":"Edit","edit_title":"Edit this category","edit_dialog_title":"Edit: %{categoryName}","view":"View Topics in Category","back":"Back to category","general":"General","settings":"Settings","topic_template":"Template","tags":"Tags","tags_allowed_tags":"Restrict these tags to this category:","tags_allowed_tag_groups":"Restrict these tag groups to this category:","tags_placeholder":"(Optional) list of allowed tags","tags_tab_description":"Tags and tag groups specified above will only be available in this category and other categories that also specify them. They won't be available for use in other categories.","tag_groups_placeholder":"(Optional) list of allowed tag groups","manage_tag_groups_link":"Manage tag groups","allow_global_tags_label":"Also allow other tags","required_tag_group":{"description":"Require new topics to have tags from tag groups:","delete":"Delete","add":"Add required tag group","placeholder":"select tag group..."},"topic_featured_link_allowed":"Allow featured links in this category","delete":"Delete Category","create":"New Category","create_long":"Create a new category","save":"Save Category","slug":"Category Slug","slug_placeholder":"(Optional) dashed-words for url","creation_error":"There has been an error during the creation of the category.","save_error":"There was an error saving the category.","name":"Category Name","description":"Description","logo":"Category Logo Image","logo_dark":"Dark Mode Category Logo Image","background_image":"Category Background Image","badge_colors":"Badge colors","background_color":"Background color","foreground_color":"Foreground color","name_placeholder":"One or two words maximum","color_placeholder":"Any web color","delete_confirm":"Are you sure you want to delete this category?","delete_error":"There was an error deleting the category.","list":"List Categories","no_description":"Please add a description for this category.","change_in_category_topic":"Edit Description","already_used":"This color has been used by another category","security":"Security","security_add_group":"Add a group","permissions":{"group":"Group","see":"See","reply":"Reply","create":"Create","no_groups_selected":"No groups have been granted access; this category will only be visible to staff.","everyone_has_access":"This category is public, everyone can see, reply and create posts. To restrict permissions, remove one or more of the permissions granted to the \"everyone\" group.","toggle_reply":"Toggle Reply permission","toggle_full":"Toggle Create permission","inherited":"This permission is inherited from \"everyone\""},"special_warning":"Warning: This category is a pre-seeded category and the security settings cannot be edited. If you do not wish to use this category, delete it instead of repurposing it.","uncategorized_security_warning":"This category is special. It is intended as holding area for topics that have no category; it cannot have security settings.","uncategorized_general_warning":"This category is special. It is used as the default category for new topics that do not have a category selected. If you want to prevent this behavior and force category selection, \u003ca href=\"%{settingLink}\"\u003eplease disable the setting here\u003c/a\u003e. If you want to change the name or description, go to \u003ca href=\"%{customizeLink}\"\u003eCustomize / Text Content\u003c/a\u003e.","pending_permission_change_alert":"You haven't added %{group} to this category; click this button to add them.","images":"Images","email_in":"Custom incoming email address:","email_in_tooltip":"You can separate multiple email addresses with the | character.","email_in_allow_strangers":"Accept emails from anonymous users with no accounts","email_in_disabled":"Posting new topics via email is disabled. To enable posting new topics via email, enable the \u003ca href='%{setting_url}'\u003e'email in'\u003c/a\u003e setting.","mailinglist_mirror":"Category mirrors a mailing list","show_subcategory_list":"Show subcategory list above topics in this category.","read_only_banner":"Banner text when a user cannot create a topic in this category:","num_featured_topics":"Number of topics shown on the categories page:","subcategory_num_featured_topics":"Number of featured topics on parent category's page:","all_topics_wiki":"Make new topics wikis by default","allow_unlimited_owner_edits_on_first_post":"Allow unlimited owner edits on first post","subcategory_list_style":"Subcategory List Style:","sort_order":"Topic List Sort By:","default_view":"Default Topic List:","default_top_period":"Default Top Period:","default_list_filter":"Default List Filter:","allow_badges_label":"Allow badges to be awarded in this category","edit_permissions":"Edit Permissions","reviewable_by_group":"In addition to staff, content in this category can also be reviewed by:","review_group_name":"group name","require_topic_approval":"Require moderator approval of all new topics","require_reply_approval":"Require moderator approval of all new replies","this_year":"this year","position":"Position on the categories page:","default_position":"Default Position","position_disabled":"Categories will be displayed in order of activity. To control the order of categories in lists, enable the \u003ca href='%{url}'\u003e'fixed category positions'\u003c/a\u003e setting.","minimum_required_tags":"Minimum number of tags required in a topic:","default_slow_mode":"Enable \"Slow Mode\" for new topics in this category.","parent":"Parent Category","num_auto_bump_daily":"Number of open topics to automatically bump daily:","auto_bump_cooldown_days":"Minimum days before bumping the same topic again:","navigate_to_first_post_after_read":"Navigate to first post after topics are read","notifications":{"title":"change notification level for this category","watching":{"title":"Watching","description":"You will automatically watch all topics in this category. You will be notified of every new post in every topic, and a count of new replies will be shown."},"watching_first_post":{"title":"Watching First Post","description":"You will be notified of new topics in this category but not replies to the topics."},"tracking":{"title":"Tracking","description":"You will automatically track all topics in this category. You will be notified if someone mentions your @name or replies to you, and a count of new replies will be shown."},"regular":{"title":"Normal","description":"You will be notified if someone mentions your @name or replies to you."},"muted":{"title":"Muted","description":"You will never be notified of anything about new topics in this category, and they will not appear in latest."}},"search_priority":{"label":"Search Priority","options":{"normal":"Normal","ignore":"Ignore","very_low":"Very Low","low":"Low","high":"High","very_high":"Very High"}},"sort_options":{"default":"default","likes":"Likes","op_likes":"Original Post Likes","views":"Views","posts":"Posts","activity":"Activity","posters":"Posters","category":"Category","created":"Created","votes":"Votes"},"sort_ascending":"Ascending","sort_descending":"Descending","subcategory_list_styles":{"rows":"Rows","rows_with_featured_topics":"Rows with featured topics","boxes":"Boxes","boxes_with_featured_topics":"Boxes with featured topics"},"settings_sections":{"general":"General","moderation":"Moderation","appearance":"Appearance","email":"Email"},"list_filters":{"all":"all topics","none":"no subcategories"},"colors_disabled":"You can’t select colors because you have a category style of none."},"flagging":{"title":"Thanks for helping to keep our community civil!","action":"Flag Post","take_action":"Take Action...","take_action_options":{"default":{"title":"Take Action","details":"Reach the flag threshold immediately, rather than waiting for more community flags"},"suspend":{"title":"Suspend User","details":"Reach the flag threshold, and suspend the user"},"silence":{"title":"Silence User","details":"Reach the flag threshold, and silence the user"}},"notify_action":"Message","official_warning":"Official Warning","delete_spammer":"Delete Spammer","flag_for_review":"Queue For Review","yes_delete_spammer":"Yes, Delete Spammer","ip_address_missing":"(N/A)","hidden_email_address":"(hidden)","submit_tooltip":"Submit the private flag","take_action_tooltip":"Reach the flag threshold immediately, rather than waiting for more community flags","cant":"Sorry, you can't flag this post at this time.","notify_staff":"Notify staff privately","formatted_name":{"off_topic":"It's Off-Topic","inappropriate":"It's Inappropriate","spam":"It's Spam"},"custom_placeholder_notify_user":"Be specific, be constructive, and always be kind.","notify_user_textarea_label":"Message for the user","custom_placeholder_notify_moderators":"Let us know specifically what you are concerned about, and provide relevant links and examples where possible.","notify_moderators_textarea_label":"Message for the moderators","custom_message":{"at_least":{"one":"enter at least %{count} character","other":"enter at least %{count} characters"},"more":{"one":"%{count} to go...","other":"%{count} to go..."},"left":{"one":"%{count} remaining","other":"%{count} remaining"}}},"flagging_topic":{"title":"Thanks for helping to keep our community civil!","action":"Flag Topic","notify_action":"Message"},"topic_map":{"title":"Topic Summary","participants_title":"Frequent Posters","links_title":"Popular Links","links_shown":"show more links...","clicks":{"one":"%{count} click","other":"%{count} clicks"}},"post_links":{"about":"expand more links for this post","title":{"one":"%{count} more","other":"%{count} more"}},"topic_statuses":{"warning":{"help":"This is an official warning."},"bookmarked":{"help":"You bookmarked this topic"},"locked":{"help":"This topic is closed; it no longer accepts new replies"},"archived":{"help":"This topic is archived; it is frozen and cannot be changed"},"locked_and_archived":{"help":"This topic is closed and archived; it no longer accepts new replies and cannot be changed"},"unpinned":{"title":"Unpinned","help":"This topic is unpinned for you; it will display in regular order"},"pinned_globally":{"title":"Pinned Globally","help":"This topic is pinned globally; it will display at the top of latest and its category"},"pinned":{"title":"Pinned","help":"This topic is pinned for you; it will display at the top of its category"},"unlisted":{"help":"This topic is unlisted; it will not be displayed in topic lists, and can only be accessed via a direct link"},"personal_message":{"title":"This topic is a personal message","help":"This topic is a personal message"},"chat":{"help":"Chat is enabled for this topic"},"solved":{"help":"This topic has a solution"}},"posts":"Posts","pending_posts":{"label":"Pending","label_with_count":"Pending (%{count})"},"original_post":"Original Post","views":"Views","sr_views":"Sort by views","views_lowercase":{"one":"view","other":"views"},"replies":"Replies","sr_replies":"Sort by replies","views_long":{"one":"this topic has been viewed %{count} time","other":"this topic has been viewed %{count} times"},"activity":"Activity","sr_activity":"Sort by activity","likes":"Likes","sr_likes":"Sort by likes","sr_op_likes":"Sort by original post likes","likes_lowercase":{"one":"like","other":"likes"},"users":"Users","users_lowercase":{"one":"user","other":"users"},"category_title":"Category","history_capped_revisions":"History, last 100 revisions","history":"History","raw_email":{"title":"Incoming Email","not_available":"Not available!"},"categories_list":"Categories List","filters":{"with_topics":"%{filter} topics","with_category":"%{filter} %{category} topics","filter":{"title":"Filter","button":{"label":"Filter"}},"latest":{"title":"Latest","title_with_count":{"one":"Latest (%{count})","other":"Latest (%{count})"},"help":"topics with recent posts"},"read":{"title":"Read","help":"topics you've read, in the order that you last read them"},"categories":{"title":"Categories","title_in":"Category - %{categoryName}","help":"all topics grouped by category"},"unread":{"title":"Unread","title_with_count":{"one":"Unread (%{count})","other":"Unread (%{count})"},"help":"topics you are currently watching or tracking with unread posts","lower_title_with_count":{"one":"%{count} unread","other":"%{count} unread"}},"unseen":{"title":"Unseen","lower_title":"unseen","help":"new topics and topics you are currently watching or tracking with unread posts"},"new":{"lower_title_with_count":{"one":"%{count} new","other":"%{count} new"},"lower_title":"new","title":"New","title_with_count":{"one":"New (%{count})","other":"New (%{count})"},"help":"topics created in the last few days"},"posted":{"title":"My Posts","help":"topics you have posted in"},"bookmarks":{"title":"Bookmarks","help":"topics you have bookmarked"},"category":{"title":"%{categoryName}","title_with_count":{"one":"%{categoryName} (%{count})","other":"%{categoryName} (%{count})"},"help":"latest topics in the %{categoryName} category"},"top":{"title":"Top","help":"the most active topics in the last year, month, week or day","all":{"title":"All Time"},"yearly":{"title":"Yearly"},"quarterly":{"title":"Quarterly"},"monthly":{"title":"Monthly"},"weekly":{"title":"Weekly"},"daily":{"title":"Daily"},"all_time":"All Time","this_year":"Year","this_quarter":"Quarter","this_month":"Month","this_week":"Week","today":"Today"},"unassigned":{"title":"Unassigned","help":"Topics that are not assigned"},"votes":{"title":"Votes","help":"topics with the most votes"},"my_votes":{"title":"My Votes","help":"topics you voted on"}},"browser_update":"Unfortunately, \u003ca href=\"https://www.discourse.org/faq/#browser\"\u003eyour browser is unsupported\u003c/a\u003e. Please \u003ca href=\"https://browsehappy.com\"\u003eswitch to a supported browser\u003c/a\u003e to view rich content, log in and reply.","permission_types":{"full":"Create / Reply / See","create_post":"Reply / See","readonly":"See"},"preloader_text":"Loading","lightbox":{"download":"download","open":"original image","previous":"Previous (Left arrow key)","next":"Next (Right arrow key)","counter":"%curr% of %total%","close":"Close (Esc)","content_load_error":"\u003ca href=\"%url%\"\u003eThe content\u003c/a\u003e could not be loaded.","image_load_error":"\u003ca href=\"%url%\"\u003eThe image\u003c/a\u003e could not be loaded."},"cannot_render_video":"This video cannot be rendered because your browser does not support the codec.","keyboard_shortcuts_help":{"shortcut_key_delimiter_comma":", ","shortcut_key_delimiter_plus":"+","shortcut_delimiter_or":"%{shortcut1} or %{shortcut2}","shortcut_delimiter_slash":"%{shortcut1}/%{shortcut2}","shortcut_delimiter_space":"%{shortcut1} %{shortcut2}","title":"Keyboard Shortcuts","short_title":"Shortcuts","jump_to":{"title":"Jump To","home":"%{shortcut} Home","latest":"%{shortcut} Latest","new":"%{shortcut} New","unread":"%{shortcut} Unread","categories":"%{shortcut} Categories","top":"%{shortcut} Top","bookmarks":"%{shortcut} Bookmarks","profile":"%{shortcut} Profile","messages":"%{shortcut} Messages","drafts":"%{shortcut} Drafts","next":"%{shortcut} Next Topic","previous":"%{shortcut} Previous Topic"},"navigation":{"title":"Navigation","jump":"%{shortcut} Go to post #","back":"%{shortcut} Back","up_down":"%{shortcut} Move selection \u0026uarr; \u0026darr;","open":"%{shortcut} Open selected topic","next_prev":"%{shortcut} Next/previous section","go_to_unread_post":"%{shortcut} Go to the first unread post"},"application":{"title":"Application","create":"%{shortcut} Create a new topic","notifications":"%{shortcut} Open notifications","hamburger_menu":"%{shortcut} Open hamburger menu","user_profile_menu":"%{shortcut} Open user menu","show_incoming_updated_topics":"%{shortcut} Show updated topics","search":"%{shortcut} Search","help":"%{shortcut} Open keyboard help","dismiss_new":"%{shortcut} Dismiss New","dismiss_topics":"%{shortcut} Dismiss Topics","log_out":"%{shortcut} Log Out"},"composing":{"title":"Composing","return":"%{shortcut} Return to composer","fullscreen":"%{shortcut} Fullscreen composer","insert_current_time":"%{shortcut} Insert current time"},"bookmarks":{"title":"Bookmarking","enter":"%{shortcut} Save and close","later_today":"%{shortcut} Later today","later_this_week":"%{shortcut} Later this week","tomorrow":"%{shortcut} Tomorrow","next_week":"%{shortcut} Next week","next_month":"%{shortcut} Next month","next_business_week":"%{shortcut} Start of next week","next_business_day":"%{shortcut} Next business day","custom":"%{shortcut} Custom date and time","none":"%{shortcut} No reminder","delete":"%{shortcut} Delete bookmark"},"actions":{"title":"Actions","bookmark_topic":"%{shortcut} Toggle bookmark topic","pin_unpin_topic":"%{shortcut} Pin/Unpin topic","share_topic":"%{shortcut} Share topic","share_post":"%{shortcut} Share post","reply_as_new_topic":"%{shortcut} Reply as linked topic","reply_topic":"%{shortcut} Reply to topic","reply_post":"%{shortcut} Reply to post","quote_post":"%{shortcut} Quote post","like":"%{shortcut} Like post","flag":"%{shortcut} Flag post","bookmark":"%{shortcut} Bookmark post","edit":"%{shortcut} Edit post","delete":"%{shortcut} Delete post","mark_muted":"%{shortcut} Mute topic","mark_regular":"%{shortcut} Normal (default) topic","mark_tracking":"%{shortcut} Track topic","mark_watching":"%{shortcut} Watch topic","print":"%{shortcut} Print topic","defer":"%{shortcut} Defer topic","topic_admin_actions":"%{shortcut} Open topic admin actions"},"search_menu":{"title":"Search Menu","prev_next":"%{shortcut} Move selection up and down","insert_url":"%{shortcut} Insert selection into open composer","full_page_search":"%{shortcut} Launches full page search"},"chat":{"title":"Chat","keyboard_shortcuts":{"switch_channel_arrows":"%{shortcut} Switch channel","open_quick_channel_selector":"%{shortcut} Open quick channel selector","open_insert_link_modal":"%{shortcut} Insert hyperlink (composer only)","composer_bold":"%{shortcut} Bold (composer only)","composer_italic":"%{shortcut} Italic (composer only)","composer_code":"%{shortcut} Code (composer only)","drawer_open":"%{shortcut} Open chat drawer","drawer_close":"%{shortcut} Close chat drawer","mark_all_channels_read":"%{shortcut} Mark all channels read"}}},"badges":{"earned_n_times":{"one":"Earned this badge %{count} time","other":"Earned this badge %{count} times"},"granted_on":"Granted %{date}","others_count":"Others with this badge (%{count})","title":"Badges","allow_title":"You can use this badge as a title","multiple_grant":"You can earn this multiple times","badge_count":{"one":"%{count} Badge","other":"%{count} Badges"},"more_badges":{"one":"+%{count} More","other":"+%{count} More"},"granted":{"one":"%{count} granted","other":"%{count} granted"},"awarded":"awarded","select_badge_for_title":"Select a badge to use as your title","none":"(none)","successfully_granted":"Successfully granted %{badge} to %{username}","badge_grouping":{"getting_started":{"name":"Getting Started"},"community":{"name":"Community"},"trust_level":{"name":"Trust Level"},"other":{"name":"Other"},"posting":{"name":"Posting"}},"favorite_max_reached":"You can’t favorite more badges.","favorite_max_not_reached":"Mark this badge as favorite","favorite_count":"%{count}/%{max} badges marked as favorite"},"download_calendar":{"title":"Download calendar","save_ics":"Download .ics file","save_google":"Add to Google calendar","remember":"Don’t ask me again","remember_explanation":"(you can change this preference in your user prefs)","download":"Download","default_calendar":"Default calendar","default_calendar_instruction":"Determine which calendar should be used when dates are saved","add_to_calendar":"Add to calendar","google":"Google Calendar","ics":"ICS"},"tagging":{"all_tags":"All tags","other_tags":"Other Tags","selector_all_tags":"all tags","selector_no_tags":"no tags","changed":"tags changed:","tags":"Tags","choose_for_topic":"optional tags","choose_for_topic_required":{"one":"select at least %{count} tag...","other":"select at least %{count} tags..."},"choose_for_topic_required_group":{"one":"select %{count} tag from '%{name}'...","other":"select %{count} tags from '%{name}'..."},"info":"Info","default_info":"This tag isn't restricted to any categories, and has no synonyms.","staff_info":"To add restrictions, put this tag in a \u003ca href=%{basePath}/tag_groups\u003etag group\u003c/a\u003e.","category_restricted":"This tag is restricted to categories you don't have permission to access.","synonyms":"Synonyms","synonyms_description":"When the following tags are used, they will be replaced with \u003cb\u003e%{base_tag_name}\u003c/b\u003e.","save":"Save name and description of the tag","tag_groups_info":{"one":"This tag belongs to the group \"%{tag_groups}\".","other":"This tag belongs to these groups: %{tag_groups}."},"category_restrictions":{"one":"It can only be used in this category:","other":"It can only be used in these categories:"},"edit_synonyms":"Edit Synonyms","add_synonyms_label":"Add synonyms:","add_synonyms":"Add","add_synonyms_explanation":{"one":"Any place that currently uses this tag will be changed to use \u003cb\u003e%{tag_name}\u003c/b\u003e instead. Are you sure you want to make this change?","other":"Any place that currently uses these tags will be changed to use \u003cb\u003e%{tag_name}\u003c/b\u003e instead. Are you sure you want to make this change?"},"add_synonyms_failed":"The following tags couldn't be added as synonyms: \u003cb\u003e%{tag_names}\u003c/b\u003e. Ensure they don't have synonyms and aren't synonyms of another tag.","remove_synonym":"Remove Synonym","delete_synonym_confirm":"Are you sure you want to delete the synonym \"%{tag_name}\"?","delete_tag":"Delete Tag","delete_confirm":{"one":"Are you sure you want to delete this tag and remove it from %{count} topic it is assigned to?","other":"Are you sure you want to delete this tag and remove it from %{count} topics it is assigned to?"},"delete_confirm_no_topics":"Are you sure you want to delete this tag?","delete_confirm_synonyms":{"one":"Its synonym will also be deleted.","other":"Its %{count} synonyms will also be deleted."},"edit_tag":"Edit tag name and description","description":"Description","sort_by":"Sort by:","sort_by_count":"count","sort_by_name":"name","manage_groups":"Manage Tag Groups","manage_groups_description":"Define groups to organize tags","upload":"Upload Tags","upload_description":"Upload a csv file to create tags in bulk","upload_instructions":"One per line, optionally with a tag group in the format 'tag_name,tag_group'.","upload_successful":"Tags uploaded successfully","delete_unused_confirmation":{"one":"%{count} tag will be deleted: %{tags}","other":"%{count} tags will be deleted: %{tags}"},"delete_unused_confirmation_more_tags":{"one":"%{tags} and %{count} more","other":"%{tags} and %{count} more"},"delete_no_unused_tags":"There are no unused tags.","tag_list_joiner":", ","delete_unused":"Delete Unused Tags","delete_unused_description":"Delete all tags which are not attached to any topics or personal messages","filters":{"without_category":"%{filter} %{tag} topics","with_category":"%{filter} %{tag} topics in %{category}","untagged_without_category":"%{filter} untagged topics","untagged_with_category":"%{filter} untagged topics in %{category}"},"notifications":{"watching":{"title":"Watching","description":"You will automatically watch all topics with this tag. You will be notified of all new posts and topics, plus the count of unread and new posts will also appear next to the topic."},"watching_first_post":{"title":"Watching First Post","description":"You will be notified of new topics in this tag but not replies to the topics."},"tracking":{"title":"Tracking","description":"You will automatically track all topics with this tag. A count of unread and new posts will appear next to the topic."},"regular":{"title":"Normal","description":"You will be notified if someone mentions your @name or replies to your post."},"muted":{"title":"Muted","description":"You will not be notified of anything about new topics with this tag, and they will not appear on your unread tab."}},"groups":{"back_btn":"Back to all tags","title":"Tag Groups","about_heading":"Select a tag group or create a new one","about_heading_empty":"Create a new tag group to get started","about_description":"Tag groups help you manage permissions for many tags in one place.","new":"New Group","new_title":"Create New Group","edit_title":"Edit Tag Group","tags_label":"Tags in this group","parent_tag_label":"Parent tag","parent_tag_description":"Tags from this group can only be used if the parent tag is present.","one_per_topic_label":"Limit one tag per topic from this group","new_name":"New Tag Group","name_placeholder":"Name","save":"Save","delete":"Delete","confirm_delete":"Are you sure you want to delete this tag group?","everyone_can_use":"Tags can be used by everyone","usable_only_by_groups":"Tags are visible to everyone, but only the following groups can use them","visible_only_to_groups":"Tags are visible only to the following groups","cannot_save":"Cannot save tag group. Make sure that there is at least one tag present, tag group name is not empty, and a group is selected for tags permission.","tags_placeholder":"Search or create tags","parent_tag_placeholder":"Optional","select_groups_placeholder":"Select groups...","disabled":"Tagging is disabled. "},"topics":{"none":{"unread":"You have no unread topics.","unseen":"You have no unseen topics.","new":"You have no new topics.","read":"You haven't read any topics yet.","posted":"You haven't posted in any topics yet.","latest":"There are no latest topics.","bookmarks":"You have no bookmarked topics yet.","top":"There are no top topics."}}},"invite":{"custom_message":"Make your invite a little bit more personal by writing a \u003ca href\u003ecustom message\u003c/a\u003e.","custom_message_placeholder":"Enter your custom message","approval_not_required":"User will be auto-approved as soon as they accept this invite.","custom_message_template_forum":"Hey, you should join this forum!","custom_message_template_topic":"Hey, I thought you might enjoy this topic!"},"forced_anonymous":"Due to extreme load, this is temporarily being shown to everyone as a logged out user would see it.","forced_anonymous_login_required":"The site is under extreme load and cannot be loaded at this time, try again in a few minutes.","footer_nav":{"back":"Back","forward":"Forward","share":"Share","dismiss":"Dismiss"},"safe_mode":{"enabled":"Safe mode is enabled, to exit safe mode close this browser window"},"image_removed":"(image removed)","pause_notifications":{"title":"Pause notifications for...","label":"Pause notifications","options":{"half_hour":"30 minutes","one_hour":"1 hour","two_hours":"2 hours","tomorrow":"Until tomorrow"},"set_schedule":"Set a notification schedule"},"trust_levels":{"names":{"newuser":"new user","basic":"basic user","member":"member","regular":"regular","leader":"leader"},"detailed_name":"%{level}: %{name}"},"pick_files_button":{"unsupported_file_picked":"You have picked an unsupported file. Supported file types – %{types}."},"user_activity":{"no_activity_title":"No activity yet","no_activity_body":"Welcome to our community! You are brand new here and have not yet contributed to discussions. As a first step, visit \u003ca href='%{topUrl}'\u003eTop\u003c/a\u003e or \u003ca href='%{categoriesUrl}'\u003eCategories\u003c/a\u003e and just start reading! Select %{heartIcon} on posts that you like or want to learn more about. As you participate, your activity will be listed here.","no_replies_title":"You have not replied to any topics yet","no_replies_title_others":"%{username} has not replied to any topics yet","no_replies_body":"When you \u003ca href='%{searchUrl}'\u003ediscover\u003c/a\u003e an interesting conversation that you wish to contribute to, press the \u003ckbd\u003eReply\u003c/kbd\u003e button directly under any post to begin replying to that specific post. Or, if you’d prefer to reply to the general topic rather than any individual post or person, look for the \u003ckbd\u003eReply\u003c/kbd\u003e button at the very bottom of the topic, or under the topic timeline.","no_drafts_title":"You haven’t started any drafts","no_drafts_body":"Not quite ready to post? We’ll automatically save a new draft and list it here whenever you start composing a topic, reply, or personal message. Select the cancel button to discard or save your draft to continue later.","no_likes_title":"You haven’t liked any topics yet","no_likes_title_others":"%{username} has not liked any topics yet","no_likes_body":"A great way to jump in and start contributing is to start reading conversations that have already taken place, and select the %{heartIcon} on posts that you like!","no_topics_title":"You have not started any topics yet","no_topics_body":"It’s always best to \u003ca href='%{searchUrl}'\u003esearch\u003c/a\u003e for existing topics of conversation before starting a new one, but if you’re confident the topic you want isn’t out there already, go ahead and start a new topic of your very own. Look for the \u003ckbd\u003e+ New Topic\u003c/kbd\u003e button at the top right of the topic list, category, or tag to begin creating a new topic in that area.","no_topics_title_others":"%{username} has not started any topics yet","no_read_topics_title":"You haven’t read any topics yet","no_read_topics_body":"Once you start reading discussions, you’ll see a list here. To start reading, look for topics that interest you in \u003ca href='%{topUrl}'\u003eTop\u003c/a\u003e or \u003ca href='%{categoriesUrl}'\u003eCategories\u003c/a\u003e or search by keyword %{searchIcon}"},"no_group_messages_title":"No group messages found","topic_entrance":{"sr_jump_top_button":"Jump to the first post","sr_jump_bottom_button":"Jump to the last post"},"fullscreen_table":{"expand_btn":"Expand Table"},"second_factor_auth":{"redirect_after_success":"Second factor authentication is successful. Redirecting to the previous page…"},"sidebar":{"show_sidebar":"Show sidebar","hide_sidebar":"Hide sidebar","unread_count":{"one":"%{count} unread","other":"%{count} unread"},"new_count":{"one":"%{count} new","other":"%{count} new"},"toggle_section":"Toggle section","more":"More","all_categories":"All categories","all_tags":"All tags","sections":{"custom":{"add":"Add custom section","edit":"Edit custom section","save":"Save","delete":"Delete","delete_confirm":"Are you sure you want to delete this section?","public":"Make this section public and visible to everyone","links":{"add":"Add another link","delete":"Delete link","icon":{"label":"Icon","validation":{"blank":"Icon cannot be blank","maximum":"Icon must be shorter than %{count} characters"}},"name":{"label":"Name","validation":{"blank":"Name cannot be blank","maximum":"Name must be shorter than %{count} characters"}},"value":{"label":"Link","validation":{"blank":"Link cannot be blank","maximum":"Link must be shorter than %{count} characters","invalid":"Format is invalid"}}},"title":{"label":"Section title","validation":{"blank":"Title cannot be blank","maximum":"Title must be shorter than %{count} characters"}}},"about":{"header_link_text":"About"},"messages":{"header_link_text":"Messages","header_action_title":"Create a personal message","links":{"inbox":"Inbox","sent":"Sent","new":"New","new_with_count":"New (%{count})","unread":"Unread","unread_with_count":"Unread (%{count})","archive":"Archive"}},"tags":{"links":{"add_tags":{"content":"Add tags","title":"You have not added any tags. Click to get started."}},"none":"You have not added any tags.","click_to_get_started":"Click here to get started.","header_link_text":"Tags","header_action_title":"Edit your sidebar tags","configure_defaults":"Configure defaults"},"categories":{"links":{"add_categories":{"content":"Add categories","title":"You have not added any categories. Click to get started."}},"none":"You have not added any categories.","click_to_get_started":"Click here to get started.","header_link_text":"Categories","header_action_title":"Edit your sidebar categories","configure_defaults":"Configure defaults"},"community":{"header_link_text":"Community","header_action_title":"Create a topic","links":{"about":{"content":"About","title":"More details about this site"},"admin":{"content":"Admin","title":"Site settings and reports"},"badges":{"content":"Badges","title":"All the badges available to earn"},"everything":{"content":"Everything","title":"All topics"},"faq":{"content":"FAQ","title":"Guidelines for using this site"},"groups":{"content":"Groups","title":"List of available user groups"},"users":{"content":"Users","title":"List of all users"},"my_posts":{"content":"My Posts","content_drafts":"My Drafts","title":"My recent topic activity","title_drafts":"My unposted drafts","draft_count":{"one":"%{count} draft","other":"%{count} drafts"}},"review":{"content":"Review","title":"Flagged posts and other queued items","pending_count":"%{count} pending"}}}}},"welcome_topic_banner":{"title":"Create your Welcome Topic","description":"Your welcome topic is the first thing new members will read. Think of it as your “elevator pitch” or “mission statement.” Let everyone know who this community is for, what they can expect to find here, and what you’d like them to do first.","button_title":"Start Editing"},"until":"Until:","char_counter":{"exceeded":"The maximum number of characters allowed has been exceeded."},"admin":{"site_settings":{"categories":{"chat":"Chat","chat_integration":"Chat Integrations"}},"logs":{"staff_actions":{"actions":{"chat_channel_status_change":"Chat channel status changed","chat_channel_delete":"Chat channel deleted","chat_auto_remove_membership":"Memberships automatically removed from channels","confirmed_ham":"Not spam","confirmed_spam":"Confirm spam","confirmed_spam_deleted":"Confirm spam and delete user","ignored":"Ignore spam","discourse_upgrade":"Upgrade to the latest version"}}},"api":{"scopes":{"descriptions":{"chat":{"create_message":"Create a chat message in a specified channel."},"solved":{"answer":"Accept/Unaccept a solution."}}}},"akismet_api_error":"Akismet API Error:","web_hooks":{"assign_event":{"name":"Assign Event","details":"When a user assigns or unassigns a topic."},"solved_event":{"name":"Solved Event","details":"When a user marks a post as the accepted or unaccepted answer."}},"docker":{"all_up_to_date":"All Up-to-date","checking":"Checking for new version…","commits":{"one":"%{count} new commit","other":"%{count} new commits"},"everything_up_to_date":"Everything is up-to-date","forked_plugin":"Forked Official Plugin","last_updated":"Last Updated:","latest_version":"Latest Version:","main_branch_warning":"\u003cb\u003eWARNING:\u003c/b\u003e Your Discourse is tracking the 'main' branch which may be unstable, \u003ca href='%{url}'\u003e we recommend tracking the 'tests-passed' branch\u003c/a\u003e.","navigation":{"processes":"Processes","versions":"Versions"},"new_version_available":"New Version Available!","official_plugin":"Official Plugin","outdated_image_header":"You are running an old version of the Discourse image","outdated_image_info":"Upgrades via the web UI are disabled until you run the latest image. To do so log in to your server using SSH and run:","outdated_image_link":"More info on our support site","outdated_notice":"Your Discourse installation is out of date.","perform_upgrade":"Click here to upgrade.","repo_newest_version":"%{name} is at the newest version.","repository":"Repository","reset_upgrade":"Reset Upgrade","reset_warning":"WARNING: You should only reset upgrades that have failed and are not running. This will NOT cancel currently running builds and should only be used as a last resort.","start_upgrading":"Start Upgrading","status":"Status","up_to_date":"Up to date","upgrade_action":"Upgrade","upgrade_all":"Upgrade All","upgrade_error":"Sorry, there was an error upgrading Discourse. Please check the logs below.","upgrade_everything":"Upgrade everything","upgrade_repo":"Upgrade %{name}","upgrade_successful":"Upgrade completed successfully!","upgrade_tab":"Upgrade","upgrade_title":"Upgrade","upgrading":"Upgrading…"}},"chat":{"dates":{"time_tiny":"h:mm"},"all_loaded":"Showing all messages","already_enabled":"Chat is already enabled on this topic. Please refresh.","disabled_for_topic":"Chat is disabled on this topic.","bot":"bot","create":"Create","cancel":"Cancel","cancel_reply":"Cancel reply","chat_channels":"Channels","browse_all_channels":"Browse all channels","move_to_channel":{"title":"Move messages to channel","instructions":{"one":"You are moving \u003cstrong\u003e%{count}\u003c/strong\u003e message. Select a destination channel. A placeholder message will be created in the \u003cstrong\u003e%{channelTitle}\u003c/strong\u003e channel to indicate that this message has been moved. Note that reply chains will not be preserved in the new channel, and messages in the old channel will no longer show as replying to any moved messages.","other":"You are moving \u003cstrong\u003e%{count}\u003c/strong\u003e messages. Select a destination channel. A placeholder message will be created in the \u003cstrong\u003e%{channelTitle}\u003c/strong\u003e channel to indicate that these messages have been moved. Note that reply chains will not be preserved in the new channel, and messages in the old channel will no longer show as replying to any moved messages."},"confirm_move":"Move Messages"},"channel_settings":{"title":"Channel settings","edit":"Edit","add":"Add","close_channel":"Close channel","open_channel":"Open channel","archive_channel":"Archive channel","delete_channel":"Delete channel","join_channel":"Join channel","leave_channel":"Leave channel","join":"Join","leave":"Leave","save_label":{"mute_channel":"Mute channel preference saved","desktop_notification":"Desktop notification preference saved","mobile_notification":"Mobile push notification preference saved"}},"channel_archive":{"title":"Archive Channel","instructions":"\u003cp\u003eArchiving a channel puts it into read-only mode and moves all messages from the channel into a new or existing topic. No new messages can be sent, and no existing messages can be edited or deleted.\u003c/p\u003e\u003cp\u003eAre you sure you want to archive the \u003cstrong\u003e%{channelTitle}\u003c/strong\u003e channel?\u003c/p\u003e","process_started":"Archiving process has started. This modal will close shortly, and you will receive a personal message when the archive process is complete.","retry":"Retry"},"channel_open":{"title":"Open Channel","instructions":"Reopens the channel, all users will be able to send messages and edit their existing messages."},"channel_close":{"title":"Close Channel","instructions":"Closing the channel prevents non-staff users from sending new messages or editing existing messages. Are you sure you want to close this channel?"},"channel_delete":{"title":"Delete Channel","instructions":"\u003cp\u003eDeletes the \u003cstrong\u003e%{name}\u003c/strong\u003e channel and chat history. All messages and related data, such as reactions and uploads, will be permanently deleted. If you want to preserve the channel history and decommission it, you may want to archive the channel instead.\u003c/p\u003e \u003cp\u003eAre you sure you want to \u003cstrong\u003epermanently delete\u003c/strong\u003e the channel? To confirm, type the name of the channel in the box below.\u003c/p\u003e","confirm":"I understand the consequences, delete the channel","confirm_channel_name":"Enter channel name","process_started":"The process to delete the channel has started. This modal will close shortly, you will no longer see the deleted channel anywhere."},"channels_list_popup":{"browse":"Browse channels","create":"New channel"},"click_to_join":"Click here to view available channels.","close":"Close","collapse":"Collapse Chat Drawer","expand":"Expand Chat Drawer","confirm_flag":"Are you sure you want to flag %{username}'s message?","deleted":"A message was deleted. [view]","hidden":"A message was hidden. [view]","delete":"Delete","edited":"edited","muted":"muted","joined":"joined","empty_state":{"direct_message_cta":"Start a personal Chat","direct_message":"You can also start a personal chat with one or more users.","title":"No channels found"},"email_frequency":{"description":"We'll only email you if we haven't seen you in the last 15 minutes.","never":"Never","title":"Email Notifications","when_away":"Only when away"},"header_indicator_preference":{"title":"Show activity indicator in header","all_new":"All New Messages","dm_and_mentions":"Direct Messages and Mentions","never":"Never"},"enable":"Enable chat","flag":"Flag","emoji":"Insert emoji","flagged":"This message has been flagged for review","invalid_access":"You don't have access to view this chat channel","invitation_notification":"\u003cspan\u003e%{username}\u003c/span\u003e \u003cspan\u003einvited you to join a chat channel\u003c/span\u003e","in_reply_to":"In reply to","heading":"Chat","join":"Join","last_visit":"last visit","mention_warning":{"dismiss":"dismiss","cannot_see":"%{username} can't access this channel and was not notified.","cannot_see_multiple":{"one":"%{username} and %{count} other user cannot access this channel and were not notified.","other":"%{username} and %{count} other users cannot access this channel and were not notified."},"invitations_sent":{"one":"Invitation sent","other":"Invitations sent"},"invite":"Invite to channel","without_membership":"%{username} has not joined this channel.","without_membership_multiple":{"one":"%{username} and %{count} other user have not joined this channel.","other":"%{username} and %{count} other users have not joined this channel."},"group_mentions_disabled":"%{group_name} doesn't allow mentions.","group_mentions_disabled_multiple":{"one":"%{group_name} and %{count} other group don't allow mentions.","other":"%{group_name} and %{count} other groups don't allow mentions."},"too_many_members":"%{group_name} has too many members. No one was notified.","too_many_members_multiple":{"one":"%{group_name} and %{count} other group have too many members. No one was notified.","other":"%{group_name} and %{count} other groups have too many members. No one was notified."},"groups":{"header":{"some":"Some users won't be notified","all":"Nobody will be notified"},"unreachable_1":"@%{group} doesn't allow mentions.","unreachable_2":"@%{group1} and @%{group2} don't allow mentions.","unreachable_multiple":{"one":"@%{group} and %{count} other group don't allow mentions.","other":"@%{group} and %{count} other groups don't allow mentions."}},"too_many_mentions":{"one":"This message exceeds the notification limit of %{count} mention.","other":"This message exceeds the notification limit of %{count} mentions."},"too_many_mentions_admin":{"one":"This message exceeds the \u003ca href=\"%{siteSettingUrl}\" target=\"_blank\"\u003enotification limit\u003c/a\u003e of %{count} mention.","other":"This message exceeds the \u003ca href=\"%{siteSettingUrl}\" target=\"_blank\"\u003enotification limit\u003c/a\u003e of %{count} mentions."}},"aria_roles":{"header":"Chat header","composer":"Chat composer","channels_list":"Chat channels list"},"no_public_channels":"You have not joined any channels.","kicked_from_channel":"You can no longer access this channel.","only_chat_push_notifications":{"title":"Only send chat push notifications","description":"Block all non-chat push notifications from being sent"},"ignore_channel_wide_mention":{"title":"Ignore channel-wide mentions","description":"Do not send notifications for channel-wide mentions (@here and @all)"},"open":"Open chat","open_full_page":"Open full-screen chat","close_full_page":"Close full-screen chat","open_message":"Open message in chat","placeholder_self":"Jot something down","placeholder_channel":"Chat in %{channelName}","placeholder_thread":"Chat in thread","placeholder_users":"Chat with %{commaSeparatedNames}","placeholder_new_message_disallowed":{"archived":"Channel is archived, you cannot send new messages right now.","closed":"Channel is closed, you cannot send new messages right now.","read_only":"Channel is read only, you cannot send new messages right now."},"placeholder_silenced":"You cannot send messages at this time.","placeholder_start_conversation":"Start a conversation with ...","placeholder_start_conversation_users":"Start a conversation with %{commaSeparatedUsernames}","remove_upload":"Remove file","react":"React with emoji","reply":"Reply","edit":"Edit","copy_link":"Copy link","rebake_message":"Rebuild HTML","retry_staged_message":{"title":"Network error","action":"Send again?"},"unreliable_network":"Network is unreliable, sending messages and saving draft might not work","bookmark_message":"Bookmark","bookmark_message_edit":"Edit Bookmark","restore":"Restore deleted message","save":"Save","select":"Select","return_to_list":"Return to channels list","scroll_to_bottom":"Scroll to bottom","scroll_to_new_messages":"See new messages","sound":{"title":"Desktop chat notification sound"},"sounds":{"none":"None","bell":"Bell","ding":"Ding"},"title":"chat","title_capitalized":"Chat","upload":"Attach a file","upload_to_channel":"Upload to %{title}","upload_to_thread":"Upload to thread","uploaded_files":{"one":"%{count} file","other":"%{count} files"},"you_flagged":"You flagged this message","exit":"back","channel_status":{"read_only_header":"Channel is read only","read_only":"Read Only","archived_header":"Channel is archived","archived":"Archived","archive_failed":"Archive channel failed. %{completed}/%{total} messages have been archived. \u003ca target=\"_blank\" href=\"%{topic_url}\"\u003ethe destination topic\u003c/a\u003e. Press retry to attempt to complete the archive.","archive_failed_no_topic":"Archive channel failed. %{completed}/%{total} messages have been archived, the destination topic was not created. Press retry to attempt to complete the archive.","archive_completed":"See \u003ca target=\"_blank\" href=\"%{topic_url}\"\u003ethe archive topic\u003c/a\u003e","closed_header":"Channel is closed","closed":"Closed","open_header":"Channel is open","open":"Open"},"browse":{"back":"Back","title":"Channels","filter_all":"All","filter_open":"Opened","filter_closed":"Closed","filter_archived":"Archived","filter_input_placeholder":"Search channel by name"},"chat_message_separator":{"today":"Today","yesterday":"Yesterday"},"members_view":{"filter_placeholder":"Find members"},"about_view":{"associated_topic":"Linked topic","associated_category":"Linked category","title":"Title","name":"Name","description":"Description"},"channel_info":{"back_to_all_channels":"All channels","back_to_channel":"Back","tabs":{"about":"About","members":"Members","settings":"Settings"}},"channel_edit_name_slug_modal":{"title":"Edit channel","input_placeholder":"Add a name","slug_description":"A channel slug is used in the URL instead of the channel name","name":"Channel name","slug":"Channel slug (optional)"},"channel_edit_description_modal":{"title":"Edit description","input_placeholder":"Add a description","description":"Tell people what this channel is all about"},"direct_message_creator":{"title":"New Message","prefix":"To:","no_results":"No results","selected_user_title":"Deselect %{username}"},"channel_selector":{"title":"Jump to channel","no_channels":"No channels match your search"},"channel":{"no_memberships":"This channel has no members","no_memberships_found":"No members found","memberships_count":{"one":"%{count} member","other":"%{count} members"}},"create_channel":{"auto_join_users":{"public_category_warning":"%{category} is a public category. Automatically add all recently active users to this channel?","warning_1_group":{"one":"Automatically add %{count} user from %{group}?","other":"Automatically add %{count} users from %{group}?"},"warning_2_groups":{"one":"Automatically add %{count} user from %{group1} and %{group2}?","other":"Automatically add %{count} users from %{group1} and %{group2}?"}},"choose_category":{"label":"Choose a category","none":"select one...","default_hint":"Manage access by visiting \u003ca href=%{link} target=\"_blank\"\u003e%{category} security settings\u003c/a\u003e","hint_1_group":"Users in %{group} will have access to this channel per the \u003ca href=\"%{settingLink}\" target=\"_blank\"\u003esecurity settings\u003c/a\u003e","hint_2_groups":"Users in %{group1} and %{group2} will have access to this channel per the \u003ca href=\"%{settingLink}\" target=\"_blank\"\u003esecurity settings\u003c/a\u003e","hint_multiple_groups":{"one":"Users in %{group} and %{count} other group will have access to this channel per the \u003ca href=\"%{settingLink}\" target=\"_blank\"\u003esecurity settings\u003c/a\u003e","other":"Users in %{group} and %{count} other groups will have access to this channel per the \u003ca href=\"%{settingLink}\" target=\"_blank\"\u003esecurity settings\u003c/a\u003e"}},"create":"Create channel","description":"Description (optional)","name":"Channel name","slug":"Channel slug (optional)","title":"New channel","type":"Type","types":{"category":"Category","topic":"Topic"}},"reviewable":{"type":"Chat message"},"reactions":{"only_you":"You reacted with :%{emoji}:","you_and_single_user":"You and %{username} reacted with :%{emoji}:","you_and_multiple_users":"You, %{commaSeparatedUsernames} and %{username} reacted with :%{emoji}:","you_multiple_users_and_more":{"one":"You, %{commaSeparatedUsernames} and %{count} other reacted with :%{emoji}:","other":"You, %{commaSeparatedUsernames} and %{count} others reacted with :%{emoji}:"},"single_user":"%{username} reacted with :%{emoji}:","multiple_users":"%{commaSeparatedUsernames} and %{username} reacted with :%{emoji}:","multiple_users_and_more":{"one":"%{commaSeparatedUsernames} and %{count} other reacted with :%{emoji}:","other":"%{commaSeparatedUsernames} and %{count} others reacted with :%{emoji}:"}},"composer":{"toggle_toolbar":"Toggle toolbar","italic_text":"emphasized text","bold_text":"strong text","code_text":"code text","send":"Send"},"quote":{"original_channel":"Originally sent in \u003ca href=\"%{channelLink}\"\u003e%{channel}\u003c/a\u003e","copy_success":"Chat quote copied to clipboard"},"notification_levels":{"never":"Never","mention":"Only for mentions","always":"For all activity"},"settings":{"channel_wide_mentions_label":"Allow @all and @here mentions","channel_wide_mentions_description":"Allow users to notify all members of #%{channel} with @all or only those who are active in the moment with @here","auto_join_users_label":"Automatically add users","auto_join_users_info":"Check hourly which users have been active in the last 3 months. Add them to this channel if they have access to the %{category} category.","auto_join_users_info_no_category":"Check hourly which users have been active in the last 3 months. Add them to this channel if they have access to the selected category.","auto_join_users_warning":"Every user who isn't a member of this channel and has access to the %{category} category will join. Are you sure?","desktop_notification_level":"Desktop notifications","follow":"Join","followed":"Joined","mobile_notification_level":"Mobile push notifications","mute":"Mute channel","muted_on":"On","muted_off":"Off","notifications":"Notifications","preview":"Preview","save":"Save","saved":"Saved","unfollow":"Leave","admin_title":"Admin"},"admin":{"title":"Chat"},"direct_messages":{"title":"Personal chat","new":"Create a personal chat","create":"Go","leave":"Leave this personal chat","cannot_create":"Sorry, you cannot send direct messages."},"incoming_webhooks":{"back":"Back","channel_placeholder":"Select a channel","confirm_destroy":"Are you sure you want to delete this incoming webhook? This cannot be un-done.","current_emoji":"Current Emoji","description":"Description","delete":"Delete","emoji":"Emoji","emoji_instructions":"System avatar will be used if emoji is left blank.","name":"Name","name_placeholder":"name...","new":"New incoming webhook","none":"No existing incoming webhooks created.","no_emoji":"No Emoji selected","post_to":"Post to","reset_emoji":"Reset Emoji","save":"Save","edit":"Edit","select_emoji":"Choose Emoji","system":"system","title":"Incoming webhooks","url":"URL","url_instructions":"This URL contains a secret value - keep it safe.","username":"Username","username_instructions":"Username of bot that posts to channel. Defaults to 'system' when left blank.","instructions":"Incoming webhooks can be used by external systems to post messages into a designated chat channel as a bot user via the \u003ccode\u003e/hooks/:key\u003c/code\u003e endpoint. The payload consists of a single \u003ccode\u003etext\u003c/code\u003e parameter, which is limited to 2000 characters.\u003cbr\u003e\u003cbr\u003eWe also support limited Slack-formatted \u003ccode\u003etext\u003c/code\u003e parameters, extracting links and mentions based on the format at \u003ca href=\"https://api.slack.com/reference/surfaces/formatting\"\u003ehttps://api.slack.com/reference/surfaces/formatting\u003c/a\u003e, but the \u003ccode\u003e/hooks/:key/slack\u003c/code\u003e endpoint must be used for this."},"selection":{"cancel":"Cancel","quote_selection":"Quote in Topic","copy":"Copy","move_selection_to_channel":"Move to Channel","error":"There was an error moving the chat messages","title":"Move Chat to Topic","new_topic":{"title":"Move to New Topic","instructions":{"one":"You are about to create a new topic and populate it with the chat message you've selected.","other":"You are about to create a new topic and populate it with the \u003cb\u003e%{count}\u003c/b\u003e chat messages you've selected."},"instructions_channel_archive":"You are about to create a new topic and archive the channel messages to it."},"existing_topic":{"title":"Move to Existing Topic","instructions":{"one":"Please choose the topic you'd like to move that chat message to.","other":"Please choose the topic you'd like to move those \u003cb\u003e%{count}\u003c/b\u003e chat messages to."},"instructions_channel_archive":"Please choose the topic you'd like to archive the channel messages to."},"new_message":{"title":"Move to New Message","instructions":{"one":"You are about to create a new message and populate it with the chat message you've selected.","other":"You are about to create a new message and populate it with the \u003cb\u003e%{count}\u003c/b\u003e chat messages you've selected."}}},"replying_indicator":{"single_user":"%{username} is typing","multiple_users":"%{commaSeparatedUsernames} and %{lastUsername} are typing","many_users":{"one":"%{commaSeparatedUsernames} and %{count} other are typing","other":"%{commaSeparatedUsernames} and %{count} others are typing"}},"retention_reminders":{"public_none":"Channel history is retained indefinitely.","public":{"one":"Channel history is retained for %{count} day.","other":"Channel history is retained for %{count} days."},"dm_none":"Personal chat history is retained indefinitely.","dm":{"one":"Personal chat history is retained for %{count} day.","other":"Personal chat history is retained for %{count} days."}},"flags":{"off_topic":"This message is not relevant to the current discussion as defined by the channel title, and should probably be moved elsewhere.","inappropriate":"This message contains content that a reasonable person would consider offensive, abusive, or a violation of \u003ca href=\"%{basePath}/guidelines\"\u003eour community guidelines\u003c/a\u003e.","spam":"This message is an advertisement, or vandalism. It is not useful or relevant to the current channel.","notify_user":"I want to talk to this person directly and personally about their message.","notify_moderators":"This message requires staff attention for another reason not listed above."},"flagging":{"action":"Flag message"},"emoji_picker":{"favorites":"Frequently used","smileys_\u0026_emotion":"Smileys and emotion","objects":"Objects","people_\u0026_body":"People and body","travel_\u0026_places":"Travel and places","animals_\u0026_nature":"Animals and nature","food_\u0026_drink":"Food and drink","activities":"Activities","flags":"Flags","symbols":"Symbols","search_placeholder":"Search by emoji name and alias...","no_results":"No results"},"thread":{"view_thread":"View thread","replies":{"one":"%{count} reply","other":"%{count} replies"},"label":"Thread","close":"Close Thread"},"threads":{"started_by":"Started by","open":"Open Thread"},"draft_channel_screen":{"header":"New Message","cancel":"Cancel"}},"discourse_automation":{"scriptables":{"send_chat_message":{"title":"Send chat message","fields":{"chat_channel_id":{"label":"Chat channel ID"},"message":{"label":"Message"},"sender":{"label":"Sender","description":"Defaults to system"}}},"random_assign":{"fields":{"post_template":{"label":"Post template","description":"If filled, a post with this template will be created and a user assigned to it instead of the topic."},"assignees_group":{"label":"Assignees Group"},"minimum_time_between_assignments":{"label":"Minimum hours between assignments"},"min_recently_assigned_days":{"label":"Min recently assigned days","description":"Defaults to 14 days."},"skip_new_users_for_days":{"label":"Skip new users for days","description":"Defaults to 0 days (users can be assigned immediately after signing up)."},"max_recently_assigned_days":{"label":"Max recently assigned days","description":"First attempt to exclude users assigned in the last `n` days. If no user left, fallbacks to `min_recently_assigned_days`. Defaults to 180 days."},"assigned_topic":{"label":"Assigned Topic ID"},"in_working_hours":{"label":"Users in working hours"}}},"send_slack_message":{"title":"Send Slack message","fields":{"message":{"label":"Message"},"url":{"label":"URL"},"channel":{"label":"Channel"}}}},"triggerables":{"first_accepted_solution":{"max_trust_level":{"tl1":"\u003c TL1","tl2":"\u003c TL2","tl3":"\u003c TL3","tl4":"\u003c TL4","any":"Any"},"fields":{"maximum_trust_level":{"label":"Trust Level","description":"Users under this Trust Level will trigger this automation"}}}}},"akismet":{"title":"Akismet","confirm_spam":"Delete Post","confirm_spam_description":"Agree with flag, delete the post and submit feedback to Akismet.","not_spam":"Not Spam","confirm_delete":"Confirm Spam \u0026 Delete User","confirm_suspend":"Suspend User","confirm_suspend_description":"Agree with flag and suspend the user.","dismiss":"Dismiss","ignore":"Ignore","reviewable_delete_prompt":"Are you sure you want to delete this user? This will remove all of their posts and block their email and ip address.","topic_deleted":"Our automated spam filter, Akismet, has temporarily hidden this topic.","user_state":{"pending":"Akismet has not checked this user yet.","skipped":"This user has not been verified by Akismet.","confirmed_ham":"Akismet decided that this user is not spam.","confirmed_spam":"Akismet decided that this user is spam."},"post_state":{"pending":"Akismet has not checked this post yet.","skipped":"This post has not been verified by Akismet.","confirmed_ham":"This post was marked as not spam by Akismet.","confirmed_spam":"This post was marked as spam by Akismet."}},"discourse_assign":{"add_unassigned_filter":"Add 'unassigned' filter to category","cant_act":"You cannot act on flags that have been assigned to other users","cant_act_unclaimed":"You must claim this topic before acting on flags.","topic_search_placeholder":"Search topics by title or post content","sidebar_name_filter_placeholder":"Name/Username","assigned":"Assigned","group_everyone":"Everyone","assigned_to":"Assigned to","assigned_topic_to":"Assigned topic to \u003ca href='%{path}'\u003e%{username}\u003c/a\u003e","assign_post_to":"Assigned #%{post_number} to %{username}","assign_post_to_multiple":"#%{post_number} to %{username}","assigned_to_w_ellipsis":"Assigned to...","assign_notification":"\u003cp\u003e\u003cspan\u003e%{username}\u003c/span\u003e %{description}\u003c/p\u003e","assign_group_notification":"\u003cp\u003e\u003cspan\u003e%{username}\u003c/span\u003e %{description}\u003c/p\u003e","unassign":{"title":"Unassign","title_w_ellipsis":"Unassign...","help":"Unassign %{username} from Topic"},"assign":{"title":"Assign","help":"Assign Topic to User"},"assign_post":{"title":"Assign Post"},"unassign_post":{"title":"Unassign from Post","help":"Unassign %{username} from Post"},"reassign":{"title":"Edit","title_w_ellipsis":"Edit assignment...","to_self":"Reassign to me","to_self_help":"Reassign Topic to me","help":"Edit assignment details"},"reassign_modal":{"title":"Reassign Topic"},"assign_modal":{"title":"Assign Topic","reassign_title":"Reassign Topic","assign":"Assign","assignee_label":"Assignee","choose_assignee":"Choose a user to assign.","note_label":"Note","optional_label":"(optional)","status_label":"Status","suggestions":"suggestions"},"assign_post_modal":{"title":"Assign Post"},"claim":{"title":"claim","help":"Assign topic to yourself"},"assign_mailer":{"never":"Never","different_users":"Only if assigner and assignee are different users","always":"Always"},"reminders_frequency":{"description":"Frequency for receiving assigned topics reminders","never":"Never","daily":"Daily","weekly":"Weekly","monthly":"Monthly","quarterly":"Quarterly"},"admin":{"groups":{"manage":{"interaction":{"assign":"Assign","assignable_levels":{"title":"Who can assign this group"}}}}}},"notification_reason":{"user":"You will see a count of new replies because this topic was assigned to you."},"cakeday":{"none":" ","title":"Cakeday","today":"Today","tomorrow":"Tomorrow","upcoming":"Upcoming","all":"All"},"birthdays":{"title":"Birthdays","month":{"title":"Birthdays in the Month of","empty":"There are no users celebrating their birthdays this month."},"upcoming":{"title":"Birthdays for %{start_date} - %{end_date}","empty":"There are no users celebrating their birthdays in the next 7 days."},"today":{"title":"Birthdays for %{date}","empty":"There are no users celebrating their birthdays today."},"tomorrow":{"empty":"There are no users celebrating their birthdays tomorrow."}},"anniversaries":{"title":"Anniversaries","month":{"title":"Anniversaries in the Month of","empty":"There are no users celebrating their anniversaries this month."},"upcoming":{"title":"Anniversaries for %{start_date} - %{end_date}","empty":"There are no users celebrating their anniversaries in the next 7 days."},"today":{"title":"Anniversaries for %{date}","empty":"There are no users celebrating their anniversaries today."},"tomorrow":{"empty":"There are no users celebrating their anniversaries tomorrow."}},"canned_replies":{"filter_hint":"Filter by title...","composer_button_text":"Canned replies","title":{"name":"Title","invalid":"Title can't be empty."},"content":{"name":"Content","invalid":"Content can't be empty."},"insert":{"choose":"(choose a reply)","insert_button":"Insert Reply","new_button":"New","edit_button":"Edit","modal_title":"Insert Canned Reply","sort":{"alphabetically":"Sort alphabetically","usage":"Sort by frequency of use"}},"add":{"modal_title":"Add Canned Reply"},"edit":{"modal_title":"Edit Canned Reply","remove_confirm":"Are you sure you want to delete this canned reply?"},"back":"Back"},"chat_integration":{"menu_title":"Chat Integrations","settings":"Settings","no_providers":"You need to enable some providers in the plugin settings","channels_with_errors":"Some channels for this provider failed last time messages were sent. Click the error icon(s) to learn more.","channel_exception":"An unknown error occured when a message was last sent to this channel.","group_mention_template":"Mentions of: @%{name}","group_message_template":"Messages to: @%{name}","choose_group":"(choose a group)","all_categories":"(all categories)","all_tags":"(all tags)","create_rule":"Create Rule","create_channel":"Create Channel","delete_channel":"Delete","test_channel":"Test","edit_channel":"Edit","channel_delete_confirm":"Are you sure you want to delete this channel? All associated rules will be deleted.","test_modal":{"title":"Send a test message","topic":"Topic","send":"Send Test Message","close":"Close","error":"An unknown error occured while sending the message. Check the site logs for more information.","success":"Message sent successfully"},"type":{"normal":"Normal","group_message":"Group Message","group_mention":"Group Mention"},"filter":{"mute":"Mute","follow":"First post only","watch":"All posts and replies","tag_added":"Tag added to topic","thread":"All posts with threaded replies"},"rule_table":{"filter":"Filter","category":"Category","tags":"Tags","edit_rule":"Edit","delete_rule":"Delete"},"edit_channel_modal":{"title":"Edit Channel","save":"Save Channel","cancel":"Cancel","provider":"Provider","channel_validation":{"ok":"Valid","fail":"Invalid format"}},"edit_rule_modal":{"title":"Edit Rule","save":"Save Rule","cancel":"Cancel","provider":"Provider","type":"Type","channel":"Channel","filter":"Filter","category":"Category","group":"Group","tags":"Tags","instructions":{"type":"Change the type to trigger notifications for group messages or mentions","filter":"Notification level. Mute overrides other matching rules","category":"This rule will only apply to topics in the specified category","group":"This rule will apply to posts referencing this group","tags":"If specified, this rule will only apply to topics which have at least one of these tags"}},"provider":{"slack":{"title":"Slack","param":{"identifier":{"title":"Channel","help":"e.g. #channel, @username."}},"errors":{"action_prohibited":"The bot does not have permission to post to that channel","channel_not_found":"The specified channel does not exist on slack"}},"telegram":{"title":"Telegram","param":{"name":{"title":"Name","help":"A name to describe the channel. It is not used for the connection to Telegram."},"chat_id":{"title":"Chat ID","help":"A number given to you by the bot, or a broadcast channel identifier in the form @channelname"}},"errors":{"channel_not_found":"The specified channel does not exist on Telegram","forbidden":"The bot does not have permission to post to this channel"}},"discord":{"title":"Discord","param":{"name":{"title":"Name","help":"A name to describe the channel. It is not used for the connection to Discord."},"webhook_url":{"title":"Webhook URL","help":"The webhook URL created in your Discord server settings"}}},"guilded":{"title":"Guilded","param":{"name":{"title":"Name","help":"A name to describe the channel. It is not used for the connection to Guilded"},"webhook_url":{"title":"Webhook URL","help":"The webhook URL created in your Guilded server settings"}}},"mattermost":{"title":"Mattermost","param":{"identifier":{"title":"Channel","help":"e.g. #channel, @username."}},"errors":{"channel_not_found":"The specified channel does not exist on Mattermost"}},"matrix":{"title":"Matrix","param":{"name":{"title":"Name","help":"A name to describe the channel. It is not used for the connection to Matrix."},"room_id":{"title":"Room ID","help":"The 'private identifier' for the room. It should look something like !abcdefg:matrix.org"}},"errors":{"unknown_token":"Access token is invalid","unknown_room":"Room ID is invalid"}},"zulip":{"title":"Zulip","param":{"stream":{"title":"Stream","help":"The name of the Zulip stream the message should be sent to. e.g. 'general'"},"subject":{"title":"Subject","help":"The subject that these messages sent by the bot should be given"}},"errors":{"does_not_exist":"That stream does not exist on Zulip"}},"rocketchat":{"title":"Rocket.Chat","param":{"identifier":{"title":"Channel","help":"e.g. #channel, @username."}},"errors":{"invalid_channel":"That channel does not exist on Rocket Chat"}},"gitter":{"title":"Gitter","param":{"name":{"title":"Name","help":"A Gitter room's name e.g. gitterHQ/services."},"webhook_url":{"title":"Webhook URL","help":"The URL provided when you create a new integration in a Gitter room."}}},"flowdock":{"title":"Flowdock","param":{"flow_token":{"title":"Flow Token","help":"The flow token provided after creating a source for a flow into which you want to send messages."}}},"groupme":{"title":"GroupMe","param":{"groupme_instance_name":{"title":"GroupMe Instance Name","help":"name of the Groupme instance as listed in Site Settings. use 'all' to send to all  instances"}},"errors":{"not_found":"The path you attempted to post your message to was not found. Check the Bot ID in Site Settings.","instance_names_issue":"instance names incorrectly formatted or not provided"}},"teams":{"title":"Microsoft Teams","param":{"name":{"title":"Name","help":"A Teams channel name e.g. discourse"},"webhook_url":{"title":"Webhook URL","help":"The URL provided when you create a new incoming webhook"}},"errors":{"invalid_channel":"That channel does not exist on Microsoft Teams"}},"webex":{"title":"Webex Teams","param":{"name":{"title":"Name","help":"A Webex space name e.g. discourse"},"webhook_url":{"title":"Webhook URL","help":"The URL provided when you create a new incoming webhook"}},"errors":{"invalid_channel":"That channel does not exist on Webex"}},"google":{"title":"Google Chat","param":{"name":{"title":"Name","help":"A name for the channel (only shown in the Discourse admin interface)"},"webhook_url":{"title":"Webhook URL","help":"The URL provided when you create a new webhook"}}}}},"checklist":{"edit_reason":"checklist change"},"details":{"title":"Hide Details"},"discourse_local_dates":{"relative_dates":{"today":"Today %{time}","tomorrow":"Tomorrow %{time}","yesterday":"Yesterday %{time}","countdown":{"passed":"date has passed"}},"title":"Insert date / time","create":{"form":{"insert":"Insert","advanced_mode":"Advanced mode","simple_mode":"Simple mode","format_description":"Format used to display the date to the user. Use Z to show the offset and zz for the timezone name.","timezones_title":"Timezones to display","timezones_description":"Timezones will be used to display dates in preview and fallback.","recurring_title":"Recurrence","recurring_description":"Define the recurrence of an event. You can also manually edit the recurring option generated by the form and use one of the following keys: years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds.","recurring_none":"No recurrence","invalid_date":"Invalid date, make sure date and time are correct","date_title":"Date","time_title":"Time","format_title":"Date format","timezone":"Timezone","until":"Until...","current_timezone":"Current timezone:","recurring":{"every_day":"Every day","every_week":"Every week","every_two_weeks":"Every two weeks","every_month":"Every month","every_two_months":"Every two months","every_three_months":"Every three months","every_six_months":"Every six months","every_year":"Every year"}}},"default_title":"%{site_name} Event"},"discourse_narrative_bot":{"welcome_post_type":{"new_user_track":"Start the new user tutorial for all new users","welcome_message":"Send all new users a welcome message with a quick start guide"}},"presence":{"replying":{"one":"replying","other":"replying"},"editing":{"one":"editing","other":"editing"},"replying_to_topic":{"one":"replying","other":"replying"}},"solutions":"Solutions","solved":{"title":"Solved","allow_accepted_answers":"Allow topic owner and staff to mark a reply as the solution","solved_topics_auto_close_hours":"Auto close topic (n) hours after the last reply once the topic has been marked as solved.","accept_answer":"Select if this reply solves the problem","accepted_description":"This is the accepted solution to this topic","has_no_accepted_answer":"This topic has no solution","unaccept_answer":"Unselect if this reply no longer solves the problem","accepted_answer":"Solution","solution":"Solution","solution_summary":{"one":"solution","other":"solutions"},"accepted_html":"%{icon} Solved \u003cspan class='by'\u003eby \u003ca href data-user-card='%{username_lower}'\u003e%{username}\u003c/a\u003e\u003c/span\u003e in \u003ca href='%{post_path}' class='back'\u003epost #%{post_number}\u003c/a\u003e","accepted_notification":"\u003cp\u003e\u003cspan\u003e%{username}\u003c/span\u003e %{description}\u003c/p\u003e","topic_status_filter":{"all":"all","solved":"solved","unsolved":"unsolved"},"no_solved_topics_title":"You haven’t solved any topics yet","no_solved_topics_title_others":"%{username} has not solved any topics yet","no_solved_topics_body":"When you provide a helpful reply to a topic, your reply might be selected as the solution by the topic owner or staff.","no_answer":{"title":"Has your question been answered?","description":"Highlight the answer and help others by using the solution button below the correct reply."},"notification":{"title":"your post was marked as solution"}},"user_notes":{"title":"User Notes","attach":"Add User Note","remove":"Remove User Note","show":"User Notes (%{count})","delete_confirm":"Are you sure you want to delete that user note?","show_post":"Show Post"},"topic_voting":{"title":"Topic Voting","reached_limit":"You are out of votes, remove an existing vote!","list_votes":"List your votes","votes_nav_help":"topics with the most votes","voted":"You voted on this topic","allow_topic_voting":"Allow users to vote on topics in this category","vote_title":"Vote","vote_title_plural":"Votes","voted_title":"Voted","voting_closed_title":"Closed","voting_limit":"Limit","votes_left":{"one":"You have %{count} vote left, see \u003ca href='%{path}'\u003eyour votes\u003c/a\u003e.","other":"You have %{count} votes left, see \u003ca href='%{path}'\u003eyour votes\u003c/a\u003e."},"votes_left_button_title":{"one":"You have %{count} vote left.","other":"You have %{count} votes left."},"votes":{"one":"%{count} vote","other":"%{count} votes"},"anonymous_button":{"one":"Vote","other":"Votes"},"remove_vote":"Remove vote","no_votes_title_self":"You haven't voted for any topic yet","no_votes_title_others":"%{username} hasn't voted for any topic yet"},"poll":{"voters":{"one":"voter","other":"voters"},"total_votes":{"one":"total vote","other":"total votes"},"average_rating":"Average rating: \u003cstrong\u003e%{average}\u003c/strong\u003e.","public":{"title":"Votes are \u003cstrong\u003epublic\u003c/strong\u003e."},"results":{"groups":{"title":"You need to be a member of %{groups} to vote in this poll."},"vote":{"title":"Results will be shown on \u003cstrong\u003evote\u003c/strong\u003e."},"closed":{"title":"Results will be shown once \u003cstrong\u003eclosed\u003c/strong\u003e."},"staff":{"title":"Results are only shown to \u003cstrong\u003estaff\u003c/strong\u003e members."}},"multiple":{"help":{"at_least_min_options":{"one":"Choose at least \u003cstrong\u003e%{count}\u003c/strong\u003e option.","other":"Choose at least \u003cstrong\u003e%{count}\u003c/strong\u003e options."},"up_to_max_options":{"one":"Choose up to \u003cstrong\u003e%{count}\u003c/strong\u003e option.","other":"Choose up to \u003cstrong\u003e%{count}\u003c/strong\u003e options."},"x_options":{"one":"Choose \u003cstrong\u003e%{count}\u003c/strong\u003e option.","other":"Choose \u003cstrong\u003e%{count}\u003c/strong\u003e options."},"between_min_and_max_options":"Choose between \u003cstrong\u003e%{min}\u003c/strong\u003e and \u003cstrong\u003e%{max}\u003c/strong\u003e options."}},"cast-votes":{"title":"Cast your votes","label":"Vote now!"},"show-results":{"title":"Display the poll results","label":"Show results"},"remove-vote":{"title":"Remove your vote","label":"Remove vote"},"hide-results":{"title":"Back to your votes","label":"Show vote"},"group-results":{"title":"Group votes by user field","label":"Show breakdown"},"export-results":{"title":"Export the poll results","label":"Export"},"open":{"title":"Open the poll","label":"Open","confirm":"Are you sure you want to open this poll?"},"close":{"title":"Close the poll","label":"Close","confirm":"Are you sure you want to close this poll?"},"automatic_close":{"closes_in":"Closes in \u003cstrong\u003e%{timeLeft}\u003c/strong\u003e.","age":"Closed \u003cstrong\u003e%{age}\u003c/strong\u003e"},"breakdown":{"title":"Poll results","votes":"%{count} votes","breakdown":"Breakdown","percentage":"Percentage","count":"Count"},"error_while_toggling_status":"Sorry, there was an error toggling the status of this poll.","error_while_casting_votes":"Sorry, there was an error casting your votes.","error_while_fetching_voters":"Sorry, there was an error displaying the voters.","error_while_exporting_results":"Sorry, there was an error exporting poll results.","ui_builder":{"title":"Build Poll","insert":"Insert Poll","help":{"options_min_count":"Enter at least 1 option.","options_max_count":"Enter at most %{count} options.","invalid_min_value":"Minimum value must be at least 1.","invalid_max_value":"Maximum value must be at least 1, but less than or equal with the number of options.","invalid_values":"Minimum value must be smaller than the maximum value.","min_step_value":"The minimum step value is 1"},"poll_type":{"label":"Type","regular":"Single Choice","multiple":"Multiple Choice","number":"Number Rating"},"poll_result":{"label":"Show Results...","always":"Always visible","vote":"Only after voting","closed":"When the poll is closed","staff":"Staff only"},"poll_groups":{"label":"Limit voting to these groups"},"poll_chart_type":{"label":"Result chart","bar":"Bar","pie":"Pie"},"poll_config":{"max":"Max Choices","min":"Min Choices","step":"Step"},"poll_public":{"label":"Show who voted"},"poll_title":{"label":"Title (optional)"},"poll_options":{"label":"Options (one per line)","add":"Add option"},"automatic_close":{"label":"Automatically close poll"},"show_advanced":"Show Advanced Options","hide_advanced":"Hide Advanced Options"}},"styleguide":{"title":"Styleguide","welcome":"To get started, choose a section from the menu on the left.","categories":{"atoms":"Atoms","molecules":"Molecules","organisms":"Organisms"},"sections":{"typography":{"title":"Typography","example":"Welcome to Discourse","paragraph":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},"date_time_inputs":{"title":"Date/Time inputs"},"font_scale":{"title":"Font System"},"colors":{"title":"Colors"},"icons":{"title":"Icons","full_list":"See the full list of Font Awesome Icons"},"input_fields":{"title":"Input Fields"},"buttons":{"title":"Buttons"},"dropdowns":{"title":"Dropdowns"},"categories":{"title":"Categories"},"bread_crumbs":{"title":"Bread Crumbs"},"navigation":{"title":"Navigation"},"navigation_bar":{"title":"Navigation Bar"},"navigation_stacked":{"title":"Navigation Stacked"},"categories_list":{"title":"Categories List"},"topic_link":{"title":"Topic Link"},"topic_list_item":{"title":"Topic List Item"},"topic_statuses":{"title":"Topic Statuses"},"topic_list":{"title":"Topic List"},"basic_topic_list":{"title":"Basic Topic List"},"footer_message":{"title":"Footer Message"},"signup_cta":{"title":"Signup CTA"},"topic_timer_info":{"title":"Topic Timers"},"topic_footer_buttons":{"title":"Topic Footer Buttons"},"topic_notifications":{"title":"Topic Notifications"},"post":{"title":"Post"},"topic_map":{"title":"Topic Map"},"site_header":{"title":"Site Header"},"suggested_topics":{"title":"Suggested Topics"},"post_menu":{"title":"Post Menu"},"modal":{"title":"Modal","header":"Modal Title","footer":"Modal Footer"},"user_about":{"title":"User About Box"},"header_icons":{"title":"Header Icons"},"spinners":{"title":"Spinners"},"empty_state":{"title":"Empty State"},"rich_tooltip":{"title":"Rich Tooltip","description":"Description","header":"Header","hover_to_see":"Hover to see a tooltip"},"char_counter":{"title":"Character Counter","placeholder":"Enter your text here..."}}}}}};
I18n.locale = 'en';
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i,
            arrLen = arr.length;
        for (i = 0; i < arrLen; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i,
            prop,
            val,
            momentPropertiesLen = momentProperties.length;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentPropertiesLen > 0) {
            for (i = 0; i < momentPropertiesLen; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key,
                    argLen = arguments.length;
                for (i = 0; i < argLen; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens =
            /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i,
                prioritizedLen = prioritized.length;
            for (i = 0; i < prioritizedLen; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord =
            /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(
                    /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                    function (matched, p1, p2, p3, p4) {
                        return p1 || p2 || p3 || p4;
                    }
                )
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback,
            tokenLen;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        tokenLen = token.length;
        for (i = 0; i < tokenLen; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths =
            'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                '_'
            ),
        defaultLocaleMonthsShort =
            'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(
        ['w', 'ww', 'W', 'WW'],
        function (input, week, config, token) {
            week[token.substr(0, 1)] = toInt(input);
        }
    );

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays =
            'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function isLocaleNameSane(name) {
        // Prevent names that look like filesystem paths, i.e contain '/' or '\'
        return name.match('^[^/\\\\]*$') != null;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports &&
            isLocaleNameSane(name)
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex =
            /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex =
            /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 =
            /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat,
            isoDatesLen = isoDates.length,
            isoTimesLen = isoTimes.length;

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDatesLen; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimesLen; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^()]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era,
            tokenLen;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens.length;
        for (i = 0; i < tokenLen; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false,
            configfLen = config._f.length;

        if (configfLen === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < configfLen; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i,
            orderLen = ordering.length;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < orderLen; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex =
            /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property,
            propertyLen = properties.length;

        for (i = 0; i < propertyLen; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(
        ['N', 'NN', 'NNN', 'NNNN', 'NNNNN'],
        function (input, array, config, token) {
            var era = config._locale.erasParse(input, token, config._strict);
            if (era) {
                getParsingFlags(config).era = era;
            } else {
                getParsingFlags(config).invalidEra = input;
            }
        }
    );

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(
        ['gggg', 'ggggg', 'GGGG', 'GGGGG'],
        function (input, week, config, token) {
            week[token.substr(0, 2)] = toInt(input);
        }
    );

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.4';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));
//! moment-timezone.js
//! version : 0.5.39
//! Copyright (c) JS Foundation and other contributors
//! license : MIT
//! github.com/moment/moment-timezone

(function (root, factory) {
	"use strict";

	/*global define*/
	if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('moment')); // Node
	} else if (typeof define === 'function' && define.amd) {
		define(['moment'], factory);                 // AMD
	} else {
		factory(root.moment);                        // Browser
	}
}(this, function (moment) {
	"use strict";

	// Resolves es6 module loading issue
	if (moment.version === undefined && moment.default) {
		moment = moment.default;
	}

	// Do not load moment-timezone a second time.
	// if (moment.tz !== undefined) {
	// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
	// 	return moment;
	// }

	var VERSION = "0.5.39",
		zones = {},
		links = {},
		countries = {},
		names = {},
		guesses = {},
		cachedGuess;

	if (!moment || typeof moment.version !== 'string') {
		logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
	}

	var momentVersion = moment.version.split('.'),
		major = +momentVersion[0],
		minor = +momentVersion[1];

	// Moment.js version check
	if (major < 2 || (major === 2 && minor < 6)) {
		logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
	}

	/************************************
		Unpacking
	************************************/

	function charCodeToInt(charCode) {
		if (charCode > 96) {
			return charCode - 87;
		} else if (charCode > 64) {
			return charCode - 29;
		}
		return charCode - 48;
	}

	function unpackBase60(string) {
		var i = 0,
			parts = string.split('.'),
			whole = parts[0],
			fractional = parts[1] || '',
			multiplier = 1,
			num,
			out = 0,
			sign = 1;

		// handle negative numbers
		if (string.charCodeAt(0) === 45) {
			i = 1;
			sign = -1;
		}

		// handle digits before the decimal
		for (i; i < whole.length; i++) {
			num = charCodeToInt(whole.charCodeAt(i));
			out = 60 * out + num;
		}

		// handle digits after the decimal
		for (i = 0; i < fractional.length; i++) {
			multiplier = multiplier / 60;
			num = charCodeToInt(fractional.charCodeAt(i));
			out += num * multiplier;
		}

		return out * sign;
	}

	function arrayToInt (array) {
		for (var i = 0; i < array.length; i++) {
			array[i] = unpackBase60(array[i]);
		}
	}

	function intToUntil (array, length) {
		for (var i = 0; i < length; i++) {
			array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
		}

		array[length - 1] = Infinity;
	}

	function mapIndices (source, indices) {
		var out = [], i;

		for (i = 0; i < indices.length; i++) {
			out[i] = source[indices[i]];
		}

		return out;
	}

	function unpack (string) {
		var data = string.split('|'),
			offsets = data[2].split(' '),
			indices = data[3].split(''),
			untils  = data[4].split(' ');

		arrayToInt(offsets);
		arrayToInt(indices);
		arrayToInt(untils);

		intToUntil(untils, indices.length);

		return {
			name       : data[0],
			abbrs      : mapIndices(data[1].split(' '), indices),
			offsets    : mapIndices(offsets, indices),
			untils     : untils,
			population : data[5] | 0
		};
	}

	/************************************
		Zone object
	************************************/

	function Zone (packedString) {
		if (packedString) {
			this._set(unpack(packedString));
		}
	}

	Zone.prototype = {
		_set : function (unpacked) {
			this.name       = unpacked.name;
			this.abbrs      = unpacked.abbrs;
			this.untils     = unpacked.untils;
			this.offsets    = unpacked.offsets;
			this.population = unpacked.population;
		},

		_index : function (timestamp) {
			var target = +timestamp,
				untils = this.untils,
				i;

			for (i = 0; i < untils.length; i++) {
				if (target < untils[i]) {
					return i;
				}
			}
		},

		countries : function () {
			var zone_name = this.name;
			return Object.keys(countries).filter(function (country_code) {
				return countries[country_code].zones.indexOf(zone_name) !== -1;
			});
		},

		parse : function (timestamp) {
			var target  = +timestamp,
				offsets = this.offsets,
				untils  = this.untils,
				max     = untils.length - 1,
				offset, offsetNext, offsetPrev, i;

			for (i = 0; i < max; i++) {
				offset     = offsets[i];
				offsetNext = offsets[i + 1];
				offsetPrev = offsets[i ? i - 1 : i];

				if (offset < offsetNext && tz.moveAmbiguousForward) {
					offset = offsetNext;
				} else if (offset > offsetPrev && tz.moveInvalidForward) {
					offset = offsetPrev;
				}

				if (target < untils[i] - (offset * 60000)) {
					return offsets[i];
				}
			}

			return offsets[max];
		},

		abbr : function (mom) {
			return this.abbrs[this._index(mom)];
		},

		offset : function (mom) {
			logError("zone.offset has been deprecated in favor of zone.utcOffset");
			return this.offsets[this._index(mom)];
		},

		utcOffset : function (mom) {
			return this.offsets[this._index(mom)];
		}
	};

	/************************************
		Country object
	************************************/

	function Country (country_name, zone_names) {
		this.name = country_name;
		this.zones = zone_names;
	}

	/************************************
		Current Timezone
	************************************/

	function OffsetAt(at) {
		var timeString = at.toTimeString();
		var abbr = timeString.match(/\([a-z ]+\)/i);
		if (abbr && abbr[0]) {
			// 17:56:31 GMT-0600 (CST)
			// 17:56:31 GMT-0600 (Central Standard Time)
			abbr = abbr[0].match(/[A-Z]/g);
			abbr = abbr ? abbr.join('') : undefined;
		} else {
			// 17:56:31 CST
			// 17:56:31 GMT+0800 (台北標準時間)
			abbr = timeString.match(/[A-Z]{3,5}/g);
			abbr = abbr ? abbr[0] : undefined;
		}

		if (abbr === 'GMT') {
			abbr = undefined;
		}

		this.at = +at;
		this.abbr = abbr;
		this.offset = at.getTimezoneOffset();
	}

	function ZoneScore(zone) {
		this.zone = zone;
		this.offsetScore = 0;
		this.abbrScore = 0;
	}

	ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
		this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
		if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
			this.abbrScore++;
		}
	};

	function findChange(low, high) {
		var mid, diff;

		while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
			mid = new OffsetAt(new Date(low.at + diff));
			if (mid.offset === low.offset) {
				low = mid;
			} else {
				high = mid;
			}
		}

		return low;
	}

	function userOffsets() {
		var startYear = new Date().getFullYear() - 2,
			last = new OffsetAt(new Date(startYear, 0, 1)),
			offsets = [last],
			change, next, i;

		for (i = 1; i < 48; i++) {
			next = new OffsetAt(new Date(startYear, i, 1));
			if (next.offset !== last.offset) {
				change = findChange(last, next);
				offsets.push(change);
				offsets.push(new OffsetAt(new Date(change.at + 6e4)));
			}
			last = next;
		}

		for (i = 0; i < 4; i++) {
			offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
			offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
		}

		return offsets;
	}

	function sortZoneScores (a, b) {
		if (a.offsetScore !== b.offsetScore) {
			return a.offsetScore - b.offsetScore;
		}
		if (a.abbrScore !== b.abbrScore) {
			return a.abbrScore - b.abbrScore;
		}
		if (a.zone.population !== b.zone.population) {
			return b.zone.population - a.zone.population;
		}
		return b.zone.name.localeCompare(a.zone.name);
	}

	function addToGuesses (name, offsets) {
		var i, offset;
		arrayToInt(offsets);
		for (i = 0; i < offsets.length; i++) {
			offset = offsets[i];
			guesses[offset] = guesses[offset] || {};
			guesses[offset][name] = true;
		}
	}

	function guessesForUserOffsets (offsets) {
		var offsetsLength = offsets.length,
			filteredGuesses = {},
			out = [],
			i, j, guessesOffset;

		for (i = 0; i < offsetsLength; i++) {
			guessesOffset = guesses[offsets[i].offset] || {};
			for (j in guessesOffset) {
				if (guessesOffset.hasOwnProperty(j)) {
					filteredGuesses[j] = true;
				}
			}
		}

		for (i in filteredGuesses) {
			if (filteredGuesses.hasOwnProperty(i)) {
				out.push(names[i]);
			}
		}

		return out;
	}

	function rebuildGuess () {

		// use Intl API when available and returning valid time zone
		try {
			var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (intlName && intlName.length > 3) {
				var name = names[normalizeName(intlName)];
				if (name) {
					return name;
				}
				logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
			}
		} catch (e) {
			// Intl unavailable, fall back to manual guessing.
		}

		var offsets = userOffsets(),
			offsetsLength = offsets.length,
			guesses = guessesForUserOffsets(offsets),
			zoneScores = [],
			zoneScore, i, j;

		for (i = 0; i < guesses.length; i++) {
			zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
			for (j = 0; j < offsetsLength; j++) {
				zoneScore.scoreOffsetAt(offsets[j]);
			}
			zoneScores.push(zoneScore);
		}

		zoneScores.sort(sortZoneScores);

		return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
	}

	function guess (ignoreCache) {
		if (!cachedGuess || ignoreCache) {
			cachedGuess = rebuildGuess();
		}
		return cachedGuess;
	}

	/************************************
		Global Methods
	************************************/

	function normalizeName (name) {
		return (name || '').toLowerCase().replace(/\//g, '_');
	}

	function addZone (packed) {
		var i, name, split, normalized;

		if (typeof packed === "string") {
			packed = [packed];
		}

		for (i = 0; i < packed.length; i++) {
			split = packed[i].split('|');
			name = split[0];
			normalized = normalizeName(name);
			zones[normalized] = packed[i];
			names[normalized] = name;
			addToGuesses(normalized, split[2].split(' '));
		}
	}

	function getZone (name, caller) {

		name = normalizeName(name);

		var zone = zones[name];
		var link;

		if (zone instanceof Zone) {
			return zone;
		}

		if (typeof zone === 'string') {
			zone = new Zone(zone);
			zones[name] = zone;
			return zone;
		}

		// Pass getZone to prevent recursion more than 1 level deep
		if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
			zone = zones[name] = new Zone();
			zone._set(link);
			zone.name = names[name];
			return zone;
		}

		return null;
	}

	function getNames () {
		var i, out = [];

		for (i in names) {
			if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
				out.push(names[i]);
			}
		}

		return out.sort();
	}

	function getCountryNames () {
		return Object.keys(countries);
	}

	function addLink (aliases) {
		var i, alias, normal0, normal1;

		if (typeof aliases === "string") {
			aliases = [aliases];
		}

		for (i = 0; i < aliases.length; i++) {
			alias = aliases[i].split('|');

			normal0 = normalizeName(alias[0]);
			normal1 = normalizeName(alias[1]);

			links[normal0] = normal1;
			names[normal0] = alias[0];

			links[normal1] = normal0;
			names[normal1] = alias[1];
		}
	}

	function addCountries (data) {
		var i, country_code, country_zones, split;
		if (!data || !data.length) return;
		for (i = 0; i < data.length; i++) {
			split = data[i].split('|');
			country_code = split[0].toUpperCase();
			country_zones = split[1].split(' ');
			countries[country_code] = new Country(
				country_code,
				country_zones
			);
		}
	}

	function getCountry (name) {
		name = name.toUpperCase();
		return countries[name] || null;
	}

	function zonesForCountry(country, with_offset) {
		country = getCountry(country);

		if (!country) return null;

		var zones = country.zones.sort();

		if (with_offset) {
			return zones.map(function (zone_name) {
				var zone = getZone(zone_name);
				return {
					name: zone_name,
					offset: zone.utcOffset(new Date())
				};
			});
		}

		return zones;
	}

	function loadData (data) {
		addZone(data.zones);
		addLink(data.links);
		addCountries(data.countries);
		tz.dataVersion = data.version;
	}

	function zoneExists (name) {
		if (!zoneExists.didShowError) {
			zoneExists.didShowError = true;
				logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
		}
		return !!getZone(name);
	}

	function needsOffset (m) {
		var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
		return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
	}

	function logError (message) {
		if (typeof console !== 'undefined' && typeof console.error === 'function') {
			console.error(message);
		}
	}

	/************************************
		moment.tz namespace
	************************************/

	function tz (input) {
		var args = Array.prototype.slice.call(arguments, 0, -1),
			name = arguments[arguments.length - 1],
			zone = getZone(name),
			out  = moment.utc.apply(null, args);

		if (zone && !moment.isMoment(input) && needsOffset(out)) {
			out.add(zone.parse(out), 'minutes');
		}

		out.tz(name);

		return out;
	}

	tz.version      = VERSION;
	tz.dataVersion  = '';
	tz._zones       = zones;
	tz._links       = links;
	tz._names       = names;
	tz._countries	= countries;
	tz.add          = addZone;
	tz.link         = addLink;
	tz.load         = loadData;
	tz.zone         = getZone;
	tz.zoneExists   = zoneExists; // deprecated in 0.1.0
	tz.guess        = guess;
	tz.names        = getNames;
	tz.Zone         = Zone;
	tz.unpack       = unpack;
	tz.unpackBase60 = unpackBase60;
	tz.needsOffset  = needsOffset;
	tz.moveInvalidForward   = true;
	tz.moveAmbiguousForward = false;
	tz.countries    = getCountryNames;
	tz.zonesForCountry = zonesForCountry;

	/************************************
		Interface with Moment.js
	************************************/

	var fn = moment.fn;

	moment.tz = tz;

	moment.defaultZone = null;

	moment.updateOffset = function (mom, keepTime) {
		var zone = moment.defaultZone,
			offset;

		if (mom._z === undefined) {
			if (zone && needsOffset(mom) && !mom._isUTC) {
				mom._d = moment.utc(mom._a)._d;
				mom.utc().add(zone.parse(mom), 'minutes');
			}
			mom._z = zone;
		}
		if (mom._z) {
			offset = mom._z.utcOffset(mom);
			if (Math.abs(offset) < 16) {
				offset = offset / 60;
			}
			if (mom.utcOffset !== undefined) {
				var z = mom._z;
				mom.utcOffset(-offset, keepTime);
				mom._z = z;
			} else {
				mom.zone(offset, keepTime);
			}
		}
	};

	fn.tz = function (name, keepTime) {
		if (name) {
			if (typeof name !== 'string') {
				throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
			}
			this._z = getZone(name);
			if (this._z) {
				moment.updateOffset(this, keepTime);
			} else {
				logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
			}
			return this;
		}
		if (this._z) { return this._z.name; }
	};

	function abbrWrap (old) {
		return function () {
			if (this._z) { return this._z.abbr(this); }
			return old.call(this);
		};
	}

	function resetZoneWrap (old) {
		return function () {
			this._z = null;
			return old.apply(this, arguments);
		};
	}

	function resetZoneWrap2 (old) {
		return function () {
			if (arguments.length > 0) this._z = null;
			return old.apply(this, arguments);
		};
	}

	fn.zoneName  = abbrWrap(fn.zoneName);
	fn.zoneAbbr  = abbrWrap(fn.zoneAbbr);
	fn.utc       = resetZoneWrap(fn.utc);
	fn.local     = resetZoneWrap(fn.local);
	fn.utcOffset = resetZoneWrap2(fn.utcOffset);

	moment.tz.setDefault = function(name) {
		if (major < 2 || (major === 2 && minor < 9)) {
			logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
		}
		moment.defaultZone = name ? getZone(name) : null;
		return moment;
	};

	// Cloning a moment should include the _z property.
	var momentProperties = moment.momentProperties;
	if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
		// moment 2.8.1+
		momentProperties.push('_z');
		momentProperties.push('_a');
	} else if (momentProperties) {
		// moment 2.7.0
		momentProperties._z = null;
	}

	loadData({
		"version": "2022f",
		"zones": [
			"Africa/Abidjan|GMT|0|0||48e5",
			"Africa/Nairobi|EAT|-30|0||47e5",
			"Africa/Algiers|CET|-10|0||26e5",
			"Africa/Lagos|WAT|-10|0||17e6",
			"Africa/Maputo|CAT|-20|0||26e5",
			"Africa/Cairo|EET|-20|0||15e6",
			"Africa/Casablanca|+00 +01|0 -10|01010101010101010101010101|1T0q0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00|32e5",
			"Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|11e6",
			"Africa/Johannesburg|SAST|-20|0||84e5",
			"Africa/Juba|EAT CAT|-30 -20|01|24nx0|",
			"Africa/Khartoum|EAT CAT|-30 -20|01|1Usl0|51e5",
			"Africa/Sao_Tome|GMT WAT|0 -10|010|1UQN0 2q00|",
			"Africa/Windhoek|CAT WAT|-20 -10|010|1T3c0 11B0|32e4",
			"America/Adak|HST HDT|a0 90|01010101010101010101010|1ST00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|326",
			"America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1SSX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|30e4",
			"America/Santo_Domingo|AST|40|0||29e5",
			"America/Fortaleza|-03|30|0||34e5",
			"America/Asuncion|-03 -04|30 40|01010101010101010101010|1T0r0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0|28e5",
			"America/Panama|EST|50|0||15e5",
			"America/Mexico_City|CST CDT|60 50|0101010101010|1T3k0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|20e6",
			"America/Managua|CST|60|0||22e5",
			"America/Caracas|-04|40|0||29e5",
			"America/Lima|-05|50|0||11e6",
			"America/Denver|MST MDT|70 60|01010101010101010101010|1SSV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|26e5",
			"America/Campo_Grande|-03 -04|30 40|010101|1SKr0 1zd0 On0 1HB0 FX0|77e4",
			"America/Chicago|CST CDT|60 50|01010101010101010101010|1SSU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|92e5",
			"America/Chihuahua|MST MDT CST|70 60 60|0101010101012|1T3l0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|81e4",
			"America/Phoenix|MST|70|0||42e5",
			"America/Whitehorse|PST PDT MST|80 70 70|010101012|1SSW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|23e3",
			"America/New_York|EST EDT|50 40|01010101010101010101010|1SST0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|21e6",
			"America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1SSW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|15e6",
			"America/Halifax|AST ADT|40 30|01010101010101010101010|1SSS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|39e4",
			"America/Godthab|-03 -02|30 20|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|17e3",
			"America/Grand_Turk|AST EDT EST|40 40 50|012121212121212121212|1Vkv0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|37e2",
			"America/Havana|CST CDT|50 40|01010101010101010101010|1SSR0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0|21e5",
			"America/Mazatlan|MST MDT|70 60|0101010101010|1T3l0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|44e4",
			"America/Metlakatla|AKST AKDT PST|90 80 80|010120101010101010101010|1SSX0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|14e2",
			"America/Miquelon|-03 -02|30 20|01010101010101010101010|1SSR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|61e2",
			"America/Noronha|-02|20|0||30e2",
			"America/Ojinaga|MST MDT CST|70 60 60|0101010101012|1SSV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1wn0|23e3",
			"America/Santiago|-03 -04|30 40|01010101010101010101010|1Tk30 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|62e5",
			"America/Sao_Paulo|-02 -03|20 30|010101|1SKq0 1zd0 On0 1HB0 FX0|20e6",
			"Atlantic/Azores|-01 +00|10 0|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|25e4",
			"America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1SSRu 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0|11e4",
			"Antarctica/Casey|+11 +08|-b0 -80|0101010|1Vkh0 1o30 14k0 1kr0 12l0 1o01|10",
			"Asia/Bangkok|+07|-70|0||15e6",
			"Asia/Vladivostok|+10|-a0|0||60e4",
			"Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1T340 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|40e5",
			"Asia/Tashkent|+05|-50|0||23e5",
			"Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1T320 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|14e5",
			"Europe/Istanbul|+03|-30|0||13e6",
			"Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|40",
			"Asia/Dhaka|+06|-60|0||16e6",
			"Asia/Amman|EET EEST +03|-20 -30 -30|0101010101012|1T2m0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 LA0 1C00|25e5",
			"Asia/Kamchatka|+12|-c0|0||18e4",
			"Asia/Dubai|+04|-40|0||39e5",
			"Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1T0m0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0|22e5",
			"Asia/Kuala_Lumpur|+08|-80|0||71e5",
			"Asia/Kolkata|IST|-5u|0||15e6",
			"Asia/Chita|+09|-90|0||33e4",
			"Asia/Shanghai|CST|-80|0||23e6",
			"Asia/Colombo|+0530|-5u|0||22e5",
			"Asia/Damascus|EET EEST +03|-20 -30 -30|0101010101012|1T2m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0|26e5",
			"Asia/Famagusta|+03 EET EEST|-30 -20 -30|0121212121212121212121|1Urd0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|",
			"Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1SXX0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qo0 XA0 1qp0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0|18e5",
			"Asia/Hong_Kong|HKT|-80|0||73e5",
			"Asia/Jakarta|WIB|-70|0||31e6",
			"Asia/Jayapura|WIT|-90|0||26e4",
			"Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1SXA0 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0|81e4",
			"Asia/Kabul|+0430|-4u|0||46e5",
			"Asia/Karachi|PKT|-50|0||24e6",
			"Asia/Kathmandu|+0545|-5J|0||12e5",
			"Asia/Sakhalin|+11|-b0|0||58e4",
			"Asia/Makassar|WITA|-80|0||15e5",
			"Asia/Manila|PST|-80|0||24e6",
			"Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|35e5",
			"Asia/Pyongyang|KST KST|-8u -90|01|1VGf0|29e5",
			"Asia/Qyzylorda|+06 +05|-60 -50|01|1Xei0|73e4",
			"Asia/Rangoon|+0630|-6u|0||48e5",
			"Asia/Seoul|KST|-90|0||23e6",
			"Asia/Tehran|+0330 +0430|-3u -4u|0101010101010|1SWIu 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0|14e6",
			"Asia/Tokyo|JST|-90|0||38e6",
			"Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|27e5",
			"Atlantic/Cape_Verde|-01|10|0||50e4",
			"Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1T34u 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|11e5",
			"Australia/Brisbane|AEST|-a0|0||20e5",
			"Australia/Darwin|ACST|-9u|0||12e4",
			"Australia/Eucla|+0845|-8J|0||368",
			"Australia/Lord_Howe|+11 +1030|-b0 -au|01010101010101010101010|1T330 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu|347",
			"Australia/Perth|AWST|-80|0||18e5",
			"Pacific/Easter|-05 -06|50 60|01010101010101010101010|1Tk30 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|30e2",
			"Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|12e5",
			"Etc/GMT-1|+01|-10|0||",
			"Pacific/Fakaofo|+13|-d0|0||483",
			"Pacific/Kiritimati|+14|-e0|0||51e2",
			"Etc/GMT-2|+02|-20|0||",
			"Pacific/Tahiti|-10|a0|0||18e4",
			"Pacific/Niue|-11|b0|0||12e2",
			"Etc/GMT+12|-12|c0|0||",
			"Pacific/Galapagos|-06|60|0||25e3",
			"Etc/GMT+7|-07|70|0||",
			"Pacific/Pitcairn|-08|80|0||56",
			"Pacific/Gambier|-09|90|0||125",
			"Etc/UTC|UTC|0|0||",
			"Europe/London|GMT BST|0 -10|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|10e6",
			"Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1T0o0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|67e4",
			"Europe/Moscow|MSK|-30|0||16e6",
			"Europe/Volgograd|+03 +04|-30 -40|010|1WQL0 5gn0|10e5",
			"Pacific/Honolulu|HST|a0|0||37e4",
			"MET|MET MEST|-10 -20|01010101010101010101010|1T0p0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|",
			"Pacific/Chatham|+1345 +1245|-dJ -cJ|01010101010101010101010|1T320 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|600",
			"Pacific/Apia|+14 +13|-e0 -d0|0101010101|1T320 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0|37e3",
			"Pacific/Fiji|+13 +12|-d0 -c0|0101010101|1Swe0 1VA0 s00 1VA0 s00 20o0 pc0 2hc0 bc0|88e4",
			"Pacific/Guam|ChST|-a0|0||17e4",
			"Pacific/Marquesas|-0930|9u|0||86e2",
			"Pacific/Pago_Pago|SST|b0|0||37e2",
			"Pacific/Norfolk|+11 +12|-b0 -c0|010101010101010101|219P0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|25e4",
			"Pacific/Tongatapu|+14 +13|-e0 -d0|01|1Swd0|75e3"
		],
		"links": [
			"Africa/Abidjan|Africa/Accra",
			"Africa/Abidjan|Africa/Bamako",
			"Africa/Abidjan|Africa/Banjul",
			"Africa/Abidjan|Africa/Bissau",
			"Africa/Abidjan|Africa/Conakry",
			"Africa/Abidjan|Africa/Dakar",
			"Africa/Abidjan|Africa/Freetown",
			"Africa/Abidjan|Africa/Lome",
			"Africa/Abidjan|Africa/Monrovia",
			"Africa/Abidjan|Africa/Nouakchott",
			"Africa/Abidjan|Africa/Ouagadougou",
			"Africa/Abidjan|Africa/Timbuktu",
			"Africa/Abidjan|America/Danmarkshavn",
			"Africa/Abidjan|Atlantic/Reykjavik",
			"Africa/Abidjan|Atlantic/St_Helena",
			"Africa/Abidjan|Etc/GMT",
			"Africa/Abidjan|Etc/GMT+0",
			"Africa/Abidjan|Etc/GMT-0",
			"Africa/Abidjan|Etc/GMT0",
			"Africa/Abidjan|Etc/Greenwich",
			"Africa/Abidjan|GMT",
			"Africa/Abidjan|GMT+0",
			"Africa/Abidjan|GMT-0",
			"Africa/Abidjan|GMT0",
			"Africa/Abidjan|Greenwich",
			"Africa/Abidjan|Iceland",
			"Africa/Algiers|Africa/Tunis",
			"Africa/Cairo|Africa/Tripoli",
			"Africa/Cairo|Egypt",
			"Africa/Cairo|Europe/Kaliningrad",
			"Africa/Cairo|Libya",
			"Africa/Casablanca|Africa/El_Aaiun",
			"Africa/Johannesburg|Africa/Maseru",
			"Africa/Johannesburg|Africa/Mbabane",
			"Africa/Lagos|Africa/Bangui",
			"Africa/Lagos|Africa/Brazzaville",
			"Africa/Lagos|Africa/Douala",
			"Africa/Lagos|Africa/Kinshasa",
			"Africa/Lagos|Africa/Libreville",
			"Africa/Lagos|Africa/Luanda",
			"Africa/Lagos|Africa/Malabo",
			"Africa/Lagos|Africa/Ndjamena",
			"Africa/Lagos|Africa/Niamey",
			"Africa/Lagos|Africa/Porto-Novo",
			"Africa/Maputo|Africa/Blantyre",
			"Africa/Maputo|Africa/Bujumbura",
			"Africa/Maputo|Africa/Gaborone",
			"Africa/Maputo|Africa/Harare",
			"Africa/Maputo|Africa/Kigali",
			"Africa/Maputo|Africa/Lubumbashi",
			"Africa/Maputo|Africa/Lusaka",
			"Africa/Nairobi|Africa/Addis_Ababa",
			"Africa/Nairobi|Africa/Asmara",
			"Africa/Nairobi|Africa/Asmera",
			"Africa/Nairobi|Africa/Dar_es_Salaam",
			"Africa/Nairobi|Africa/Djibouti",
			"Africa/Nairobi|Africa/Kampala",
			"Africa/Nairobi|Africa/Mogadishu",
			"Africa/Nairobi|Indian/Antananarivo",
			"Africa/Nairobi|Indian/Comoro",
			"Africa/Nairobi|Indian/Mayotte",
			"America/Adak|America/Atka",
			"America/Adak|US/Aleutian",
			"America/Anchorage|America/Juneau",
			"America/Anchorage|America/Nome",
			"America/Anchorage|America/Sitka",
			"America/Anchorage|America/Yakutat",
			"America/Anchorage|US/Alaska",
			"America/Campo_Grande|America/Cuiaba",
			"America/Caracas|America/Boa_Vista",
			"America/Caracas|America/Guyana",
			"America/Caracas|America/La_Paz",
			"America/Caracas|America/Manaus",
			"America/Caracas|America/Porto_Velho",
			"America/Caracas|Brazil/West",
			"America/Caracas|Etc/GMT+4",
			"America/Chicago|America/Indiana/Knox",
			"America/Chicago|America/Indiana/Tell_City",
			"America/Chicago|America/Knox_IN",
			"America/Chicago|America/Matamoros",
			"America/Chicago|America/Menominee",
			"America/Chicago|America/North_Dakota/Beulah",
			"America/Chicago|America/North_Dakota/Center",
			"America/Chicago|America/North_Dakota/New_Salem",
			"America/Chicago|America/Rainy_River",
			"America/Chicago|America/Rankin_Inlet",
			"America/Chicago|America/Resolute",
			"America/Chicago|America/Winnipeg",
			"America/Chicago|CST6CDT",
			"America/Chicago|Canada/Central",
			"America/Chicago|US/Central",
			"America/Chicago|US/Indiana-Starke",
			"America/Denver|America/Boise",
			"America/Denver|America/Cambridge_Bay",
			"America/Denver|America/Edmonton",
			"America/Denver|America/Inuvik",
			"America/Denver|America/Shiprock",
			"America/Denver|America/Yellowknife",
			"America/Denver|Canada/Mountain",
			"America/Denver|MST7MDT",
			"America/Denver|Navajo",
			"America/Denver|US/Mountain",
			"America/Fortaleza|America/Araguaina",
			"America/Fortaleza|America/Argentina/Buenos_Aires",
			"America/Fortaleza|America/Argentina/Catamarca",
			"America/Fortaleza|America/Argentina/ComodRivadavia",
			"America/Fortaleza|America/Argentina/Cordoba",
			"America/Fortaleza|America/Argentina/Jujuy",
			"America/Fortaleza|America/Argentina/La_Rioja",
			"America/Fortaleza|America/Argentina/Mendoza",
			"America/Fortaleza|America/Argentina/Rio_Gallegos",
			"America/Fortaleza|America/Argentina/Salta",
			"America/Fortaleza|America/Argentina/San_Juan",
			"America/Fortaleza|America/Argentina/San_Luis",
			"America/Fortaleza|America/Argentina/Tucuman",
			"America/Fortaleza|America/Argentina/Ushuaia",
			"America/Fortaleza|America/Bahia",
			"America/Fortaleza|America/Belem",
			"America/Fortaleza|America/Buenos_Aires",
			"America/Fortaleza|America/Catamarca",
			"America/Fortaleza|America/Cayenne",
			"America/Fortaleza|America/Cordoba",
			"America/Fortaleza|America/Jujuy",
			"America/Fortaleza|America/Maceio",
			"America/Fortaleza|America/Mendoza",
			"America/Fortaleza|America/Montevideo",
			"America/Fortaleza|America/Paramaribo",
			"America/Fortaleza|America/Punta_Arenas",
			"America/Fortaleza|America/Recife",
			"America/Fortaleza|America/Rosario",
			"America/Fortaleza|America/Santarem",
			"America/Fortaleza|Antarctica/Palmer",
			"America/Fortaleza|Antarctica/Rothera",
			"America/Fortaleza|Atlantic/Stanley",
			"America/Fortaleza|Etc/GMT+3",
			"America/Godthab|America/Nuuk",
			"America/Halifax|America/Glace_Bay",
			"America/Halifax|America/Goose_Bay",
			"America/Halifax|America/Moncton",
			"America/Halifax|America/Thule",
			"America/Halifax|Atlantic/Bermuda",
			"America/Halifax|Canada/Atlantic",
			"America/Havana|Cuba",
			"America/Lima|America/Bogota",
			"America/Lima|America/Eirunepe",
			"America/Lima|America/Guayaquil",
			"America/Lima|America/Porto_Acre",
			"America/Lima|America/Rio_Branco",
			"America/Lima|Brazil/Acre",
			"America/Lima|Etc/GMT+5",
			"America/Los_Angeles|America/Ensenada",
			"America/Los_Angeles|America/Santa_Isabel",
			"America/Los_Angeles|America/Tijuana",
			"America/Los_Angeles|America/Vancouver",
			"America/Los_Angeles|Canada/Pacific",
			"America/Los_Angeles|Mexico/BajaNorte",
			"America/Los_Angeles|PST8PDT",
			"America/Los_Angeles|US/Pacific",
			"America/Managua|America/Belize",
			"America/Managua|America/Costa_Rica",
			"America/Managua|America/El_Salvador",
			"America/Managua|America/Guatemala",
			"America/Managua|America/Regina",
			"America/Managua|America/Swift_Current",
			"America/Managua|America/Tegucigalpa",
			"America/Managua|Canada/Saskatchewan",
			"America/Mazatlan|Mexico/BajaSur",
			"America/Mexico_City|America/Bahia_Banderas",
			"America/Mexico_City|America/Merida",
			"America/Mexico_City|America/Monterrey",
			"America/Mexico_City|Mexico/General",
			"America/New_York|America/Detroit",
			"America/New_York|America/Fort_Wayne",
			"America/New_York|America/Indiana/Indianapolis",
			"America/New_York|America/Indiana/Marengo",
			"America/New_York|America/Indiana/Petersburg",
			"America/New_York|America/Indiana/Vevay",
			"America/New_York|America/Indiana/Vincennes",
			"America/New_York|America/Indiana/Winamac",
			"America/New_York|America/Indianapolis",
			"America/New_York|America/Iqaluit",
			"America/New_York|America/Kentucky/Louisville",
			"America/New_York|America/Kentucky/Monticello",
			"America/New_York|America/Louisville",
			"America/New_York|America/Montreal",
			"America/New_York|America/Nassau",
			"America/New_York|America/Nipigon",
			"America/New_York|America/Pangnirtung",
			"America/New_York|America/Port-au-Prince",
			"America/New_York|America/Thunder_Bay",
			"America/New_York|America/Toronto",
			"America/New_York|Canada/Eastern",
			"America/New_York|EST5EDT",
			"America/New_York|US/East-Indiana",
			"America/New_York|US/Eastern",
			"America/New_York|US/Michigan",
			"America/Noronha|Atlantic/South_Georgia",
			"America/Noronha|Brazil/DeNoronha",
			"America/Noronha|Etc/GMT+2",
			"America/Panama|America/Atikokan",
			"America/Panama|America/Cancun",
			"America/Panama|America/Cayman",
			"America/Panama|America/Coral_Harbour",
			"America/Panama|America/Jamaica",
			"America/Panama|EST",
			"America/Panama|Jamaica",
			"America/Phoenix|America/Creston",
			"America/Phoenix|America/Dawson_Creek",
			"America/Phoenix|America/Fort_Nelson",
			"America/Phoenix|America/Hermosillo",
			"America/Phoenix|MST",
			"America/Phoenix|US/Arizona",
			"America/Santiago|Chile/Continental",
			"America/Santo_Domingo|America/Anguilla",
			"America/Santo_Domingo|America/Antigua",
			"America/Santo_Domingo|America/Aruba",
			"America/Santo_Domingo|America/Barbados",
			"America/Santo_Domingo|America/Blanc-Sablon",
			"America/Santo_Domingo|America/Curacao",
			"America/Santo_Domingo|America/Dominica",
			"America/Santo_Domingo|America/Grenada",
			"America/Santo_Domingo|America/Guadeloupe",
			"America/Santo_Domingo|America/Kralendijk",
			"America/Santo_Domingo|America/Lower_Princes",
			"America/Santo_Domingo|America/Marigot",
			"America/Santo_Domingo|America/Martinique",
			"America/Santo_Domingo|America/Montserrat",
			"America/Santo_Domingo|America/Port_of_Spain",
			"America/Santo_Domingo|America/Puerto_Rico",
			"America/Santo_Domingo|America/St_Barthelemy",
			"America/Santo_Domingo|America/St_Kitts",
			"America/Santo_Domingo|America/St_Lucia",
			"America/Santo_Domingo|America/St_Thomas",
			"America/Santo_Domingo|America/St_Vincent",
			"America/Santo_Domingo|America/Tortola",
			"America/Santo_Domingo|America/Virgin",
			"America/Sao_Paulo|Brazil/East",
			"America/St_Johns|Canada/Newfoundland",
			"America/Whitehorse|America/Dawson",
			"America/Whitehorse|Canada/Yukon",
			"Asia/Bangkok|Antarctica/Davis",
			"Asia/Bangkok|Asia/Barnaul",
			"Asia/Bangkok|Asia/Ho_Chi_Minh",
			"Asia/Bangkok|Asia/Hovd",
			"Asia/Bangkok|Asia/Krasnoyarsk",
			"Asia/Bangkok|Asia/Novokuznetsk",
			"Asia/Bangkok|Asia/Novosibirsk",
			"Asia/Bangkok|Asia/Phnom_Penh",
			"Asia/Bangkok|Asia/Saigon",
			"Asia/Bangkok|Asia/Tomsk",
			"Asia/Bangkok|Asia/Vientiane",
			"Asia/Bangkok|Etc/GMT-7",
			"Asia/Bangkok|Indian/Christmas",
			"Asia/Chita|Asia/Dili",
			"Asia/Chita|Asia/Khandyga",
			"Asia/Chita|Asia/Yakutsk",
			"Asia/Chita|Etc/GMT-9",
			"Asia/Chita|Pacific/Palau",
			"Asia/Dhaka|Antarctica/Vostok",
			"Asia/Dhaka|Asia/Almaty",
			"Asia/Dhaka|Asia/Bishkek",
			"Asia/Dhaka|Asia/Dacca",
			"Asia/Dhaka|Asia/Kashgar",
			"Asia/Dhaka|Asia/Omsk",
			"Asia/Dhaka|Asia/Qostanay",
			"Asia/Dhaka|Asia/Thimbu",
			"Asia/Dhaka|Asia/Thimphu",
			"Asia/Dhaka|Asia/Urumqi",
			"Asia/Dhaka|Etc/GMT-6",
			"Asia/Dhaka|Indian/Chagos",
			"Asia/Dubai|Asia/Baku",
			"Asia/Dubai|Asia/Muscat",
			"Asia/Dubai|Asia/Tbilisi",
			"Asia/Dubai|Asia/Yerevan",
			"Asia/Dubai|Etc/GMT-4",
			"Asia/Dubai|Europe/Astrakhan",
			"Asia/Dubai|Europe/Samara",
			"Asia/Dubai|Europe/Saratov",
			"Asia/Dubai|Europe/Ulyanovsk",
			"Asia/Dubai|Indian/Mahe",
			"Asia/Dubai|Indian/Mauritius",
			"Asia/Dubai|Indian/Reunion",
			"Asia/Gaza|Asia/Hebron",
			"Asia/Hong_Kong|Hongkong",
			"Asia/Jakarta|Asia/Pontianak",
			"Asia/Jerusalem|Asia/Tel_Aviv",
			"Asia/Jerusalem|Israel",
			"Asia/Kamchatka|Asia/Anadyr",
			"Asia/Kamchatka|Etc/GMT-12",
			"Asia/Kamchatka|Kwajalein",
			"Asia/Kamchatka|Pacific/Funafuti",
			"Asia/Kamchatka|Pacific/Kwajalein",
			"Asia/Kamchatka|Pacific/Majuro",
			"Asia/Kamchatka|Pacific/Nauru",
			"Asia/Kamchatka|Pacific/Tarawa",
			"Asia/Kamchatka|Pacific/Wake",
			"Asia/Kamchatka|Pacific/Wallis",
			"Asia/Kathmandu|Asia/Katmandu",
			"Asia/Kolkata|Asia/Calcutta",
			"Asia/Kuala_Lumpur|Asia/Brunei",
			"Asia/Kuala_Lumpur|Asia/Choibalsan",
			"Asia/Kuala_Lumpur|Asia/Irkutsk",
			"Asia/Kuala_Lumpur|Asia/Kuching",
			"Asia/Kuala_Lumpur|Asia/Singapore",
			"Asia/Kuala_Lumpur|Asia/Ulaanbaatar",
			"Asia/Kuala_Lumpur|Asia/Ulan_Bator",
			"Asia/Kuala_Lumpur|Etc/GMT-8",
			"Asia/Kuala_Lumpur|Singapore",
			"Asia/Makassar|Asia/Ujung_Pandang",
			"Asia/Rangoon|Asia/Yangon",
			"Asia/Rangoon|Indian/Cocos",
			"Asia/Sakhalin|Asia/Magadan",
			"Asia/Sakhalin|Asia/Srednekolymsk",
			"Asia/Sakhalin|Etc/GMT-11",
			"Asia/Sakhalin|Pacific/Bougainville",
			"Asia/Sakhalin|Pacific/Efate",
			"Asia/Sakhalin|Pacific/Guadalcanal",
			"Asia/Sakhalin|Pacific/Kosrae",
			"Asia/Sakhalin|Pacific/Noumea",
			"Asia/Sakhalin|Pacific/Pohnpei",
			"Asia/Sakhalin|Pacific/Ponape",
			"Asia/Seoul|ROK",
			"Asia/Shanghai|Asia/Chongqing",
			"Asia/Shanghai|Asia/Chungking",
			"Asia/Shanghai|Asia/Harbin",
			"Asia/Shanghai|Asia/Macao",
			"Asia/Shanghai|Asia/Macau",
			"Asia/Shanghai|Asia/Taipei",
			"Asia/Shanghai|PRC",
			"Asia/Shanghai|ROC",
			"Asia/Tashkent|Antarctica/Mawson",
			"Asia/Tashkent|Asia/Aqtau",
			"Asia/Tashkent|Asia/Aqtobe",
			"Asia/Tashkent|Asia/Ashgabat",
			"Asia/Tashkent|Asia/Ashkhabad",
			"Asia/Tashkent|Asia/Atyrau",
			"Asia/Tashkent|Asia/Dushanbe",
			"Asia/Tashkent|Asia/Oral",
			"Asia/Tashkent|Asia/Samarkand",
			"Asia/Tashkent|Asia/Yekaterinburg",
			"Asia/Tashkent|Etc/GMT-5",
			"Asia/Tashkent|Indian/Kerguelen",
			"Asia/Tashkent|Indian/Maldives",
			"Asia/Tehran|Iran",
			"Asia/Tokyo|Japan",
			"Asia/Vladivostok|Antarctica/DumontDUrville",
			"Asia/Vladivostok|Asia/Ust-Nera",
			"Asia/Vladivostok|Etc/GMT-10",
			"Asia/Vladivostok|Pacific/Chuuk",
			"Asia/Vladivostok|Pacific/Port_Moresby",
			"Asia/Vladivostok|Pacific/Truk",
			"Asia/Vladivostok|Pacific/Yap",
			"Atlantic/Azores|America/Scoresbysund",
			"Atlantic/Cape_Verde|Etc/GMT+1",
			"Australia/Adelaide|Australia/Broken_Hill",
			"Australia/Adelaide|Australia/South",
			"Australia/Adelaide|Australia/Yancowinna",
			"Australia/Brisbane|Australia/Lindeman",
			"Australia/Brisbane|Australia/Queensland",
			"Australia/Darwin|Australia/North",
			"Australia/Lord_Howe|Australia/LHI",
			"Australia/Perth|Australia/West",
			"Australia/Sydney|Antarctica/Macquarie",
			"Australia/Sydney|Australia/ACT",
			"Australia/Sydney|Australia/Canberra",
			"Australia/Sydney|Australia/Currie",
			"Australia/Sydney|Australia/Hobart",
			"Australia/Sydney|Australia/Melbourne",
			"Australia/Sydney|Australia/NSW",
			"Australia/Sydney|Australia/Tasmania",
			"Australia/Sydney|Australia/Victoria",
			"Etc/UTC|Etc/UCT",
			"Etc/UTC|Etc/Universal",
			"Etc/UTC|Etc/Zulu",
			"Etc/UTC|UCT",
			"Etc/UTC|UTC",
			"Etc/UTC|Universal",
			"Etc/UTC|Zulu",
			"Europe/Athens|Asia/Nicosia",
			"Europe/Athens|EET",
			"Europe/Athens|Europe/Bucharest",
			"Europe/Athens|Europe/Helsinki",
			"Europe/Athens|Europe/Kiev",
			"Europe/Athens|Europe/Kyiv",
			"Europe/Athens|Europe/Mariehamn",
			"Europe/Athens|Europe/Nicosia",
			"Europe/Athens|Europe/Riga",
			"Europe/Athens|Europe/Sofia",
			"Europe/Athens|Europe/Tallinn",
			"Europe/Athens|Europe/Uzhgorod",
			"Europe/Athens|Europe/Vilnius",
			"Europe/Athens|Europe/Zaporozhye",
			"Europe/Chisinau|Europe/Tiraspol",
			"Europe/Dublin|Eire",
			"Europe/Istanbul|Antarctica/Syowa",
			"Europe/Istanbul|Asia/Aden",
			"Europe/Istanbul|Asia/Baghdad",
			"Europe/Istanbul|Asia/Bahrain",
			"Europe/Istanbul|Asia/Istanbul",
			"Europe/Istanbul|Asia/Kuwait",
			"Europe/Istanbul|Asia/Qatar",
			"Europe/Istanbul|Asia/Riyadh",
			"Europe/Istanbul|Etc/GMT-3",
			"Europe/Istanbul|Europe/Kirov",
			"Europe/Istanbul|Europe/Minsk",
			"Europe/Istanbul|Turkey",
			"Europe/Lisbon|Atlantic/Canary",
			"Europe/Lisbon|Atlantic/Faeroe",
			"Europe/Lisbon|Atlantic/Faroe",
			"Europe/Lisbon|Atlantic/Madeira",
			"Europe/Lisbon|Portugal",
			"Europe/Lisbon|WET",
			"Europe/London|Europe/Belfast",
			"Europe/London|Europe/Guernsey",
			"Europe/London|Europe/Isle_of_Man",
			"Europe/London|Europe/Jersey",
			"Europe/London|GB",
			"Europe/London|GB-Eire",
			"Europe/Moscow|Europe/Simferopol",
			"Europe/Moscow|W-SU",
			"Europe/Paris|Africa/Ceuta",
			"Europe/Paris|Arctic/Longyearbyen",
			"Europe/Paris|Atlantic/Jan_Mayen",
			"Europe/Paris|CET",
			"Europe/Paris|Europe/Amsterdam",
			"Europe/Paris|Europe/Andorra",
			"Europe/Paris|Europe/Belgrade",
			"Europe/Paris|Europe/Berlin",
			"Europe/Paris|Europe/Bratislava",
			"Europe/Paris|Europe/Brussels",
			"Europe/Paris|Europe/Budapest",
			"Europe/Paris|Europe/Busingen",
			"Europe/Paris|Europe/Copenhagen",
			"Europe/Paris|Europe/Gibraltar",
			"Europe/Paris|Europe/Ljubljana",
			"Europe/Paris|Europe/Luxembourg",
			"Europe/Paris|Europe/Madrid",
			"Europe/Paris|Europe/Malta",
			"Europe/Paris|Europe/Monaco",
			"Europe/Paris|Europe/Oslo",
			"Europe/Paris|Europe/Podgorica",
			"Europe/Paris|Europe/Prague",
			"Europe/Paris|Europe/Rome",
			"Europe/Paris|Europe/San_Marino",
			"Europe/Paris|Europe/Sarajevo",
			"Europe/Paris|Europe/Skopje",
			"Europe/Paris|Europe/Stockholm",
			"Europe/Paris|Europe/Tirane",
			"Europe/Paris|Europe/Vaduz",
			"Europe/Paris|Europe/Vatican",
			"Europe/Paris|Europe/Vienna",
			"Europe/Paris|Europe/Warsaw",
			"Europe/Paris|Europe/Zagreb",
			"Europe/Paris|Europe/Zurich",
			"Europe/Paris|Poland",
			"Pacific/Auckland|Antarctica/McMurdo",
			"Pacific/Auckland|Antarctica/South_Pole",
			"Pacific/Auckland|NZ",
			"Pacific/Chatham|NZ-CHAT",
			"Pacific/Easter|Chile/EasterIsland",
			"Pacific/Fakaofo|Etc/GMT-13",
			"Pacific/Fakaofo|Pacific/Enderbury",
			"Pacific/Fakaofo|Pacific/Kanton",
			"Pacific/Galapagos|Etc/GMT+6",
			"Pacific/Gambier|Etc/GMT+9",
			"Pacific/Guam|Pacific/Saipan",
			"Pacific/Honolulu|HST",
			"Pacific/Honolulu|Pacific/Johnston",
			"Pacific/Honolulu|US/Hawaii",
			"Pacific/Kiritimati|Etc/GMT-14",
			"Pacific/Niue|Etc/GMT+11",
			"Pacific/Pago_Pago|Pacific/Midway",
			"Pacific/Pago_Pago|Pacific/Samoa",
			"Pacific/Pago_Pago|US/Samoa",
			"Pacific/Pitcairn|Etc/GMT+8",
			"Pacific/Tahiti|Etc/GMT+10",
			"Pacific/Tahiti|Pacific/Rarotonga"
		],
		"countries": [
			"AD|Europe/Andorra",
			"AE|Asia/Dubai",
			"AF|Asia/Kabul",
			"AG|America/Puerto_Rico America/Antigua",
			"AI|America/Puerto_Rico America/Anguilla",
			"AL|Europe/Tirane",
			"AM|Asia/Yerevan",
			"AO|Africa/Lagos Africa/Luanda",
			"AQ|Antarctica/Casey Antarctica/Davis Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Troll Asia/Urumqi Pacific/Auckland Pacific/Port_Moresby Asia/Riyadh Antarctica/McMurdo Antarctica/DumontDUrville Antarctica/Syowa Antarctica/Vostok",
			"AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia",
			"AS|Pacific/Pago_Pago",
			"AT|Europe/Vienna",
			"AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla",
			"AW|America/Puerto_Rico America/Aruba",
			"AX|Europe/Helsinki Europe/Mariehamn",
			"AZ|Asia/Baku",
			"BA|Europe/Belgrade Europe/Sarajevo",
			"BB|America/Barbados",
			"BD|Asia/Dhaka",
			"BE|Europe/Brussels",
			"BF|Africa/Abidjan Africa/Ouagadougou",
			"BG|Europe/Sofia",
			"BH|Asia/Qatar Asia/Bahrain",
			"BI|Africa/Maputo Africa/Bujumbura",
			"BJ|Africa/Lagos Africa/Porto-Novo",
			"BL|America/Puerto_Rico America/St_Barthelemy",
			"BM|Atlantic/Bermuda",
			"BN|Asia/Kuching Asia/Brunei",
			"BO|America/La_Paz",
			"BQ|America/Puerto_Rico America/Kralendijk",
			"BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco",
			"BS|America/Toronto America/Nassau",
			"BT|Asia/Thimphu",
			"BW|Africa/Maputo Africa/Gaborone",
			"BY|Europe/Minsk",
			"BZ|America/Belize",
			"CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Toronto America/Iqaluit America/Pangnirtung America/Winnipeg America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Dawson_Creek America/Fort_Nelson America/Whitehorse America/Dawson America/Vancouver America/Panama America/Puerto_Rico America/Phoenix America/Blanc-Sablon America/Atikokan America/Creston",
			"CC|Asia/Yangon Indian/Cocos",
			"CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi",
			"CF|Africa/Lagos Africa/Bangui",
			"CG|Africa/Lagos Africa/Brazzaville",
			"CH|Europe/Zurich",
			"CI|Africa/Abidjan",
			"CK|Pacific/Rarotonga",
			"CL|America/Santiago America/Punta_Arenas Pacific/Easter",
			"CM|Africa/Lagos Africa/Douala",
			"CN|Asia/Shanghai Asia/Urumqi",
			"CO|America/Bogota",
			"CR|America/Costa_Rica",
			"CU|America/Havana",
			"CV|Atlantic/Cape_Verde",
			"CW|America/Puerto_Rico America/Curacao",
			"CX|Asia/Bangkok Indian/Christmas",
			"CY|Asia/Nicosia Asia/Famagusta",
			"CZ|Europe/Prague",
			"DE|Europe/Zurich Europe/Berlin Europe/Busingen",
			"DJ|Africa/Nairobi Africa/Djibouti",
			"DK|Europe/Berlin Europe/Copenhagen",
			"DM|America/Puerto_Rico America/Dominica",
			"DO|America/Santo_Domingo",
			"DZ|Africa/Algiers",
			"EC|America/Guayaquil Pacific/Galapagos",
			"EE|Europe/Tallinn",
			"EG|Africa/Cairo",
			"EH|Africa/El_Aaiun",
			"ER|Africa/Nairobi Africa/Asmara",
			"ES|Europe/Madrid Africa/Ceuta Atlantic/Canary",
			"ET|Africa/Nairobi Africa/Addis_Ababa",
			"FI|Europe/Helsinki",
			"FJ|Pacific/Fiji",
			"FK|Atlantic/Stanley",
			"FM|Pacific/Kosrae Pacific/Port_Moresby Pacific/Guadalcanal Pacific/Chuuk Pacific/Pohnpei",
			"FO|Atlantic/Faroe",
			"FR|Europe/Paris",
			"GA|Africa/Lagos Africa/Libreville",
			"GB|Europe/London",
			"GD|America/Puerto_Rico America/Grenada",
			"GE|Asia/Tbilisi",
			"GF|America/Cayenne",
			"GG|Europe/London Europe/Guernsey",
			"GH|Africa/Abidjan Africa/Accra",
			"GI|Europe/Gibraltar",
			"GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule",
			"GM|Africa/Abidjan Africa/Banjul",
			"GN|Africa/Abidjan Africa/Conakry",
			"GP|America/Puerto_Rico America/Guadeloupe",
			"GQ|Africa/Lagos Africa/Malabo",
			"GR|Europe/Athens",
			"GS|Atlantic/South_Georgia",
			"GT|America/Guatemala",
			"GU|Pacific/Guam",
			"GW|Africa/Bissau",
			"GY|America/Guyana",
			"HK|Asia/Hong_Kong",
			"HN|America/Tegucigalpa",
			"HR|Europe/Belgrade Europe/Zagreb",
			"HT|America/Port-au-Prince",
			"HU|Europe/Budapest",
			"ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
			"IE|Europe/Dublin",
			"IL|Asia/Jerusalem",
			"IM|Europe/London Europe/Isle_of_Man",
			"IN|Asia/Kolkata",
			"IO|Indian/Chagos",
			"IQ|Asia/Baghdad",
			"IR|Asia/Tehran",
			"IS|Africa/Abidjan Atlantic/Reykjavik",
			"IT|Europe/Rome",
			"JE|Europe/London Europe/Jersey",
			"JM|America/Jamaica",
			"JO|Asia/Amman",
			"JP|Asia/Tokyo",
			"KE|Africa/Nairobi",
			"KG|Asia/Bishkek",
			"KH|Asia/Bangkok Asia/Phnom_Penh",
			"KI|Pacific/Tarawa Pacific/Kanton Pacific/Kiritimati",
			"KM|Africa/Nairobi Indian/Comoro",
			"KN|America/Puerto_Rico America/St_Kitts",
			"KP|Asia/Pyongyang",
			"KR|Asia/Seoul",
			"KW|Asia/Riyadh Asia/Kuwait",
			"KY|America/Panama America/Cayman",
			"KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral",
			"LA|Asia/Bangkok Asia/Vientiane",
			"LB|Asia/Beirut",
			"LC|America/Puerto_Rico America/St_Lucia",
			"LI|Europe/Zurich Europe/Vaduz",
			"LK|Asia/Colombo",
			"LR|Africa/Monrovia",
			"LS|Africa/Johannesburg Africa/Maseru",
			"LT|Europe/Vilnius",
			"LU|Europe/Brussels Europe/Luxembourg",
			"LV|Europe/Riga",
			"LY|Africa/Tripoli",
			"MA|Africa/Casablanca",
			"MC|Europe/Paris Europe/Monaco",
			"MD|Europe/Chisinau",
			"ME|Europe/Belgrade Europe/Podgorica",
			"MF|America/Puerto_Rico America/Marigot",
			"MG|Africa/Nairobi Indian/Antananarivo",
			"MH|Pacific/Tarawa Pacific/Kwajalein Pacific/Majuro",
			"MK|Europe/Belgrade Europe/Skopje",
			"ML|Africa/Abidjan Africa/Bamako",
			"MM|Asia/Yangon",
			"MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan",
			"MO|Asia/Macau",
			"MP|Pacific/Guam Pacific/Saipan",
			"MQ|America/Martinique",
			"MR|Africa/Abidjan Africa/Nouakchott",
			"MS|America/Puerto_Rico America/Montserrat",
			"MT|Europe/Malta",
			"MU|Indian/Mauritius",
			"MV|Indian/Maldives",
			"MW|Africa/Maputo Africa/Blantyre",
			"MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas",
			"MY|Asia/Kuching Asia/Singapore Asia/Kuala_Lumpur",
			"MZ|Africa/Maputo",
			"NA|Africa/Windhoek",
			"NC|Pacific/Noumea",
			"NE|Africa/Lagos Africa/Niamey",
			"NF|Pacific/Norfolk",
			"NG|Africa/Lagos",
			"NI|America/Managua",
			"NL|Europe/Brussels Europe/Amsterdam",
			"NO|Europe/Berlin Europe/Oslo",
			"NP|Asia/Kathmandu",
			"NR|Pacific/Nauru",
			"NU|Pacific/Niue",
			"NZ|Pacific/Auckland Pacific/Chatham",
			"OM|Asia/Dubai Asia/Muscat",
			"PA|America/Panama",
			"PE|America/Lima",
			"PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier",
			"PG|Pacific/Port_Moresby Pacific/Bougainville",
			"PH|Asia/Manila",
			"PK|Asia/Karachi",
			"PL|Europe/Warsaw",
			"PM|America/Miquelon",
			"PN|Pacific/Pitcairn",
			"PR|America/Puerto_Rico",
			"PS|Asia/Gaza Asia/Hebron",
			"PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores",
			"PW|Pacific/Palau",
			"PY|America/Asuncion",
			"QA|Asia/Qatar",
			"RE|Asia/Dubai Indian/Reunion",
			"RO|Europe/Bucharest",
			"RS|Europe/Belgrade",
			"RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Volgograd Europe/Astrakhan Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
			"RW|Africa/Maputo Africa/Kigali",
			"SA|Asia/Riyadh",
			"SB|Pacific/Guadalcanal",
			"SC|Asia/Dubai Indian/Mahe",
			"SD|Africa/Khartoum",
			"SE|Europe/Berlin Europe/Stockholm",
			"SG|Asia/Singapore",
			"SH|Africa/Abidjan Atlantic/St_Helena",
			"SI|Europe/Belgrade Europe/Ljubljana",
			"SJ|Europe/Berlin Arctic/Longyearbyen",
			"SK|Europe/Prague Europe/Bratislava",
			"SL|Africa/Abidjan Africa/Freetown",
			"SM|Europe/Rome Europe/San_Marino",
			"SN|Africa/Abidjan Africa/Dakar",
			"SO|Africa/Nairobi Africa/Mogadishu",
			"SR|America/Paramaribo",
			"SS|Africa/Juba",
			"ST|Africa/Sao_Tome",
			"SV|America/El_Salvador",
			"SX|America/Puerto_Rico America/Lower_Princes",
			"SY|Asia/Damascus",
			"SZ|Africa/Johannesburg Africa/Mbabane",
			"TC|America/Grand_Turk",
			"TD|Africa/Ndjamena",
			"TF|Asia/Dubai Indian/Maldives Indian/Kerguelen",
			"TG|Africa/Abidjan Africa/Lome",
			"TH|Asia/Bangkok",
			"TJ|Asia/Dushanbe",
			"TK|Pacific/Fakaofo",
			"TL|Asia/Dili",
			"TM|Asia/Ashgabat",
			"TN|Africa/Tunis",
			"TO|Pacific/Tongatapu",
			"TR|Europe/Istanbul",
			"TT|America/Puerto_Rico America/Port_of_Spain",
			"TV|Pacific/Tarawa Pacific/Funafuti",
			"TW|Asia/Taipei",
			"TZ|Africa/Nairobi Africa/Dar_es_Salaam",
			"UA|Europe/Simferopol Europe/Kyiv",
			"UG|Africa/Nairobi Africa/Kampala",
			"UM|Pacific/Pago_Pago Pacific/Tarawa Pacific/Honolulu Pacific/Midway Pacific/Wake",
			"US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu",
			"UY|America/Montevideo",
			"UZ|Asia/Samarkand Asia/Tashkent",
			"VA|Europe/Rome Europe/Vatican",
			"VC|America/Puerto_Rico America/St_Vincent",
			"VE|America/Caracas",
			"VG|America/Puerto_Rico America/Tortola",
			"VI|America/Puerto_Rico America/St_Thomas",
			"VN|Asia/Bangkok Asia/Ho_Chi_Minh",
			"VU|Pacific/Efate",
			"WF|Pacific/Tarawa Pacific/Wallis",
			"WS|Pacific/Apia",
			"YE|Asia/Riyadh Asia/Aden",
			"YT|Africa/Nairobi Indian/Mayotte",
			"ZA|Africa/Johannesburg",
			"ZM|Africa/Maputo Africa/Lusaka",
			"ZW|Africa/Maputo Africa/Harare"
		]
	});


	return moment;
}));
moment.fn.shortDateNoYear = function(){ return this.format('D MMM'); };
moment.fn.shortDate = function(){ return this.format('D MMM, YYYY'); };
moment.fn.longDate = function(){ return this.format('MMMM D, YYYY h:mma'); };
moment.fn.relativeAge = function(opts){ return Discourse.Formatter.relativeAge(this.toDate(), opts)};
