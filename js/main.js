; (function () {

	'use strict';



	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

	var fullHeight = function () {
		if (!isiPad() && !isiPhone()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			})
		}


	};

	var sliderMain = function () {

		$('#fh5co-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
		});

		$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
		$(window).resize(function () {
			$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
		});

	};

	var sliderSayings = function () {
		$('#fh5co-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
		});
	}

	var offcanvasMenu = function () {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

		$('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function () {

			var $this = $(this);

			$('#fh5co-offcanvas').append($this.clone());

		});
		// $('#fh5co-offcanvas').append
	};

	var mainMenuSticky = function () {

		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function () {
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');

		$section.waypoint(function (direction) {

			if (direction === 'down') {

				$section.css({
					'position': 'fixed',
					'top': 0,
					'width': '100%',
					'z-index': 99999
				}).addClass('fh5co-shadow');;

			}

		}, {
			offset: '0px'
		});

		$('.js-sticky').waypoint(function (direction) {
			if (direction === 'up') {
				$section.attr('style', '').removeClass('fh5co-shadow');
			}
		}, {
			offset: function () { return -$(this.element).height() + 69; }
		});

	};

	// Parallax
	var parallax = function () {

		$(window).stellar();

	};


	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {

			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function () {

		$(window).scroll(function () {

			var scrollPos = $(this).scrollTop();


			$('#fh5co-home .fh5co-text').css({
				'opacity': 1 - (scrollPos / 300),
				'margin-top': (-212) + (scrollPos / 1)
			});

			$('#fh5co-home .flexslider .fh5co-overlay').css({
				'opacity': (.5) + (scrollPos / 2000)
			});

			if (scrollPos > 300) {
				$('#fh5co-home .fh5co-text').css('display', 'none');
			} else {
				$('#fh5co-home .fh5co-text').css('display', 'block');
			}


		});

		$(window).resize(function () {
			if ($('body').hasClass('offcanvas-visible')) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});

	};


	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);

			return false;
		});

	};


	// Page Nav
	var clickMenu = function () {
		var topVal = ($(window).width() < 769) ? 0 : 58;

		$(window).resize(function () {
			topVal = ($(window).width() < 769) ? 0 : 58;
		});
		$('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (event) {
			var section = $(this).data('nav-section');

			if ($('div[data-section="' + section + '"]').length) {

				$('html, body').animate({
					scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
				}, 500);

			}

			event.preventDefault();

			// return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		$('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
		$('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').addClass('active');

	};

	var navigationSection = function () {

		var $section = $('div[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}

		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () { return -$(this.element).height() + 155; }
		});

	};


	// Animations
	var homeAnimate = function () {
		if ($('#fh5co-home').length > 0) {

			$('#fh5co-home').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						$('#fh5co-home .to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};



	var aboutAnimate = function () {
		var about = $('#fh5co-about');
		if (about.length > 0) {

			about.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						about.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						about.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);



					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var sayingsAnimate = function () {
		var sayings = $('#fh5co-sayings');
		if (sayings.length > 0) {

			sayings.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						sayings.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var featureAnimate = function () {
		var feature = $('#fh5co-featured');
		if (feature.length > 0) {

			feature.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						feature.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						feature.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('bounceIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 500);


					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var typeAnimate = function () {
		var type = $('#fh5co-type');
		if (type.length > 0) {

			type.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						type.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var foodMenusAnimate = function () {
		var menus = $('#fh5co-menus');
		if (menus.length > 0) {

			menus.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						menus.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						menus.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};


	var eventsAnimate = function () {
		var events = $('#fh5co-events');
		if (events.length > 0) {

			events.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						events.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						events.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var reservationAnimate = function () {
		var contact = $('#fh5co-contact');
		if (contact.length > 0) {

			contact.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						contact.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						contact.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};

	var footerAnimate = function () {
		var footer = $('#fh5co-footer');
		if (footer.length > 0) {

			footer.waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {


					setTimeout(function () {
						footer.find('.to-animate').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeIn animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 200);

					setTimeout(function () {
						footer.find('.to-animate-2').each(function (k) {
							var el = $(this);

							setTimeout(function () {
								el.addClass('fadeInUp animated');
							}, k * 200, 'easeInOutExpo');

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			}, { offset: '80%' });

		}
	};



	// Document on load.
	$(function () {

		fullHeight();
		sliderMain();
		sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();


		// Animations
		homeAnimate();
		aboutAnimate();
		sayingsAnimate();
		featureAnimate();
		typeAnimate();
		foodMenusAnimate();
		eventsAnimate();
		reservationAnimate();
		footerAnimate();



	});


}());


//my code
// function imageSelecList() {
// 	var selectList = document.getElementById('SanPham');
// 	var imgUrl = "";

// 	if (selectList.value == 0)
// 		document.getElementById("showImg").style.display = 'none';

// 	if (selectList.value == 1) {
// 		imgUrl = "images/zl1.png";
// 		document.getElementById("showImg").style.display = 'block';
// 	}

// 	if (selectList.value == 2) {
// 		imgUrl = "images/zl2.jpg";
// 		document.getElementById("showImg").style.display = 'block';
// 	}
// 	if (selectList.value == 3) {
// 		imgUrl = "images/zl2.jpg";
// 		document.getElementById("showImg").style.display = 'block';
// 	}

// 	if (selectList.value == 4) {
// 		imgUrl = "images/zl2.jpg";
// 		document.getElementById("showImg").style.display = 'block';
// 	}

// 	if (selectList.value == 5) {
// 		imgUrl = "images/zl2.jpg";
// 		document.getElementById("showImg").style.display = 'block';
// 	}

// 	if (selectList.value == 6) {
// 		imgUrl = "images/zl2.jpg";
// 		document.getElementById("showImg").style.display = 'block';
// 	}


// 	document.getElementById("showImgSP").src = imgUrl;
// }


async function post() {
	// // checkPhone()
	// var phone = $('#phone').val();
	// var phoneConvert = phone.slice(1);
	// var urlCheck = "https://sheetdb.io/api/v1/3qpsp8zzwxsgm/search?phone=" + phoneConvert + ""
	// var url = "https://sheetdb.io/api/v1/3qpsp8zzwxsgm"
	// //check exit number phone
	// fetch(urlCheck, {
	// 	method: 'GET',

	// }).then(function (response) {
	// 	const p = Promise.resolve(response.json());
	// 	p.then(value => {
	// 		if (value.length == 0) {

	// 			var json = {
	// 				name: $('#name').val(),
	// 				phone: $('#phone').val(),
	// 				ChatLuong: $('input[name="rating"]:checked').val(),
	// 				DichVu: $('input[name="like"]:checked').val()
	// 			}

	// 			//creat
	// 			fetch(url, {
	// 						method: 'POST',
	// 						headers: {
	// 							'Accept': 'application/json',
	// 							'Content-Type': 'application/json'
	// 						},
	// 						body: JSON.stringify(json) 
	// 					}).then(function (response) {
	// 						console.log(response.status)
	// 						if(response.status == 201){
	// 							alert("0")
	// 						}
	// 					}).catch(function (err) {

	// 					});

	// 		} else {
	// 			alert("Bạn đã đánh giá rồi")
	// 		}
	// 	})

	// }).catch(function (err) {

	// });
	
	//randome voucher
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	function generateString(length) {
		let result = ' ';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}



	var json = {
		name: $('#name').val(),
		phone: $('#phone').val(),
		QuanlitySP: $('input[name="rating"]:checked').val(),
		QuanlityDV: $('input[name="like"]:checked').val(),
		time: new Date().toString(),
		voucher: generateString(4)
	}



	var url = "https://sheetdb.io/api/v1/3qpsp8zzwxsgm"

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(json)
	}).then(function (response) {
		console.log(response.status)
		if (response.status == 201) {

			var bodyZns = {
				// "ngay":json.time,
				// "ten_khach": json.name,
				// "ma_khach": "Đang cập nhật",
				// "hang": "0",
				// "chinh_sach": "Đang cập nhật",
				// "ghi_chu": "Mã voucher của bạn là " +json.voucher

				"phone": json.phone,
				"oa_id": "3348622973284359182",
				"template_id": "310484",
				"template_data": {
					"ngay":json.time,
					"ten_khach": json.name,
					"ma_khach": "Đang cập nhật",
					"hang": "0",
					"chinh_sach": "Đang cập nhật",
					"ghi_chu": "Mã voucher của bạn là " +json.voucher
				 }
			}

			console.log(JSON.stringify(bodyZns))
			var znsUrl = "https://zns.atpcare.vn/api/send-zns"
			fetch(znsUrl, {
				method: 'POST',
				headers: {
					"Access-Control-Allow-Origin": "*",
      					"Access-Control-Allow-Credentials": "true",
      					"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, access-token",
					"Content-Type": 'application/json',
					"Accept": 'application/json',
					"access-token": 'sznsb6277f2ff89c4cc6878a03bcb769e72a'
				},
				body: JSON.stringify(bodyZns)
			}).then(function (response) {
				console.log("ok")
			}).catch(function (err) {

			});


		}
	}).catch(function (err) {

	});


}
