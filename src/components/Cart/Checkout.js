import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const {
    value: enterdName,
    inputIsValid: nameIsValid,
    inputError: nameError,
    inputChangHandler: nameChangHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName } = useInput(value => value.trim().length > 0);
  const {
    value: enterdStreet,
    inputIsValid: streetIsValid,
    inputError: streetError,
    inputChangHandler: streetChangHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet } = useInput(value => value.trim().length > 0);

  const {
    value: enterdPostal,
    inputIsValid: postalIsValid,
    inputError: postalError,
    inputChangHandler: postalChangHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal } = useInput(value => value.trim().length > 0);

  const {
    value: enterdCity,
    inputIsValid: cityIsValid,
    inputError: cityError,
    inputChangHandler: cityChangHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity } = useInput(value => value.trim().length > 0);

  const nameClasses = nameError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
  const streetClasses = streetError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
  const postalClasses = postalError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
  const cityClasses = cityError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }
  const confirmHandler = (event) => {
    event.preventDefault();


    if (!formIsValid) {
      return;
    }

    resetName();
    resetCity();
    resetPostal();
    resetStreet();

    props.onConfirm({
      name: enterdName,
      street: enterdStreet,
      city: enterdCity,
      postal: enterdPostal
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enterdName} onChange={nameChangHandler} onBlur={nameBlurHandler} />
        {nameError && <p>enter valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={enterdStreet} onChange={streetChangHandler} onBlur={streetBlurHandler} />
        {streetError && <p>enter valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={enterdPostal} onChange={postalChangHandler} onBlur={postalBlurHandler} />
        {postalError && <p>enter valid postal</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={enterdCity} onChange={cityChangHandler} onBlur={cityBlurHandler} />
        {cityError && <p>enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;