<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {

	$project_name = "Письмо";
#	$admin_email  = "adebos@yandex.ru";
	$admin_email  = "adebos@yandex.ru";
	$email_from   = "klausvolley@gmail.com";
	$form_subject = "С нового сайта";

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid; width: 50%;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid; width: 50%;'>$value</td>
			</tr>
			";
		}
	}
}

$message = "<table style='width: 520px;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$email_from.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
