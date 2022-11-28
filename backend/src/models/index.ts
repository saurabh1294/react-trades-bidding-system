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
  var [resultData, metaData] = await sequelize.query(
    `select * from projects where Project_id='${Id}'`
  );

  return resultData;
};

export const getProject = async () => {
  try {
    return new Promise(async (resolve) => {
      var [resultData, metaData]: any = await sequelize.query(
        `select * from projects`
      );
      //return resultData;
      // if(resultData.length>0){
      console.log("resultData", resultData);
      let value = [];
      for (let i = 0; i < resultData.length; i++) {
        console.log("resultData.length", resultData.length);
        console.log("resultData.length", resultData[i].Expirey_date);
       

        var currentDate = new Date();
        console.log("currentDate", currentDate);
        var date1 = date.format(currentDate, "YYYY-MM-DD HH mm ");
        console.log("date1", date1);
        console.log("resultData[i].Expirey_date",resultData[i].Expirey_date);

        console.log("check condiotion", date1 > resultData[i].Expirey_date);

        if (date1 > resultData[i].Expirey_date) {
          value.push({ [resultData[i].Project_id]: resultData[i] });
          console.log("value data", value);
          var [resultDataBidder, metaData]: any = await sequelize.query(
            `SELECT projects.*,bidders.bidderId,bidders.Bid_price FROM projects LEFT JOIN bidders ON bidders.Project_id = projects.Project_id where id=${resultData[i].Project_id}`
          );
          // console.log("resultDataBidder data", resultDataBidder);
          // logic
          // if (resultDataBidder.length > 0) {
              console.log(`recentDate of `, resultData[i]);
           
              var [leastPriceUser, metaData]: any = await sequelize.query(
                `SELECT
                id,
                bidderId,
                Bid_price,
                Project_id
            FROM
                bidders
            WHERE
                Bid_price =(
                SELECT
                    MIN(Bid_price) AS Bid_price
                FROM
                    bidders
                WHERE Project_id='${resultData[i].Project_id}'
) AND Project_id='${resultData[i].Project_id}'`
              );
              console.log("leastPriceUser**", leastPriceUser);
              console.log("leastPriceUser.length ",leastPriceUser.length );
   
              if (leastPriceUser.length > 0) {
                console.log(
                  "leastPriceUser.bidderId**",
                  leastPriceUser[0].bidderId
                );
                console.log("check 1",date1 > resultData[i].Expirey_date);
                if (date1 > resultData[i].Expirey_date) {
                 console.log("check 2",leastPriceUser[0].id != null);
                  if (leastPriceUser[0].id != null) {
                    var [updataData, metaData]: any = await sequelize.query(
                      `update projects SET status='Sold', winnerId='${leastPriceUser[0].bidderId}' where Project_id='${resultData[i].Project_id}'`
                    );
                    console.log("updataData", updataData);
                  } else {
                    var [updataData, metaData]: any = await sequelize.query(
                      `update projects SET status='Expire' where Project_id='${resultData[i].Project_id}'`
                    );
                    console.log("updataData", updataData);
                  }
                }
              }
              else {
                var [updataData, metaData]: any = await sequelize.query(
                  `update projects SET status='Expire' where Project_id='${resultData[i].Project_id}'`
                );
                console.log("updataData", updataData);
              }
              
        //  }
        }
    
      }
      return resolve(resultData)
    });

  } catch (error) {
    return error;
  }
};

export const getBidding = async (Id: any) => {
  var [resultData, metaData] = await sequelize.query(
    `select * from bidders where Project_id='${Id}'`
  );
  return resultData;
};

export const createProject = async (data: any, image: any, expiryDate: any) => {
  var userId = data.userId;
  var Project_Name = data.Project_Name;
  var project_Description = data.project_Description;
  var Base_price = data.Base_price;
  var Expirey_date = expiryDate;
  var cover_Image = image.filename;
  var [resultData, metaData] = await sequelize.query(
    `insert into projects (UserId,Project_Name,project_Description,Base_price,Expirey_date,cover_Image) Values('${userId}','${Project_Name}','${project_Description}','${Base_price}','${Expirey_date}','${cover_Image}')`
  );
  return resultData;
};

export const addBidding = async (data: any, Id: any) => {
  var bidderId = data.userId;
  var bidding_price = data.bidding_price;
  var project_Id = Id;
  var bidDate = new Date();
  var Bid_date = date.format(bidDate, "YYYY-MM-DD");
  var [resultData, metaData] = await sequelize.query(
    `insert into bidders (bidderId,Bid_price,Project_id,Bid_date) Values('${bidderId}','${bidding_price}','${project_Id}','${Bid_date}')`
  );
 
  return resultData;
};

db.project.hasOne(db.bidder);
db.bidder.belongsTo(db.project, { foreignKey: db.project.Project_id });
// Student.hasOne(Question);
// Question.hasOne(Answer)
// Contact.belongsTo(Contact);


export default db;
// db.project.findAll({
//   where: { Project_id: project_Id },
//   include: [db.project],
// });

// SELECT MIN(Bid_price) FROM bidders WHERE Project_id=1

// var [priceData, metaData]:any = await sequelize.query(
//   `select * from bidders where Project_id='${project_Id}'`
// );
// if(priceData.length>0)
// for(let i=0;i<priceData.length;i++){
//   if(priceData.Bid_price<=resultData.Base_price){

//   }
//   console.log("priceData in bid_price",priceData);
// }
