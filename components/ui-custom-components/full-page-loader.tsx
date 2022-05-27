import { Flex, Spinner } from '@chakra-ui/react';

const FullPageLoader = () => {
    return (
        <Flex flexDir='column' alignItems='center' justifyContent='center' alignSelf='center' height='100vh'>
            <Spinner size='xl' mb={5} thickness='4px' speed='0.65s' emptyColor='gray.200' color='#12bd4b'/>
            <p>Loading</p>
        </Flex>
    );
}

export default FullPageLoader;