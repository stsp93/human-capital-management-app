document.querySelectorAll('.confirm').forEach(el => {
  el.addEventListener('click', (e) => {
 

    let input = prompt(`Please enter '${e.target.textContent}'`,e.target.textContent);
    if (input !== e.target.textContent) {
      e.preventDefault();
    } 
  })
})

