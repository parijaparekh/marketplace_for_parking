//handler for deleting a parkingSlotDate
const toggleReadOnly = (elName) => {
    if (document.getElementById(elName).hasAttribute('readonly')){
        document.getElementById(elName).readOnly = false;
    }
    else{
        document.getElementById(elName).setAttribute('readonly', 'readonly');
    }
};

const parkingSpotDateDelHandler = async (event) => {
    event.preventDefault();
    console.log("In parkingSpotDateDelHandler");
    if (event.target.hasAttribute('data-id')){
      const id = event.target.getAttribute('data-id');
      
      const response = await fetch(`/api/parkingSlot/parkingDateDelete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        //console.log(document.getElementById(`${id}`));
        document.getElementById(`${id}`).remove();
      } else {
        alert(response.statusText);
      }
    }    
  };

const parkingSpotDateEditMode = (event) => {
    console.log("In parkingSpotDateEditMode");
    event.preventDefault();
    if (event.target.hasAttribute('data-id')){
      const id = event.target.getAttribute('data-id');
      //console.log("Work in progress");
      //console.log("rate_"+`${id}`);
      /* Making input boxes writable */
      toggleReadOnly("rate_"+`${id}`);
      toggleReadOnly("date_"+`${id}`); 
      document.getElementsByName("edit_"+`${id}`)[0].addEventListener('click', editHandler);     
    }    
  };
  
const editHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('date-id')){
        toggleReadOnly("rate_"+`${id}`);
        toggleReadOnly("date_"+`${id}`); 
        const id = event.target.getAttribute('date-id');
        const newdate = document.querySelector('#date_'+`${id}`).value.trim();
        const newrate = document.querySelector('#rate_'+`${id}`).value.trim();
        //console.log(JSON.stringify(date,rate));
        console.log(JSON.stringify({
            "date":  newdate,
            "rate":  newrate,
        }));
        const response = await fetch(`/api/parkingSlot/parkingDateUpdate/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                                "date":  newdate,
                                "rate":  newrate,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
        document.getElementsByName("edit_"+`${id}`)[0].addEventListener('click', parkingSpotDateEditMode); 
        if (response.ok) {    
            alert('Parking Slot info is updated');
        } else {
            alert('Failed to edit parking slot info.');
        }
    }
  };
  
  const buttonDelEls = document.querySelectorAll('#delete');
  if (buttonDelEls.length > 0){
      buttonDelEls.forEach(buttonDelEl => {buttonDelEl.addEventListener('click', parkingSpotDateDelHandler);});
  }

  const buttonEditEls = document.querySelectorAll('#edit');
  if (buttonEditEls.length > 0){
    buttonEditEls.forEach(buttonEditEl => {buttonEditEl.addEventListener('click', parkingSpotDateEditMode);});
  }