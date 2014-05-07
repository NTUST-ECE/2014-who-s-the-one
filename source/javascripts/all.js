//= require jquery/dist/jquery.js
//= require patw.facebook.js
//= require Han/js/han.js
//= require foundation/js/foundation.js

// foundation
$(document).foundation();

if (window.chrome) {
	isChrome = true;
	$('body').addClass('chrome');
}
if(Modernizr.touch) {
	isTouch = true;
	$('body').addClass('touch');
} else {
 	$('body').addClass('non-touch');
}

// AppID
PatwFB.appId = '166332873401574';
// Init

// scope. reference: https://developers.facebook.com/docs/reference/api/permissions/
PatwFB.scope = "user_likes,email";

function FB_Share() {
	var url = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)
	window.open(url, 'shareOnFacebook', 'width=600,height=360,top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')
}

var checkLikeTimer = 0;

var shareData = {
	method: '',
	name: '',
	description: '',
	link: '',
	picture: ''
};

var FBstatus = '';

function voteFor1() {
	$('#saving.alert').addClass('show');
	$('#form #action').val('vote');
	$('.role').removeClass('s');
	$('.role.one').addClass('s');
	$('#form #vote').val('1');
	goVote();
}
function voteFor2() {
	$('#saving.alert').addClass('show');
	$('#form #action').val('vote');
	$('.role').removeClass('s');
	$('.role.two').addClass('s');
	$('#form #vote').val('2');
	goVote();
}
function voteFor3() {
	$('#saving.alert').addClass('show');
	$('#form #action').val('vote');
	$('.role').removeClass('s');
	$('.role.three').addClass('s');
	$('#form #vote').val('3');
	goVote();
}
function voteFor4() {
	$('#saving.alert').addClass('show');
	$('#form #action').val('vote');
	$('.role').removeClass('s');
	$('.role.four').addClass('s');
	$('#form #vote').val('4');
	goVote();
}
function voteFor5() {
	$('#saving.alert').addClass('show');
	$('#form #action').val('vote');
	$('.role').removeClass('s');
	$('.role.five').addClass('s');
	$('#form #vote').val('5');
	goVote();
}

function goVote() {

	if (FBstatus !== 'connected') {
		Facebook_Login();
	}

	PatwFB.isFan("758597897493233",
		function (response) {
			$('#pleaseLike').foundation('reveal', 'close');
			clearTimeout(checkLikeTimer);
			goVote2();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote()", 1000);
		}
	);
}

function goVote2() {
	PatwFB.isFan("189007421263124",
		function (response) {
			$('#pleaseLike').foundation('reveal', 'close');
			clearTimeout(checkLikeTimer);
			goVote3();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote2()", 1000);
		}
	);
}

function goVote3() {
	PatwFB.isFan("401359096623539",
		function (response) {
			$('#pleaseLike').foundation('reveal', 'close');
			clearTimeout(checkLikeTimer);
			Vote();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote3()", 1000);
		}
	);
}


function Facebook_Login() {
	// Facebook Connect
	PatwFB.Login(
		function (response) {
			$("#token").val(PatwFB.accessToken);
			$("#fbid").val(response.id);
			$("#fullname").val(response.name);
			$("#email").val(response.email);

			// isFan();

			$('#form #action').val('getvote');

			$.ajax({
				async: false,
				type: 'POST',
				url: '/connect.php',
				data: $('#form').serialize(),
				success: function (response) {
					if (response.Success == "1") {
						// PatwFB.PublishUI(data,
						// 	function (rs) {
						// 		trackEvent('personal','voteperson_share');
						// 	},
						// 	function (rs) {
						// 	}
						// );
						console.log(response);

						$('.role').removeClass('s');
						if (response.Msg == '1')
							$('.role.one').addClass('s');
						if (response.Msg == '2')
							$('.role.two').addClass('s');
						if (response.Msg == '3')
							$('.role.three').addClass('s');
						if (response.Msg == '4')
							$('.role.four').addClass('s');
						if (response.Msg == '5')
							$('.role.five').addClass('s');

						$('#form #action').val('vote');

						FBstatus = 'connected';

					} else {
						alert(response.Msg);
						console.log(response);
					}
				},
				dataType: 'json'
			});

		},
		function (response) {
			$('#saving.alert').removeClass('show');
			alert("登入失敗");
		}
	);
}

function Vote() {

	$.ajax({
		async: false,
		type: 'POST',
		url: '/connect.php',
		data: $('#form').serialize(),
		success: function (response) {
			if (response.Success == "1") {
				// PatwFB.PublishUI(data,
				// 	function (rs) {
				// 		trackEvent('personal','voteperson_share');
				// 	},
				// 	function (rs) {
				// 	}
				// );
				console.log(response);
			} else {
				alert(response.Msg);
				console.log(response);
				$('#saving.alert').removeClass('show');
			}
		},
		dataType: 'json'
	});
}

function refreshViev() {

	$('.role a.img').css({
		'display': 'block',
		'width': $('.role a.img img').width(),
		'height': $('.role a.img img').height()
	});

}

$(function() {

	PatwFB.init(function () {
		PatwFB.setSize();

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// Facebook_Login();
				$("#token").val(PatwFB.accessToken);
				$("#fbid").val(response.id);
				$("#fullname").val(response.name);
				$("#email").val(response.email);
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook,
				// but has not authenticated your app
			} else {
				// the user isn't logged in to Facebook.
			}
		});
	});

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

window.onload = function () {
	refreshViev();
	$('.welcome .video').css('background-image', "url('/images/bgv.gif')");
	initialize();
};

$(window).scroll(function () {

	if ($('section.story').offset().top - $(this).scrollTop() > -80 && ! Modernizr.touch) {
		$('section.welcome').css({
			'top': ($(this).scrollTop() / 3) + "px"
		});
	}

	if ($(this).scrollTop() > 3) {
		$('.top-bar').addClass('show');
	} else {
		$('.top-bar').removeClass('show');
	}

});

$(window).resize(function() {
	refreshViev();
});

function initialize() {
	var myLatlng = new google.maps.LatLng(25.0141731, 121.5416485);

	var myOptions = {
		zoom: 17,
		center: myLatlng,
	    scrollwheel: false
	}

	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var infowindow = new google.maps.InfoWindow({
		content: ""
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		icon: '/images/map_icon.png',
		shadow: '/images/map_icon.png',
		map: map,
		title: ""
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}
