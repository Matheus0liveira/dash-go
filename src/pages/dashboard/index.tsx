import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import Header from 'components/Header';
import SideBar from 'components/Sidebar';
import { ApexOptions } from 'apexcharts';
import { useAuth } from 'contexts/AuthContext';
import { WithSSRAuth } from 'utils/wuthSSRAuth';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const optionsChart = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },

  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-06-01T00:00:00.000Z',
      '2021-06-02T00:00:00.000Z',
      '2021-06-03T00:00:00.000Z',
      '2021-06-04T00:00:00.000Z',
      '2021-06-05T00:00:00.000Z',
      '2021-06-06T00:00:00.000Z',
      '2021-06-07T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  colors: ['#6A32DB'],
} as ApexOptions;

const seriesChart = [
  {
    name: 'Serie1',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  console.log(user);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={['6', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            boxShadow="base"
          >
            <Text fontSize="lg" mb="4">
              Subscribers of the week
            </Text>

            <Chart
              options={optionsChart}
              series={seriesChart}
              type="area"
              height={160}
            />
          </Box>

          <Box
            p={['6', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            boxShadow="base"
          >
            <Text fontSize="lg" mb="4">
              Opening fee
            </Text>

            <Chart
              options={optionsChart}
              series={seriesChart}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = WithSSRAuth(async (ctx) => ({ props: {} }));
