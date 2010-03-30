var Work_toggle = new Boolean(true);
var Contact_toggle = new Boolean(true);
var Resume_toggle = new Boolean(true);
var Friends_toggle = new Boolean(true);

var workY = new Number(80);
var contactY = new Number(200);
var resumeY = new Number(320);
var friendsY = new Number(440);

var topHeader = new Number(80);
var OFF_SCREEN_X = new Number(-400);
var ON_SCREEN_X = new Number(8);
var SUB_Y = new Number(240);

$('work_div').setStyle({top:'200px',left:'10px'});
$('contact_div').setStyle({top:'300px',left:'10px'});
$('resume_div').setStyle({top:'420px',left:'10px'});
$('friends_div').setStyle({top:'540px',left:'10px'});

$('nav_work').observe('click', function(event) {
  event.stop();

	if(Work_toggle) {
		new Effect.Parallel([
			new Effect.Move('nav_contact', { sync: true, x: OFF_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: OFF_SCREEN_X, y: resumeY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: OFF_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25
		});
		
		new Effect.Move('work_div', { x: ON_SCREEN_X, y: SUB_Y, mode: 'absolute', delay: 0.25, duration: 0.25 });
		new Effect.Appear('work_div', { duration: 0.25, delay: 0.25 });
	  	} else {
	  	new Effect.Fade('work_div', { duration: 0.25 });
	  	new Effect.Move('work_div', { x: ON_SCREEN_X, y: SUB_Y, mode: 'absolute', delay: 0, duration: 0.25 });
	  	
		new Effect.Parallel([
			new Effect.Move('nav_contact', { sync: true, x: ON_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: ON_SCREEN_X, y: resumeY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: ON_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25,
			delay: 0.25
		});
	}

Work_toggle = !Work_toggle;

});

$('nav_contact').observe('click', function(event) {
  event.stop();

	if(Contact_toggle) {
		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: OFF_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: OFF_SCREEN_X, y: resumeY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: OFF_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25
		});
	  
		new Effect.Move('nav_contact', { x: ON_SCREEN_X, y: topHeader, mode: 'absolute', delay: 0.25, duration: 0.25 });
		new Effect.Appear('contact_div', { duration: 0.25, delay: 0.25 });
		new Effect.Move('contact_div', { x: ON_SCREEN_X, y: SUB_Y, mode: 'absolute', delay: 0.25, duration: 0.25 });
	} else {
		new Effect.Fade('contact_div', { duration: 0.25 });
		new Effect.Move('nav_contact', { x: ON_SCREEN_X, y: contactY, mode: 'absolute', delay: 0, duration: 0.25 });
		new Effect.Move('contact_div', { x: ON_SCREEN_X, y: 300, mode: 'absolute', delay: 0, duration: 0.25 });
	  
		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: ON_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: ON_SCREEN_X, y: resumeY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: ON_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25,
			delay: 0.25
		});
	}

Contact_toggle = !Contact_toggle;
  
});

$('nav_resume').observe('click', function(event) {
  event.stop();

	if(Resume_toggle) {
		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: OFF_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_contact', { sync: true, x: OFF_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: OFF_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25
		});
	  
		new Effect.Move('nav_resume', { x: ON_SCREEN_X, y: topHeader, mode: 'absolute', delay: 0.25, duration: 0.3 });
		new Effect.Appear('resume_div', { duration: 0.25, delay: 0.25 });
		new Effect.Move('resume_div', { x: ON_SCREEN_X, y: SUB_Y, mode: 'absolute', delay: 0.25, duration: 0.3 });
	} else {
		new Effect.Fade('resume_div', { duration: 0.25 });
		new Effect.Move('nav_resume', { x: ON_SCREEN_X, y: resumeY, mode: 'absolute', delay: 0, duration: 0.3 });
		new Effect.Move('resume_div', { x: ON_SCREEN_X, y: 420, mode: 'absolute', delay: 0, duration: 0.3 });

		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: ON_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_contact', { sync: true, x: ON_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_friends', { sync: true, x: ON_SCREEN_X, y: friendsY, mode: 'absolute' })
		], { 
			duration: 0.25,
			delay: 0.25
		});
	}

Resume_toggle = !Resume_toggle;
  
});

$('nav_friends').observe('click', function(event) {
  event.stop();

	if(Friends_toggle) {
		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: OFF_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_contact', { sync: true, x: OFF_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: OFF_SCREEN_X, y: resumeY, mode: 'absolute' })
		], { 
			duration: 0.25
		});
	  
		new Effect.Move('nav_friends', { x: ON_SCREEN_X, y: topHeader, mode: 'absolute', delay: 0.25, duration: 0.4 });
		new Effect.Appear('friends_div', { duration: 0.25, delay: 0.25 });
		new Effect.Move('friends_div', { x: ON_SCREEN_X, y: SUB_Y, mode: 'absolute', delay: 0.25, duration: 0.4 });
	} else {
		new Effect.Move('nav_friends', { x: ON_SCREEN_X, y: friendsY, mode: 'absolute', delay: 0, duration: 0.4 });
		new Effect.Move('friends_div', { x: ON_SCREEN_X, y: 540, mode: 'absolute', delay: 0, duration: 0.4 });
		new Effect.Fade('friends_div', { duration: 0.4 });

		new Effect.Parallel([
			new Effect.Move('nav_work', { sync: true, x: ON_SCREEN_X, y: workY, mode: 'absolute' }),
			new Effect.Move('nav_contact', { sync: true, x: ON_SCREEN_X, y: contactY, mode: 'absolute' }),
			new Effect.Move('nav_resume', { sync: true, x: ON_SCREEN_X, y: resumeY, mode: 'absolute' })
		], { 
			duration: 0.25,
			delay: 0.25
		});
	}

Friends_toggle = !Friends_toggle;
  
});