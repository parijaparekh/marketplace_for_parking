//declare moment pending

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment( new Date(startDate));
    var stopDate = moment(new Date(stopDate));
    console.log(stopDate, currentDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

const sellaspotHandler = async (event) => {
    event.preventDefault();
  
    console.log("In sellaspotHandler");
    const  slotNo = document.querySelector("#slotNo").value.trim();
    const  street_number = document.querySelector('#streetNo').value.trim();
    const  street_name = document.querySelector('#streetName').value.trim();
    const  suburb = document.querySelector('#suburb').value.trim();
    const  state = document.querySelector('#state').value.trim();
    const  postcode = document.querySelector('#postcode').value.trim();
    const  startDate = document.querySelector('#startDate').value.trim();
    const  endDate = document.querySelector('#endDate').value.trim();
    const  tags = [document.querySelector('#locationTags').value];
    const  rate = document.querySelector('#rate').value.trim();
    const  dates = getDates(startDate, endDate);
    console.log(tags);
    if (slotNo && street_number && street_name && suburb && postcode && dates && tags && rate) {
      const response = await fetch('/api/parkingSlot/', {
        method: 'POST',
        body: JSON.stringify({ slotNo, street_number, street_name, suburb, state, postcode, dates, tags, rate }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/sellaspot');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  $(function () {
    $('#datepicker1').datepicker();
    $('#datepicker2').datepicker({
    useCurrent: false //Important! See issue #1075
    });
    $("#datepicker1").on("dp.change", function (e) {
        $('#datepicker2').data("DatePicker").minDate(e.date);
    });
    $("#datepicker2").on("dp.change", function (e) {
        $('#datepicker1').data("DatePicker").maxDate(e.date);
    });
  });  
  
  document
    .querySelector('#sellaspot-form')
    .addEventListener('submit', sellaspotHandler);