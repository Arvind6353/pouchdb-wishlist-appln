
angular.module('wish').factory('PouchDb', function() {


    //Creating the database object
var dbLocal = new PouchDB('test');

var db = new PouchDB('https://arvind6353.cloudant.com/test');

//arvindan921@gmailc.com
//brianlara//
//arvind6353


//Database information
db.info(function(err, info) {
   if (err) {
//      alert(err);
   } else {
  //    alert(info);
   }
});


/*//Database information
dbLocal.info(function(err, info) {
   if (err) {
      return console.log(err);
   } else {
      console.log(info);
   }
});

*/


// sync offline and online db

var opts = {
            live: true
        , retry: true
        };



dbLocal.sync(db,opts, function(err, response) {
   if (err) {
      return console.log(err);
   } else {
      console.log(response);
   }
});



function add(item){

  return dbLocal.put(item);
}



function getAll(){

  return dbLocal.allDocs({include_docs: true});

}


function remove(wish){

return  dbLocal.remove(wish._id, wish._rev); 

}

return {

  add :add,
  getAll:getAll,
  remove:remove

}

});
