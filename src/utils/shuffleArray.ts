import { getRandomInt } from "./getRandomInt";

/**
 * This function shuffles your array, this implements the Fisher-Yates shuffle
 * more information can be found [here](https://bost.ocks.org/mike/shuffle/)
 */
export const shuffleArray = <T>(array: Array<T>) => {
  let amountOfItemsToShuffle = array.length;
  let itemToBeSwapped;
  let randomIndex;

  while (amountOfItemsToShuffle) {
    randomIndex = getRandomInt(amountOfItemsToShuffle);
    amountOfItemsToShuffle--;

    itemToBeSwapped = array[amountOfItemsToShuffle];
    // NOTE: set the randomly selected array item at the front of the
    // already shuffled part of the array.
    array[amountOfItemsToShuffle] = array[randomIndex];
    // NOTE: set the item we just switched places with to the index
    // of the item we have but at the start of the already shuffled part
    // of the array.
    array[randomIndex] = itemToBeSwapped;
  }

  return array;
};
