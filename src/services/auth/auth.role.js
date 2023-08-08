import jwt_decode from 'jwt-decode';


const Role = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const decodedToken = jwt_decode(token);
        const { roles } = decodedToken;

        if (roles && Array.isArray(roles) && roles.includes('SUPER_ADMIN')) {
            return 'SUPER_ADMIN';
        }
        if (roles && Array.isArray(roles) && roles.includes('ADMIN')) {
            return 'ADMIN';
        }
        if (roles && Array.isArray(roles) && roles.includes('MANAGER')) {
            return 'MANAGER';
        }
        if (roles && Array.isArray(roles) && roles.includes('CLIENT')) {
            return 'CLIENT';
        }
        else {
            return false;
        }
    }

    return false;
};

export default Role;
