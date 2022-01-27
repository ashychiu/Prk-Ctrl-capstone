const TOKEN_KEY = "token";

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};
