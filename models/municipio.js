const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Municipio = sequelize.define('Municipio',{
    id: {type: DataTypes.STRING, primaryKey: true},

    departamento_id: {type: DataTypes.STRING,
        references: {
            model:'Departamento',
            key: 'id'
        }
    },
    nombre:{type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'municipios',
    timestamps: false
});

module.exports = Municipio;