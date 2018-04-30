// Prompt user on delete
$('#del-btn').click(function() {
  $('.ui.modal')
  .modal('show')
  .modal({
    onApprove: function(val) {
      $('#del-form').submit();
    }
  });
  event.preventDefault();
});