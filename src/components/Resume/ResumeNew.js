import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Resume.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Particle from "../Particle";
import pdf from "../../Assets/Mayakannan C Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
    const [width, setWidth] = useState(1200);
    const [showUpload, setShowUpload] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");
    const [resumeUrl, setResumeUrl] = useState(null);
    const [showPdfViewer, setShowPdfViewer] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        fetchResumeUrl();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const fetchResumeUrl = async () => {
        try {
            const response = await fetch("https://portfolio-contact-backend-srmw.onrender.com/resume");
            if (response.ok) {
                setResumeUrl("https://portfolio-contact-backend-srmw.onrender.com/resume");
                setShowPdfViewer(true);
            } else {
                setResumeUrl(null);
                setShowPdfViewer(false);
            }
        } catch (error) {
            console.error("Error fetching resume URL:", error);
            setResumeUrl(null);
            setShowPdfViewer(false);
        }
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

    const getScale = () => {
        if (width > 1200) {
            return 1.7;
        } else if (width > 768) {
            return 1.5;
        } else if (width > 576) {
            return 1;
        } else {
            return 0.7;
        }
    };

    return (
        <div>
            <Container fluid className="resume-section">
                <Particle />
                <Row style={{ justifyContent: "center", position: "relative" }}>
                    <Col md={8} className="resume-pdf-container">
                        <h2 className="resume-heading">Mayakannan Resume</h2>
                        {showPdfViewer && resumeUrl ? (
                            <Document file={resumeUrl} className="d-flex justify-content-center">
                                <Page pageNumber={1} scale={getScale()} />
                            </Document>
                        ) : (
                            <Row style={{ justifyContent: "center", marginTop: "20px" }}>
                                {resumeUrl === null && <p>No resume uploaded yet.</p>}
                            </Row>
                        )}
                    </Col>
                </Row>
                <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
                    <Button variant="primary" href={pdf} target="_blank" style={{ maxWidth: "250px" }}>
                        <AiOutlineDownload /> &nbsp;Download CV
                    </Button>
                </Row>

                <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
                    <Button variant="success" onClick={handleUploadClick} style={{ maxWidth: "250px" }}>
                        {showUpload ? "Cancel Upload" : "Upload New Resume"}
                    </Button>
                </Row>

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

                {resumeUrl && !showPdfViewer && (
                    <Row style={{ justifyContent: "center", marginTop: "20px" }}>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                            View Uploaded Resume
                        </a>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default ResumeNew;