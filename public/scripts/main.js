// ADD CLASS ACTIVE TO NAVABR
// $('.navbar .menu-item').on('click', function() {
//   $('.navbar .menu-item').removeClass('active');
//   $(this).addClass('active');
// });

// console.log(window.location.pathname);

// $(function(){
//   var current = location.pathname;
//   $('.navbar .menu-item').each(function(){
//       var $this = $(this);
//       // if the current path is like this link, make it active
//       if($this.attr('href').indexOf(current) !== -1){
//           $this.addClass('active');
//       }
//   });
// });

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

// FORM VALIDATION
$('.ui.form').form({
  fields: {
    username: {
      identifier: 'username',
      rules: [{
        type: 'empty',
        prompt: 'Please enter your name'
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
    },
    secondPassword: {
      identifier: 'secondPassword',
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

// DROPDOWN INITIALIZE
$('.ui.dropdown')
  .dropdown();

// ACCORDION INITIALIZE
$('.ui.accordion')
  .accordion({
    selector: {
      trigger: '.accordion-button'
    }
});

// CUSTOM FILE INPUT 
var input = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call(input, function( input ) {
  var label	 = input.nextElementSibling,
      labelVal = label.innerHTML;

  input.addEventListener( 'change', function( e ) {
    document.querySelector('.save-button').style.visibility = 'visible';
    var fileName = '';
    fileName = e.target.value.split( '\\' ).pop();
    if (fileName) {
      label.querySelector( 'span' ).innerHTML = fileName;
    } else {
      label.innerHTML = labelVal;
    }
  });
});