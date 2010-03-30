<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="Joel Gillman">
	<meta name="description" content="Portfolio of artist Joel Gillman.  Interactive and Web Design, Fine Art, Performance, Sound, and sometimes Film Production." />
	<meta name="keywords" content="joel, gillman, gilman, portfolio, art, design, graphic design, web design, typography, minneapolis, mcad, shambot, performance, video, media" />

	<title>joel gillman</title>
		
	<link rel="shortcut icon" href="/favicon.ico" mce_href="/favicon.ico" />
	<link rel="stylesheet" href="css/style_flash.css" type="text/css" media="screen" />
	<!--[if IE]><link rel="stylesheet" href="css/IEstyle.css" type="text/css" media="screen" /><![endif]-->
	
	<script type="text/javascript" src="swfobject.js"></script>
				<script type="text/javascript">
					var flashvars = {};
					flashvars.localVideo = "test.flv";
					flashvars.useStreaming = "";
					flashvars.netConnection = "";
					var params = {};
					params.play = "true";
					params.loop = "true";
					params.menu = "false";
					params.quality = "high";
					params.scale = "showall";
					params.salign = "tl";
					params.wmode = "transparent";
					var attributes = {};
					attributes.id = "flashVideoContent";
					attributes.name = "flashVideoContent";
					attributes.styleclass = "flashVideoContent_class";
					attributes.align = "middle";
					swfobject.embedSWF("backgroundVideoPlayer.swf", "myAlternativeContent", "100%", "100%", "9.0.0", false, flashvars, params, attributes);
	</script>
	
	<script type="text/javascript" src="http://script.aculo.us/prototype.js"></script>
	<script type="text/javascript" src="http://script.aculo.us/scriptaculous.js"></script>
	
</head>
<body>

	<div id="flashVideoContent">
		<div id="overlayHTMLContent">
			<div id="head"><a class="head" href="./">joel <span class="red">gillman</span> (.com)</a></div>
	
	<div id="content">
	
		<div class="mainLink" id="nav_work" style="position:absolute;top:80px;"><a href="#">works</a></div>
			<div id="work_div" style="display:none;position:absolute;top:100px;">
				<?php include("includes/work.php"); ?>
			</div>
		 
		<div class="mainLink" id="nav_contact" style="position:absolute;top:200px;"><a href="#">contact</a></div>
			<div id="contact_div" style="display:none;position:absolute;top:170px;">
				<?php include("includes/contact.php"); ?>
			</div>
		
		<div class="mainLink" id="nav_resume" style="position:absolute;top:320px;"><a href="#">r&eacute;sum&eacute;</a></div>
			<div id="resume_div" style="display:none;position:absolute;top:170px;">
				<?php include("includes/resume.php"); ?>
			</div>
		
		<div class="mainLink" id="nav_friends" style="position:absolute;top:440px;"><a href="#">friends</a></div>
			<div id="friends_div" style="display:none;position:absolute;top:170px;">
				<?php include("includes/friends.php"); ?>
			</div>
	
	</div>
		</div>
		<div id="myAlternativeContent"></div>
	</div>
	
	


<script src="/js/mover.js" type="text/javascript"></script>



</body>
</html>
