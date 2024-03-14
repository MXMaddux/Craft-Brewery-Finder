import React, { useEffect, useState } from "react";
import { Typography, styled, Container, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme"; // Assuming you're using react-router for navigation
import { useGlobalContext } from "../store/user_context"; // Adjust the path as necessary
import guyOfferingBeerMug from "../assets/img/Raices-brewing-taproom-smiling-workers-pouring-eer-1200x628-1.jpeg";

const ByLocation = () => {
  const {
    userLocation,
    findBreweriesByCurrentCity,
    breweries,
    setBreweries,
    areBreweries,
    setAreBreweries,
    isLoading,
    formatPhoneNumber,
    setUserLocation,
    setSearchMessage,
    setIsLoading,
  } = useGlobalContext();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    findBreweriesByCurrentCity();
    setIsVisible(false);
  };

  const AddressWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.primary.main, // Darker color on hover
      cursor: "pointer",
    },
  }));

  const StyledButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    marginBottom: "1rem",
    fontWeight: theme.typography.fontWeightBold,
    padding: "5px 10px",
    borderColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      cursor: "pointer",
    },
  }));

  const StyledLink = styled("a")(({ theme }) => ({
    textDecoration: "none",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.primary.main, // Darker color on hover
    },
  }));

  const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  }));

  const StyledH1 = styled("h1")(({ theme }) => ({
    color: theme.palette.primary.dark,
    marginBottom: "-0.010rem",
    fontWeight: theme.typography.fontWeightBold,
  }));
  useEffect(() => {
    setAreBreweries(false);
  }, []);

  // Function to generate a map link based on the brewery's address
  const generateMapLink = (brewery) => {
    const query = encodeURIComponent(
      `${brewery.street}, ${brewery.city}, ${brewery.state}`
    );
    // Use Google Maps link by default
    let mapLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
    // Check if the user is on an iOS device to use Apple Maps
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      mapLink = `http://maps.apple.com/?address=${query}`;
    }
    return mapLink;
  };

  useEffect(() => {
    setUserLocation(null); // Clear user location
    setBreweries([]); // Clear previous breweries
    setAreBreweries(false); // Reset areBreweries flag
    setSearchMessage(""); // Clear any search messages
    setIsLoading(false); // Ensure loading state is reset
  }, []);

  return (
    <Container
      maxWidth="xl"
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        height={"50%"}
        width={"100%"}
        // my={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap={2}
        p={2}
      >
        <StyledH1>Find Breweries By Location</StyledH1>
        {!areBreweries && !isVisible && (
          <StyledButton variant="contained" onClick={handleClick}>
            Tap Here
          </StyledButton>
        )}
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
            {breweries.map((brewery) => (
              <React.Fragment key={brewery.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content within each Box
                    width: "100%", // Ensure Box doesn't exceed the container width
                    maxWidth: "800px", // Adjust based on your layout needs
                    mx: "auto", // Center Box in the Container, automatically adjusts margins
                    p: 1,
                    border: "1px solid grey",
                    borderRight: "none",
                    borderLeft: "none",
                    // Use breakpoints for responsive adjustments
                    margin: (theme) => ({
                      xs: "0 auto", // For extra-small to small screens, auto margins for center alignment
                      sm: "0 auto", // Adjust accordingly if you have specific styles for small screens
                      md: "0 auto", // Center alignment for medium screens and up
                      // You can add more breakpoints (lg, xl) if needed
                    }),
                  }}
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
                    Directions To:{" "}
                    <AddressWrapper
                      onClick={() =>
                        window.open(generateMapLink(brewery), "_blank")
                      }
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        {brewery.street}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        {brewery.city}, {brewery.state}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        {brewery.postal_code}
                      </Typography>
                    </AddressWrapper>
                  </Typography>
                  <Typography>
                    Type: <StyledSpan>{brewery.brewery_type}</StyledSpan>
                  </Typography>
                  <Typography>
                    Phone:{" "}
                    <StyledSpan>
                      {brewery.phone ? formatPhoneNumber(brewery.phone) : "N/A"}
                    </StyledSpan>
                  </Typography>
                  <Typography>
                    URL:{" "}
                    <StyledLink
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {brewery.website_url}
                    </StyledLink>
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
