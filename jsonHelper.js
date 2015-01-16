
var jsonHelper = {
  /*
  
   */
  a : {x : {b : 2} },
  test : function(){
    console.log("init",JSON.stringify(jh.a));

    jh.getValueByPath( jh.a,"x.b");
    console.log("jh.a set x.b => 1000");    
    jh.setValueByPath( jh.a,"x.b",1000);
    jh.getValueByPath( jh.a,"x.b")
    console.log(JSON.stringify(jh.a));

    console.log("jh.a.x set b => 2000");
    jh.setValueByPath( jh.a.x,"b",2000);
    jh.getValueByPath( jh.a,"x.b");
    console.log(JSON.stringify(jh.a));

    console.log("jh.a.x set b => {m:1000}");
    jh.setValueByPath( jh.a.x,"b",{m:1000});
    jh.getValueByPath( jh.a,"x.b");
    console.log(JSON.stringify(jh.a));

    console.log("jh.a set x.b.a => 4000");
    jh.setValueByPath( jh.a,"x.b.a",4000);
    jh.getValueByPath( jh.a,"x.b");
    console.log(JSON.stringify(jh.a));

    console.log("jh.a set x.b.a => {m:1000}");
    jh.getValueByPath( jh.a,"x.b.a");
    jh.setValueByPath( jh.a,"x.b.a",{m:1000});
    jh.getValueByPath( jh.a,"x.b.a");
    console.log(JSON.stringify(jh.a));

    console.log("jh.a set x.b.a.b.c.d => {xx:1000}");
    jh.getValueByPath( jh.a,"x.b.a.b.c.d");
    jh.setValueByPath( jh.a,"x.b.a.b.c.d",{xx:1000,yy:25000});
    console.log(JSON.stringify(jh.a));

    console.log("jh.a reset x.b.a.b.c.d.yy => 100000");
    jh.getValueByPath( jh.a,"x.b.a.b.c.d.yy");
    jh.setValueByPath( jh.a,"x.b.a.b.c.d.yy",100000);
    console.log(JSON.stringify(jh.a));

    console.log("jh.a delete x.b.a.b.c.d.yy");
    jh.deleteByPath( jh.a,"x.b.a.b.c.d.yy");
    console.log(JSON.stringify(jh.a));
  },
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
  }

};
