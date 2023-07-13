import jwt_decode from 'jwt-decode';

const isCurrentUserAdmin = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const { sub, roles } = decodedToken;

        if (sub === 'admin@numotronic.com' && roles && Array.isArray(roles) && roles.includes('ADMIN')) {
            return true;
        }
    }

    return false;
};
const isCurrentUserManager = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const { sub, roles } = decodedToken;

        if (sub === 'admin@numotronic.com' && roles && Array.isArray(roles) && roles.includes('ADMIN')) {
            return true;
        }
    }

    return false;
};

const whoAuth = {isCurrentUserAdmin,isCurrentUserManager};
export default whoAuth;
