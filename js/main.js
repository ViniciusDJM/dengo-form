const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const eventos = Array.from(document.querySelectorAll('input[name="evento"]:checked')).map(input => input.value);
  const relacionamento = document.querySelector('input[name="tipoRelacionamento"]:checked').value;
  const cliente = {
    nome,
    sobrenome,
    email,
    telefone,
    dataNascimento,
    eventos,
    relacionamento
  };

  console.log(cliente);
});


function formatarTelefone(telefone) {
    // Remove tudo exceto números
    telefone.value = telefone.value.replace(/\D/g, '');
    
    // Adiciona a máscara
    telefone.value = telefone.value.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone.value = telefone.value.replace(/(\d)(\d{4})$/, '$1-$2');
  }
$(function() {

	'use strict';

	// Form

	var contactForm = function() {

		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					fname: "required",
					lname: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					fname: "Please enter your first name",
					lname: "Please enter your last name",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
				      type: "POST",
				      url: "php/send-email.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeOut();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		}
				
			} );
		}
	};
	contactForm();

});