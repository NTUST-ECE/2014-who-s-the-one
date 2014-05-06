//= require jquery/dist/jquery.js
//= require patw.facebook.js

// AppID
PatwFB.appId = '166332873401574';
// Init
PatwFB.init(function () {
	PatwFB.setSize();

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
});
// scope. reference: https://developers.facebook.com/docs/reference/api/permissions/
PatwFB.scope = "user_likes,email";

function FB_Share() {
	var url = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)
	window.open(url, 'shareOnFacebook', 'width=600,height=360,top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')
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

						$('#form #vote').val(response.Msg);
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
			alert("登入失敗");
		}
	);
}

function Vote() {

	if (FBstatus !== 'connected') {
		Facebook_Login();
	}

	var data = {
			method: 'feed',
			name: "嗨",
			description: "安安！",
			link: location.href,
			picture: "",
		};

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
			}
		},
		dataType: 'json'
	});
}
