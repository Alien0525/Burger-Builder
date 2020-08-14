import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient.js/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    //reduce(prev,current) adds current value to prev thus flattening the array, i.e, converting to a single array
  // [...Array(3)] creates an array of size 3 containing 3 undefined spaces. It just gives the count of no. of times an ingredient is used.
  // Object.keys converts the keys of an object into array.

    if(transformedIngredients.length===0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }


  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
