function saveDenuncia() {
  var mDescripcion;
  var mLocation;
  var datetime = new Date().getTime();
  var user = firebase.auth().currentUser.getUid();
  var mAliasM;
  /*Aca va el codigo con el que se obtiene la informacion
  de los INPUTS con la instruccion
   document.getElementById("ID").value;
   Todo INPUT del HTML debe
   tener un id (id="el_id")*/


  var denuncia = {descripcion:mDescripcion, idLugar:mLocation,
                            fechaHora:datetime, idUsuario:user,
                             alias:"mAlias"};
  firebase.database().ref("denuncias").push(denuncia);
}
