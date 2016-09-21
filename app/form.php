<?php
if(
    (isset($_GET['firstName'])&&$_GET['firstName']!="")
    &&(isset($_GET['lastName'])&&$_GET['lastName']!="")
    &&(isset($_GET['email'])&&$_GET['email']!="")
    &&(isset($_GET['company'])&&$_GET['company']!="")
){
    $to = 'sales@neway.co.il';
    $subject = 'Find Out More';
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>First Name: '.$_GET['firstName'].'</p>
                        <p>Last Name: '.$_GET['lastName'].'</p>   
                        <p>Email: '.$_GET['email'].'</p>
                        <p>Phone: '.$_GET['phone'].'</p>   
                        <p>Company: '.$_GET['company'].'</p>                      
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: CloudWay\r\n";
    mail($to, $subject, $message, $headers);
}
