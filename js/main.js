$(function(){

	$('.scrollToBlock').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $('#'+$(this).data('block-id')).offset().top-90},'slow');
	});
	
	$('.popupForm').fancybox({
		padding:0,
		beforeLoad:function(){
			$(this.href+' input:not([type=hidden])').val('');
			$(this.href+' form').show();
			$(this.href+' .result').html('');
		}
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
	var valuesShowed = false;
	$(window).scroll(function() {
		if($(window).scrollTop()+($(window).height()-$('#counters').height())>=$('#counters').offset().top){
			if(!valuesShowed){
				$('.counterNumber').each(function(){
					animateValue($(this),$(this).find('span').data('max-value'));
				});
				valuesShowed = true;
			}
		}
	});

});

function sendForm(obForm,validate) {
	var formData = [];
	obForm.find('input').each(function(){
		formData[this.name]=this.value;
	});

	obForm.find('input:not([type=hidden])').each(function(){
		checkEmpty($(this).parent(),$(this).attr('name'));
	});
	//console.log('submit before check '+obForm.find('.error').length);
	if(obForm.find('.error').length == 0){
		var m_method=obForm.attr('method');
		var m_action=obForm.attr('action');
		var m_parent_class = obForm.parent().attr('class');
		var m_data=obForm.serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			resetForm: 'true',
			success: function(result){
				var data = $(result).find("."+m_parent_class+"").html();
				$("."+m_parent_class+" form").fadeOut();
				$("."+m_parent_class+" .result").html(data);
			}
		});
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

function animateValue(obBlock,value){
	var i = 0;

	function addValue () {
	   setTimeout(function () {
		  obBlock.find('span').text(i);
		  i++;
		  if (i <= value) {
			 addValue();
		  }
	   }, (2000/value))
	}
	addValue();
}