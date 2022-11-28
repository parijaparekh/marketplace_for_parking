//Todo: Change the code here to 

const updateSpotHandler = async (event) => {
    event.preventDefault();
  
    console.log("In updateSpotHandler");
    const  slotNo = document.querySelector("#slotNo").value.trim();
    const  street_number = document.querySelector('#streetNo').value.trim();
    const  street_name = document.querySelector('#streetName').value.trim();
    const  suburb = document.querySelector('#suburb').value.trim();
    const  state = document.querySelector('#state').value.trim();
    const  postcode = document.querySelector('#postcode').value.trim();
    const  tags = [document.querySelector('#locationTags').value];
    const  rate = document.querySelector('#rate').value.trim();
    
    console.log(tags);
    
    if (slotNo && street_number && street_name && suburb && postcode && dates && tags && rate) {
     //Todo: change this to call update api of parkingSlotInfoUpdate
     const response = await fetch('/api/parkingSlot/parkingSlotInfoUpdate/', {
        method: 'PUT',
        body: JSON.stringify({ slotNo, street_number, street_name, suburb, state, postcode, dates, tags, rate }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  //change the id here if you are calling the form something else
  document
    .querySelector('#editaspot-form')
    .addEventListener('submit', updateSpotHandler);