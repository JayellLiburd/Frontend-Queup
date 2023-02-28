
let previousPhone = '';
export function phoneFormat(field: any) {
	const specialCharCount = (field.value.match(/\D/g) || []).length;
	let cursorPosition = field.selectionStart;

	let input = field.value.replace(/\D/g, '');
	const size = input.length;
	if (input.substring(0, 1) === 1) {
		if (size === 0) { input = `` }
		else if (size < 2) { input = `+${input} ` }
		else if (size < 4) { input = `+${input.substring(0, 1)} (${input.substring(1)}` }
		else if (size < 8) { input = `+${input.substring(0, 1)} (${input.substring(1, 4)}) ${input.substring(4)}` }
		else if (size < 12) { input = `+${input.substring(0, 1)} (${input.substring(1, 4)}) ${input.substring(4, 7)}-${input.substring(7, 11)}` }
	} else {
		if (size > 7 && size < 11) { input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}` }
		else if (size > 3 && size < 8) { input = `${input.substring(0, 3)}-${input.substring(3)}` }
	}

	if (input !== previousPhone) {
		previousPhone = input
		const specialCharDiff = (input.match(/\D/g) || []).length - specialCharCount;
		cursorPosition += specialCharDiff

		field.value = input
		field.selectionStart = cursorPosition;
		field.selectionEnd = cursorPosition;
	}
}


export function TimeConversion(time: string | undefined) {
	if (!time) return '';
	let hours = parseInt(time.substring(0, 2));
	let minutes: number | string = parseInt(time.substring(3, 5))
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return `${hours}:${minutes} ${ampm}`;
}