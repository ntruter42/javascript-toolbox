const fs = require('fs');

function rot69(str, shift) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	let result = '';

	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		const charIndex = alphabet.indexOf(char.toLowerCase());
		const numIndex = numbers.indexOf(char.toLowerCase());
		
		// indexOf() returns -1 if char is not found in string
		if (charIndex !== -1) {
			// Shift the letter by the specified number of places
			const shiftedIndex = (charIndex + shift) % 26;
			const shiftedChar = alphabet[shiftedIndex];

			// Preserve the case of the original character
			result += char === char.toUpperCase() ? shiftedChar.toUpperCase() : shiftedChar;
		} else if (numIndex !== -1) {
			// Shift the number by the specified number of places
			const shiftedIndex = (numIndex + shift) % 10;
			const shiftedNum = numbers[shiftedIndex];

			result += shiftedNum;
		} else {
			// Character is not a letter or number, so just append it to the result
			result += char;
		}
	}

	return result;
}

if (process.argv.length < 5) {
	console.error('Usage: node rot69.js <filename> <shift>');
	process.exit(1);
}

const filename = process.argv[2];
const shift = parseInt(process.argv[4]);
fs.readFile(filename, 'utf8', (err, data) => {
	if (err) {
		console.error(`Error reading file: ${err}`);
		process.exit(1);
	}

	const ciphertext = rot69(data, shift);
	console.log(ciphertext);
});
