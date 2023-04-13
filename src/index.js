outer: for (let i = 0; i < 3; i++) {
  if (i === 1) {
    continue outer;
  }
  console.log(i);
}
