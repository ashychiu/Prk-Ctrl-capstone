const TOKEN_KEY = "jwt";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
};

export const isLoggedIn = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
    console.log("check status: ", isLoggedIn);
  }

  return false;
};
