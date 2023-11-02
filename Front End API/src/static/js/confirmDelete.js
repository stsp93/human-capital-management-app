document.querySelector('.delete').addEventListener('click', (e) => {
 
  console.log();

  let input = prompt(`Please enter '${e.target.text}'`,e.target.text);
  if (input !== e.target.text) {
    e.preventDefault();
  } 
})