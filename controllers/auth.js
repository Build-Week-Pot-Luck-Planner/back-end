function auth() {
	async (req, res, next) => {
		try {
			const { username, password } = req.body;
			const user = await db.getByUsername(username);
			const passwordValid = await bcrypt.compare(password, user.password);
			if (!passwordValid) {
				return res.status(401).json({
					message: "Invalid Credentials",
				});
			}
			const token = jwt.sign(
				{
					userID: user.id,
				},
				process.env.JWT_SECRET
			);
			res.cookie("token", token);
			res.json({
				message: `Welcome ${user.username}`,
			});
		} catch (err) {
			next(err);
		}
	};
}

module.exports = {
    auth,
}