import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const p = (a) => {
  console.log(a);
};
const About = (props) => {
  // const[para, setPara] = useState("");
  const [deploymentItem, setDeploymentItem] = useState([
    {
      title: "AWS EC2",
      about: "A cloud-based, scalable computer.",
      link: "https://aws.amazon.com/",
    },
    {
      title: "Ubuntu",
      about: "A popular Linux OS.",
      link: "https://ubuntu.com/",
    },
    {
      title: "Nginx",
      about: "A web server.",
      link: "https://www.nginx.com/",
    },
    {
      title: "SSH",
      about: "File operations using keys.",
      link: "https://en.wikipedia.org/wiki/Secure_Shell",
    },
  ]);
  const [frontEndItem, setFrontEndItem] = useState([
    {
      title: "React",
      about: "JavaScript library and webpack.",
      link: "https://create-react-app.dev/",
    },
    {
      title: "Bootstrap",
      about: "Front-end toolkit.",
      link: "https://getbootstrap.com/",
    },
    {
      title: "CSS",
      about: "Front-end display and style.",
      link: "https://www.w3schools.com/css/",
    },
    {
      title: "Google Fonts",
      about: "A web font service.",
      link: "https://fonts.google.com//",
    },
  ]);
  const [backEndItem, setBackEndItem] = useState([
    {
      title: "MongoDB",
      about: "A no-sql json database. ",
      link: "https://www.mongodb.com/",
    },
    {
      title: "Mongoose",
      about: "Mongodb object modeler.",
      link: "https://mongoosejs.com/",
    },
    {
      title: "Express",
      about: "Nodejs standard server.",
      link: "https://expressjs.com/",
    },
    {
      title: "Cors",
      about: "External resource loading.",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
    },
    {
      title: "Nodemon",
      about: "Restart server with file change.",
      link: "https://www.npmjs.com/package/nodemon",
    },
  ]);

  return (
    <>
      <div className="box">
        <Link to={"/"}>
          <button className="btn btn-secondary">
            <big>Home</big>
          </button>
        </Link>
        <h2>About This Project</h2>
      </div>
      <div className="box12">
        <div id="box9">
          <p>
        <div className="box20">
          Desktop Experience
        </div>
        <div className="box21">
          Mobile Experience
        </div>
            I'm proud of this project for its front-end screen responsiveness.
            On each of the four pages, elements are carefully designed to change
            form or disappear based on the available screen size.
          </p>
          <div className="box10">
            <p className="small">44.201.88.86</p>
            <img
              // id="explain_in"
              // loop="infinite"
              src={require("../44_201_88_86.png")}
              alt="loading..."
            />
            <p id="mobile-first" className="small">Mobile-First Experience</p>
            
          </div>
        </div>
        <div className="box0">
          <div className="lr">
            <h4>Front End</h4>
            <table className="table table-sm table-hover my-3">
              <tbody>
                {frontEndItem.map((item, i) => {
                  return (
                    <tr>
                      <td>
                        <a className="d-grid" target="_blank" href={item.link}>
                          <button className="btn btn-primary">
                            <h5 className="align-middle">{item.title}</h5>
                          </button>
                        </a>
                      </td>
                      <td className="text-start align-middle">{item.about}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lr">
            <h4>Back End</h4>
            <table className="table table-sm table-hover my-3">
              <tbody>
                {backEndItem.map((item, i) => {
                  return (
                    <tr>
                      <td>
                        <a className="d-grid" target="_blank" href={item.link}>
                          <button className="btn btn-warning">
                            <h5 className="align-middle">{item.title}</h5>
                          </button>
                        </a>
                      </td>
                      <td className="text-start align-middle">{item.about}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lr">
            <h4>Deployment</h4>
            <table className="table table-sm table-hover my-3">
              <tbody>
                {deploymentItem.map((item, i) => {
                  return (
                    <tr>
                      <td>
                        <a className="d-grid" target="_blank" href={item.link}>
                          <button className="btn btn-success">
                            <h5 className="align-middle">{item.title}</h5>
                          </button>
                        </a>
                      </td>
                      <td className="text-start align-middle">{item.about}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
