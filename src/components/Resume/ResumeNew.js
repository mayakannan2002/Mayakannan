import React, { useState, useEffect, useRef } from "react";
import "./Resume.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Particle from "../Particle";
import pdf from "../../Assets/Mayakannan C Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
    const [resumeUrl, setResumeUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [showUpload, setShowUpload] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    useEffect(() => {
        fetchResumeUrl();
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const fetchResumeUrl = async () => {
        try {
            const response = await fetch("https://portfolio-contact-backend-srmw.onrender.com/resume");
            if (response.ok) {
                setResumeUrl("https://portfolio-contact-backend-srmw.onrender.com/resume");
            } else {
                setResumeUrl(null);
            }
        } catch (error) {
            console.error("Error fetching resume URL:", error);
            setResumeUrl(null);
        }
    };

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    const handleUploadClick = () => {
        setShowUpload(!showUpload);
        setUploadMessage("");
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadSubmit = async () => {
        if (!password || !selectedFile) {
            setUploadMessage("Please enter a password and select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedFile);
        formData.append("password", password);

        try {
            const response = await fetch("https://portfolio-contact-backend-srmw.onrender.com/upload-resume", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadMessage(data.message);
                setPassword("");
                setSelectedFile(null);
                await fetchResumeUrl();
            } else {
                setUploadMessage(data.message || "Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploadMessage("An error occurred during upload.");
        }
    };

    return (
        <Container fluid className="resume-section">
            <Particle />
            <Row style={{ justifyContent: "center", position: "relative" }}>
                <Col md={8} className="resume-pdf-container">
                    <h2 className="resume-heading">Mayakannan Resume</h2>
                    {resumeUrl ? (
                        <div className="pdf-viewer" style={{ display: "flex", justifyContent: "center" }}>
                            <Document
                                file={resumeUrl}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            >
                                <Page pageNumber={1} width={width > 768 ? 800 : width * 0.9} />
                            </Document>
                        </div>
                    ) : (
                        <p>No resume uploaded yet.</p>
                    )}
                </Col>
            </Row>

            {/* Download Button */}
            <Row style={{ justifyContent: "center", marginTop: "20px" }}>
    {resumeUrl && (
        <a href={resumeUrl} download="Mayakannan_C_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" style={{ maxWidth: "250px" }}>
                <AiOutlineDownload /> &nbsp;Download CV
            </Button>
        </a>
    )}
</Row>
            {/* Upload Resume Button */}
            <Row style={{ justifyContent: "center", marginTop: "20px" }}>
                <Button variant="success" onClick={handleUploadClick} style={{ maxWidth: "250px" }}>
                    {showUpload ? "Cancel Upload" : "Upload New Resume"}
                </Button>
            </Row>

            {/* Upload Form */}
            {showUpload && (
                <Row style={{ justifyContent: "center", marginTop: "20px" }}>
                    <Form style={{ width: "250px" }}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mt-3">
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUploadSubmit} className="mt-3" style={{ width: "100%" }}>
                            Submit
                        </Button>
                        {uploadMessage && <p className="mt-3">{uploadMessage}</p>}
                    </Form>
                </Row>
            )}
        </Container>
    );
}

export default ResumeNew;
