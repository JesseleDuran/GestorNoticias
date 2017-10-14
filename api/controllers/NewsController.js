/**
 * NewsController
 *
 * @description :: Server-side logic for managing News
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {
		User.findOne({
		  	id: req.body.ownerId
		}).exec(function (err, reporter){
		  	if (err) {
		    	return res.serverError(err);
		  	}
		  	if (!reporter) {
				return res.json({
					success: "false",
					message: 'This reporter does not exist.',
				});
		  	}
		  	sails.log('Found "%s"', reporter.name);

			Category.findOne({
			  	id: req.body.categoryId
			}).exec(function (err, category){
			  	if (err) {
			    	return res.serverError(err);
			  	}
			  	if (!category) {
					return res.json({
						success: "false",
						message: 'This category does not exist.',
					});
			  	}

				sails.log('Found "%s"', category.nombre);
				News.create({
					titulo: req.body.titulo,
					cuerpo: req.body.cuerpo,
					owner: req.body.ownerId,
				}).exec(function(err, newRecord) {
					if (err) {
						res.serverError(err);
					} else {
						Category_news.create({
							new: newRecord.id,
							category: req.body.categoryId
						}).exec(function(err, newRelation) {
							if (err) {
								res.serverError(err);
							} else {
								res.json({
									success: "true",
									new: newRecord,
									category_news: newRelation
								});
							}
						});
					}
				});
			});
		});
	},

	list: function(req, res) {
		News.find({}).exec(function (err, news) {
  			if (err) {
    			return res.serverError(err);
  			}
			else {
				if (!news) {
					return res.json({
						success: "false",
						msg: "No hay noticias"
					});
				} else {
					var arrayIdNews = news.map(function(noticia) {
						return noticia.id;
					});
					var arrayIdOwners = news.map(function(noticia) {
						return noticia.owner;
					});

					User.find({
						id: arrayIdOwners
					}).exec(function(err, users) {
						if (err) {
			    			return res.serverError(err);
			  			}
						else {
							Category_news.find({
								new: arrayIdNews
							}).exec(function(err, relations) {
								if (err) {
									return res.serverError(err);
								}
									var arrayIdCategory = relations.map(function(relation) {
										return relation.category;
									});

									Category.find({
										id: arrayIdCategory
									}).exec(function(err, categories) {
										if (err) {
											return res.serverError(err);
										}
										else {
											var dataFinal = [];
											var i;
											var j;
											var k;
											var m;
											for(i in relations) {
												for(j in news) {
													for (m in users) {
														for(k in categories) {

															if(users[m].id == news[j].owner && relations[i].new == news[j].id && relations[i].category == categories[k].id)
															{
																var data = {};
																data.new = news[j];
																data.category = categories[k];
																data.reporter = users[m];
																dataFinal.push(data);
															}
														}
													}
												}
											}
											return res.json({
												success: "true",
												news: dataFinal
											});
										}
									});
								});
							}

						});
					}

				}
			});
		},

	listByCategory: function(req, res) {
		Category.findOne({
			where: {
				nombre: req.body.nombre
			},
		}).exec(function (err, category) {
  			if (err) {
    			return res.serverError(err);
  			}
			else {
				sails.log('Found "%s"', category.nombre);
				Category_news.find({
					where: {
						category: category.id
					},
				}).exec(function (err, relations) {
					if (!relations) {
						res.json({
							success: "false",
							msg: "No hay noticias de esta categoría"
						});
					} else {
						var arrayIdRelation = relations.map(function(relation) {
							return relation.new;
						});
						News.find({
							where: {
								id: arrayIdRelation,
							},
						}).exec(function (err, news) {
							res.json({
								success: "true",
								news: news
							});
						});
					}
				});
			}
		});
	},






};
