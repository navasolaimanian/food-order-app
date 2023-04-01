import { useState } from "react";

const useInput = (validat) => {
    const [enterdInput, setEnterdInput] = useState('');
    const [inputIsTouch, setInputIsTouch] = useState(false);
  
    const inputIsValid = validat(enterdInput);
    const inputIsInvalid = !inputIsValid && inputIsTouch;
  
    const inputChangHandler = (event) => {
      setEnterdInput(event.target.value);
      setInputIsTouch(true);
    }
  
    const inputBlurHandler = () => {
      setInputIsTouch(true);
    };

    const reset = () => {
        setEnterdInput('');
        setInputIsTouch(false);
    }

    return {
        value: enterdInput,
        inputIsValid,
        inputError: inputIsInvalid,
        inputChangHandler,
        inputBlurHandler,
        reset
    }
  
}

export default useInput;