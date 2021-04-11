module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('Session', {
       bgg_id:{
           type:DataTypes.STRING,
           allowNull:false
       },
       title:{
           type:DataTypes.STRING,
           allowNull:false
       }
    });

    Session.associate = function(models) {
        // add associations here
        Session.hasMany(models.Score);
    };

    return Session;
};