/**
 * Function returning a random number between min and max values.
 * @param  {number} min - Minimum value of a random number.
 * @param  {number} max - Maximum value of a random number.
 * @return {int} Random value.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export {getRandomInt};
