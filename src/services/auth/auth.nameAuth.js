import jwt_decode from 'jwt-decode';

const getEmail = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const  email  = decodedToken.sub;
        if (email) {
            return email;
        } else {
            return null;
        }
    }
    return null;
};

export default getEmail;
