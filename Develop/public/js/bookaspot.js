const bookaspotHandler = async (event) => {
  if ((event.target.hasAttribute('data-id')) && (event.target.hasAttribute('data-date'))){
    const id = event.target.getAttribute('data-id');
    const dateFrom = event.target.getAttribute('data-date');
    const dateTo = event.target.getAttribute('data-date');
    const rate = event.target.getAttribute('data-rate');  
   
    const response = await fetch('/api/slotBooking/', {
      method: 'POST',
      body: JSON.stringify({ id, dateFrom, dateTo, rate }),
      headers: { 'Content-Type': 'application/jsonp' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }    
};

console.log( typeof document.querySelector('#bookaspot'));
document.querySelector('#bookaspot').addEventListener('click', bookaspotHandler);

