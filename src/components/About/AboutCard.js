import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Mayakannan c </span>
            from <span className="purple"> Krishnagiri,Tamilnadu, India.</span>
            <br />
            I am currently employed as a software developer at Pixalive.
            <br />
            I have completed Integrated Bsc in Physics, Python Full stack Developer Internship at Uniq Technologies in Bangalore and MBA at Bharathidasan Universityin Trichy,Tamilnadu
            India.
            <br />
            <br />
            Apart from coding and Marketing some other activities that I love to do!
          </p>
          <ul>

            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Cricket
            </li>
            <li className="about-activity">
              <ImPointRight /> Marketing
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Mayakannan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
