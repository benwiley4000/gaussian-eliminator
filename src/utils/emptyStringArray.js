function emptyStringArray (size) {
  const array = Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = '';
  }
  return array;
}

export default emptyStringArray;
