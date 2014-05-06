<?php
  require 'config.php';
  $conn = mysql_connect($db_hostname, $db_username, $db_password) or die('Error with MySQL connection');
  mysql_query("SET NAMES 'utf8'");
  mysql_select_db($db_name);

  // DATABASE INIT
  $sql = "CREATE TABLE IF NOT EXISTS `user` (`id` int(20) NOT NULL AUTO_INCREMENT, `fbid` bigint(20) NOT NULL, `fullname` varchar(60) NOT NULL, `email` varchar(60) NOT NULL, `token` varchar(100) NOT NULL, `vote` int(20) NOT NULL, PRIMARY KEY (`id`));";
  mysql_query($sql);
  $sql = "CREATE TABLE IF NOT EXISTS `log` (`id` int(20) NOT NULL AUTO_INCREMENT, `timestamp` timestamp default CURRENT_TIMESTAMP, `fbid` bigint(20) NOT NULL, `token` text NOT NULL, PRIMARY KEY (`id`));";
  mysql_query($sql);

  $Success = 1;

  // $today = strtotime("8:00:00");

  if ($_POST['action'] === 'vote') {

    $sql = "SELECT * FROM `user` WHERE `fbid` = '" . mysql_real_escape_string($_POST['fbid']) . "'";
    $result = mysql_query($sql) or die('MySQL query error: '. $sql);

    if (mysql_num_rows($result) > 0) {
      $sql = "UPDATE `user` SET `vote` = '" . mysql_real_escape_string($_POST['vote']) . "' WHERE `fbid` = '" . mysql_real_escape_string($_POST['fbid']) . "';";
      $result = mysql_query($sql) or die('MySQL query error: '. $sql);

    } else {
      $sql = "INSERT INTO `user` ( `fbid` , `fullname` , `email` , `token` , `vote` ) VALUES ( '" . mysql_real_escape_string($_POST['fbid']) . "',  '" . mysql_real_escape_string($_POST['fullname']) . "',  '" . mysql_real_escape_string($_POST['email']) . "',  '" . mysql_real_escape_string($_POST['vote']) . "',  '" . mysql_real_escape_string($_POST['token']) . "',  '" . time() . "');";
      $result = mysql_query($sql) or die('MySQL query error: '. $sql);
    }
  }
?>
{
  "Success": "<?php echo $Success; ?>",
  "Msg": "<?php echo $Msg; ?>"
}
