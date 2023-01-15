const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys){
  const value = key.dataset.key;

  key.addEventListener('click', ()=>{
    if (value == 'clear'){
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
      }
      else if (value == 'backspace') {
        input = input.slice(0, -1);
        display_input.innerHTML = inputClean(input);
      }
      else if (value == '=') {
        try{
            let result = eval(finalInput(input));
        } catch {
            display_output.innerHTML = "Error"
        }
        let result = eval(finalInput(input));

        display_output.innerHTML = result;
      }
      else if (value == 'brackets'){
        if (input.indexOf("(") == -1 ||
            input.indexOf("(") != -1 &&
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(")<input.lastIndexOf(")")) {
          input += "(";
        }
        else if (
          input.indexOf("(") != -1 &&
          input.indexOf(")") == -1 ||
          input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")
      ) {
          input += ")";
        }
        display_input.innerHTML = inputClean(input);
      }
      else {
        if (inputValidation(value)){
        input += value;
        display_input.innerHTML = inputClean(input);
      }
      }
  })
}

// to prevent the user from entering multiple operators or decimal points
function inputValidation (value) {
	let prev_input = input.slice(-1);
	let operator_list = ["+", "-", "*", "/"];

	if (value == "." && prev_input == ".") {
		return false;
	}

	if (operator_list.includes(value)) {
		if (operator_list.includes(prev_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}
//to color code the operators the operators and display error message for invalid expressions
function inputClean(input) {
	let input_arr = input.split("");
	let input_arr_length = input_arr.length;

	for (let i = 0; i < input_arr_length; i++) {
		if (input_arr[i] == "+") {
			input_arr[i] = `<span class="operator">+</span>`;
		} else if (input_arr[i] == "-") {
			input_arr[i] = `<span class="operator">-</span>`;
		} else if (input_arr[i] == "*") {
			input_arr[i] = `<span class="operator">x</span>`;
		} else if (input_arr[i] == "/") {
			input_arr[i] = `<span class="operator">÷</span>`;
		}  else if (input_arr[i] == "(") {
			input_arr[i] = `<span class="brackets">(</span>`;
		} else if (input_arr[i] == ")") {
			input_arr[i] = `<span class="brackets">)</span>`;
		} else if (input_arr[i] == "%") {
			input_arr[i] = `<span class="percent">%</span>`;
		} else if (input_arr_length<=1) {
      			display_output == "Error"
    		}
	}

	return input_arr.join("");
}

// automatically evaluates the percent sign to a value of n/100 (if n is the input number)
function finalInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}
