function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export default logout;
