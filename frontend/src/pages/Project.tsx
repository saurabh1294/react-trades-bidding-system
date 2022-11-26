import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const Project = () => {
  const navigate = useNavigate();
  const [project, setProject] = React.useState({
    userId: "",
    Project_Name: "",
    Base_price: "",
    project_Description: "",
    Expirey_date: "",
    cover_Image: "",
  });
  const projectImage = (e: any) => {
    setProject({ ...project, cover_Image: e.target.files[0] });
  };
  const createProject = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project_image", project.cover_Image);
    formData.append("data", JSON.stringify(project));
    axios
      .post("http://localhost:4000/api/createProject", formData)
      .then((response) => {
        console.log(response, "response");
        
        if (response?.data?.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err, "log error");
      });
  };
  return (
    <>
      <Header />
      <section>
        <div className="max-w-screen-2xl mx-auto bg-gray-100 lg:shadow-lg">
          <p className="lg:text-center text-left px-3 py-3 lg:py-5 text-semibold text-xl lg:text-3xl">
            Create Project
          </p>
          <div className="flex flex-col px-3 lg:px-10">
            <label htmlFor="title">User Email*</label>
            <input
              type="email"
              id="title"
              value={project.userId}
              onChange={(e) =>
                setProject({ ...project, userId: e.target.value })
              }
              className="p-2 max-w-[710px] shadow-lg rounded-lg border border-gray-300 focus:outline-none"
              required
              placeholder="Email"
            />
          </div>
          <div className="grid  lg:grid-cols-2 gap-x-10 gap-y-5 p-3 lg:p-10">
            <div className="flex flex-col">
              <label htmlFor="title">Title*</label>
              <input
                type="text"
                id="title"
                value={project.Project_Name}
                onChange={(e) =>
                  setProject({ ...project, Project_Name: e.target.value })
                }
                className="p-2 shadow-lg rounded-lg border border-gray-300 focus:outline-none"
                required
                placeholder="Project title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title">Set Max Budget</label>
              <input
                type="number"
                id="title"
                value={project.Base_price}
                onChange={(e) =>
                  setProject({ ...project, Base_price: e.target.value })
                }
                className="p-2 shadow-lg rounded-lg border border-gray-300 focus:outline-none"
                required
                placeholder="Enter Max Budget"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title">Project description*</label>
              <textarea
                name=""
                id=""
                value={project.project_Description}
                onChange={(e) =>
                  setProject({
                    ...project,
                    project_Description: e.target.value,
                  })
                }
                placeholder="Enter Project description"
                required
                className="p-2 h-64 shadow-lg rounded-lg border border-gray-300 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col">
                <label htmlFor="title">Project image*</label>
                <input type="file" onChange={(e) => projectImage(e)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title">Bid End Data*</label>
                <input
                  type="date"
                  id="title"
                  value={project.Expirey_date}
                  onChange={(e) =>
                    setProject({ ...project, Expirey_date: e.target.value })
                  }
                  className="p-2 shadow-lg rounded-lg border border-gray-300 focus:outline-none"
                  required
                  placeholder="Enter Bid Price"
                />
              </div>
            </div>
            <div>
              <button
                onClick={(e) => createProject(e)}
                type="button"
                className="mx-auto text-center bg-blue-500 text-white px-8 py-3 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
