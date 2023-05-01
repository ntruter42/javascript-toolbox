const fs = require('fs');

function rot69(str, shift) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const special = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~\\\"";
	let result = '';

	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		const charIndex = alphabet.indexOf(char.toLowerCase());
		const numIndex = numbers.indexOf(char);
		const specialIndex = special.indexOf(char);

		// indexOf() returns -1 if char is not found in string
		if (charIndex !== -1) {
			// Shift the letter by the specified number of places
			let shiftedIndex = (charIndex + shift) % 26;
			if (shiftedIndex < 0)
				shiftedIndex += 26;
			const shiftedChar = alphabet[shiftedIndex];
			// Preserve the case of the original character
			result += char === char.toUpperCase() ? shiftedChar.toUpperCase() : shiftedChar;
		}

		else if (numIndex !== -1) {
			// Shift the number by the specified number of places
			let shiftedIndex = (numIndex + shift) % 10;
			if (shiftedIndex < 0)
				shiftedIndex += 10;
			const shiftedNum = numbers[shiftedIndex];
			result += shiftedNum;
		}

		else if (specialIndex !== -1) {
			// Shift the special symbol by the specified number of places
			let shiftedIndex = (specialIndex + shift) % 32;
			if (shiftedIndex < 0)
				shiftedIndex += 32;
			const shiftedSpecial = special[shiftedIndex];
			result += shiftedSpecial;
		}

		else {
			// Character is not a letter or number, so just append it to the result
			result += char;
		}
	}

	return result;
}

if (process.argv.length < 4) {
	console.error('Usage: node rot69.js <filename> <shift>');
	for (let arg in process.argv) {
		console.log(arg + ' - ' + process.argv[arg]);
	}
	process.exit(1);
}

const filename = process.argv[2];
const shift = parseInt(process.argv[3]);
fs.readFile(filename, 'utf8', (err, data) => {
	if (err) {
		console.error(`Error reading file: ${err}`);
		process.exit(1);
	}

	const ciphertext = rot69(data, shift);
	console.log(ciphertext);
});
