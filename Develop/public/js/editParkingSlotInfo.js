//Todo: Change the code here to 
const updateSpotHandler = async (event) => {
  console.log("In updateSpotHandler");
  event.preventDefault();
  if (event.target.hasAttribute('data-id') && event.target.hasAttribute('data-addressId') && event.target.hasAttribute('data-locationTagsId')){
    const id = event.target.getAttribute('data-id');
    const addressId = event.target.getAttribute('data-addressId');
    const locationTagsId = event.target.getAttribute('data-locationTagsId');
    const  slotNo = document.querySelector("#slotNo").value.trim();
    const  street_number = document.querySelector('#streetNo').value.trim();
    const  street_name = document.querySelector('#streetName').value.trim();
    const  suburb = document.querySelector('#suburb').value.trim();
    const  state = document.querySelector('#state').value.trim();
    const  postcode = document.querySelector('#postcode').value.trim();
    const  tags = [document.querySelector('#locationTags').value];
    const  rate = document.querySelector('#rate').value.trim();
    if (slotNo && street_number && street_name && suburb && postcode && tags && rate) {
     //Todo: change this to call update api of parkingSlotInfoUpdate
      console.log("Calling server Api");
      const response = await fetch(`/api/parkingSlot/parkingSlotAddressUpdate/${addressId}`, {
          method: 'PUT',
          body: JSON.stringify({slotNo, street_number, street_name, suburb, state, postcode}),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          console.log(`${locationTagsId}`);
          const response = await fetch(`/api/parkingSlot/parkingSlotLocationTagUpdate/${locationTagsId}`, {
            method: 'PUT',
            body: JSON.stringify({tags}),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            await document.location.replace("/api/user/dashboard");    
          } else {
            alert(response.statusText);
          }
        }
        else{
          alert(response.statusText);
        }//end of reponse handling for address
      }///api/parkingSlot/parkingSlotInfoUpdate/${id}
    }//event.currentTarget.hasAttribute('data-id')
};

  
  //change the id here if you are calling the form something else
  document
    .querySelector('#editaspot-form')
    .addEventListener('submit', updateSpotHandler);