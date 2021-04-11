module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            validate:{
                len:[8]
            }
        }
    });

    User.associate = function(models) {
        // add associations here
        // ex:User.hasMany(models.BlogPost);
        User.hasMany(models.Score)
    };

    return User;
};