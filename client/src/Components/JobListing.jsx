import { Grid, Text, useColorModeValue, Stack, Badge, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const JobListing = ({ job, key }) => {
  const { jobTitle, field, users, workLocation, recruiterId, skills } = job;

  const [Recruiter, setRecruiter] = useState({});

  const getRecruiter = async () => {
    let res = await fetch(`http://localhost:5000/recruiter/${recruiterId}`, {
      credentials: "include",
    });
    let data = await res.json();
    console.log(data);
    setRecruiter(data);
  };

  useEffect(() => {
    getRecruiter();
  }, []);

  return (
    <Grid
      key={key}
      padding='1em'
      border='2px solid'
      borderColor='gray.500'
      borderRadius='lg'
      // templateColumns='auto 1fr auto'
      templateRows='repeat(3,auto)'
      backgroundColor={useColorModeValue("gray.50", "gray.800")}
      gap='0.5em 3em'>
      <Text
        fontSize='lg'
        // gridColumn='1 /-1'
        fontWeight='bold'
        lineHeight='2'
        borderBottom='2px solid'
        borderBottomColor='#af99ff'>
        {jobTitle}
      </Text>
      <Text fontSize='md' gridColumn='1'>
        {field}
      </Text>
      <Text fontSize='md' gridColumn='1'>
        {workLocation}
        {Recruiter?.rec?.basedOutOff ? `, ${Recruiter?.rec?.basedOutOff}` : ""}
      </Text>
      {users.length ? (
        <Text fontSize='sm' gridColumn='1'>
          {users.length} have already applied!
        </Text>
      ) : (
        ""
      )}
      <Stack direction='row' wrap='wrap' gap='0.25em 0' placeSelf='start'>
        {skills.split(",").map(x => (
          <Badge fontSize='sm' key={x}>
            {x}
          </Badge>
        ))}
      </Stack>

      <Button
        variant='solid'
        backgroundColor='hsla(253, 100%, 80%, 0.5)'
        borderColor='#af99ff'
        _hover={{
          backgroundColor: "#af99ff",
        }}>
        Apply
      </Button>
    </Grid>
  );
};

export default JobListing;
