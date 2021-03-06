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

var FBready = false;

// AppID
PatwFB.appId = '166332873401574';
PatwFB.scope = "user_likes,email";
// Init
PatwFB.init(function () {
	FBready = true;
	PatwFB.scope = "user_likes,email";
});
// scope. reference: https://developers.facebook.com/docs/reference/api/permissions/
PatwFB.scope = "user_likes,email";

var checkLikeTimer = 0;

var shareData = {
	method: 'feed',
	name: '',
	description: "你，是否能為了生存，對素昧平生的他人下手？而那又是誰該犧牲？大獎雙重抽！現在投票預測結局，就有機會拿 iPad！創設、工程、電資、管理，四系聯合，攜手打造夢幻之夜：生命 是一場不可重演的舞台劇 青春即是導演 編寫回憶／五個人 五段人生 高校的青澀 大學的繽紛／互相交錯圍繞 迷失在時間劇本裡／究竟 誰是那個注定的一人 就讓我們一起找尋／Who's the one ?",
	link: 'http://who.ntust.co',
	picture: ''
};

var FBstatus = '';

function voteFor1() {
	if (FBstatus !== 'connected') {
		Facebook_Login(1);
	} else {
		$('#saving.alert').addClass('show');
		$('#form #action').val('vote');
		$('.role').removeClass('s');
		$('.role.one').addClass('s');
		$('#form #vote').val('1');
		shareData.name = '我剛剛在「迷失課」中選擇犧牲了 溫拿';
		shareData.picture = 'http://i.imgur.com/sTKvplZ.png';
		goVote();
	}
}
function voteFor2() {
	if (FBstatus !== 'connected') {
		Facebook_Login(2);
	} else {
		$('#saving.alert').addClass('show');
		$('#form #action').val('vote');
		$('.role').removeClass('s');
		$('.role.two').addClass('s');
		$('#form #vote').val('2');
		shareData.name = '我剛剛在「迷失課」中選擇犧牲了 萱姊';
		shareData.picture = 'http://i.imgur.com/FHc8bzp.png';
		goVote();
	}
}
function voteFor3() {
	if (FBstatus !== 'connected') {
		Facebook_Login(3);
	} else {
		$('#saving.alert').addClass('show');
		$('#form #action').val('vote');
		$('.role').removeClass('s');
		$('.role.three').addClass('s');
		$('#form #vote').val('3');
		shareData.name = '我剛剛在「迷失課」中選擇犧牲了 芸芸';
		shareData.picture = 'http://i.imgur.com/36RLeCx.png';
		goVote();
	}
}
function voteFor4() {
	if (FBstatus !== 'connected') {
		Facebook_Login(4);
	} else {
		$('#saving.alert').addClass('show');
		$('#form #action').val('vote');
		$('.role').removeClass('s');
		$('.role.four').addClass('s');
		$('#form #vote').val('4');
		shareData.name = '我剛剛在「迷失課」中選擇犧牲了 小斌';
		shareData.picture = 'http://i.imgur.com/ubbLHWI.png';
		goVote();
	}
}
function voteFor5() {
	if (FBstatus !== 'connected') {
		Facebook_Login(5);
	} else {
		$('#saving.alert').addClass('show');
		$('#form #action').val('vote');
		$('.role').removeClass('s');
		$('.role.five').addClass('s');
		$('#form #vote').val('5');
		shareData.name = '我剛剛在「迷失課」中選擇犧牲了 阿風';
		shareData.picture = 'http://i.imgur.com/Epfijm7.png';
		goVote();
	}
}

function goVote() {

	if (FBstatus !== 'connected') {
		Facebook_Login();
	}

	PatwFB.isFan("758597897493233",
		function (response) {
			clearTimeout(checkLikeTimer);
			goVote2();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote()", 1000);
			console.log('Waiting for like 758597897493233');
		}
	);
}

function goVote2() {
	PatwFB.isFan("189007421263124",
		function (response) {
			clearTimeout(checkLikeTimer);
			goVote3();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote2()", 1000);
			console.log('Waiting for like 189007421263124');
		}
	);
}

function goVote3() {
	PatwFB.isFan("401359096623539",
		function (response) {
			clearTimeout(checkLikeTimer);
			goVote4();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote3()", 1000);
			console.log('Waiting for like 401359096623539');
		}
	);
}

function goVote4() {
	PatwFB.isFan("522623651112699",
		function (response) {
			clearTimeout(checkLikeTimer);
			Vote();
		},
		function (response) {
			$('#pleaseLike').foundation('reveal', 'open');
			checkLikeTimer = setTimeout("goVote3()", 1000);
			console.log('Waiting for like 522623651112699');
		}
	);
}


function Facebook_Login(cid) {

	// Facebook Connect
	PatwFB.Login(
		function (response) {
			$("#token").val(PatwFB.accessToken);
			$("#fbid").val(response.id);
			$("#fullname").val(response.name);
			$("#email").val(response.email);

			$('#form #action').val('getvote');

			$.ajax({
				async: false,
				type: 'POST',
				url: '/connect.php',
				data: $('#form').serialize(),
				success: function (response) {
					if (response.Success == "1") {
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

						if (cid == 1)
							voteFor1();
						else if (cid == 2)
							voteFor2();
						else if (cid == 3)
							voteFor3();
						else if (cid == 4)
							voteFor4();
						else if (cid == 5)
							voteFor5();

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

	$('#pleaseLike').foundation('reveal', 'close');

	$.ajax({
		async: false,
		type: 'POST',
		url: '/connect.php',
		data: $('#form').serialize(),
		success: function (response) {
			if (response.Success == "1") {
				PatwFB.PublishUI(shareData,
					function (rs) {
					},
					function (rs) {
					}
				);
				console.log(response);
				$('#saving.alert').removeClass('show');
				$('#success.alert').addClass('show');
				setTimeout(function(){$('#success.alert').removeClass('show')}, 3000);
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

function loadData() {
	if (!FBready) {
		FBTimer = setTimeout("loadData()", 1000);
		console.log('Waiting for FB to init.')
	} else {
		clearTimeout(FBTimer);
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				Facebook_Login();
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook,
				// but has not authenticated your app
			} else {
				// the user isn't logged in to Facebook.
			}
		});
	}
}
loadData();

$(function() {

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
	initialize();

	setTimeout(function(){
		$('.welcome .video').css('background-image', "url('https://lh4.googleusercontent.com/-uD-gXOhy17Y/U2veaGjbUtI/AAAAAAAAnvw/nGuO-pE7Sbo/w250-h142-no/bgv2.gif')");
	}, 100);
};

$(window).scroll(function () {

	if ($('section.story').offset().top - $(this).scrollTop() > -80 && ! Modernizr.touch) {
		$('section.welcome').css({
			'top': ($(this).scrollTop() / 3) + "px"
		});
	}

	if ($('section.sponsors').offset().top + $('section.sponsors').height() - $(this).scrollTop() >  0
 && ($('section.sponsors').offset().top - $(this).scrollTop() - $(window).height()) < 10 && ! Modernizr.touch) {
		$('section.sponsors .wrapper').css({
			'margin-top': 300*(($(this).scrollTop() - $('section.sponsors').offset().top + $(window).height() ) / $(window).height() - 1) + "px",
			'margin-bottom': -300*(($(this).scrollTop() - $('section.sponsors').offset().top + $(window).height() ) / $(window).height() - 1) + "px"
		});
	}

	if ($(this).scrollTop() > 3) {
		$('.top-bar').addClass('show');
	} else {
		$('.top-bar').removeClass('show');
	}

	$('.top-bar a').each(function(){
		if ($($(this).attr('href')).offset().top - $(window).scrollTop() < 100) {
			$('.top-bar a').removeClass('active');
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});

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
