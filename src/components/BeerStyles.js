import React from "react";
import { Typography, Container, Box } from "@mui/material";
import theme from "../theme";
import beerstyles from "../beerstyles";

const BeerStyles = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        height={"100%"}
        width={"100%"}
        my={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap={4}
        p={2}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.grey.main,
            fontSize: "2rem",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          Common US Craft Beer Styles
        </Typography>
        <Box
          height={"50%"}
          width={"90%"}
          maxWidth={"800px"}
          my={2}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          {beerstyles.map((beer) => {
            return (
              <React.Fragment key={beer.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content within each Box
                    width: "100%", // Ensure Box doesn't exceed the container width
                    maxWidth: "800px", // Adjust based on your layout needs
                    mx: "auto", // Center Box in the Container
                    p: 2,
                    border: "1px solid grey",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "24px",
                      fontWeight: theme.typography.fontWeightBold,
                      textAlign: { xs: "left", sm: "left" },
                      padding: "0 2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {beer.name}
                  </Typography>
                  <img
                    src={beer.image}
                    alt="pale ale"
                    style={{
                      width: "120px",
                      maxWidth: "120px",
                      marginBottom: "1rem",
                    }}
                  />
                  <Typography>{beer.info}</Typography>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default BeerStyles;
