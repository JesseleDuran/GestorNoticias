/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		Category.create({
			nombre: req.body.nombre,
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
