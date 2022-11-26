const logoutHandler = async (event) => {
  event.preventDefault();
  await document.location.replace("/api/user/logout");  
  
};

document.querySelector('#logout').addEventListener('click', logoutHandler);
