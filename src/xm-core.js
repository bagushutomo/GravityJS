/**
 * @class XM Singleton definition of XMJS framework. The class create an object wrapper as a namespace for all class in XMJS
 * @singleton
 */
(function(){
  var _global = this;
  
  if (_global.XM == undefined)
  {
    _global.XM = {};
  }
  
  XM.global = _global;
  XM.singleton = XM;
})();

/**
 * Copies all properties (or method) in config or defaults into receiver. Act as internal utility for class creation.
 *
 * @method
 * @param {object}  receiver The target object to receive the copy.
 * @param {object}  config   The object to be copied.
 * @param {object}  defaults If sepecified, the default object will be used instead of config.
 *
 * @return receiver The target object with new applied properties.
 */
XM.apply = function(receiver, config, defaults) {
  if (defaults) {
    XM.apply(receiver, defaults);
  }
  
  if (receiver && config && config.constructor == Object) {
    var i;
    for (i in config) {
      receiver[i] = config[i];
    }
  }
  
  return receiver;
},


XM.apply(XM, {
  /**
   * Validate the specified value by returning true if the specified value is Array. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isArray: function(value) {
    return value.constructor == Array;
  },
  /**
   * Validate the specified value by returning true if the specified value is Object. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isObject: function(value) {
    return value.constructor == Object;
  },
  /**
   * Validate the specified value by returning true if the specified value is Number. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isNumber: function(value) {
    return value.constructor == Number;
  },
  /**
   * Validate the specified value by returning true if the specified value is String. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isString: function(value) {
    if (value !== undefined) return value.constructor == String;
    else return false
  },
  /**
   * Validate the specified value by returning true if the specified value is Boolean. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isBoolean: function(value) {
    return value.constructor == Boolean;
  },
  /**
   * Validate the specified value by returning true if the specified value is Date. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isDate: function(value) {
    return value.constructor == Date;
  },
  /**
   * Validate the specified value by returning true if the specified value is Function. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isFunction: function(value) {
    return value.constructor == Function;
  },
  /**
   * Validate the specified value by returning true if the specified value is null. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isNull: function(value) {
    return value == null;
  },
  /**
   * Validate the specified value by returning true if the specified value is empty. Otherwise, will return false. Empty value are:
   * <ul>
   * <li>null</li>
   * <li>undefined</li>
   * <li>an empty array</li>
   * <li>an empty string</li>
   * </ul>
   * @method
   * @static
   * @param {any} value Any value to validate.
   * @return {Boolean} The value of the validation.
   */
  isEmpty: function(value) {
    return (value == null) || (XM.isArray(value) && value.length == 0) || (XM.isUndefined(value) || (XM.isString(value) && value == ""));
  },
  /**
   * Validate the specified value by returning true if the specified value is undefined. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isUndefined: function(value) {
    return value === undefined;
  }
})





/**************************
 * @class XM.Function  Utility class for javascript function manipulation.
 * @namespace XM
 */
XM.Function = {

  /**
   * Make an alias of {fn} function that to be executed in {scope} 
   * @method
   * @static
   * @param {Function}  fn    Function to alias.
   * @param {Object}    scope Object that act as the origin which the fn executed.
   * @param {Args}      args  Arguments for fn.  
   */
  bind: function(fn, scope, args) {
    var _fn = fn;
    return function() {
      var param = args || arguments;
      return _fn.apply(scope || window, param)
    }
  },
  
  /**
   * Make an alias of {fn} function that to be executed in {scope}. Similar with {@link XM.Function#bind} but with main intention on "passing" the function regardless of scope.
   * @method
   * @static
   * @param {Function}  fn    Function to alias.
   * @param {Object}    scope Object that act as the origin which the fn executed.
   * @param {Args}      args  Arguments for fn.  
   */
  pass: function (fn, args, scope) {
    return function() {
      return fn.apply(scope || window, args);
    }
  },
  
  /**
   * A wrapper method for checking the validity of a values or object that need to be merged by some specified rules in an evaluation method.
   * 
   * Example:
   * 
   * //in a fictional Evaluator.js class
   * setWinner: XM.Function.mergeValidator(function(name, score){
   *    if (score > 100) this.winnerScoreList[name] = score;
   *    else this.loserScoreList[name] = score;
   * });
   * 
   * list.setWinner('andy', 110); //or
   * list.setWinner({
   *    andy: 110,
   *    budi: 90,
   *    cakep: 80
   * });
   * 
   * console.log(list.andy) //return 110
   * 
   * @param   {Function}  The evaluation method
   * @returns {Function}  The annonymous method with same "interface"; 2 parameters. (as the wrapper are self-invoking method, we need to return our annonymous function(names, values) so that the "interface" of mergeValidator method have the same "interface" with the evaluation method )
   */
  mergeValidator: function(fn) {
    return function(names, values) {
      if (names == null) {
        return this; //NOTE, this line represent the final return value of annonymous method instead of the mergeValidator wrapper.
      }
      
      //determine if the arguments is a pair-value.
      if (XM.isString(names)) {
        console.log("isString");
        fn.call(this, names, values);
      }
      //determine if the arguments is a pair-value in an object.
      else {
        console.log("not a string");
        for (var i in names) {
          fn.call(this, i, names[i]);
        }
      }
      
      return this; //NOTE, this line represent the final return value of annonymous method instead of the mergeValidator wrapper.
    }
  }
},


/*******************
 * @class XM.Object  Utility class for manipulating javascript object.
 * @namespace XM
 */
XM.Object = {
  
  clone: function(item) {
  },
  
  /**
   * Merging specified object into {origin} object.
   * @method
   * @static
   * @param {object} origin A receiver object that receive the merged object.
   * @param {object} target An object that will be merged into {origin}.
   * @return {object} A new merged object.
   */
  mergeObject: function(origin) {
    for (var i = 1, j = arguments.length; i < j; i++){
      var obj = arguments[i];
      for (var key in obj) {
        if (XM.isObject(obj[key])) XM.Object.mergeObject(origin, key, obj[key]);
        else XM.Object.mergeValue(origin, key, obj[key]);
      }
    }
    return origin;
  },
  
  /**
   * Merging specified key-value pair into {origin} object.
   * @method
   * @static
   * @param {object}  origin  A receiver object that receive the merged object.
   * @param {string}  key     A string of named variable. This will be used as variable name in the merged object.
   * @param {any}     value   A named value. This will be used as value in the merged object.
   * @return {object} A new merged object.
   */
  mergeValue: function(origin, key, value) {
    if (XM.isString(key)) {
      if (XM.isObject(value) && XM.isObject(origin[key])) {
        XM.Object.mergeObject(origin[key], value);
      }
      else {
        origin[key] = value;
      }
    }
    else {
      origin[key] = value;
    }
    return origin;
  }
},






/******************************************
 * @class XM.Array  Utility class for manipulating javascript array.
 * @namespace XM
 */
(function(){
  XM.Array = {
    
    /**
     * Check wheter the specified item is in the specified array.
     * @param {Array} array The array to check.
     * @param {Any}   item  The item to look for.
     * @return {Boolean} Will return true if the specified item is in the array. Otherwise, will return false.
     */
    inArray: function(array, item) {
      return (array.indexOf(item) > -1);
    },
    
    /**
     * Filtering an {array} by returning a new array that pass the test implemented by the {fn} function
     * @param {Array}     array Original array to be filtered.
     * @param {Function}  fn    The test function.
     * @param {Object}    scope The scope (i.e: reference to "this" keyword) of the test function
     * @return {Array}    The filtered array
     */
    filter: function(array, fn, scope) {
      // normal use of array.filter() specified in the ECMA-262 standard
      if (Array.prototype.filter) {
        return array.filter(fn, scope);
      }
      
      // compatibility workaround if current javascript cannot support Array.filter()
      // see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
      else {
        if ((!XM.isFunction(fn)) || XM.isNull(fn)) throw new TypeError();
        
        var result = [],
            len = array.length;
              
        for (var i=0; i<len; i++) {
          if (i in array) {
            if (fn.call(scope, array[i], i, array)) {
              result.push(array[i]);
            }
          }
        }
        return result
      }
    },

    /**
     * Clone a flat array without referencing the previous one. A shorthand for Array.prototype.slice.call()
     * @param {Array} array The array.
     * @return {Array} The cloned array
     */
    clone: function(array) {
        return Array.prototype.slice.call(array);
    }
  }
})();



/******************************************
 * Manage script loading
 * @class XM.ScriptLoader
 * @singleton
 */
(function(){
  XM.ScriptLoader = {
    
    /**
     * Configuration for XM.ScriptLoader
     */
    config: {
      basePath: 'src',
      useAsynchronous: true,
      useCache: false
    },
    
    events: {},
    
    /**
     * Store the list of dependency object. Each dependency object contain the following format:
     * <pre>{
     *    require: [],             //array of class dependencies..
     *    callback: function() {}, //callback function to execute when all specified classes is loaded..
     *    scope: {}                //execution scope of the said dependencies.. 
     * }
     * </pre>
     * @private
     */
    _queue: [],
    
    _isScriptLoaded: {},
    
    _classMap: [],
    
    
    PROGRESS  : "progress",
    COMPLETE  : "complete",
    ERROR     : "error",
    
    /**
     * Load a script file.
     * @method
     * @static
     * @param {String}    url             The url of script to load.
     * @param {Function}  onLoad          Callback function that will be executed when the loading process is complete.
     * @param {Object}    scope           The execution scope (reference for "this" keyword) of {onLoad} function.
     * @param {Boolean}   isSynchronous   Mark the current loading process as synchronous or asynchronous. Synchronous loading will make the queue wait until the current file is loaded before continuing the loading process. Asynchronous will load all file simultaneously.
     * @private
     */
    _load: function(url, onLoad, scope, isSynchronous) {
      var fileName  = url.split('/').pop(),
          isLoaded  = false,
          noCache   = '?nocache=' + Number(new Date());
          onLoadFn = function() {
            if (!isLoaded) {
              isLoaded = true;
              onLoad.call(scope);
            }
          };
      
      if (!isSynchronous) { //asynchronous
        var script = document.createElement('script'),
            head = document.head || document.getElementsByTagName('head')[0];

        script.type = 'text/javascript';
        script.src = url + noCache;
        script.onload = onLoadFn;
        script.onreadystatechange = function() {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                onLoadFn();
            }
        };

        head.appendChild(script);
      }
      else { //synchronous
        var xhr, status;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        if (xhr) {
          xhr.open('GET', url + noCache, false);
          xhr.send(null);

          status = (xhr.status == 1223) ? 204 : xhr.status;

          if (status >= 200 && status < 300) {
            new Function(xhr.responseText + "\n//@ sourceURL="+fileName)();
            onLoadFn();
          }
          else {
            console.log("Cannot load ", url, "error code", code);
          }
        }
      }
      
      return script
    }, //end of XM.ScriptLoader#_load()
    
    /**
     * Refresh all items in the queue. If all dependencies for an item exist during looping,
     * it will execute the callback and call _refreshQueue() again. Triggers onReady when the queue is empty.
     * @private
     */
    _refreshQueue: function() {
        var i, item,
            ln = this._queue.length;

        if (ln == 0) {
          //this.triggerReady();
          return;
        }

        for (i = 0; i < ln; i++) {
          item = this._queue[i];
          console.log(item);
          if (item && XM.ClassManager.isExist(item.requires)) {
            this._queue.splice(i, 1);
            item.callback.call(item.scope);
            this._refreshQueue();
            break;
          }
        }
    },
    
    /**
     * Translates a {namespace} to a valid URL to be used. Will convert '.' to '/'
     *
     * For example:
     *   ("XM.canvas.CanvasFactory" => "js/XM/canvas/CanvasFactory.js")
     *
     * @param {String} className  The namespace string of the class (e.g: 'XM.canvas.CanvasFactory')
     * @param {String} prefixPath (Optional) If supplied, will override the configuration prefix path defined in XM.Loader.config
     * @returns {String}  The valid URL of specified namespace
     * @private
     */
    _namespaceToURL: function(namespace, prefixPath) {
      var prefix = (XM.isString(prefixPath) ? prefixPath : this.config.basePath),
          path = "";
      
      path = prefix + "/" + namespace.replace(/\./g, "/") + '.js';
      return path;
    },
    
    /**
     * Loads all specified classes and their direct dependencies.
     * @param {String|Array}  requiredClasses   Can either be a string or an array of string.
     * @param {Function}      fn                (optional) The callback function to executed after the classes is loaded.
     * @param {Object}        scope             (optional) The execution scope (i.e: "this" keyword) of the callback function.
     */
    require: function(classes, fn, scope) {
      //We want to accept multiple classes as dependencies.
      //So if the specified {classes} is a String, we will convert it into an Array.
      if (XM.isString(classes)) {
        classes = [classes];
      }
      
      fn = fn || null;
      scope = scope || XM.global;
      
      //filtering the classes so that only non-empty and non-redundant classes are collected
      classes = XM.Array.filter(classes, function(item) {return !XM.isEmpty(item)});
      classes = XM.Array.filter(classes, function(name) {
        return !XM.ClassManager.isExist(name);
      }, this);
      
      //refresh the queue if all the filtered required classes is not required anymore (i.e: already loaded).
      //act as recursive stopper for each require() call in every class..
      if (classes.length == 0) {
        if (XM.isFunction(fn)) fn.call(scope);
        else throw new Error(":: XM.ScriptLoader#require -- The provided callback is not a Function");
        this._refreshQueue();
        return;
      }
      
      this._queue.push({
        requires: classes,
        callback: fn,
        scope: scope
      });
      
      //start to load all required class that not yet listed by framework..
      for (var i = 0, len = classes.length; i < len; i++) {
        if ( this._isScriptLoaded[classes[i]] !== true ) {
          this._isScriptLoaded[classes[i]] = true;
          //this._load();
          this._load(this._namespaceToURL(classes[i]), this._refreshQueue, this, this.config.useAsynchronous);
        }
      }
    }, //end of XM.Loader#require
  } //end of XM.ScriptLoader
})();

(function(){
  XM.ClassManager = {

    cachedClass: {},

    /**
     * Check if specified namespace(s) is already exist in runtime object hierarchy. Will return true if the specified namespace is already exist; otherwise, will return false.
     * @param   {String | Array}  className   (optional) Namespace(s) of the class to check.
     * @return  {Boolean} Existence of the namespace in runtime object hierarchy.
     */
    isExist: function(className) {
      var parent, child, part;

      //if the namespaces is in the form of array (i.e: contain multiple namespace), we will recursively call this method for each single namespace..
      if (XM.isArray(className)) {
        for (var i = 0; i < className.length; i++) {
          if (!this.isExist(className[i])) return false
        }
        return true;
      }

      //if current namespace had been checked before and marked as cached, then we skip the whole process
      if (this.cachedClass.hasOwnProperty(className)) {
        return true;
      }

      //parse the namespace and check if the object hierarchy contain the object specified in namespace
      if (XM.isString(className)) {
        parent = XM.singleton;
        part = className.split('.');

        for (var i = 0; i < part.length; i++ ) {

          if (!parent || !parent[part[i]]) {
            return false;
          }
          parent = parent[part[i]];
        }


        this.cachedClass[className] = true;

        return true;
      }
      else return false;
    }
  }
})();



XM.ScriptLoader.require(["Car", "Prius", "com.tawa"], function() {console.log("-----   FINISH   ---------");}, XM);

/*
var abc = {
  what: "abjad",
  when: "1200 BCE",
  who: "Roman Republic"
}
*/