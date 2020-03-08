
const mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const password = /^(?=.*[\d])(?=.*[a-zA-Z])[\w!@#$%^&*]{8,30}$/;
const base64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const emailimit = 100;

module.exports = {
    Email: mail,
    Email_Limit: emailimit,
    Password: password,
    BASE64: base64,
};