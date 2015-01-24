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
            console.log("convert rules ",fromObj,keyTo,convertTo);     
              if(typeof convertTo == "function")
                newLine[ keyTo ] = convertTo( fromObj );
              else
                newLine[ keyTo ] = fromObj[convertTo];
          });
          console.log("converted line data ",newLine);   
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
            console.log("convert rules ",fromObj,key,convertTo);     
              if(typeof convertTo == "function")
                newLine[ keyTo ] = convertTo( fromObj );
              else
                newLine[ keyTo ] = fromObj[convertTo];
          });
          console.log("converted line data ",newLine);
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
