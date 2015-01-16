var jsonFromToJson = {

  "fromJson" : [
    {"x":1, "y": {"c" : 20, "o" : 30} },
    {"x":2, "y": {"c" : 60, "o" : 50} }
  ],
  "rules" : { 
          "a" : "x" , 
          "b" : function(obj){ return obj.y.c + obj.y.o }
          },
  "toJson" : [],
  
  "test" : function(){
  	console.log("test from ",this.fromJson);  
    this.convert();
    console.log("test to ",this.toJson);  
  },
  
  "convert" : function(){
  	console.log("convert from",this.fromJson,this.toJson);     
  	var toJson = [];
  	var rules = this.rules;
  	
    $(this.fromJson).each(function(i, fromObj){

	    newLine = {};
	    console.log("convert new Line before",newLine);   
	    $.each(rules, function(keyTo, convertTo){
	   		console.log("convert rules ",fromObj,keyTo,convertTo);     
	        if(typeof convertTo == "function")
	        	newLine[ keyTo ] = convertTo( fromObj );
	        else
	        	newLine[ keyTo ] = fromObj[convertTo];
	    });
	    console.log("convert new Line after",newLine);   
	    toJson.push(newLine);
    });
    console.log("convert to",toJson); 
    this.toJson = toJson;
  },

  "getTo" : function(){
  	console.log("getTo");      
    return this.toJson;
  },

}
