import Head from 'next/head';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
  Input
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { Product, Dependency, WalletSection } from '../components';
import { cw20ContractAddress, dependencies, products } from '../config';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { useEffect, useState } from 'react';
import { Cw20Client } from '../codegen/Cw20.client';
import { useWallet } from '@cosmos-kit/react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const balance = useTokenBalance(cw20ContractAddress);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [recipient, setRecipient] = useState<string | undefined>(undefined);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [cw20Client, setCw20Client] = useState<Cw20Client | undefined>(undefined);

  const handleAmount = (event:any) => {
    setAmount(event.target.value);
  };

  const handleRecipient = (event:any) => {
    setRecipient(event.target.value);
  };
  
  const { getSigningCosmWasmClient, address} = useWallet();

  //cw20Client
  useEffect(() => {
    getSigningCosmWasmClient().then((cosmWasmClient) => {
        if (!cosmWasmClient || !address) {
            console.error("no cosmWasmClient or no address!");
            return;
        }
        const newClient = new Cw20Client(
          cosmWasmClient, 
          address, 
          cw20ContractAddress
        );
        setCw20Client(newClient);
    });
  }, [address, getSigningCosmWasmClient]);

    const handleSend = async () => {
    //const handleSend = (event: any) => {
    if (!cw20Client){
      console.error("no cw20Client, please connect your wallet");
      return;
    }

    if (!amount || !recipient){
      console.error("no amount or recipient!");
      return;
    }

    const result = await cw20Client.transfer({ amount, recipient });

    console.log(result);

    setTxHash(result.transactionHash);
  }

  return (
    <Container maxW="5xl" py={10}>
      <Head>
        <title>Create Cosmos App</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button>
      </Flex>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Create Cosmos App
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">Welcome to&nbsp;</Text>
          <Text
            as="span"
            color={useColorModeValue('primary.500', 'primary.200')}
          >
            CosmosKit + Next.js
          </Text>
        </Heading>
      </Box>
      <WalletSection />

      {/* our balances query text */}
      <p>Your token balace is: {balance} Tokens</p>
      
      {/* sending tokens input and buttons */}
      <Input placeholder='Address' value={recipient} onChange={handleRecipient} />
      <Input placeholder='Amount' value={amount} onChange={handleAmount} />
      <p>{txHash}</p>
      <Button onClick={handleSend}>Send!</Button>

      {/* the grid of links in boxes */}
      <Grid
        templateColumns={{
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        gap={8}
        mb={14}
      >
        {products.map((product) => (
          <Product key={product.title} {...product}></Product>
        ))}
      </Grid>
      <Grid templateColumns={{ md: '1fr 1fr' }} gap={8} mb={20}>
        {dependencies.map((dependency) => (
          <Dependency key={dependency.title} {...dependency}></Dependency>
        ))}
      </Grid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology
        </Link>
      </Stack>
    </Container>
  );
}
