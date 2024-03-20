import { getCookie, setCookie } from "./cookie";

export enum ROL {
  CIUDADANO = "C",
  PROFESIONAL = "P",
}

export const isProfesional = (): boolean => {
  return getCookie("pc_profesional") === "true";
};

export const setProfesional = (dominiocookie: string) => {
  setCookie("pc_profesional", "true", dominiocookie);
};

export const setCiudadano = (dominiocookie: string) => {
  setCookie("pc_profesional", "false", dominiocookie);
};

export const getRol = (): ROL => {
  return isProfesional() ? ROL.PROFESIONAL : ROL.CIUDADANO;
};
