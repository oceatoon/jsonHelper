var jsonFromToJson = {
      //wishlist 
      //compile from multiple sources
      //add multi source management in the rules json1.x + json2.y.p
    "fromjson" : 
    [
        {"x":1, "y": {"c" : 20, "o" : 30} },
        {"x":2, "y": {"c" : 60, "o" : 50} }
    ],
    "rules" : 
      { 
      "a" : "x" , 
      "b" : function(obj){ return obj.y.c + obj.y.o }
      },
      "outputLine" : {"a":"", "b":""},
      "toJson" : [],
      
      "test" : function()
      {
        jsonFromToJson.convertArray(  ); 
      },
      "testObj" : function()
      {
        jsonFromToJson.fromjson = {
          "xxx" : {"x":1, "y": {"c" : 20, "o" : 30} },
          "yyy" : {"x":2, "y": {"c" : 60, "o" : 50} }
        };
        jsonFromToJson.convertObject(  ); 
      },

      //fromList is an array
      //a list of identical entries in an array 
      "convertArray" : function()
      {
        fromList = jsonFromToJson.fromjson;
        var toJson = [];
        var rules = jsonFromToJson.rules;
        console.log("convertArray",fromList,rules);
        console.log("rules",rules);
        $.each(fromList , function(i, fromObj)
        {
          newLine = {};
          console.log("convert new Line before",newLine, "i", i);   
          $.each(rules, function(keyTo, convertTo)
          {
            //console.log("convert rules ",fromObj,keyTo,convertTo);     
            if(typeof convertTo == "function"){
                  if(keyTo.indexOf(".") >= 0 )
                      jsonHelper.setValueByPath( newLine, keyTo, convertTo( fromObj ) );
                  else
                      newLine[ keyTo ] = convertTo( fromObj );
            } else {
                  if(keyTo.indexOf(".") >= 0 )
                      jsonHelper.setValueByPath( newLine, keyTo, jsonHelper.getValueByPath( fromObj,convertTo) );
                  else
                      newLine[ keyTo ] = jsonHelper.getValueByPath( fromObj,convertTo);
            }
          });
          //console.log("converted line data ",newLine);   
          toJson.push(newLine);
        }); 
        console.dir(toJson); 
        jsonFromToJson.toJson = toJson;
      },

      //fromObj is a json object with key : and ideantical (conplex) values
      "convertObject" : function()
      {
        fromObj = jsonFromToJson.fromjson;
        var toJson = {};
        var rules = jsonFromToJson.rules;
        console.log("convertObject",fromObj,rules);
        $.each(fromObj,function(key, fromObj)
        {

          newLine = {};
          //console.log("convert new Line before key", key);   
          $.each(rules, function(keyTo, convertTo)
          {
            //console.log("convert rules ",fromObj,key,convertTo);     
            if(typeof convertTo == "function"){
                  if(keyTo.indexOf(".") >= 0 )
                      jsonHelper.setValueByPath( newLine, keyTo, convertTo( fromObj ) );
                  else
                      newLine[ keyTo ] = convertTo( fromObj );
            } else {
                  if(keyTo.indexOf(".") >= 0 )
                      jsonHelper.setValueByPath( newLine, keyTo, jsonHelper.getValueByPath( fromObj,convertTo) );
                  else
                      newLine[ keyTo ] = jsonHelper.getValueByPath( fromObj,convertTo);
            }
          });
          //console.log("converted line data ",newLine);
          if(!toJson[key])
              toJson[key] = {};
          toJson[key] = newLine;
        });
        console.dir(toJson); 
        jsonFromToJson.toJson = toJson;
      },


      "getTo" : function(){    
        return jsonFromToJson.toJson;
      },

    }

//just copied as a tool
var jsonHelper = {
  /*
  srcObj = any json OBJCT
  path =  STRING "node1.node2.node3"
   */
  getValueByPath : function(srcObj,path)
  {
    node = srcObj;
    if( !path )
      return node;
    else if( path.indexOf(".") ){
      pathArray = path.split(".");
      $.each(pathArray,function(i,v){
        if(node != undefined && node[v] != undefined)
          node = node[v];
        else {
          node = undefined; 
          return;
        }
      });
      return node;
    }  
    else
      return node[path];
  },
  setValueByPath : function(srcObj,path,value)
  {
    node = srcObj;
    if( !path ){
      node = value;
    }
    else if( path.indexOf(".") ){
      pathArray = path.split(".");
      nodeParent = null;
      lastKey = null;
      $.each(pathArray,function(i,v){
        if(!node[v]){
          console.log("building node",v);
          node[v] = {};
        }
        nodeParent = node;
        node = node[v]; 
        lastKey = v;
      });
      //console.log(node,nodeParent,lastKey);
      nodeParent[lastKey] = value;
    }  
    else{ 
      node[path] = value;
    }
  },
  
  deleteByPath : function  (srcObj,path) {
    nodeParent = srcObj;
    lastChild = null;
    node = srcObj;
    if( path.indexOf(".") ){
      pathArray = path.split(".");
      if( pathArray.length )
      {
        $.each(pathArray,function(i,v){
          nodeParent = node;
          lastChild = v;
          node = node[v];
        });
      }
      delete nodeParent[lastChild];
    } else
      delete nodeParent[path];
  },
  /*
  convert
  { "clim":75,"informatique": 223 }
  to 
  [{  "label" : "Climatisation",  "value":75},{"label" : "Climatisation", "value":75}]
   */
  Object2GraphArray : function ( srcObj )
  {
    destArray = [];
    //console.dir(srcObj);
    $.each(srcObj,function(k,v){
      destArray.push(v);
    });
    //console.dir(destArray);
    return destArray;
  },
  /*
  Detect a difference in content between 2 Objects
  */
  compareJSON : function(obj1, obj2) { 
  var ret = {}; 
  for(var i in obj2) { 
    if(!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) { 
      ret[i] = obj2[i]; 
    } 
  } 
  return ret; 
}

};

