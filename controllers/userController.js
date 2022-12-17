const users = [
    {
        id: 1,
        userName: 'kamil',
    }
]

exports.createUser = (req, res) => {
        const user = {
            id: users.length + 1,
            userName: req.body.userName,
        }
        users.push(user);
        res.send(user);
        res.status(201).json(users);
}

exports.getUser = (req, res) => {
        res.send(users);
        res.status(200).json(users);
}

exports.putUser = (req, res) => {
    const user = users.find(
        x => x.id === parseInt(req.params.id)
    )
    user.userName = req.body.userName
    res.send(user);
    res.status(200).json(user);
}
