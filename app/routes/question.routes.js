module.exports = app => {
    const questions = require("../controllers/question.controller.js");

    var router = require("express").Router();

    router.post("/", questions.create);

    router.get("/", questions.findAll);

    router.get("/:id", questions.findOne);

    router.put("/:id", questions.update);

    router.delete("/:id", questions.delete);

    router.delete("/", questions.deleteAll);

    app.use('/api/questions', router);
};