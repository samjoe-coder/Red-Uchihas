const notificationModel = (sequelize, DataTypes) => {

    const notification = sequelize.define("notification", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fcmToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        }
    });
    return notification;
}

export default notificationModel;