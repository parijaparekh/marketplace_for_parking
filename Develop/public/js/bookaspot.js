const bookaspotHandler = async (event) => {
  if ((event.target.hasAttribute('data-id')) && (event.target.hasAttribute('data-date'))){
    const parkingSlotId = event.target.getAttribute('data-id');
    const dateFrom = event.target.getAttribute('data-date');
    const dateTo = event.target.getAttribute('data-date');
    const price = event.target.getAttribute('data-rate');  
   
    const response = await fetch('/api/slotBooking/', {
      method: 'POST',
      body: JSON.stringify({ parkingSlotId, dateFrom, dateTo, price }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }    
};


//console.log( typeof document.querySelector('#bookaspot'));
const buttonEls = document.querySelectorAll('#bookaspot');
if (buttonEls.length > 0){
  buttonEls.forEach(buttonEl => {addEventListener('click', bookaspotHandler);});
}
