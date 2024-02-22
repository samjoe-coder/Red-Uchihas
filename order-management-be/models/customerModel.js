const customerModel = (sequelize, DataTypes) => {
    const customer = sequelize.define("customer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hotelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id'
            }
        }
    });

    return customer;
}

export default customerModel;