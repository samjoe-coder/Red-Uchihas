const tableModel = (sequelize, DataTypes) => {
    const table = sequelize.define('table',{
        id:{
            type: DataTypes.STRING,
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
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        hotelId:{
            type: DataTypes.STRING,
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