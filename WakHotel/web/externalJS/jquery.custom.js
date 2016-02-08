$(document).ready(function() {
	var mobileTest;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	  mobileTest = true;
	  $("html").addClass("mobile");
	}
	else {
	  mobileTest = false;
	  $("html").addClass("no-mobile");
	}
  // Parallax scroll **********************************       
  if (($(window).width() >= 1024) && (mobileTest == false)) {
    $('.intro-search-section').parallax("50%", -0.1);
  };

});