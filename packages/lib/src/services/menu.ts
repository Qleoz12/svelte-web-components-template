export enum ROL {
    CIUDADANO = "C",
    PROFESIONAL = "P",
}

interface MenuGroup {
    menuItem?: MenuGroup[];
    id?: number;
    label?: string;
    title?: string;
    url?: string;
    subMenu?: number;
    abreNuevaPestana?: string;
    muestraOpcion?: string;
    className?: string;
    template?: any;
    urlImagen?: string;
    labelCastellano: string;
    labelEuskera: string;
    urlCastellano: string;
    urlEuskera: string;
    titleCastellano?: string;
    titleEuskera?: string;
    estilOpcion?: string;
}


export const fetchMenu = async (
    rol: ROL,
    idioma: string,
    options: object,
): Promise<MenuGroup[]> => {
    const baseUrl = import.meta.env.VITE_APP_MENU_API_ENDPOINT;

    // const response = await fetch(
    //     `${baseUrl}` +
    //     `${ROL.PROFESIONAL === rol}` +
    //     "&idioma=" +
    //     `${idioma.toUpperCase()}`,
    //     options,
    // );
    const response = await fetch("https://fc460db5-1890-4963-8c20-530d214b01cd.mock.pstmn.io/EWPL000M/getopcionesmenu/actuaComoColaborador=C&idioma="+idioma.toUpperCase());

    console.log(
        `${baseUrl}` +
        `${ROL.PROFESIONAL === rol}` +
        "&idioma=" +
        `${idioma.toUpperCase()}`,
    );
    

    if (!response.ok) {
        throw await response.json();
    }

    return response.json().then((response) => {
        const refactor = (element: MenuGroup): MenuGroup => {
            element.label = element.label;
            element.url = element.url;
            element.title = element.title;
            element.menuItem = element.menuItem?.map(refactor);
            return element;
        };
        let menus: MenuGroup[] = response.menuGroup;

        menus = menus?.map(refactor);

        return menus;
    });
};
