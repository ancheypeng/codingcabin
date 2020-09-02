<?php
	$num1New = mt_rand(1,9);
	$num2New = mt_rand(1,9);
	$sum = $num1+$num2;
	$str1 = (string)$num1;
	$str2 = (string)$num2;

	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
        $num1 = intval($_POST['num1']);
        $num2 = intval($_POST['num2']);
		$from = 'STEM and Buds Contact Form';
		$to = 'saifanchey@gmail.com';
		$subject = $_POST['subject'];
		$reason = $_POST['reason'];

		$body ="From: $name\nE-Mail: $email\nReason: $reason\n\nMessage: \n\n$message";

		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		if(!$_POST['subject']){
			$errSubject = 'Please enter a subject';
		}
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if reason has been entered
		if (!$_POST['reason']) {
			$errReason = 'Please select a reason';
		}
		//Check if simple anti-bot test is correct
		if($human !== $num1+$num2){
			$errHuman = 'Your anti-spam is incorrect';
		}

// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage && !$errHuman && !$errSubject) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! We will be in touch.</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
	}
}
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>

    <title>Contact Us</title>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="css/media/icon.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/contact.css">

  </head>

  <body>

		<nav id="home-nav" class="navbar fixed-top navbar-expand-lg">
            <button id="navCollapse" class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto w-100">
                    <a class="navbar-brand" href="#">
                        <img src="css/media/icon.png" width="35" height="35" alt="Coding Cabin">
                    </a>
                    <li class="nav-item active">
                        <a class="nav-link" href="index.html#home">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="learn.html">Learn</a>
                    </li>
                    <li class="nav-item">
                        <div id="codenow-dropdown" class="dropdown">
                            <a class="nav-link" href="code-area" target="_blank">Code Now</a>
                            <div id="codenow-menu" class="dropdown-menu">
                                <div id="menu-arrow-border"></div>
                                <div id="menu-arrow"></div>
                                <a class="dropdown-item" href="code-area" target="_blank">Terminal</a>
                                <a class="dropdown-item" href="javascript:;" onclick="joinMatchmaking()">Pair Up &nbsp;&nbsp; 
                                    <b class="beta" data-toggle="tooltip" data-placement="bottom" title="Beta">&beta;</b>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav mr-auto w-100 justify-content-end">
                    <a class="navbar-brand" onclick="changeToEvening()">
                        <img id="sun" src="css/media/Sun.png" width="20" height="20" alt="Day">
                    </a>
                    <a class="navbar-brand" onclick="changeToNight()">
                        <img id="moon" src="css/media/Moon.png" width="20" height="20" alt="Night">
                    </a>
                    <li class="nav-item active">
                        <a class="nav-link" href="contact">Contact<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a id="signin-btn"class="nav-link" href="login.html" target="_blank">Sign In<span class="sr-only">(current)</span></a>
                    </li>
                    <a class="navbar-brand">
                        <img id="user-icon" alt="User Icon"></img>
                    </a>
                </ul>
            </div>
        </nav>
        
        <div id="pairup-toast" class="toast" data-autohide="false">
            <div class="toast-header">
                <!--
                    <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                    <rect width="100%" height="100%" fill="#007aff" />
                    </svg>
                -->
                <div class="loader">
                    <svg viewBox="0 0 80 80">
                        <rect x="8" y="8" width="64" height="64"></rect>
                    </svg>
                </div>
                <strong class="mr-auto">Pair Up &nbsp;&nbsp; <b data-toggle="tooltip" data-placement="bottom" title="Beta">&beta;</b></strong>
                <small id="timer">00:00</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onclick="joinMatchmaking.leave()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                <div id="searching">
                    <h6>Searching for a partner...</h6>
                    <p><b>Expected Wait Time... 00:15</b></p>
                    <!-- ADD LATER MAYBE <p>Users Online... <span id="usersonline-counter">0</span></p> -->
                    <p>Users Searching... <span id="userssearching-counter">0</span></p>
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="toast" onclick="joinMatchmaking.leave()">Cancel</button>
                </div>
                <div id="found">
                    <h6>Your Partner is Ready!</h6>
                    <button id="accept-btn" type="button" class="btn btn-success btn-lg" onclick="joinMatchmaking.accept()">Accept</button>
                    <br>
                    <small id="countdown">00:20</small>
                </div>
            </div>
        </div>

  	<div class="container contact min100">
  		<div class="row justify-content-center">
  			<div class="col-sm-10 col-md-8 col-lg-6">
  				<h1>Contact</h1>
				<form class="form-horizontal" role="form" method="post" action="contact.php">
					<div class="form-group">
						<label for="name" class="control-label">Name</label>
						<input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" autocomplete = "on" value="<?php echo htmlspecialchars($_POST['name']); ?>">
						<?php echo "<p class='text-danger'>$errName</p>";?>
					</div>

					<div class="form-group">
						<label for="email" class="control-label">Email</label>
						<input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" autocomplete = "on" value="<?php echo htmlspecialchars($_POST['email']); ?>">
						<?php echo "<p class='text-danger'>$errEmail</p>";?>
					</div>

					<div class="form-group">
						<label for="subject" class="control-label">Subject</label>
							<input type="subject" class="form-control" id="subject" name="subject" value="<?php echo htmlspecialchars($_POST['subject']); ?>">
							<?php echo "<p class='text-danger'>$errSubject</p>";?>
					</div>

					<div class="form-group">
  						<label for="reason" class=" control-label">Reason</label>
  							<select type="reason" class="form-control" id="reason" name="reason" value="<?php echo htmlspecialchars($_POST['reason']); ?>">
					    		<option>General Information</option>
					    		<option>Sponsorship</option>
					    		<option>Summer Camp</option>
					    		<option>Starting a Chapter</option>
								<option>Other</option>
  							</select>
							<?php echo "<p class='text-danger'>$errReason</p>";?>
					</div>

					<div class="form-group">
						<label for="message" class="control-label">Message</label>
							<textarea class="form-control" rows="4" name="message"><?php echo htmlspecialchars($_POST['message']);?></textarea>
							<?php echo "<p class='text-danger'>$errMessage</p>";?>
					</div>
					<div class="form-group">
						<label for="human" class="control-label"><?php echo $num1New . " + " . $num2New . " = " . "?";?></label>
                        <input type="hidden" name="num1" id = "num1" value="<?php echo $num1New ?>">
                        <input type="hidden" name="num2" id = "num2" value="<?php echo $num2New ?>">
                        <input type="text" class="form-control" id="human" name="human" placeholder="Your Answer">
                        <?php echo "<p class='text-danger'>$errHuman</p>";?>
					</div>
					<div class="form-group">
            <div class="submitbtn">
              <input id="submit" name="submit" type="submit" value="Submit" class="btn">
            </div>
					</div>
					<div class="form-group">
							<?php echo $result; ?>
					</div>
				</form>
			</div>
		</div>
	</div>


    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  </body>
  </html>
