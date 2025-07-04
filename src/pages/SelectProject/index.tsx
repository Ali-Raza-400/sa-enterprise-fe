import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.css";
import IMAGES from "../../assets/images";

const Index: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const storedUser = localStorage.getItem("super_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();

  useEffect(() => {
    const superUser = localStorage.getItem("super_user");
    if (superUser) {
      try {
        const parsedUser = JSON.parse(superUser);
        const projectId = parsedUser?.project_id;
        if (projectId) {
          navigate("/admin-dashboard");
        }
      } catch (e) {
        console.error("Failed to parse super_user from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://sa.saenterprises.services/projects/cities/", {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((res) => {
        setCities(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setLoading(false);
      });
  }, []);

  const handleCityClick = (city: string) => {
    setLoading(true);
    setSelectedCity(city);
    axios
      .get(`https://sa.saenterprises.services/projects/city/${city}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((res) => {
        setProjects(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  };

  const handleProjectClick = (projectId: string) => {
    const superUserRaw = localStorage.getItem("super_user");
    if (!superUserRaw) return;

    const superUser = JSON.parse(superUserRaw);
    superUser.project_id = projectId;
    localStorage.setItem("super_user", JSON.stringify(superUser));
    navigate("/admin-dashboard");
  };

  const handleBack = () => {
    setSelectedCity(null);
    setProjects([]);
  };

  if (loading)
    return <Spin size="large" style={{ display: "block", marginTop: 100 }} />;

  return (
    <div className="min-h-screen w-full relative p-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES.BG_LOGIN})`,
          filter: "blur(1px)",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-blue-900/90" />

      {selectedCity === null ? (
        <div>
          <h1 className="select-heading">Select City</h1>
          <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
            {cities.map((city) => (
              <Col key={city}>
                <Button
                  type="primary"
                  className="city-button"
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center mb-4">
            <h1 className="select-heading">Select Project in {selectedCity}</h1>
          </div>
          <div className="mb-4">
            <Button onClick={handleBack} type="primary">
              ← Back
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            {projects.map((project) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={project.id}
                className="bg-[#FCAB60] project-card-container"
              >
                <Card
                  title={project.name}
                  hoverable
                  onClick={() => handleProjectClick(project.id)}
                  className="bg-transparent project-card"
                >
                  <p className="text-[#fff]">
                    <strong>Type:</strong> {project.type}
                  </p>
                  <p className="text-[#fff]">
                    <strong>Description:</strong> {project.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Index;
