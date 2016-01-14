"use strict";

$(document).ready(function(){
  var $newName = $('#newName');
  var $newEmail = $('#newEmail');
  var $newPhone = $('#newPhone');
  var $newAddress = $('#newAddress');
  var $createNewContact = $('#createNewContact');
  var $contactTemplate = $('#contactTemplate');
  var $contactsBody = $('#contactsBody');

  $createNewContact.click(function(e){
    e.preventDefault();
    newContact()
  });

  $contactsBody.on("click", ".btnDeleteRow", deleteRow);

  function newContact(){
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
      $contact.children().filter('.contactName').text($newName.val());
      if($newEmail.val()){
        $contact.children().filter('.contactEMail').text($newEmail.val());
      }
      if($newEmail.val()){
        $contact.children().filter('.contactPhone').text($newPhone.val());
      }
      if($newEmail.val()){
        $contact.children().filter('.contactAddress').text($newAddress.val());
      }
      $contactsBody.append($contact);
    }
  };

  function deleteRow(){
    $(this).closest('tr').remove();
    debugger;
  }
});
