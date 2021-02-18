import { Box, Code, Container, Heading, Text } from '@chakra-ui/react';
import Counter from '@components/Counter';

const IndexPage = () => {
  return (
    <main>
      <Container>
        <Heading as="h1" size="2xl" my="4">
          Tello Recon
        </Heading>
        <Text fontSize="md">
          This is a project for COMP 361 -{' '}
          <a href="https://github.com/MykalMachon/Tello-Recon">see the repo</a>{' '}
        </Text>
        <Box my="4">
          <Text fontsize="sm" mb="4">
            Here's an example component called <Code>{`<Counter />`}</Code>
          </Text>
          <Counter />
        </Box>
      </Container>
    </main>
  );
};

export default IndexPage;
