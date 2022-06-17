onmessage = function (e) {
  const [input1, input2] = e.data;
  const result = input1 * input2;

  console.log('Worker: Posting message back to main script');
  postMessage(result);
};
