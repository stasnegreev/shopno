
// ;$(document).ready(function() {

//   // отправка почты
//   $(".send").submit(function() {
//       var th = $(this);
//       $.ajax({
//           type: "POST",
//           url: "../php/mail.php",
//           data: th.serialize(),
//           success: function(json) {
//               th.hide();
//               $(".jsFormPopup + .success").fadeIn();
//                   setTimeout(function() {
//                   th.trigger("reset");
//               }, 1000);
//           },
//           error: function(json) {
//               console.log('error', json);
//           },
//       });
//       return false;
//   });
// });
