"use strict";

$(document).ready(function(){
  var $newName = $('#newName');
  var $newEmail = $('#newEmail');
  var $newPhone = $('#newPhone');
  var $newAddress = $('#newAddress');
  var $createNewContact = $('#createNewContact');
  var $contactTemplate = $('#contactTemplate');

  $createNewContact.click(function(e){
    e.preventDefault();
    newContact()
  });

  function newContact(){
    debugger;
    if(!$newName.val() || (!$newEmail.val() && !$newPhone.val() && !$newAddress.val())){
        if(!$newName.val()){
          swal("Please enter a name","","error");
        }
        else{
          swal("Please enter at least one more piece of information","","error");
        }
    }
    else{
      var $contact = $contactTemplate.clone().attr('id','');
      swal("Proper information provided","","success");
    }
  };

});
