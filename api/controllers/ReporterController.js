/**
 * ReporterController
 *
 * @description :: Server-side logic for managing Reporters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {
		Reporter.create({
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			username: req.body.username,
			password: req.body.password
		}).exec(function(err, newRecord) {
			if (err) {
				res.serverError(err);
			} else {
				res.json({
					success: "true",
					data: newRecord
				});
			}
		});
	},



};
