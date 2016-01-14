"use strict";

$(document).ready(function(){
  var $newName = $('#newName');
  var $newEmail = $('#newEmail');
  var $newPhone = $('#newPhone');
  var $newAddress = $('#newAddress');
  var $createNewContact = $('#createNewContact');
  var $contactTemplate = $('#contactTemplate');
  var $contactsBody = $('#contactsBody');
  var $editing = null;

  var storeContactTemplate = {"name": "–", "email": "–", "phone": "–", "address": "–"};
  var storeName;
  var storeEmail;
  var storePhone;
  var storeAddress;


  if(!localStorage.contacts){
    localStorage.contacts = "[]";
  }
  if(!localStorage.maxID){
    localStorage.maxID = "0";
  }

  var contacts = JSON.parse(localStorage.contacts);

  $contactsBody.on("dblclick", ".contactRow td", function(){
    $editing = $(this);
    swal({   title: "Editing "+$editing.parent().find('.contactName').text()+"'s "+$editing.attr('class').slice(7)+": ",
      text: "Current Value: "+$editing.text(),
      type: "input",
      inputType: "text",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "New value"
    },
    function(inputValue){
      if (inputValue === false){
        return false;
      }
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false;
      }
      $editing.text(inputValue);
      contacts[$editing.closest('tr').data('id')-1][($editing.attr('class').slice(7).toLowerCase())] = inputValue;
      updateLocalStorage();
      swal.close();
      $editing = null;
    });

  });

  $createNewContact.click(function(e){
    e.preventDefault();
    newContact()
  });

  $contactsBody.on("click", ".btnDeleteRow", deleteRow);

  initList();

  function initList(){
    Object.keys(contacts).map(function(value, index){
      if(!contacts[index].removed){

        var $contact = $contactTemplate.clone().removeAttr('id').addClass('contactRow')
          .data('name', contacts[index].name)
          .data('email', contacts[index].email)
          .data('phone', contacts[index].phone)
          .data('address', contacts[index].address)
          .data('id', contacts[index].id);

        $contact.find('.contactName').text(contacts[index].name);
        $contact.find('.contactEmail').text(contacts[index].email);
        $contact.find('.contactPhone').text(contacts[index].phone);
        $contact.find('.contactAddress').text(contacts[index].address);

        $contactsBody.append($contact);
      }
    });
  }

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
      var $contact = $contactTemplate.clone().attr('id','').addClass('contactRow');
      var storeContact = _.clone(storeContactTemplate);
      storeName = $newName.val()
      $contact.children().filter('.contactName').text(storeName);
      $contact.data("name", storeName);
      storeContact.name = storeName;
      if($newEmail.val()){
        storeEmail = $newEmail.val();
        $contact.children().filter('.contactEmail').text(storeEmail);
        $contact.data("email", storeEmail);
        storeContact.email = storeEmail;

      }
      if($newPhone.val()){
        storePhone = $newPhone.val();
        $contact.children().filter('.contactPhone').text(storePhone);
        $contact.data("phone", storePhone);
        storeContact.phone = storePhone;
      }
      if($newAddress.val()){
        storeAddress = $newAddress.val();
        $contact.children().filter('.contactAddress').text(storeAddress);
        $contact.data("address", storeAddress);
        storeContact.address = storeAddress;
      }
      localStorage.maxID = (1 + Number(localStorage.maxID)).toString();
      storeContact.id = localStorage.maxID;
      $contact.data("id", localStorage.maxID);
      $contact.data("removed", false);
      storeContact.removed = false;
      $contactsBody.append($contact);
      contacts.push(storeContact);
      updateLocalStorage();
      if(!localStorage.motdPrompted){
        localStorage.motdPrompted = "true";
        swal("You can double click on a contact's info to change it.","","success");
      }
    }
  };

  function updateLocalStorage(){
    localStorage.contacts = JSON.stringify(contacts);
  }

  function deleteRow(){
    var id = $(this).closest('tr').data('id');
    contacts[id-1].removed = true;
    updateLocalStorage();
    $(this).closest('tr').remove();
  }
});
