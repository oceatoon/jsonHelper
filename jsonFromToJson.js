
var jsonFromToJson = {

  "fromjson" : [
    {"x":1, "y": {"c" : 20, "o" : 30} },
    {"x":2, "y": {"c" : 60, "o" : 50} }
  ],
  "rules" : { 
          "a" : "x" , 
          "b" : function(obj){ return obj.y.c + obj.y.o }
          },
  "outputLine" : {"a":"", "b":""},
  "toJson" : [],
  
  "test" : function(){
  	console.log("test");  
    this.convert();
  },
  
  "convert" : function(){
  	console.log("convert");     
  	this.toJson = [];
    $.each(this.fromJson,function(i, fromObj){

	    newLine = this.outputLine;
	    $.each(this.rules,function(keyTo, convertTo){
	   		console.log("convert rules ",fromObj,keyTo,convertTo);     
	        if(typeof convertTo == "function")
	        	newLine[ keyTo ] = convertTo( fromObj );
	        else
	        	newLine[ keyTo ] = fromObj[convertTo];
	    });
	      
	    this.toJson.push(newLine);
    });
    return this.toJson;
  }

}
