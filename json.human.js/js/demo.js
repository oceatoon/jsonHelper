/*globals require, document, CodeMirror, alert*/
require.config({
    paths: {
        "crel": "../lib/crel"
    }
});
require(["../src/json.human"], function (JsonHuman) {
    "use strict";
    var textarea = document.getElementById("input"),
        rules = document.getElementById("rules"),
        rawjson = document.getElementById("rawjson"),
        output = document.getElementById("output"),
        raw = document.getElementById("output-raw"),
        button = document.getElementById("convert"),
        editor = CodeMirror.fromTextArea(textarea, {
            mode: "application/json",
            json: true
        }),
        ruleseditor = CodeMirror.fromTextArea(rules, {
            mode: "application/json",
            json: true
        });

    function convert(input, output) {
        rawjson.innerHTML = JSON.stringify(jsonFromToJson.toJson);
        /*rawjsoneditor = CodeMirror.fromTextArea(rawjson, {
            mode: "application/json",
            json: true
        });*/
        var node = JsonHuman.format(rawjson);
        output.innerHTML = "";
        output.appendChild(node);
        raw.textContent = output.innerHTML;
    }

    function doConvert() {
        var json;
        var rulesJson;
        console.log("doConvert ",rulesJson);
        //try {
            json = JSON.parse( editor.getValue() );
            rulesJson = JSON.parse( ruleseditor.getValue() , function (key, value) 
            {
                console.log("build rule test ",value);
                if (value && ( typeof value === 'string' ) && value.indexOf("obj") >= 0) 
                {
                    // we can only pass a function as string in JSON ==> doing a real function
                    //var jsFunc = new Function('return ' + value)();
                    var jsFunc = null;
                    eval("jsFunc = function(obj){return "+value+"}");
                    console.log("build rule function","var jsFunc = function(obj){return "+value+"}",jsFunc);
                    return jsFunc;
                }                      
                return value;
            });
        /*} catch (error) {
            alert( "Error parsing json:\n" + error.stack );
            return;
        }*/

        jsonFromToJson.fromjson = json;
        jsonFromToJson.rules = rulesJson;
        jsonFromToJson.convertObject();
        convert(jsonFromToJson.fromjson, output);
        
    }

    button.addEventListener("click", doConvert);
    //doConvert();
});
