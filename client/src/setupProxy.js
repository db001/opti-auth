const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		["/api", "/api/auth", "/user/verify"],
		createProxyMiddleware({
			target: "http://localhost:5000",
		})
	);
};
