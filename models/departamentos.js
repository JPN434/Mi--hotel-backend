const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Departamento = sequelize.define('Departamento',{
    id: {type: DataTypes.STRING, primaryKey: true},

    pais_id: {type: DataTypes.STRING},

    nombre: {type: DataTypes.STRING,
            allowNull: false
    }
}, {
    tableName:'departamentos',
    timestamps: false
});

module.exports = Departamento;
