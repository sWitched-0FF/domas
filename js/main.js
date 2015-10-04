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
	jcarousel
    .on('jcarousel:create jcarousel:reload', function() {
        var element = $(this),
            width = $(document).width();
		
		if(width>1440){
			element.jcarousel('items').css('width', (width/4 - 37.5) + 'px');
			$('.slideImg').css({'width':(width/4 - 37.5) + 'px','height':(width/4 - 37.5) + 'px'});
			$('.jcarousel-control-prev, .jcarousel-control-next').css('top',((width/4 - 37.5)/2-45) + 'px');
		}
		else{
			element.jcarousel('items').css('width', (width/3 - 40) + 'px');
			$('.slideImg').css({'width':(width/3 - 40) + 'px','height':(width/3 - 40) + 'px'});
			$('.jcarousel-control-prev, .jcarousel-control-next').css('top',((width/3 - 40)/2-45) + 'px');
		}
    })
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

	var carouselLength = $('.jcarousel > ul >li').length;
	var carouselMinLenght = 4;
	if(carouselLength < carouselMinLenght){
		for(var i = 0, currentIndex = 0; i < (carouselMinLenght-carouselLength);i++){
			if(currentIndex>carouselLength){
				currentIndex = 1;
			}
			$('.jcarousel ul')
				.append('<li>'+$('.jcarousel > ul > li:eq('+currentIndex+')').html()+'</li>');
			currentIndex++;
		}
		 jcarousel.jcarousel('reload');
	}
	jcarousel.jcarousel('reload');
	
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
		
		//анимируем первый блок
		if($('.examplesBg').offset().top<$(window).scrollTop()+($(window).height())*0.3){
			//console.log('animation 1');
			$('.exampleBlock:eq(0) img').show().addClass('animated bounceInLeft');
			$('.exampleBlock:eq(0) h4').show().addClass('animated bounceInLeft');
			$('.exampleBlock:eq(0) p').show().addClass('animated bounceInLeft');
			$('.exampleBlock:eq(1) img').show().addClass('animated bounceInRight');
			$('.exampleBlock:eq(1) h4').show().addClass('animated bounceInRight');
			$('.exampleBlock:eq(1) p').show().addClass('animated bounceInRight');
			$('.exampleNote').show().addClass('animated fadeIn');
		}
		
		//анимируем 2.1 блок
		if($('.advantagesRow:eq(0)').offset().top<$(window).scrollTop()+($(window).height())*0.6){
			$('.advantagesRow:eq(0)').css('opacity','1').addClass('animated bounceInLeft');
		}
		//анимируем 2.2 блок
		if($('.advantagesRow:eq(1)').offset().top<$(window).scrollTop()+($(window).height())*0.6){
			$('.advantagesRow:eq(1)').css('opacity','1').addClass('animated bounceInRight');
		}
		//анимируем 2.3 блок
		if($('.advantagesRow:eq(2)').offset().top<$(window).scrollTop()+($(window).height())*0.6){
			$('.advantagesRow:eq(2)').css('opacity','1').addClass('animated bounceInLeft');
		}
		
		//анимируем 3 блок
		if($('.stepsBlock').offset().top<$(window).scrollTop()+($(window).height())*0.6){
			$('.stepsBlock li').each(function(i){
				setTimeout(function () {
					$('.stepsBlock li:eq('+i+')').css('opacity','1').addClass('animated bounceInLeft');
				},i*200);
			});
		}
	});
	
	$('.featuresList li').hover(
		function(){
			$('.areaHighligh').hide();
			$('.featureText').html('<div class="hint">'+$(this).find('.hint').html()+'</div>');
			$(this).find('.areaHighligh').show();
		});
		
	$('.exampleBlock img').hide();
	$('.exampleBlock h4').hide();
	$('.exampleBlock p').hide();
	$('.exampleNote').hide();
	$('.advantagesRow').css('opacity','0');
	$('.stepsBlock li').css('opacity','0');

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
	   }, (1400/value))
	}
	addValue();
}