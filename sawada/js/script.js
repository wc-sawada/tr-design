//スクロール禁止用関数
function no_scroll(){
	//PC用
	var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	$(document).on(scroll_event,function(e){e.preventDefault();});
	//SP用
	$(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

//スクロール復活用関数
function return_scroll(){
	//PC用
	var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	$(document).off(scroll_event);
	//SP用
	$(document).off('.noScroll');
}

// ローディング
$(window).on('load', function(){
	// 位置をTOPへ
	$('html,body').animate({ scrollTop: 0 }, '1');
	// スクロール禁止
	no_scroll();
	// 表示ウィンドウの高さ取得
	var windowH =  $(window).height();
	$('.loaderBack').css('height', windowH);

	// degという変数を0から360までduration秒かけて変化させる
	$({deg:0}).animate({deg:360}, {
		duration: 3000,
		// 途中経過
		progress:function() {
			$('.loaderBack img').css({
				transform:'translate(-50%,-50%)'+'rotate(' + this.deg + 'deg)'
			});
		},
		// アニメーション完了
		complete:function() {
			$('.loaderBack, .loaderBack img, .loading .text').fadeOut(2000);
			// フェードアウト終わるころにスクロール禁止解除
			setTimeout(function(){
				return_scroll();
			},1800);
		}
	});
});

$(function(){
	// #で始まるアンカーをクリックした場合に処理
	$('a[href^=#]').click(function() {
		// スクロールの速度
		var speed = 400;
		// アンカーの値取得
		var href= $(this).attr("href");
		// 移動先を取得
		var target = $(href === "#" || href === "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
	
	// タイトルスクロールイン
	$(window).scroll(function (){
		$('.cmnTitle').each(function(){
			var elemPos = $(this).offset().top;
			var scrollT = $(window).scrollTop();
			var windowH = $(window).height();
			if (scrollT > elemPos - windowH + 200){
				$(this).addClass('scrollIn');
			}
		});
	});

	// Q & A
	$('#uiIntro .qaWrap dt').on('click', function(){
		$(this).next().stop().slideToggle(500);
		$(this).toggleClass('open');
	});
});