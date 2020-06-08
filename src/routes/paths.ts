export const Url = {
    login: "/login",
    register: "/firstaccess",
    recover: "/recover",
    dashboard: "/",
    privacy: "/privacy",
    forgot: "/forgot",
};

export type Mode = "creazione" | "dettaglio" | "modifica"
export const DocumentoUrl: Mode[] = ["creazione", "dettaglio", "modifica"]
