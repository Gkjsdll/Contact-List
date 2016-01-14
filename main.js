"use strict";

$(document).ready(function(){
  var $newName = $('#newName');
  var $newEmail = $('#newEmail');
  var $newPhone = $('#newPhone');
  var $newAddress = $('#newAddress');
  var $createNewContact = $('#createNewContact');
  var $contactTemplate = $('#contactTemplate');

  $createNewContact.click(function(e){
    debugger;
    e.preventDefault();
    newContact()
  });

  function newContact(){

    var $contact = $contactTemplate.clone().attr('id','');
    debugger;
  };
});
