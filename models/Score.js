module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define('Score', {
        score:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        isWinner:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }
    });

    Score.associate = function(models) {
        // add associations here
        // ex:Score.hasMany(models.BlogPost);
        Score.belongsTo(models.User)
        Score.belongsTo(models.Session)
    };

    return Score;
};