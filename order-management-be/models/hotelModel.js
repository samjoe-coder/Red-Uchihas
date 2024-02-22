const hotelModel = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("hotel", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avgRating: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        customer_care_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },  
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'owners',
                key: 'id'
            }
        }
    });

    return Hotel;
}

export default hotelModel;