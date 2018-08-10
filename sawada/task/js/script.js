/*
 * 複数要素の最大の高さの値を取得する関数
 * param target･･･string 取得したい要素名
 * retrun maxItemHeight･･･int 複数要素の最大の高さの値
 */
function getItemsMaxHeight(target) {
	// 配列定義
	var itemsAry = new Array();
	// each関数で要素の数だけ回す
	$(target).each(function(i){
		var i = 0;
		// 取得した要素の高さを配列に1つずつ格納
		itemsAry.push($(this).outerHeight());
	});
	// 取得した高さの中で一番値が大きいものを計算、格納
	var maxItemHeight = Math.max(...itemsAry);
	return maxItemHeight;
}

/*
 * リストの高さを計算する関数
 * param nowTextHeight･･･int リスト内のテキストの高さ
 * retrun listHeight･･･int 計算したリストの高さ
 */
function calcListHeight(nowTextHeight){
	// リストの上下パディング値
	var listPadding = 12;
	// ボーダーの太さ
	var listBorder = 3;
	// リストの高さ = テキストの高さ + 上下パディング + ボーダーの太さ × 上下
	var listHeight = nowTextHeight + listPadding + (listBorder * 2);
	return listHeight;
}

$(function(){
	// インターバルで1秒毎にフォントサイズを監視
	setInterval(function(){
		// cssで最初に指定されるフォントサイズ
		var defultFontSize = 13;
		// 現在のフォントサイズを取得、格納
		// parseIntでpxを排除、10進数を指定
		var nowFontSize = parseInt($(".repeatReasonArea .pointBlock li .text").css('font-size'), 10);

		// 現在のサイズがデフォルトのサイズと異なる場合
		if (nowFontSize != defultFontSize) {
			// pointBlockのliの.textの最大値取得
			var maxPointTextHeight = getItemsMaxHeight(".repeatReasonArea .pointBlock li .text");
			// リストの高さを計算、格納
			var listHeight = calcListHeight(maxPointTextHeight);
			// liの高さを指定
			$(".repeatReasonArea .pointBlock li").css( 'height', listHeight + 'px' );
			// フォントサイズが変わったことを示すためクラス付与
			$(".repeatReasonArea .pointBlock ul").addClass("changeFontSize");
		} else {
			// クラスが付与されていたら
			if ($(".repeatReasonArea .pointBlock ul").hasClass("changeFontSize")) {
				// pointBlockのliの.textの最大値取得
				var maxPointTextHeight = getItemsMaxHeight(".repeatReasonArea .pointBlock li .text");
				// リストの高さを計算、格納
				var listHeight = calcListHeight(maxPointTextHeight);
				// liの高さを指定
				$(".repeatReasonArea .pointBlock li").css( 'height', listHeight + 'px' );
				// デフォルトより大きいまたは小さいサイズから変更された後にフォントサイズ変更し
				// 同じになったので処理をしてからクラス名を外す
				$(".repeatReasonArea .pointBlock ul").removeClass("changeFontSize");
			}
		}
	}, 1000);

	// pointBlockのliの最大値取得
	var maxListHeight = getItemsMaxHeight(".repeatReasonArea .pointBlock li");
	// liの最大値を高さに指定
	$(".repeatReasonArea .pointBlock li").css( 'height', maxListHeight + 'px' );

	// フローティングのcloseクリック時イベント
	$(".floatingArea .close").on("click", function(){
		$(".floatingArea").hide();
	});
});