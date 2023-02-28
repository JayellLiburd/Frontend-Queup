export function currentTime() {
	let date = new Date();
	let hh: any = date.getHours();
	let mm: any = date.getMinutes();
	let ss: any = date.getSeconds();
	let session = "AM";

	if (hh == 0) {
		hh = 12;
	}
	if (hh > 12) {
		hh = hh - 12;
		session = "PM";
	}

	hh = hh < 10 ? "0" + hh : hh;
	mm = mm < 10 ? "0" + mm : mm;
	ss = ss < 10 ? "0" + ss : ss;

	let time = hh + ":" + mm + ":" + ss + " " + session;
  return time;
}

