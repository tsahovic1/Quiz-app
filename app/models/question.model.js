module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        question: {
            type: Sequelize.STRING
        },
        choice1: {
            type: Sequelize.STRING
        },
        choice2: {
            type: Sequelize.STRING
        },
        choice3: {
            type: Sequelize.STRING
        },
        choice4: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.INTEGER
        }
    });

    return Question;
};