import jwt_decode from 'jwt-decode';

const getEmail = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const  email  = decodedToken.sub;
        if (email) {
            return email;
        } else {
            return null; // L'email n'est pas présent dans le token ou est vide
        }
    }

    return null; // Le token n'est pas présent dans le local storage
};

export default getEmail;
