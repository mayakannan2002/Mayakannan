import React, { useState } from "react";
import "./Contact.css";
import Card from "react-bootstrap/Card";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:mayakannanc02@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AProfession: ${formData.profession}%0D%0AMessage: ${formData.message}`;
  };

  return (
    <div className="contact-section">
      <Card className="quote-card-view p-5">
        <Card.Body>
          {/* Contact Me Heading */}
          <h2 className="contact-heading text-center mb-4">
          <span className="purple"> Contact      </span>
            <span style={{ color: "white" }}>Me</span>
          </h2>

          <Row className="align-items-center">
            {/* Left Side: Contact Details */}
            <Col md={5} className="contact-card">
              <blockquote className="blockquote mb-0">
                <p style={{ textAlign: "justify" }}>
                  Feel free to reach out for any inquiries! You can contact me via:
                </p>

                <p>
                  <AiOutlinePhone className="me-2" size={20} /> <strong>Phone:</strong>
                  <span className="purple"> +91 9344846636</span>
                </p>
                <p>
                  <AiOutlineMail className="me-2" size={20} /> <strong>Email:</strong>
                  <span className="purple"> mayakannanc02@gmail.com</span>
                </p>
                <p>
                  <BsBriefcase className="me-2" size={20} /> <strong>Profession:</strong>
                  <span className="purple"> Software Developer</span>
                </p>
                <p>
                  <MdLocationPin className="me-2" size={20} /> <strong>Location:</strong>
                  <span className="purple"> Krishnagiri, Tamil Nadu, India</span>
                </p>
              </blockquote>
            </Col>

            {/* Right Side: Contact Form */}
            <Col md={7} className="contact-form-card">
              <Form onSubmit={handleSubmit} className="p-4 rounded">
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="tel" placeholder="Your Mobile Number" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Your Profession" name="profession" value={formData.profession} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 contact-btn">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Contact;
