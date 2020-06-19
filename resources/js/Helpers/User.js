import Token from "./Token";
import AppStorage from "./AppStorage";

class User {
    login(data) {
        axios.post('/api/auth/login', data)
           .then(res => this.responseAfterLogin(res))
           .catch(error => console.log(error));
     }

    responseAfterLogin(res) {
        console.log('login succcess')
        const access_token = res.data.access_token;
        const username = res.data.user;
        if(Token.isTokenValid(access_token)) {
            console.log('token is stored');
            AppStorage.store(username,access_token);
            window.location = '/forum'
        }
    }

    hasToken() {
        const storedToken = AppStorage.getToken();
        if(storedToken) {
            return Token.isTokenValid(storedToken) ? true : false;
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    loggedOut() {
        AppStorage.clear();
        window.location = '/forum'
    }

    name() {
        if(this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {
        if(this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
    }

    own(id) {
        return this.id() === id ;
    }

    admin() {
        return this.id() === 16;
    }
}


export default User = new User()
