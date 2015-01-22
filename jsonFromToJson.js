var jsonFromToJson = {

      "fromJson" : [
      ],
      "rules" : { 
              }
      "toJson" : [],
      
      "test" : function(){
        this.convertObject(); 
      },
      
      "convertArray" : function(){
        //console.log("from",this.fromJson);

        var toJson = [];
        var rules = this.rules;
        //console.log("rules",rules);
        $(this.fromJson).each(function(i, fromObj){

          newLine = {};
          //console.log("convert new Line before",newLine, "i", i);   
          $.each(rules, function(keyTo, convertTo){
            //console.log("convert rules ",fromObj,keyTo,convertTo);     
              if(typeof convertTo == "function")
                newLine[ keyTo ] = convertTo( fromObj );
              else
                newLine[ keyTo ] = fromObj[convertTo];
          });
          console.log("converted line data ",newLine);   
          toJson.push(newLine);
        });
        //console.log("to",toJson); 
        this.toJson = toJson;
      },


      "convertObject" : function(){
        //console.log("from",this.fromJson);

        var toJson = {};
        var rules = this.rules;
        console.log("rules",rules);
        $.each(this.fromJson,function(key, fromObj){

          newLine = {};
          //console.log("convert new Line before key", key);   
          $.each(rules, function(keyTo, convertTo){
            //console.log("convert rules ",fromObj,key,convertTo);     
              if(typeof convertTo == "function")
                newLine[ keyTo ] = convertTo( fromObj );
              else
                newLine[ keyTo ] = fromObj[convertTo];
          });
          //console.log("converted line data ",newLine);
          if(!toJson[key])
              toJson[key] = {};
          toJson[key] = newLine;
        });
        console.log("to",toJson); 
        this.toJson = toJson;
      },


      "getTo" : function(){    
        return this.toJson;
      },

    }
