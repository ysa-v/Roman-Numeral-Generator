import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Declare arrays with corresponding values

  const romanNumerals: string[] = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  const arabicNumerals: number[] = [1, 5, 10, 50, 100, 500, 1000];

  // Checks to see if the input starts with 4 or 9

	startsWith4or9(input: number): Boolean {

		return (input.toString()[0] === '4' || input.toString()[0] === '9');

	}

  // Will convert a single digit except 4 or 9

	normalConversion(input: number, index: number): string {

		return this.romanNumerals[index].repeat(Math.floor(input / this.arabicNumerals[index]))

	}

  // Converts any number between 0-5000 using helper functions above

  converter(input: number): string {

	  let romanNumber: string = '';

	  for (let i = (this.romanNumerals.length - 1); i >= 0; i--) {
	  
      // Special conversion for 4's and 9's
      if (this.startsWith4or9(input) && (input !== input % this.arabicNumerals[i]) && i < (this.romanNumerals.length - 1)) {
			
        romanNumber += this.romanNumerals[0] + this.romanNumerals[i + 1];

			  if (input.toString()[0] === '9') { 
          i--;
        }
			
        input = input % this.arabicNumerals[i];
		
      } else {

			  // Conversion for other digits
        romanNumber += this.normalConversion(input, i);
			  input = input % this.arabicNumerals[i];

		  }
	  }
    return romanNumber;
  }
}
