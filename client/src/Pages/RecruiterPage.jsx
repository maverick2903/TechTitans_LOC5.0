import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  VStack,
  useColorModeValue,
  Divider,
  Badge,
  SimpleGrid,
  Avatar,
  RadioGroup,
  HStack,
  Radio,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const RecruiterPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jobData, setJobData] = useState({
    field: "",
    jobTitle: "",
    yearsOfExp: "",
    skills: "",
    salary: "",
    users: "",
  });
  const [quizValue, setQuizValue] = useState("false");

  const handleQuizChange = (event) => {
    setQuizValue(event);
  };
  const [placeValue, setPlaceValue] = useState("");

  const handlePlaceChange = (event) => {
    setPlaceValue(event);
  };
  const setFormData = (e) => {
    setJobData({ ...jobData, [e.target.id]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/recruiter/addJobPosting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        field: jobData.field,
        jobTitle: jobData.jobTitle,
        yearsOfExp: jobData.yearsOfExp,
        skills: jobData.skills,
        quizOrNot: quizValue,
        workLocation: placeValue,
        salary: jobData.salary,
      }),
    });
    if (resp.status == 200) {
      toast({
        title: "Posted Successfully!",
        status: "success",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
      onClose();
    } else {
      //show that wrong credentials
      toast({
        title: "Some error occurred",
        status: "error",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
    }
  };

  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);
  const getAllJobs = async () => {
    const resp = await fetch(
      "http://localhost:5000/recruiter/showUsersInterested",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await resp.json();
    console.log(data);
    setAllJobs(data["jobs"]);
    console.log(allJobs)
  };
  /* 
  console.log(allJobs.jobs[0].field); */
  return (
    <Box
      // height="100vh"
      display="flex"
      flexDirection="column"
      // alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500,green.500)"
      color="white"
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <Avatar
          name="John Doe"
          src="https://bit.ly/broken-link"
          size="xl"
          mb={5}
        />
        <Heading mb={5}>Welcome, John Doe</Heading>
        <Heading as="h1" size="3xl" fontWeight="bold" mb="8">
          Post Your Job Here
        </Heading>
        <Button
          size="lg"
          variant="solid"
          mb="8"
          _hover={{ bg: "teal.500", color: "white" }}
          onClick={onOpen}
        >
          Post a Job
        </Button>
      </Box>
      <Divider mb={5} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Your Job Listings:
        </Text>
        <Box >
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
            display="flex"
            justifyContent="space-around"
          >
            {/*             <Badge colorScheme="green" mb={3}>
              Full-time
            </Badge>
            <Box p="4" borderBottomWidth="1px">
              <Text fontWeight="bold">Full Stack Web Developer</Text>
              <Text fontSize="sm">San Francisco, CA</Text>
            </Box>
            <Badge colorScheme="blue" mb={3}>
              Remote
            </Badge>
            <Box p="4" borderBottomWidth="1px">
              <Text fontWeight="bold">Marketing Manager</Text>
              <Text fontSize="sm">New York, NY</Text>
            </Box>
            <Badge colorScheme="purple" mb={3}>
              Internship
            </Badge>
            <Box p="4">
              <Text fontWeight="bold">UI/UX Designer</Text>
              <Text fontSize="sm">Los Angeles, CA</Text>
            </Box> */}
            {allJobs ? (
              allJobs.map((data, index) => (
                <Card >
                  <Stack alignItems="center">
                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"md"}
                      letterSpacing={1.1}
                      key={index}
                    >
                      {data.field}
                    </Text>
                  </Stack>
                  <CardHeader>
                    <Heading size="md"> {data.jobTitle}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Divider mb={10} color="white"></Divider>
                    <Box
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text as="b">Skills - </Text>
                      {data.skills.split(",").map((skill) => (
                        <VStack spacing="8" mb="8">
                          <Badge key={skill}>{skill}</Badge>
                        </VStack>
                      ))}
                    </Box>

                    <Text>
                      <Text as="b">Years of Experience - </Text>
                      {data.yearsOfExp}
                    </Text>
                    <Text>
                      <Text as="b">Salary - $</Text>
                      {data.salary}
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button>View interested applicants</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Box p="4">No jobs listed yet{console.log(allJobs)}</Box>
            )}
          </SimpleGrid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formSubmit} method="POST">
          <ModalContent>
            <Badge>
              <Avatar
                size="xs"
                src="https://picsum.photos/32?random=1"
                mr={2}
              />
            </Badge>

            <ModalHeader>Add a New Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="4">
                <Input
                  id="field"
                  onChange={setFormData}
                  value={jobData.field}
                  placeholder="Field"
                />
                <Input
                  id="jobTitle"
                  onChange={setFormData}
                  value={jobData.jobTitle}
                  placeholder="Job Title"
                />
                <Box>
                  <Text>Remote or On-Site?</Text>
                </Box>
                <RadioGroup onChange={handlePlaceChange} id="quizOrNot">
                  <HStack spacing="34px">
                    <Radio value="remote">Remote</Radio>
                    <Radio value="onsite">On-site</Radio>
                  </HStack>
                </RadioGroup>
                <Input
                  id="skills"
                  onChange={setFormData}
                  value={jobData.skills}
                  placeholder="Skills"
                />
                <Input
                  id="yearsOfExp"
                  onChange={setFormData}
                  value={jobData.yearsOfExp}
                  placeholder="Years of Experience"
                />
                <Input
                  id="salary"
                  onChange={setFormData}
                  value={jobData.salary}
                  placeholder="Salary"
                />
                <Box>
                  <Text>Set Quiz for Recruitees?</Text>
                </Box>
                <RadioGroup onChange={handleQuizChange}>
                  <HStack spacing="34px">
                    <Radio value="true">Yes</Radio>
                    <Radio value="false">No</Radio>
                  </HStack>
                </RadioGroup>
                <Button
                  size="md"
                  variant="solid"
                  colorScheme="teal"
                  _hover={{ bg: "teal.500" }}
                  type="submit"
                >
                  Post Job
                </Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default RecruiterPage;
