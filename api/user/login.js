module.exports = function login (req, res) {
    // check provided username
    if (!req.body) {
        res.status(400).send({
            message: "Request body cannot be empty"
        })
    }

    const username = req.body.username;

    User.findAll({where: {username: username}})
        .then(data => {
            const user = data[0];
            res.send({
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    organisation: user.organisation
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "User " + username + " not found!"
            })
        })

}