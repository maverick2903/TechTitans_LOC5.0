import { Box, Grid, Image, VStack } from "@chakra-ui/react";
import Aos from "aos";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease" });
  });
  return (
    <>
      <Grid
        className='hero'
        bg='gray.600'
        backgroundImage='url(https://media.istockphoto.com/id/1174511028/photo/stack-of-hands-unity-and-teamwork-concept.jpg?s=612x612&w=0&k=20&c=FmY958RnVfGFWZIxC47nYTH3ZWQkMBHil_q0DQxGkfU=)'
        backgroundSize='100% 100%'>
        <Image
          className='hero-img'
          src='https://media.istockphoto.com/id/1174511028/photo/stack-of-hands-unity-and-teamwork-concept.jpg?s=612x612&w=0&k=20&c=FmY958RnVfGFWZIxC47nYTH3ZWQkMBHil_q0DQxGkfU='
        />
        <VStack>
          <h1 className='hero-header'>JobSeeker</h1>
          <p>Empowering job seekers to take the next step in their career.</p>
        </VStack>
      </Grid>
      <Grid as='section'>
        <h2 className='section-header' data-aos='fade-right'>
          Connect with top employers and land your dream job!
        </h2>
        <div className='section-img'>
          <Image
            src='https://media.istockphoto.com/id/1160000498/photo/business-partnership-meeting-in-office.jpg?s=612x612&w=0&k=20&c=oQFc5s0B-R0otAcNl4lfTcWUeuzTpmxa3ozEQjXAlaw='
            objectFit='cover'
            objectPosition='center'
            data-aos='flip-left'
          />
        </div>
      </Grid>
      <Grid as='section' bg='gray.600'>
        <h2 data-aos='slide-left' className='section-header'>
          Unlock your potential with our job matching technology.
        </h2>
        <Image
          src='https://media.istockphoto.com/id/1145631842/photo/business-development-to-success-and-growing-growth-concept-businessman-pointing-arrow-graph.jpg?s=612x612&w=0&k=20&c=YxCnTcEWrVsh5Xe5PSgVFAVzEoLG-thJU2BU3TWCusA='
          data-aos='zoom-in-right'
        />
      </Grid>
      <Grid as='section'>
        <h2 className='section-header' data-aos='fade-up-right'>
          Your next career move starts here.
        </h2>
        <Image src='http://unsplash.it/400?random=3' data-aos='fade-down-left' />
      </Grid>
    </>
  );
}
