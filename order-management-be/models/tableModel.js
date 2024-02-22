const tableModel = (sequelize, DataTypes) => {
    const table = sequelize.define('table',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        number:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qrDetails:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        hotelId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id'
            }
        }
    });
    return table;
}

export default tableModel;