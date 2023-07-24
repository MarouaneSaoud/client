import jwt_decode from 'jwt-decode';


const isAdmin = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const { roles } = decodedToken;

        if (roles && Array.isArray(roles) && roles.includes('ADMIN')) {
            return 'ADMIN';
        }
        if (roles && Array.isArray(roles) && roles.includes('USER')) {
            return 'USER';
        }
        else {
            return false;
        }
    }

    return false;
};

export default isAdmin;
