var UserService = require('./user.service');
exports.register = function(req, res) {
    var data = req.body;
    UserService.registerUser(data)
    .on('SUCCESS', function(){
        res.send({message: 'Registered successfully.'});
    })
    .on('DUPLICATE', function(){
        res.send({message: 'User allready exist.'});
    })
    .on('INVALID_EMAIL', function(){
        res.send({message: 'Entered email is invalid.'});
    })
    .on('ERROR', function(){
        res.send({message: 'Error while registering user'});
    })
    .on('INCOMPLETE_DATA', function(){
        res.send({message: 'Please enter complete data of user.'});
    })
};

exports.login = function(req, res) {
    var data = req.body;
    UserService.loginUser(data)
    .on('SUCCESS', function(data){
        res.set({authToken: data.token});
        res.send({message: 'Login successfully :).', token: data.token, user: data.user[0]});
    })
    .on('INVALID_EMAIL', function(){
        res.send({message: 'Entered email is invalid.'});
    })
    .on('ERROR', function(){
        res.send({message: 'Error while user loging'});
    })
    .on('INCOMPLETE_DATA', function(){
        res.send({message: 'Please enter complete data of user.'});
    })
    .on('USER_NOT_FOUND', function(){
        res.send({message: 'User not found'});
    })
};

exports.listall = function(req, res){
    UserService.getAllUser()
    .on('SUCCESS', function(data){
        res.send({data:data});
    })
    .on('ERROR', function(){
        res.send({message: 'Error while getting user list'});
    })
    .on('NO_USER_FOUND', function(){
        res.send({message: 'No user found in list'});
    })
}

exports.verifyUser = function(req, res){
    var data = req.query;
    console.log('controller');
    UserService.verifyUser(data)
    .on('SUCCESS', function(){
        res.send('Account verified successfully');
    })
    .on('ERROR', function(error){
        res.send({message:'Un-authorized', details:error});
    })
    .on('EXPIRED', function(){
        res.send('Verification expired.');
    })
}