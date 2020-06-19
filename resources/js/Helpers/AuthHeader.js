import AppStorage from './AppStorage';

class AuthHeader {
    getHeaders() {
        const token = AppStorage.getToken();
        return { 'Authorization' : 'Bearer '+token };
    }
}

export default AuthHeader = new AuthHeader();
