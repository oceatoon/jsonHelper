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
        jsonFromToJson.convertArray( jsonFromToJson.fromJson ); 
      },
      
      "convertArray" : function(list)
      {
        console.log("convertArray",list);

        var toJson = [];
        var rules = jsonFromToJson.rules;
        console.log("rules",rules);
        $.each(list , function(i, fromObj)
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


      "convertObject" : function(list)
      {
        console.log("convertObject",list);
        var toJson = {};
        var rules = jsonFromToJson.rules;
        console.log("rules",rules);
        $.each(list,function(key, fromObj)
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
