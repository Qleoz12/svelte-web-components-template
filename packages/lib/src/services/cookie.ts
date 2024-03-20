import Cookie from "js-cookie";

export const getCookie = (cookieName: string) => {
  return Cookie.get(cookieName);
};

export const setCookie = (
  nombre: string,
  valor: string,
  dominiocookie: string
) => {
  let date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  return Cookie.set(nombre, valor, {
    expires: date,
    domain: dominiocookie,
  });
};
