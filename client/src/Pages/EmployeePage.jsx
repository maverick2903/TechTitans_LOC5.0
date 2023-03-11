import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Grid, GridItem, Heading, Container, Text, Box } from "@chakra-ui/react";
import JobListing from "../Components/JobListing";

export default function EmployeePage() {
  const [auth] = useOutletContext();
  const [Jobs, setJobs] = useState([]);

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

  const jobs = [
    {
      comapny: "Company_1",
      JobTitle: "Job Title_1",
      field: "field of 1",
      yearsOfExp: 5,
      skills: ["skill_1", "skill_2"],
      users: ["user_1", "user_2"],
    },
    {
      comapny: "Company_2",
      JobTitle: "Job Title_2",
      field: "field of 2",
      yearsOfExp: 5,
      skills: ["skill_1", "skill_2"],
      users: ["user_1", "user_2"],
    },
    {
      comapny: "Company_3",
      JobTitle: "Job Title_3",
      field: "field of 3",
      yearsOfExp: 5,
      skills: ["skill_1", "skill_2"],
      users: ["user_1", "user_2"],
    },
    {
      comapny: "Company_4",
      JobTitle: "Job Title_4",
      field: "field of 4",
      yearsOfExp: 5,
      skills: ["skill_1", "skill_2"],
      users: ["user_1", "user_2"],
    },
  ];

  // console.log(auth);
  return (
    <Grid p='2em' gap='2rem'>
      <GridItem>
        <Heading>{auth.name}</Heading>
      </GridItem>
      <GridItem>
        <Text fontSize='2xl' mb='0.5em'>
          Jobs
        </Text>
        <Box display='grid' gap='1rem'>
          {Jobs.map(x => (
            <JobListing {...x} key={x.JobTitle} />
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
}
