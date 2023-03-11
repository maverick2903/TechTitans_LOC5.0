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
  Divider,
  Badge,
  Avatar,
  RadioGroup,
  HStack,
  Radio,
  useToast,
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

  const [allJobs, setAllJobs] = useState();

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
    setAllJobs(data);
  };
/* 
  console.log(allJobs.jobs[0].field); */
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500,green.500)"
      color="white"
    >
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
      <Divider mb={5} />
      <VStack spacing="8" mb="8">
        <Text fontSize="xl" fontWeight="bold">
          Your Job Listings:
        </Text>
        <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Stack direction="column" spacing={0}>
            <Badge colorScheme="green" mb={3}>
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
            </Box>
            {/*             {allJobs.map((data, index) => (
              <Box p="4" borderBottomWidth="1px">
                <Text key={index} fontWeight="bold">
                  {data.jobs[0].field}
                </Text>
                <Text fontSize="sm">San Francisco, CA</Text>
              </Box>
            ))} */}
            {/*{allJobs ? (
              allJobs.map((data, index) => (
                <Box p="4" borderBottomWidth="1px" key={index}>
                  <Text fontWeight="bold">{data.jobs[0].field}</Text>
                  <Text fontSize="sm">San Francisco, CA</Text>
                </Box>
              ))
            ) : (
              <Box p="4">No jobs listed yet{console.log(allJobs)}</Box>
            )} */}
          </Stack>
        </Box>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formSubmit} method="POST">
          <ModalContent>
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
