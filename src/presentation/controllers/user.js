


function controller(logger, usecases) {

    async function registerUser(req, res, next) {
        const { name, email, password } = req.body;
        const result = await usecases.registerUser({ name, email, password });
        res.status(201).json(result);
    }

    return {
        registerUser
    };
}

module.exports = controller;