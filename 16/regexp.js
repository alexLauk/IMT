module.exports.name = function(value) {
    return /^[a-zа-я ,.'-]+$/i.test(value);
};

module.exports.date = function(value) {
    return /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(value);
};

module.exports.email = function(value){
    return /^\w{4,10}\@[a-z]{4,10}\.[a-z]{2,}$/i.test(value);
}

module.exports.fhoneNumber = function(value){
    return /^\+380\d{9}$/.test(value);
}

module.exports.password = function(value){
    return /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/.test(value);
}
