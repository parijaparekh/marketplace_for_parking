//declare moment pending
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

const sellaspotHandler = async (event) => {
    event.preventDefault();
  
    const  slot_no = document.querySelector("#slotNo").value.trim();
    const  street_no = document.querySelector('#streetNo').value.trim();
    const  street_name = document.querySelector('#streetName').value.trim();
    const  suburb = document.querySelector('#suburb').value.trim();
    const  state = document.querySelector('#state').value.trim();
    const  postcode = document.querySelector('#postcode').value.trim();
    const  startDate = document.querySelector('#startDate').value.trim();
    const  endDate = document.querySelector('#endDate').value.trim();
    const  locationTags = document.querySelector('#locationTags');
    const  rate = document.querySelector('#rate');
    const  dates = getDates(startDate, endDate);

    if (slot_no && street_no && street_name && suburb && postcode && dates && locationTags && rate) {
      const response = await fetch('/api/parkingSlot', {
        method: 'POST',
        body: JSON.stringify({ slot_no, street_no, street_name, suburb, state, postcode, dates, locationTags, rate }),
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