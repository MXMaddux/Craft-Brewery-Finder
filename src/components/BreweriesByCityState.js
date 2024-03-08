import React, { useState } from "react";
import { useGlobalContext } from "../store/user_context";
import {
  Button,
  InputLabel,
  Input,
  FormControl,
  Typography,
  Container,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme";

import beerPicWithWoman from "../assets/img/woman-pulling-beer-out-of-box-of-beers.jpg";

const BreweriesByCityState = () => {
  const { breweries, formatPhoneNumber, findByCityState, areBreweries } =
    useGlobalContext();
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const state = event.target.state.value;
    findByCityState(city, state);
    setIsVisible(false);
  };

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
          }}
        >
          Find Breweries by City, State
        </Typography>
        {!areBreweries && (
          <img
            src={beerPicWithWoman}
            alt="woman pulling beer from box"
            sx={{
              width: { xs: "95%", sm: "85%", md: "80%" }, // Adjusted for responsiveness
              maxWidth: "95%", // Prevents the image from being too wide on any screen
              height: "auto", // Keeps aspect ratio
              display: "block",
              margin: "0 auto", // Centers the image
            }}
          />
        )}

        {isVisible && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FormControl>
              <InputLabel htmlFor="city">City: </InputLabel>
              <Input id="city" name="city" type="text" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="state">State: </InputLabel>
              <Input id="state" name="state" type="text" />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Search Breweries
            </Button>
          </form>
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
          breweries.map((brewery) => {
            return (
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
                    Address: <StyledSpan>{brewery.street}</StyledSpan>
                  </Typography>
                  <Typography variant="body1">
                    <StyledSpan>
                      {brewery.city}, {brewery.state}
                    </StyledSpan>
                  </Typography>
                  <Typography variant="body1">
                    <StyledSpan>{brewery.postal_code}</StyledSpan>
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
            );
          })}
      </Box>
    </Container>
  );
};

export default BreweriesByCityState;
