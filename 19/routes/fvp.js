//Field Validation Package
class Fvp{

    constructor (){
        this.pattern = {
            name: /^[a-zа-я ,.'-]+$/i,
            date: /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            email: /^\w{4,10}\@[a-z]{4,10}\.[a-z]{2,}$/i,
            mob: /^\+380\d{9}$/,
            pass: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/
        }
    };

    validation(value, field){
        for (let key in this.pattern){
            if(key === field){
                return this.pattern[key].test(value)
            }
        }
    };
};

module.exports = new Fvp();
