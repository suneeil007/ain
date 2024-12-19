import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Vacancy = () => {
  const vacancies = [
    {
      id: 1,
      title: "Software Engineer",
      location: "Kathmandu, Nepal",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Marketing Specialist",
      location: "Pokhara, Nepal",
      type: "Part-time",
    },
    {
      id: 3,
      title: "Data Analyst",
      location: "Lalitpur, Nepal",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Graphic Designer",
      location: "Bhaktapur, Nepal",
      type: "Remote",
    },
  ];

  return (
    <section style={{ width: "100%", backgroundColor: "#fff", padding: "20px 0 40px 0" }}>
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
                flex: "1 1 calc(50% - 30px)", // 2 items per row on medium screens
                maxWidth: "calc(50% - 30px)", // Same as above
                marginBottom: "20px", // Adding space at the bottom
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
                    flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
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
                      28
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#fff"
                      sx={{ fontSize: "1.4rem", lineHeight: "1.2" }}
                    >
                      July
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
                      Company Name: {vacancy.location}
                    </Typography>

                    <Typography
                      variant="h4"
                      component="div"
                      fontWeight="bold"
                      color="#fff"
                      sx={{
                        fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Adjust title size for smaller screens
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
                      href="#"
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

        <a
          href="vacancies"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h2"
            color="black"
            sx={{
              marginTop: "60px",
              marginBottom: "60px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "1.2rem",
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "underline",
            }}
          >
            Explore More
          </Typography>
        </a>
      </div>
    </section>
  );
};

export default Vacancy;
