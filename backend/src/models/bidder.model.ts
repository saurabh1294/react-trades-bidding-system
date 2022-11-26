import { timeStamp } from "console";
import { Sequelize } from "sequelize";


//create assessments table
const bidder = (sequelize: Sequelize, Sequelize: any) => {
    const Bidder = sequelize.define("bidder", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      bidderId: {
        type: Sequelize.STRING,
        
      },
      Bid_price: {
        type: Sequelize.INTEGER
      },
      Project_id: {
        type: Sequelize.INTEGER
      },
      Bid_date: {
        type: Sequelize.STRING,
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
        defaultValue:new Date()
      },
      updatedAt:
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue:new Date()
     
      },
     
  
    },
    {timestamps:false}
   );

    return Bidder;
  };

export default bidder;