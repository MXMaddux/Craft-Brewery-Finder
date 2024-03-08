import React, { useEffect } from "react";
import { Typography, styled, Container } from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme"; // Assuming you're using react-router for navigation
import { useGlobalContext } from "../store/user_context"; // Adjust the path as necessary
import guyOfferingBeerMug from "../assets/img/Raices-brewing-taproom-smiling-workers-pouring-eer-1200x628-1.jpeg";

const ByLocation = () => {
  const {
    userLocation,
    findBreweriesByCurrentCity,
    breweries,
    areBreweries,
    setAreBreweries,
    formatPhoneNumber,
  } = useGlobalContext();

  const StyledButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    fontWeight: theme.typography.fontWeightBold,
    padding: "5px 10px",
    borderColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      cursor: "pointer",
    },
  }));

  const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  }));

  const ExternalLink = styled("a")(({ theme }) => ({
    textDecoration: "none",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
      cursor: "pointer",
    },
  }));

  useEffect(() => {
    setAreBreweries(false);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        height={"50%"}
        width={"100%"}
        my={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap={2}
        p={2}
      >
        {" "}
        {/* Added a div to wrap your entire component's return */}
        <h1>Find Breweries By Location</h1>
        <StyledButton variant="contained" onClick={findBreweriesByCurrentCity}>
          Let's Do It
        </StyledButton>
        {!areBreweries && <img src={guyOfferingBeerMug} alt="beer mug" />}
        {userLocation && (
          <Box
            height={"50%"}
            width={"100%"}
            my={4}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            gap={2}
            p={2}
          >
            {breweries &&
              breweries.map((brewery) => (
                <React.Fragment key={brewery.id}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    width={"100%"}
                    mx={"auto"}
                    sx={{ border: "1px solid grey", p: 1 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.grey.main,
                        fontSize: "16px",
                        fontWeight: theme.typography.fontWeightRegular,
                      }}
                    >
                      Name: <StyledSpan>{brewery.name}</StyledSpan>
                    </Typography>
                    <Typography>
                      Address: <StyledSpan>{brewery.street}</StyledSpan>
                    </Typography>
                    <Typography>
                      <StyledSpan>
                        {brewery.city}, {brewery.state}
                      </StyledSpan>
                      <StyledSpan>{brewery.postal_code}</StyledSpan>
                    </Typography>
                    <Typography>
                      Type: <StyledSpan>{brewery.brewery_type}</StyledSpan>
                    </Typography>

                    <Typography>
                      Phone:{" "}
                      <StyledSpan>
                        {brewery.phone
                          ? formatPhoneNumber(brewery.phone)
                          : "N/A"}
                      </StyledSpan>
                    </Typography>
                    <Typography>
                      URL:{" "}
                      <ExternalLink
                        href={brewery.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {brewery.website_url}
                      </ExternalLink>
                    </Typography>
                  </Box>
                </React.Fragment>
              ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ByLocation;
