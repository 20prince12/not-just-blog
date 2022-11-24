import server from './server';

const Validate_Form =  async (name , value ) =>{
    const errors = [];
    const config = {
        password : { max : 30 , min : 8 , match : {regex : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/ , description : 'Should be combination of Number , Alphabit , Special Characters'}},
        email : { match : {regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , description : 'Enter a valid Email Address'}},
        first_name : { min : 3 , max : 30 , match : {regex : /^[a-zA-Z\-]+$/ , description : 'Name should contain only English Alphabits'}},
        last_name  : { min:3 , max : 30 , match : {regex : /^[a-zA-Z\-]+$/ , description : 'Name should contain only English Alphabits'}},
        username : { min:3 , max : 30 ,match : {regex : /^[A-Za-z][A-Za-z0-9_]*$/ , description : 'Username should start with Alphabits and Should not contain Special characters.'}},
    }
    if(config[name].max < value.length) errors.push(`Length Should not be more than ${config[name].max} Characters`);
    if(config[name].min > value.length) errors.push(`Length Should be more than ${config[name].min} Characters`);
    if(! config[name].match.regex.test(value)) errors.push(config[name].match.description);
    if(name==='email' || name==='username') {
        await server.get(`/checkUserExists?${name}=${value}`)
            .then((res) => {
                if (res.status === 200) errors.push(`${name} already taken.`);
            });
    }

    return errors;
}

export default Validate_Form;