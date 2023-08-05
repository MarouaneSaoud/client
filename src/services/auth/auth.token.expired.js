// tokenUtils.js
import jwt_decode from 'jwt-decode';

 const isTokenExpired=() => {
    try {
        const token  = localStorage.getItem('accessToken');
        const decodedToken = jwt_decode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        return expirationTime < currentTime;
    } catch (error) {
        return true;
    }
};
 export default isTokenExpired();
