$(function(){

	$('.scrollToBlock').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $('#'+$(this).data('block-id')).offset().top-90},'slow');
	});
	
	$('.popupForm').fancybox({
		padding:0
	});
	
	$('form').submit(function(event) {
		sendForm($(this));
		event.preventDefault();
	});
	$('input').blur(function(){
		checkEmpty($(this).parent(),$(this).attr('name'));
	});
	
	$('input[data-verify=phone]').mask('9 (999) 999-99-99');
	
	/*jCarousel*/
	var jcarousel = $('.jcarousel');
	jcarousel.jcarousel({
				wrap: 'circular',
				easing: 'linear',
				animation: 800
			});

	$('.jcarousel-control-prev')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

	$('.jcarousel-control-next')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('click', function(e) {
				e.preventDefault();
			})
			.jcarouselControl({
				target: '+=1'
			});

	jcarousel.jcarouselAutoscroll({
		autostart: true,
		interval: 7000
	});
	
	var carouselLength = $('.jcarousel > ul >li').length;
	var carouselMinLenght = 5;
	if(carouselLength < carouselMinLenght){
		for(var i = 0, currentIndex = 0; i < (carouselMinLenght-carouselLength);i++){
			if(currentIndex>carouselLength){
				currentIndex = 1;
			}
			$('.jcarousel ul')
				.append('<li>'+$('.jcarousel > ul > li:eq('+currentIndex+')').html()+'</li>');
			currentIndex++;
		}
		 $('.jcarousel').jcarousel('reload');
	}


});

function sendForm(obForm,validate) {
	var formData = [];
	obForm.find('input').each(function(){
		formData[this.name]=this.value;
	});
	if(validate == 'checkEmpty'){
		obForm.find('input').each(function(){
			if($(this).data('required')){
				checkRequire($(this));
			}
		});
	}
	if(obForm.find('.error').length == 0){
		obForm.append('<div class="progressShadow">отправка...</div>');
		obForm.submit();
	}
	}

//проверяем поля
function checkEmpty(obForm,valName) {
	var reg = new RegExp("^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$", 'i');
	var fieldName = obForm.find('input[name='+valName+']');
	fieldName.removeClass('errorinput');
	if((fieldName.val()=='')||(fieldName.val() === undefined)) {
		fieldName.parent().find('.error-'+valName).remove();
		fieldName.before('<span class="error-'+valName+' error" style="display:block;">Обязательное поле</span>');
		fieldName.addClass('errorinput');
	} else if (!reg.test(fieldName.val())&&(valName=='email')) {
		fieldName.parent().find('.error-'+valName).remove();
		fieldName.before('<span class="error-'+valName+' error" style="display:block;">Введите корректный e-mail</span>');
		fieldName.addClass('errorinput');
	}else {
		fieldName.parent().find('.error-'+valName).remove();
	}
}

//проверяем поля
function checkRequire(obField) {
	obField.removeClass('errorinput');
	if(obField.data('required')&&((obField.val()=='')||(obField.val() === undefined))) {
		obField.parent().find('.error').remove();
		obField.before('<span class="error" style="display:block;">Обязательное поле</span>');
		obField.addClass('errorinput');
	} else {
		obField.parent().find('.error').remove();
	}
}

function swapFancyBox(){
	$("#fancybox-wrap").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          console.log("You swiped " + direction );  
		  if(direction == 'right'){
			$.fancybox.prev();
		  }
		  if(direction == 'left'){
			$.fancybox.next();
		  }
        }
      });
}