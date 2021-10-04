module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("score", {
        username: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        }
    });

    return Score;
};