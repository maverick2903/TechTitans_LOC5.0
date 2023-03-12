import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Grid, GridItem, Heading, Text, Box,Button, } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import JobListing from "../Components/JobListing";
import MyMapComponent from "../Components/Map/MyMapComponent";

export default function EmployeePage() {
  const [auth] = useOutletContext();
  const [Jobs, setJobs] = useState([]);
  const [isMap,setIsMap] = useState("");
  const getJobs = async () => {
    let res = await fetch("http://localhost:5000/job/showJobListings", {
      method: "POST",
      body: {},
      credentials: "include",
    });
    let data = await res.json();
    console.log(data.allJobs);
    setJobs(data["allJobs"]);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Grid p="2em" gap="2rem">
      <GridItem>
        <Heading>{auth && auth.name}'s job recommendations</Heading>
      </GridItem>
      <Box>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="purple"
          onClick={() => setIsMap("true")}
        >
          View Jobs Near Me
        </Button>
      </Box>
      {isMap && (<MyMapComponent/>)}
      <GridItem>
        <Text fontSize="2xl" mb="0.5em">
          All available jobs
        </Text>
        <Grid
          gap="1rem"
          gridTemplateColumns="repeat(auto-fill,minmax(15rem,1fr))"
        >
          {Jobs.map((x) => (
            <JobListing job={x} key={x.JobTitle} />
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
}
