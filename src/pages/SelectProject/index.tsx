import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProject } from "../../redux/features/projectSlice"; // ✅ import your action
import { setProjectLocalStorage } from "../../utils/helper";
import "./index.css";
import IMAGES from "../../assets/images";

const Index: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const { project } = useSelector((state: any) => state.project);

  const storedUser = localStorage.getItem("super_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ redux dispatcher

  // useEffect(() => {
  //   try {
  //     if (project?.id) {
  //       navigate("/admin-dashboard");
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse super_user from localStorage", e);
  //   }
  // }, []);

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
              <div key={city} className="pricing-card city_button">
                <button
                  className="city-button ant-btn css-dev-only-do-not-override-14qglws ant-btn-primary ant-btn-solid ant-btn-lg w-full mt-6 !h-12 !bg-gradient-to-r !from-green-600 !to-teal-600 !border-0 !text-white font-medium text-base hover:!from-green-700 hover:!to-teal-700 shadow-lg"
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
          <div className="flex justify-center items-center mb-4 relative bg-dark">
            <h1 className="select-heading">Select Project in {selectedCity}</h1>
          </div>
          <div className="">
            <button
              onClick={() => handleBack()}
              style={{
                background: "#008000 !important",
                backgroundColor: "#008000 !important",
                opacity: 1,
                zIndex: "111111111111111111111",
                position: "absolute",
                top: 0,
                color: "#fff",
              }}
              className="css-dev-only-do-not-override-14qglws ant-btn-primary ant-btn-solid ant-btn-lg  mt-6 !h-12 !bg-gradient-to-r !from-green-600 !to-teal-600 !border-0 !text-white font-medium text-base hover:!from-green-700 hover:!to-teal-700 shadow-lg"
            >
              ← Back
            </button>
          </div>

          <div className="pricing-container">
            {projects.map((project) => (
              <div className="pricing-card highlighted card" key={project.id}>
                <h3>{project.city}</h3>
                <p className="price">{project.name}</p>
                <ul>
                  <li>Type: {project.type}</li>
                  <li>Description: {project.description}</li>
                </ul>
                <button
                  onClick={() => handleProjectClick(project)}
                  className="visit-button ant-btn css-dev-only-do-not-override-14qglws ant-btn-primary ant-btn-solid ant-btn-lg w-full mt-6 !h-12 !bg-gradient-to-r !from-green-600 !to-teal-600 !border-0 !text-white font-medium text-base hover:!from-green-700 hover:!to-teal-700 shadow-lg"
                >
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
