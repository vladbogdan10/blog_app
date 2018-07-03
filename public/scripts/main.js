// ADD CLASS ACTIVE TO NAVABR
$('.menu .item').on('click', function() {
  $('.menu .item').removeClass('active');
  $(this).addClass('active');
}); 

// Prompt user on delete
$('#del-btn').click(function() {
  event.preventDefault();
  $('.ui.modal')
  .modal('show')
  .modal({
    onApprove: function(val) {
      $('#del-form').submit();
    }
  });
});

// Close pop-up messages
$('.message .close').on('click', function() {
  $(this)
  .closest('.message')
  .transition('fade');
});

// FORM VALIDATION
$('.ui.form').form({
  fields: {
    username: {
      identifier: 'username',
      rules: [{
        type: 'empty',
        prompt: 'Please enter your username'
      }]
    },
    email: {
      identifier: 'email',
      rules: [{
          type: 'empty',
          prompt: 'Please enter your e-mail'
        },
        {
          type: 'email',
          prompt: 'Please enter a valid e-mail'
        }
      ]
    },
    password: {
      identifier: 'password',
      rules: [{
          type: 'empty',
          prompt: 'Please enter your password'
        },
        {
          type: 'length[6]',
          prompt: 'Your password must be at least 6 characters'
        }
      ]
    }
  }
});