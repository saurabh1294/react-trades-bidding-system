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
  var [resultData, metaData] = await sequelize.query(`select * from projects`);
  return resultData;
};

export const getBidding = async (Id: any) => {
  var [resultData, metaData] = await sequelize.query(
    `select * from bidders where Project_id='${Id}'`
  );
  return resultData;
};

export const createProject = async (data: any, image: any) => {
  var userId = data.userId;
  var Project_Name = data.Project_Name;
  var project_Description = data.project_Description;
  var Base_price = data.Base_price;
  var Expirey_date = data.Expirey_date;
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
  if (resultData) {
    var result = await soldProject(project_Id);
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
  try{
    var project_Id = Id;
    var [compareDate, metaData]: any = await sequelize.query(
      `select * from projects where Project_id='${project_Id}'`
    );
    if(compareDate[0].Expirey_date){
      // 
      const datePlus = new Date(compareDate[0].Expirey_date);
      console.log()

      datePlus.setDate(datePlus.getDate() + 1);
      
      // ✅ 1 Day added
      console.log("datePlus",datePlus);
      var dateExpiry= date.format(datePlus, "YYYY-MM-DD");
      console.log("dateExpiry",dateExpiry);
      //
      var currentDate = new Date();
      console.log("currentDate",currentDate);
      var date1 = date.format(currentDate, "YYYY-MM-DD");
      if (date1 == dateExpiry) {
        var [resultData, metaData]: any = await sequelize.query(
          `SELECT projects.*,bidders.bidderId,bidders.Bid_price FROM projects LEFT JOIN bidders ON bidders.Project_id = projects.Project_id where id=${project_Id}`
        );
        if (resultData.length > 0) 
          {
            console.log("resultData.length", resultData.length);
    
            var [recentDate, metaData]: any= await sequelize.query(`SELECT MAX (Bid_date) AS "Max Date" 
        FROM bidders;`)
        console.log("recentDate",recentDate);
        if(recentDate){
          console.log("recentDate", recentDate);
          var [priceData, metaData]: any = await sequelize.query(
            `SELECT MIN(Bid_price) FROM bidders WHERE Project_id='${project_Id}'`
          );
          console.log("priceData",priceData);
          if (priceData) {
            console.log("priceData**",priceData);
            var [leastPriceUser, metaData]: any = await sequelize.query(
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
            console.log("leastPriceUser**",leastPriceUser);
           if(leastPriceUser){
            console.log("leastPriceUser",leastPriceUser);
            var [updataData, metaData]: any = await sequelize.query(
              `update projects SET status='Sold' where Project_id='${project_Id}'`
            );
            console.log("updataData",updataData);
            if(updataData){
              console.log("leastPriceUser**",leastPriceUser)
              if(leastPriceUser.length>0){
                console.log("leastPriceUser.bidderId**",leastPriceUser[0].bidderId);
              }
             
              return leastPriceUser.bidderId
            }
          return updataData;
           }
           else{
            return Error;
           }
           
        }
          else{
            return Error;
          }
        }
        else{
          return Error;
        }
      }
      else{
          return Error;
      }
      }
      else{
          return Error;
      }
    }
    else{
      //
    }
   
  }
  catch(error)
  {
    return error;
  }

};


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
