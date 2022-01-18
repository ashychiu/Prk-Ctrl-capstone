const TOKEN_KEY = localStorage.token;

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
};

export const isLogin = () => {
  if (!localStorage.getItem(TOKEN_KEY)) {
    console.log(TOKEN_KEY);
    return true;
  }

  return false;
};
