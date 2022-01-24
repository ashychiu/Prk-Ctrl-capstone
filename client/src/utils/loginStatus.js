const TOKEN_KEY = "token";

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    console.log(TOKEN_KEY);
    return true;
  }

  return false;
};
