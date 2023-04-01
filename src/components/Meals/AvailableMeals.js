import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [hasError, setHasError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoding(true);
    const res = await fetch('https://react-http-ed7cd-default-rtdb.firebaseio.com/meals.json');
    if (!res.ok) {
      throw new Error('somthing went wrong')
    }
    const data = await res.json();

    const loadMeals = [];
    for (const key in data) {
      loadMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
      })
    }

    setMeals(loadMeals);
    setIsLoding(false);
  }, [])

  const mealsList = meals.map(meal =>
    < MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  )

  useEffect(() => {
    fetchMeals().catch(error => {
      setIsLoding(false);
      setHasError(error.message);
    })
  }, [fetchMeals])

  let content;

  if (mealsList.length > 0) {
    content = mealsList;
  }

  if (isLoding) {
    content = <p>is loding ...</p>;
  }

  if (hasError) {
    console.log('yay');
    content = <p>cant load meals</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
