var RoleService = require('./role.service');
exports.get = function(req, res){
    const email = req.body;
    RoleService.getRole(email)
    .on('SUCCESS', function(data){
        res.send({data:data});
    })
    .on('ERROR', function(error){
        res.send({message: 'Error while getting user role' + error});
    })
    .on('NO_ROLE_FOUND', function(error){
        res.send({message: 'No role found in list' + error});
    })
}