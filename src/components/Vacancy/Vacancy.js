import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import ExploreMoreButton from "../Buttons/ExploreMoreButton";

const fadeInVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Vacancy = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch("https://intellisoftnepal.com.np/ain/public/api/career");
        if (!response.ok) {
          throw new Error("Failed to fetch vacancies");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setVacancies(data.data);
        } else {
          setVacancies([]); 
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  if (loading) {
    return <Typography variant="h5">Loading vacancies...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <section
      style={{ width: "100%", backgroundColor: "#fff", padding: "20px 0 40px 0" }}
    >
      <div className="container">
        <Typography
          variant="h2"
          color="black"
          sx={{
            paddingTop: 0,
            paddingBottom: 9,
            textTransform: "uppercase",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Latest Vacancies
        </Typography>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {vacancies.map((vacancy) => (
            <motion.div
              key={vacancy.id}
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              style={{
                flex: "1 1 calc(50% - 30px)",
                maxWidth: "calc(50% - 30px)",
                marginBottom: "20px",
              }}
            >
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "#003153",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  padding: "16px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="#fff"
                      sx={{ fontWeight: "bold", lineHeight: "1" }}
                    >
                      {new Date(vacancy.deadline).getDate()}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#fff"
                      sx={{ fontSize: "1.4rem", lineHeight: "1.2" }}
                    >
                      {new Date(vacancy.deadline).toLocaleString("default", {
                        month: "short",
                      })}
                    </Typography>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      color="#f1f1f1"
                      fontSize="1.2em"
                      sx={{
                        marginBottom: "8px",
                      }}
                    >
                      {vacancy.company_name}
                    </Typography>

                    <Typography
                      variant="h4"
                      component="div"
                      fontWeight="bold"
                      color="#fff"
                      sx={{
                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      }}
                    >
                      {vacancy.title}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={vacancy.url || vacancy.document || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        color: "#003153",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        style={{
                          fontSize: "19px",
                          lineHeight: "1",
                          textAlign: "center",
                        }}
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        
        <div className="d-flex justify-content-end mt-4"
             style={{paddingBottom: "45px"}}>
                             <ExploreMoreButton 
                               href="/vacancy" 
                               label="Explore More" 
                               color="black" 
                               hoverColor="#f39c12"
                             />
                    </div>  

      </div>
    </section>
  );
};

export default Vacancy;
