const router = require("express").Router();
const sequelize = require("sequelize");
const { Comment } = require("../../models");
// const withAuth = require("../utils/auth");

//GET all comments
router.get("/", (req, res) => {
	Comment.findAll()
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	Comment.create({
		comment_text: req.body.comment_text,
		user_id: req.body.user_id,
		post_id: req.body.post_id,
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

//delete one comment by id
router.delete("/:id", (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with this id" });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
