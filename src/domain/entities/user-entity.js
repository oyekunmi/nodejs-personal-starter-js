class UserEntity {
    constructor({ id, name, email, password, accessToken }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password; //encrypted password
        this.accessToken = accessToken;
    }
}

module.exports = UserEntity;