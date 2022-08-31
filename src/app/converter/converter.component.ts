import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  romanNumerals: string[] = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  arabicNumerals: number[] = [1, 5, 10, 50, 100, 500, 1000];

  inputNumber: number;
  result: string;

  constructor() { }

  ngOnInit() {
  }

	startsWith4or9(input: number): Boolean {

		return (input.toString()[0] === '4' || input.toString()[0] === '9');

	}

	normalConversion(input: number, index: number): string {

		return this.romanNumerals[index].repeat(Math.floor(input / this.arabicNumerals[index]))

	}

  converter(input: number): string {

	  let romanNumber: string = '';

	  for (let i = (this.romanNumerals.length - 1); i >= 0; i--) {

      if (this.startsWith4or9(input) && (input !== input % this.arabicNumerals[i]) && i < (this.romanNumerals.length - 1)) {
			
        if (input.toString()[0] === '4'){
          romanNumber += this.romanNumerals[i] + this.romanNumerals[i + 1];
        }

			  if (input.toString()[0] === '9') { 
          romanNumber += this.romanNumerals[i - 1] + this.romanNumerals[i + 1];
          i--;
        }
			
        input = input % this.arabicNumerals[i];
		
      } else {

        romanNumber += this.normalConversion(input, i);
			  input = input % this.arabicNumerals[i];

		  }
	  }
    return romanNumber;
  }

  submitConversion() {

    if (!Number.isInteger(this.inputNumber)) {

      alert("Enter a whole number")
      return;

    } else if (this.inputNumber < 1 || this.inputNumber > 4999) {

      alert("Enter a number more than 0 or less than 5000")
      return;
    
    } else {

      this.result = this.converter(this.inputNumber);

    }
  }
}
