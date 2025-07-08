import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../redux/features/projectSlice"; // ✅ import your action
import { setProjectLocalStorage } from "../../utils/helper";
import "./index.css";
import IMAGES from "../../assets/images";

const Index: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { project } = useSelector((state: any) => state.project);

  const storedUser = localStorage.getItem("super_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ redux dispatcher

  useEffect(() => {
    try {
      if (project?.id) {
        navigate("/admin-dashboard");
      }
    } catch (e) {
      console.error("Failed to parse super_user from localStorage", e);
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

  const handleProjectClick = (project: any) => {
    setProjectLocalStorage(project);
    dispatch(setProject(project));
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES.BG_LOGIN})`,
          filter: "blur(1px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-blue-900/60" />

      {selectedCity === null ? (
        <div>
          <h1 className="select-heading">Select City</h1>
          <div className="pricing-container">
            {cities.map((city) => (
              <div key={city} className="pricing-card">
                <button
                  className="city-button"
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </button>
              </div>
            ))}
          </div>
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

          <div className="pricing-container">
            {projects.map((project) => (
              <div className="pricing-card highlighted" key={project.id}>
                <h3>{project.city}</h3>
                <p className="price">{project.name}</p>
                <ul>
                  <li>Type: {project.type}</li>
                  <li>Description: {project.description}</li>
                </ul>
                <button onClick={() => handleProjectClick(project)}>
                  Visit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
