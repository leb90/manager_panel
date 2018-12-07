const isAutheticated = () => {
    /*hacer funcionar correctamente esta funcion con un servicio a api */
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    } else {
        console.log("Without Authorization");
        return false;
    }
};
export default isAutheticated;
