const bookaspotHandler = async (event) => {
  if ((event.target.hasAttribute('data-id')) && (event.target.hasAttribute('data-date'))){
    const id = event.target.getAttribute('data-id');
    const date = event.target.getAttribute('data-date');
    console.log(id, date);
    
  }
};

document.querySelector('#bookaspot').addEventListener('click', bookaspotHandler);

