class Validator{

    constructor (){
        this.RegExps = {
            name: /^[a-zа-я ,.'-]+$/i,
            date: /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            email: /^\w{4,10}\@[a-z]{4,10}\.[a-z]{2,}$/i,
            mob: /^\+380\d{9}$/,
            pass: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/
        }
    };

    name(value){
        return this.RegExps.name.test(value)
    };

    email(value){
        return this.RegExps.email.test(value)
    };

    date(value){
        return this.RegExps.date.test(value)
    };

    mob(value){
        return this.RegExps.mob.test(value)
    };

    pass(value){
        return this.RegExps.pass.test(value)
    };

};

module.exports = new Validator();
