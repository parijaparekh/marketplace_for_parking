//handler for deleting a parkingSlotDate
const toggleReadOnly = (elName) => {
    if (document.getElementById(elName).hasAttribute('readonly')){
        document.getElementById(elName).readOnly = false;
    }
    else{
        document.getElementById(elName).setAttribute('readonly', 'readonly');
    }
};

//all this code npw resides in dashboarddetails
/*const parkingSpotDateDelHandler = async (event) => {
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
      // Making input boxes writable 
        toggleReadOnly("rate_"+`${id}`);
      //toggleReadOnly("date_"+`${id}`); 
      document.getElementsByName("edit_"+`${id}`)[0].addEventListener('click', editHandler);     
    }    
  };
  
const editHandler = async (event) => {
    event.preventDefault();
    if (event.currentTarget.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        toggleReadOnly("rate_"+`${id}`);
        //toggleReadOnly("date_"+`${id}`); 
        const newdate = document.querySelector('#date_'+`${id}`).value.trim();
        const newrate = document.querySelector('#rate_'+`${id}`).value.trim();
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
  }; */
  
  /*Todo: write the code here to call the api/parkingSlot/id Api by id */
  const editParkingSlotInfoHandler = async (event) => {
    console.log("editParkingSlotHandler");
    event.preventDefault();
    if (event.currentTarget.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        if (id) {
          const query = "id="+`${id}`;
          const url = "/api/parkingSlot?";
          console.log(url+query);
          document.location.replace(url+query);
        }
    };
  };
  
  const detailsHandler = async (event) => {
    console.log("detailsParkingSlotHandler");
    event.preventDefault();
    
    if (event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        if (id) {
          console.log("About to switch to server: "+id);
          const params = { 
            "id": id
          };
          const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
          const url = "/api/parkingSlot/parkingSpotDetails?";
          document.location.replace(url+query);    
        }
      }
    };

  const parkingSlotInfoEls = document.querySelectorAll('#edit_parkingSlotInfo');
  if (parkingSlotInfoEls.length > 0){
    parkingSlotInfoEls.forEach(parkingSlotInfoEl => {parkingSlotInfoEl.addEventListener('click', editParkingSlotInfoHandler);});
  }

  const detailsEls = document.querySelectorAll('#details_parkingSlotInfo');
  if (detailsEls.length > 0){
    detailsEls.forEach(detailsEl => {detailsEl.addEventListener('click', detailsHandler);});
  }