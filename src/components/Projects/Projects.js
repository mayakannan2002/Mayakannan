import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Import project images
import hrmImg from "../../Assets/Projects/hrm.webp";
import vendorImg from "../../Assets/Projects/vendor.webp";
import constructionImg from "../../Assets/Projects/construction.webp";
import softwareImg from "../../Assets/Projects/software.webp";
import jobPortalImg from "../../Assets/Projects/jobportal.webp";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hrmImg}
              title="HRM Portal"
              description="A Human Resource Management portal built using React for the front end and Node.js for the backend. It includes employee management, leave tracking, and payroll features."
              ghLink="https://github.com/mayakannan2002/HRM_Portal"
              demoLink="https://first-project-seven-sepia.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vendorImg}
              title="Vendor App"
              description="A web-based vendor management system that allows businesses to manage suppliers efficiently, track orders, and streamline procurement processes."
              ghLink="https://github.com/mayakannan2002/Vendor_App"
              demoLink="https://rewardify-taupe.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={constructionImg}
              title="Construction Website"
              description="A responsive website for a construction company showcasing projects, services, and client testimonials. Built using React and Bootstrap."
              ghLink="https://github.com/mayakannan2002/Building_Project"
              demoLink="https://react-construction.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={softwareImg}
              title="Software Company Website"
              description="A professional website for a software company, providing details about services, portfolio, and team members. Built using React and Tailwind CSS."
              ghLink="https://github.com/mayakannan2002/First_Website"
              demoLink="https://firstwebsite-xi.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={jobPortalImg}
              title="Job Portal Website"
              description="A fully functional job portal for job seekers and employers. Features job postings, applications, and resume uploads. Developed using MERN stack."
              ghLink="https://github.com/mayakannan2002/Second_Website"
              demoLink="https://third-website-seven.vercel.app"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
