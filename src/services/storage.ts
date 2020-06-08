

export const storage = {
    getAuthToken: () => localStorage.getItem("jwt_auth"),
    setAuthToken: (token: string) => localStorage.setItem("jwt_auth", token),
    clearAuthToken: () => localStorage.removeItem("jwt_auth"),
    getAuthTokenParsed: () => localStorage.getItem("jwt_auth") ? parseJwt(localStorage.getItem("jwt_auth")!) : null
}

function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
 