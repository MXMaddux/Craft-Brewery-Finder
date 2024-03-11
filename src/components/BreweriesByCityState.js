import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../store/user_context";
import {
  Button,
  InputLabel,
  Input,
  FormControl,
  Typography,
  Container,
  Select,
  MenuItem,
  CircularProgress,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme";
import { useNavigate } from "react-router-dom";

import beerPicWithWoman from "../assets/img/woman-pulling-beer-out-of-box-of-beers.jpg";

const BreweriesByCityState = () => {
  const navigate = useNavigate("");

  const GoHome = () => {
    navigate("/");
  };

  const {
    breweries,
    formatPhoneNumber,
    findByCityState,
    areBreweries,
    setIsLoading,
    isLoading,
    states,
    setBreweries,
    setAreBreweries,
    setSearchMessage,
  } = useGlobalContext();
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = event.target.city.value.trim();
    const state = event.target.state.value.trim();
    if (city && state) {
      findByCityState(city, state);
      setIsVisible(false);
    }
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
    fontWeight: theme.typography.fontWeightBold,
    padding: "5px 10px",
    borderColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      cursor: "pointer",
    },
    marginTop: "1rem",
  }));

  const StyledLink = styled("a")(({ theme }) => ({
    textDecoration: "none",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.primary.main, // Darker color on hover
      cursor: "pointer",
    },
  }));

  const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  }));

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
    setBreweries([]); // Clear previous breweries
    setAreBreweries(false); // Reset areBreweries flag
    setSearchMessage(""); // Clear any search messages
    setIsLoading(false); // Ensure loading state is reset
  }, []);

  return (
    <Container maxWidth="xl">
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
            mx: "auto",
          }}
        >
          Find Breweries by City, State
        </Typography>
        {!areBreweries && isVisible && (
          <>
            <img
              src={beerPicWithWoman}
              alt="woman pulling beer from box"
              style={{
                width: "95%",
                maxWidth: "95%",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <FormControl>
                <InputLabel htmlFor="city">City:</InputLabel>
                <Input id="city" name="city" type="text" />
              </FormControl>
              <FormControl>
                <InputLabel id="state-label" htmlFor="state">
                  State:
                </InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  name="state"
                  label="State"
                  defaultValue=""
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                Search Breweries
              </Button>
            </form>
          </>
        )}
      </Box>

      <Box
        height={"50%"}
        width={"100%"}
        my={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap={0}
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
                <Typography variant="body1">
                  Directions:{" "}
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

                <Typography variant="body1">
                  Type: <StyledSpan>{brewery.brewery_type}</StyledSpan>
                </Typography>
                <Typography variant="body1">
                  Phone:{" "}
                  <StyledSpan>
                    {brewery.phone ? formatPhoneNumber(brewery.phone) : "N/A"}
                  </StyledSpan>
                </Typography>
                <Typography variant="body1">
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
        {!areBreweries && !isVisible && (
          <>
            <Typography
              variant="h6"
              sx={{ mt: 2, color: theme.palette.error.main }}
            >
              No Craft Breweries Found In That Area.
            </Typography>
            <StyledButton onClick={GoHome}>Home</StyledButton>
          </>
        )}
      </Box>
    </Container>
  );
};

export default BreweriesByCityState;
