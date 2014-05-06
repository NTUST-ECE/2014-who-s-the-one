<?php
  require 'config.php';
  $conn = mysql_connect($db_hostname, $db_username, $db_password) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');
  mysql_query("SET NAMES 'utf8'");
  mysql_select_db($db_name);

  // DATABASE INIT
  $sql = "CREATE TABLE IF NOT EXISTS `user` (`id` int(20) NOT NULL AUTO_INCREMENT, `fbid` bigint(20) NOT NULL, `fullname` varchar(60) NOT NULL, `email` varchar(60) NOT NULL, `token` varchar(500) NOT NULL, `vote` int(20) NOT NULL, PRIMARY KEY (`id`));";
  mysql_query($sql);
  $sql = "CREATE TABLE IF NOT EXISTS `log` (`id` int(20) NOT NULL AUTO_INCREMENT, `ip` text NOT NULL, `timestamp` timestamp default CURRENT_TIMESTAMP, `fbid` bigint(20) NOT NULL, `action` text NOT NULL, `token` varchar(500) NOT NULL, PRIMARY KEY (`id`));";
  mysql_query($sql);

  $Success = 1;

  // $today = strtotime("8:00:00");

  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
    $ip = $_SERVER['REMOTE_ADDR'];
  }

  if ($_POST['action'] == 'vote') {

    $sql = "INSERT INTO `log` ( `ip` , `fbid` , `action` , `token` ) VALUES ( '" . $ip . "',  '" . mysql_real_escape_string($_POST['fbid']) . "',  '" . 'vote to ' . mysql_real_escape_string($_POST['vote']) . ' with ' . mysql_real_escape_string($_POST['email']) . "',  '" . mysql_real_escape_string($_POST['token']) . "');";
    $result = mysql_query($sql) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');

    // 驗證 token
    $service_url = 'https://graph.facebook.com/me?access_token=' . mysql_real_escape_string($_POST['token']);
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    curl_close($curl);
    $decoded = json_decode($curl_response);

    if (isset($decoded->error) || (isset($decoded->id) && isset($decoded->id) != $_POST['fbid'])) {

      $Success = -1;
      $Msg = 'This is not the token you are using.';

    } else {

      $sql = "SELECT * FROM `user` WHERE `fbid` = '" . mysql_real_escape_string($_POST['fbid']) . "'";
      $result = mysql_query($sql) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');

      if (mysql_num_rows($result) > 0) {
        $sql = "UPDATE `user` SET `vote` = '" . mysql_real_escape_string($_POST['vote']) . "' WHERE `fbid` = '" . mysql_real_escape_string($_POST['fbid']) . "';";
        $result = mysql_query($sql) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');
        $Msg = 'Updated.';

      } else {
        $sql = "INSERT INTO `user` ( `fbid` , `fullname` , `email` , `token` , `vote` ) VALUES ( '" . mysql_real_escape_string($_POST['fbid']) . "',  '" . mysql_real_escape_string($_POST['fullname']) . "',  '" . mysql_real_escape_string($_POST['email']) . "',  '" . mysql_real_escape_string($_POST['token']) . "',  '" . mysql_real_escape_string($_POST['vote']) . "');";
        $result = mysql_query($sql) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');
        $Msg = 'INserted.';
      }

    }

  } else if ($_POST['action'] == 'getvote') {

    // 驗證 token
    $service_url = 'https://graph.facebook.com/me?access_token=' . mysql_real_escape_string($_POST['token']);
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    curl_close($curl);
    $decoded = json_decode($curl_response);

    if (isset($decoded->error) || (isset($decoded->id) && isset($decoded->id) != $_POST['fbid'])) {

      $Success = -1;
      $Msg = 'This is not the token you are using.';

    } else {
      $sql = "SELECT * FROM `user` WHERE `fbid` = '" . mysql_real_escape_string($_POST['fbid']) . "'";
      $result = mysql_query($sql) or die('{ "Success": "-1", "Msg": "Mysql Error: ' . '" }');
      $row = mysql_fetch_array($result);
      $Msg = $row['vote'];
    }

  } else {
    $Msg = 'No action.';
  }
?>
{
  "Success": "<?php echo $Success; ?>",
  "Msg": "<?php echo $Msg; ?>"
}
