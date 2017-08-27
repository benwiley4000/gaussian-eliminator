function zeroArray (size) {
  const array = Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = 0;
  }
  return array;
}

export default zeroArray;
