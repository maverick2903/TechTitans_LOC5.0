import { Grid, Text, Badge, Stack, useColorMode } from "@chakra-ui/react";

const JobListing = ({ comapny, JobTitle, field, yearsOfExp, skills, users }) => {
  return (
    <Grid
      padding='1em'
      border='2px solid'
      borderColor='gray.500'
      borderRadius='lg'
      templateColumns='auto 1fr'
      templateRows='repeat(3,auto)'
      // backgroundColor={useColorMode("gray.50", "gray.800")}
      gap='.5em 3em'>
      <Text
        fontSize='lg'
        gridColumn='1 /-1'
        fontWeight='bold'
        lineHeight='2'
        borderBottom='2px solid'
        borderBottomColor='gray.600'>
        {JobTitle}, {comapny}
      </Text>
      <Text fontSize='md' gridColumn='1'>
        {field}
      </Text>
      <Text fontSize='sm' gridColumn='1'>
        {users.length} have already applied!
      </Text>
      <Stack direction='row' wrap='wrap' gridRow='2 / -1' gridColumn='2' placeSelf='start'>
        {skills.map(x => (
          <Badge fontSize='sm' key={x}>
            {x}
          </Badge>
        ))}
      </Stack>
    </Grid>
  );
};

export default JobListing;
