function disp(url){
	window.open(url, "prott_user", "width=500,height=600,scrollbars=yes,resizable=yno,status=no");
}
function chktext(obj) {
	if (!obj.value) {
		chktext[obj.name] = false;
		if(!!obj.style) namelabel.style.display='block';
	} else {
		chktext[obj.name] = true;
		if(!!obj.style) namelabel.style.display='none';
	}
}
