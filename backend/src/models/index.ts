import console from "console";
import { Dialect, Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

import bidder from "./bidder.model";
import project from "./project.model";
import date from "date-and-time";

const sequelize = new Sequelize(
  dbConfig.DB!,
  dbConfig.USER!,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    port: parseInt(dbConfig.port as string),
    // operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.project = project(sequelize, Sequelize);
export const Project = db.projects;

db.bidder = bidder(sequelize, Sequelize);
export const Bidder = db.bidders;

export const getProjectbyId = async (Id: any) => {
  const [resultData, metaData] = await sequelize.query(
    `select * from projects where Project_id='${Id}'`
  );

  return resultData;
};

export const getProject = async () => {
  const [resultData, metaData] = await sequelize.query(`select * from projects`);
  return resultData;
};

export const getBidding = async (Id: any) => {
  const [resultData, metaData] = await sequelize.query(
    `select * from bidders where Project_id='${Id}'`
  );
  return resultData;
};

export const createProject = async (data: any, image: any) => {
  const userId = data.userId;
  const Project_Name = data.Project_Name;
  const project_Description = data.project_Description;
  const Base_price = data.Base_price;
  const Expirey_date = data.Expirey_date;
  const cover_Image = image.filename;
  const [resultData, metaData] = await sequelize.query(
    `insert into projects (UserId,Project_Name,project_Description,Base_price,Expirey_date,cover_Image) Values('${userId}','${Project_Name}','${project_Description}','${Base_price}','${Expirey_date}','${cover_Image}')`
  );
  return resultData;
};

export const addBidding = async (data: any, Id: any) => {
  const bidderId = data.userId;
  const bidding_price = data.bidding_price;
  const project_Id = Id;
  const bidDate = new Date();
  const Bid_date = date.format(bidDate, "YYYY-MM-DD");
  const [resultData, metaData] = await sequelize.query(
    `insert into bidders (bidderId,Bid_price,Project_id,Bid_date) Values('${bidderId}','${bidding_price}','${project_Id}','${Bid_date}')`
  );
  if (resultData) {
    const result = await soldProject(project_Id);
    if (result) {
      return result;
    } else {
      return Error;
    }
  }
};

db.project.hasOne(db.bidder);
db.bidder.belongsTo(db.project, { foreignKey: db.project.Project_id });
// Student.hasOne(Question);
// Question.hasOne(Answer)
// Contact.belongsTo(Contact);

export const soldProject = async (Id: any) => {
  try {
    const project_Id = Id;
    const [compareDate, metaData]: any = await sequelize.query(
      `select * from projects where Project_id='${project_Id}'`
    );
    if (compareDate[0].Expirey_date) {
  
      const datePlus = new Date(compareDate[0].Expirey_date);
      console.log();

      datePlus.setDate(datePlus.getDate() + 1);



      const dateExpiry = date.format(datePlus, "YYYY-MM-DD");

      
      const currentDate = new Date();
      console.log("currentDate", currentDate);
      const date1 = date.format(currentDate, "YYYY-MM-DD");
      if (date1 == dateExpiry) {
        const [resultData, metaData]: any = await sequelize.query(
          `SELECT projects.*,bidders.bidderId,bidders.Bid_price FROM projects LEFT JOIN bidders ON bidders.Project_id = projects.Project_id where id=${project_Id}`
        );
        if (resultData.length > 0) {
          console.log("resultData.length", resultData.length);

          const [recentDate, metaData]: any =
            await sequelize.query(`SELECT MAX (Bid_date) AS "Max Date" 
        FROM bidders;`);
          console.log("recentDate", recentDate);
          if (recentDate) {
            console.log("recentDate", recentDate);
            const [priceData, metaData]: any = await sequelize.query(
              `SELECT MIN(Bid_price) FROM bidders WHERE Project_id='${project_Id}'`
            );
            console.log("priceData", priceData);
            if (priceData) {
              console.log("priceData**", priceData);
              const [leastPriceUser, metaData]: any = await sequelize.query(
                `SELECT
              bidderId
          FROM
              bidders
          WHERE
              Bid_price =(
              SELECT
                  MIN(Bid_price) AS Bid_price
              FROM
                  bidders WHERE Project_id='${project_Id}'
          )`
              );
              console.log("leastPriceUser**", leastPriceUser);
              if (leastPriceUser) {
                console.log("leastPriceUser", leastPriceUser);
                const [updataData, metaData]: any = await sequelize.query(
                  `update projects SET status='Sold' where Project_id='${project_Id}'`
                );
                console.log("updataData", updataData);
                if (updataData) {
                  console.log("leastPriceUser**", leastPriceUser);
                  if (leastPriceUser.length > 0) {
                    console.log(
                      "leastPriceUser.bidderId**",
                      leastPriceUser[0].bidderId
                    );
                    let minId = leastPriceUser[0].id;
                    for (let i = 1; i < priceData.length; i++) {
                      if (minId < leastPriceUser[i].id) {
                        return leastPriceUser[0].bidderId;
                      } else {
                        minId = leastPriceUser[i].id;
                      }
                    }
                  }
                }
                return updataData;
              } else {
                return Error;
              }
            } else {
              return Error;
            }
          } else {
            return Error;
          }
        } else {
          return Error;
        }
      } else {
        return Error;
      }
    } else {
      return Error;
    }
  } catch (error) {
    return error;
  }
};


export default db;
// db.project.findAll({
//   where: { Project_id: project_Id },
//   include: [db.project],
// });

// SELECT MIN(Bid_price) FROM bidders WHERE Project_id=1

// const [priceData, metaData]:any = await sequelize.query(
//   `select * from bidders where Project_id='${project_Id}'`
// );
// if(priceData.length>0)
// for(let i=0;i<priceData.length;i++){
//   if(priceData.Bid_price<=resultData.Base_price){

//   }
//   console.log("priceData in bid_price",priceData);
// }
