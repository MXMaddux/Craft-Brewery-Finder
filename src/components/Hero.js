import React from "react";
import WhatIsCraftBeerHero1 from "../assets/img/what_is_craft_beer_hero-1.jpeg";
import { Box, Container, Typography, styled } from "@mui/material";
import theme from "../theme";

const WhatIsCraftBeer = () => {
  // const StyledButton = styled("button")(({ theme }) => ({
  //   backgroundColor: theme.palette.secondary.main,
  //   color: "#fff",
  //   fontWeight: theme.typography.fontWeightBold,
  //   padding: "5px 10px",
  //   borderColor: theme.palette.secondary.light,
  //   "&:hover": {
  //     backgroundColor: theme.palette.secondary.dark,
  //     cursor: "pointer",
  //   },
  // }));

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          maxWidth: "800px",
          width: "90%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.grey.main,
            fontSize: "2rem",
            fontWeight: theme.typography.fontWeightBold,
            textAlign: { xs: "center", sm: "center" },
            margin: "2rem",
          }}
        >
          What is Craft Beer?
        </Typography>
        <img
          src={WhatIsCraftBeerHero1}
          alt="What is craft beer?"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <Box
          sx={{
            maxWidth: "800px", // Sets a max width for the text content
            width: "100%", // Use a percentage width for responsiveness
            margin: "auto", // Centers the box
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.grey.main,
              fontSize: "16px",
              fontWeight: theme.typography.fontWeightRegular,
              textAlign: { xs: "left", sm: "left" },
              padding: "0 2rem",
            }}
          >
            Attempting to precisely define craft beer proves to be a complex
            endeavor, as the appreciation of beer is highly subjective and
            varies greatly from one individual to another. Nevertheless, the
            Brewers Association—a not-for-profit organization dedicated to the
            support and advancement of small and independent American
            brewers—categorizes an American craft brewer as one that is small
            and operates independently. This classification enables the
            association to compile and share data concerning the burgeoning
            craft brewery sector, which represents 98% of all breweries in the
            United States.
          </Typography>
          <h3>Craft Beer in the United States</h3>
          <Typography
            sx={{
              color: theme.palette.grey.main,
              fontSize: "16px",
              fontWeight: theme.typography.fontWeightRegular,
              textAlign: { xs: "left", sm: "left" },
              padding: "0 2rem",
            }}
          >
            Currently, there has never been a better period in the history of
            the United States for craft beer enthusiasts. The country boasts a
            diverse array of beer styles and brands, more so than any other
            global market. By 2020, over 8,000 breweries were contributing to
            the vast selection of beer brands available across the U.S. These
            establishments have navigated numerous successes and hurdles, yet
            their esteemed status as purveyors of some of the finest beers
            worldwide could not have been achieved without the enthusiastic
            support of craft beer aficionados. To explore the extensive heritage
            of craft beer, consider reviewing resources on American beer
            history. These materials are invaluable for those seeking to delve
            deeper into the essence of craft beer.
            <br />
            Whether you're aspiring to become a connoisseur of craft beer or
            simply wish to gain a basic understanding before enjoying your first
            craft beer, we are here to assist. Our platform serves as the
            premier guide for those eager to expand their knowledge about craft
            beer and its various brands.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default WhatIsCraftBeer;
