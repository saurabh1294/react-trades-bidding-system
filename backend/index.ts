import express from "express";
import "dotenv/config";
import db, {
  addBidding,
  createProject,
  getBidding,
  getProject,
  getProjectbyId,
  // soldProject,
} from "./src/models";
import http from "http";
const port = process.env.PORT || 4000;

const app = express();

import cors from "cors";
app.use(cors());
import multer from "multer";

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "/var/www/html/poc/frontend/public/uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req: any, file: any, cb: any) => {
    const fileSize = parseInt(req.headers["content-length"]);

    if (file.fieldname === "project_image") {
      if (
        ((file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/webp" ||
          file.mimetype === "image/jfif" ||
          file.mimetype === "image/svg") &&
          fileSize <= 2097152) || //2MB
        ((file.mimetype === "image/pdf" ||
          file.mimetype === "image/wps-office.pdf") &&
          fileSize <= 5242880) //5MB
      ) {
        cb(null, true);
      } else {
        return cb(new Error("only given files and Size are allowd!"), false);
      }
    }
  },
});

app.get("/api/getProjectbyId/:Project_id", async (req, res) => {
  try {
    var post = req.params.Project_id;

    var result = await getProjectbyId(post);
    res.send({
      message: "Project Details fetched by Id Successfully",
      result: result[0],
      status: true,
    });
  } catch (error) {
    res.send({ error: error, status: false });
  }
});

app.get("/api/getProject", async (req, res) => {
  try {
    var result = await getProject();

    res.send({
      message: "Project Details fetched Successfully",
      result: result,
      status: true,
    });
  } catch (error) {
    res.send({ error: error, status: false });
  }
});

app.get("/api/getBidding/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getBidding(id);

    res.send({
      message: "Bidding Details fetched Successfully",
      result: result,
      status: true,
    });
  } catch (error) {
    res.send({ error: error, status: false });
  }
});

// upload.single("cover_Image")

app.post(
  "/api/createProject",
  upload.single("project_image"),
  async (req, res) => {
    try {
      const post = JSON.parse(req.body?.data);
      const expiryDate = req.body.Expiry_Date;
      const image = req.file;
      const result = await createProject(post, image, expiryDate);
      res.send({
        message: "Project Created Successfully",
        status: true,
        result: result,
      });
    } catch (error) {
      console.log("error", error);
      res.send({ error: error, status: false });
    }
  }
);

app.post("/api/addBidding/:id", upload.array(""), async (req, res) => {
  try {
    const post = JSON.parse(req.body.data);
    const Id = req.params.id;

    const result = await addBidding(post, Id);
    res.send({
      message: "Add Bidding Successfully",
      status: true,
      result: result,
    });
  } catch (error) {
    res.send({ error: error, status: false });
  }
});

// app.get("/api/soldProject", async (req, res) => {
//   try {
//     const project_Id = req.query.id;
//     const result = await soldProject(project_Id);
//     if (result) {
//       res.send({
//         message: "Project Sold Successfully",
//         status: true,
//         result: result,
//       });
//     } else {
//       res.send({
//         message: "Projects Id not found",
//         status: false,
//         error: Error,
//       });
//     }
//   } catch (error) {
//     res.send({ error: error, status: false });
//   }
// });

db.sequelize.sync().then(async () => {
  // fetchig
});

//create server
const server = http.createServer(app);
// Start Server
server.listen(port, function () {
  console.log("HTTPS server listening on port " + port);
});
