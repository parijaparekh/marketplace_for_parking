const logoutHandler = async (event) => {
  event.preventDefault();
  await document.location.replace("/api/user/logout");    
};

const dashboardHandler = async (event) => {
  event.preventDefault();
  await document.location.replace("/api/user/dashboard");    
};


document.querySelector('#logout').addEventListener('click', logoutHandler);
document.querySelector('#dashboard').addEventListener('click', dashboardHandler);