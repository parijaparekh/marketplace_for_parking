const rentaspotHandler = async (event) => {
    event.preventDefault();
    // Collect values from rentaspot search
    const locationTag = document.querySelector('#locationTag').value.trim();
    const date = document.querySelector('#date').value.trim();
    console.log("rent a spot handler");
    if (locationTag && date) {
       // sessionStorage.setItem("locationTag", locationTag);
       // sessionStorage.setItem("date", date);
      //};
      //document.location.replace('/api/parkingSlot/search?locationTag='+locationTag);
      // Send a get request to the API endpoin
      const params = { 
        "locationTag": locationTag,
        "date": date
      };
      const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
      const url = "/api/parkingSlot/search?";
      document.location.replace(url+query);
    }
};

$(function() {
  $('#datepicker').datepicker();
});


//document.querySelector('#datepicker').datepicker();
document.querySelector('#spotSearch').addEventListener('submit',rentaspotHandler);
  