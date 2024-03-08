import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme";
import beerstyles from "../beerstyles";

const BeerStyles = () => {
  return (
    <>
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
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "24px",
                    fontWeight: theme.typography.fontWeightBold,
                    textAlign: { xs: "left", sm: "left" },
                    padding: "0 2rem",
                  }}
                >
                  {beer.name}
                </Typography>
                <Box
                  height={"50%"}
                  width={"90%"}
                  maxWidth={"800px"}
                  my={4}
                  display="flex"
                  flexDirection={"row"}
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <img
                    src={beer.image}
                    alt="pale ale"
                    style={{
                      width: "120px",
                      maxWidth: "120px",
                    }}
                  />
                  <Typography>{beer.info}</Typography>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default BeerStyles;
