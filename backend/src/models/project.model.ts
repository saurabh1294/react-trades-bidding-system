import { Sequelize } from "sequelize";


// create answers table
const project = (sequelize: Sequelize, Sequelize: any) => {
    const Project = sequelize.define("project", {
      Project_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.STRING,
      },
      Project_Name: {
        type: Sequelize.STRING,
      },
      Base_price: {
        type: Sequelize.STRING,
      },
      Expirey_date: {
        type: Sequelize.STRING,
      },
      project_Description: {
        type: Sequelize.TEXT
      },
      cover_Image: {
        type: Sequelize.STRING
      },
      winnerId:{
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['Active', 'Sold']],
        },
        defaultValue: 'Active'
      },
      createdAt:
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()

      },
      updatedAt:
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    return Project;
  };

export default project;