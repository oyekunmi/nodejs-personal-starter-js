function controller(logger, usecases) {

    async function registerUser(req, res) {
        const { name, email, password } = req.body;
        const result = await usecases.registerUser({ name, email, password });

        if (result instanceof Error) {
            res.status(400).json({ error: result.message });
            return;
        }

        res.status(201).json(result);
    }

    async function loginUser(req, res) {
        const { email, password } = req.body;
        const result = await usecases.authenticateUser({ email, password });
        res.status(200).json(result);
    }

    return {
        registerUser,
        loginUser
    };
}

module.exports = controller;