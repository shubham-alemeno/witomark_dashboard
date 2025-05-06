import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  ChevronRight,
  CircleDollarSign,
  CircleUser,
  CircleUserRound,
} from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import WorldMap from '@/components/WorldMap';
import PaginatedDataTable from '@/components/PaginatedDatedTable';

// const locationData = [
//   {
//     id: 1,
//     lat: 37.7749,
//     lng: -122.4194,
//     status: 'genuine',
//     location: 'San Francisco, CA',
//     date: '2025-04-28',
//   },
//   {
//     id: 2,
//     lat: 40.7128,
//     lng: -74.006,
//     status: 'genuine',
//     location: 'New York, NY',
//     date: '2025-04-29',
//   },
//   {
//     id: 3,
//     lat: 34.0522,
//     lng: -118.2437,
//     status: 'genuine',
//     location: 'Los Angeles, CA',
//     date: '2025-04-27',
//   },
//   {
//     id: 4,
//     lat: 51.5074,
//     lng: -0.1278,
//     status: 'tampered',
//     location: 'London, UK',
//     date: '2025-04-30',
//   },
//   {
//     id: 5,
//     lat: 48.8566,
//     lng: 2.3522,
//     status: 'genuine',
//     location: 'Paris, France',
//     date: '2025-04-25',
//   },
//   {
//     id: 6,
//     lat: 35.6762,
//     lng: 139.6503,
//     status: 'genuine',
//     location: 'Tokyo, Japan',
//     date: '2025-04-26',
//   },
//   {
//     id: 7,
//     lat: 22.3193,
//     lng: 114.1694,
//     status: 'tampered',
//     location: 'Hong Kong',
//     date: '2025-04-29',
//   },
//   {
//     id: 8,
//     lat: 1.3521,
//     lng: 103.8198,
//     status: 'genuine',
//     location: 'Singapore',
//     date: '2025-04-28',
//   },
//   {
//     id: 9,
//     lat: -33.8688,
//     lng: 151.2093,
//     status: 'genuine',
//     location: 'Sydney, Australia',
//     date: '2025-04-30',
//   },
//   {
//     id: 10,
//     lat: 19.4326,
//     lng: -99.1332,
//     status: 'tampered',
//     location: 'Mexico City, Mexico',
//     date: '2025-04-27',
//   },
//   {
//     id: 11,
//     lat: 55.7558,
//     lng: 37.6173,
//     status: 'genuine',
//     location: 'Moscow, Russia',
//     date: '2025-04-26',
//   },
//   {
//     id: 12,
//     lat: 25.2048,
//     lng: 55.2708,
//     status: 'genuine',
//     location: 'Dubai, UAE',
//     date: '2025-04-25',
//   },
//   {
//     id: 13,
//     lat: -34.6037,
//     lng: -58.3816,
//     status: 'genuine',
//     location: 'Buenos Aires, Argentina',
//     date: '2025-04-29',
//   },
//   {
//     id: 14,
//     lat: 41.9028,
//     lng: 12.4964,
//     status: 'genuine',
//     location: 'Rome, Italy',
//     date: '2025-04-28',
//   },
//   {
//     id: 15,
//     lat: 28.6139,
//     lng: 77.209,
//     status: 'tampered',
//     location: 'New Delhi, India',
//     date: '2025-04-30',
//   },
//   {
//     id: 16,
//     lat: 39.9042,
//     lng: 116.4074,
//     status: 'genuine',
//     location: 'Beijing, China',
//     date: '2025-04-27',
//   },
//   {
//     id: 17,
//     lat: -23.5505,
//     lng: -46.6333,
//     status: 'genuine',
//     location: 'São Paulo, Brazil',
//     date: '2025-04-26',
//   },
//   {
//     id: 18,
//     lat: 52.52,
//     lng: 13.405,
//     status: 'tampered',
//     location: 'Berlin, Germany',
//     date: '2025-04-25',
//   },
// ];

// Mock data
console.log('hi');
// const locationData = [
//   {
//     id: 1,
//     lat: 28.6139,
//     lng: 77.209,
//     status: 'genuine',
//     location: 'New Delhi, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 2,
//     lat: 19.076,
//     lng: 72.8777,
//     status: 'genuine',
//     location: 'Mumbai, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 3,
//     lat: 13.0827,
//     lng: 80.2707,
//     status: 'genuine',
//     location: 'Chennai, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 4,
//     lat: 12.9716,
//     lng: 77.5946,
//     status: 'tampered',
//     location: 'Bengaluru, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 5,
//     lat: 22.5726,
//     lng: 88.3639,
//     status: 'genuine',
//     location: 'Kolkata, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 6,
//     lat: 17.385,
//     lng: 78.4867,
//     status: 'genuine',
//     location: 'Hyderabad, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 7,
//     lat: 26.9124,
//     lng: 75.7873,
//     status: 'tampered',
//     location: 'Jaipur, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 8,
//     lat: 23.0225,
//     lng: 72.5714,
//     status: 'genuine',
//     location: 'Ahmedabad, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 9,
//     lat: 21.1702,
//     lng: 72.8311,
//     status: 'genuine',
//     location: 'Surat, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 10,
//     lat: 18.5204,
//     lng: 73.8567,
//     status: 'genuine',
//     location: 'Pune, India',
//     date: '2025-05-01',
//   },
// ];

const locationData = [
  {
    id: 1,
    lat: 10.0,
    lng: -10.0,
    status: 'genuine',
    location: 'Central America',
    date: '2025-05-01',
  },
  {
    id: 2,
    lat: 20.0,
    lng: -10.0,
    status: 'tampered',
    location: 'Caribbean',
    date: '2025-05-02',
  },
  {
    id: 3,
    lat: 30.0,
    lng: -40.0,
    status: 'genuine',
    location: 'West Africa',
    date: '2025-05-03',
  },
  {
    id: 4,
    lat: 50.0,
    lng: -20.0,
    status: 'tampered',
    location: 'Western Europe',
    date: '2025-05-04',
  },
];

// const locationData = [
//   {
//     id: 1,
//     lat: 28.6139,
//     lng: 77.209,
//     status: 'genuine',
//     location: 'New Delhi, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 2,
//     lat: 19.076,
//     lng: 72.8777,
//     status: 'genuine',
//     location: 'Mumbai, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 3,
//     lat: 13.0827,
//     lng: 80.2707,
//     status: 'genuine',
//     location: 'Chennai, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 4,
//     lat: 12.9716,
//     lng: 77.5946,
//     status: 'tampered',
//     location: 'Bengaluru, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 5,
//     lat: 22.5726,
//     lng: 88.3639,
//     status: 'genuine',
//     location: 'Kolkata, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 6,
//     lat: 17.385,
//     lng: 78.4867,
//     status: 'genuine',
//     location: 'Hyderabad, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 7,
//     lat: 26.9124,
//     lng: 75.7873,
//     status: 'tampered',
//     location: 'Jaipur, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 8,
//     lat: 23.0225,
//     lng: 72.5714,
//     status: 'genuine',
//     location: 'Ahmedabad, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 9,
//     lat: 21.1702,
//     lng: 72.8311,
//     status: 'genuine',
//     location: 'Surat, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 10,
//     lat: 18.5204,
//     lng: 73.8567,
//     status: 'tampered',
//     location: 'Pune, India',
//     date: '2025-05-01',
//   },
//   {
//     id: 10,
//     lat: 18.5204,
//     lng: 73.8567,
//     status: 'genuine',
//     location: 'Pune, India',
//     date: '2025-05-01',
//   },

//   {
//     id: 1,
//     lat: 43.65107,
//     lng: -79.347015,
//     status: 'genuine',
//     location: 'Toronto, ON',
//     date: '2025-05-01',
//   },
//   {
//     id: 2,
//     lat: 45.4215,
//     lng: -75.6998,
//     status: 'tampered',
//     location: 'Ottawa, ON',
//     date: '2025-05-02',
//   },
//   {
//     id: 3,
//     lat: 49.2827,
//     lng: -123.1207,
//     status: 'genuine',
//     location: 'Vancouver, BC',
//     date: '2025-05-03',
//   },
//   {
//     id: 4,
//     lat: 51.0447,
//     lng: -114.0719,
//     status: 'tampered',
//     location: 'Calgary, AB',
//     date: '2025-05-04',
//   },
//   {
//     id: 5,
//     lat: 46.8139,
//     lng: -71.2082,
//     status: 'genuine',
//     location: 'Quebec City, QC',
//     date: '2025-05-05',
//   },
//   {
//     id: 6,
//     lat: 53.5461,
//     lng: -113.4938,
//     status: 'genuine',
//     location: 'Edmonton, AB',
//     date: '2025-05-06',
//   },
// ];

const scanData = {
  genuine: 14563,
  tampered: 5,
};

const printers = [
  { id: 1, name: 'Printer1', model: 'Konica Minolta ABC (zW)' },
  { id: 2, name: 'Printer2', model: 'Konica Minolta XYZ (HH)' },
];

// Stats cards data
const statsCards = [
  {
    title: 'Total Scans',
    value: '14,568',
    change: '+20.1%',
    period: 'from last month',
    icon: <CircleUserRound className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: 'Genuine QR',
    value: '14,563',
    change: '+18.1%',
    period: 'from last month',
    icon: <CircleDollarSign className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: 'Tampered QR',
    value: '5',
    change: '+1.9%',
    period: 'from last month',
    icon: <CircleUser className="h-5 w-5 text-muted-foreground" />,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('scan-data');
  const [viewType, setViewType] = useState('heatmap');

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'heatmap' || hash === 'list-view') {
        setActiveTab('scan-data');
        setViewType(hash);
      } else if (hash === 'qr-generator') {
        setActiveTab('qr-generator');
      } else if (hash === 'printers') {
        setActiveTab('printers');
      } else if (hash === 'settings') {
        setActiveTab('settings');
      }
    };

    // Set initial state
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gray-100">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="text-xl font-semibold">
              {activeTab === 'scan-data' && 'Scan Data'}
              {activeTab === 'qr-generator' && 'QR Generator'}
              {activeTab === 'printers' && 'Printers'}
              {activeTab === 'settings' && 'Settings'}
            </div>
          </header>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {/* Scan Data Tab */}
            {activeTab === 'scan-data' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {statsCards.map((card, index) => (
                    <Card
                      key={index}
                      className="bg-card text-card-foreground overflow-hidden dark:border-gray-800"
                    >
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {card.title}
                          </CardTitle>
                          {card.icon}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{card.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-green-500">{card.change}</span>{' '}
                          {card.period}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">QR Scan Locations</div>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewType === 'heatmap' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setViewType('heatmap');
                        window.location.hash = 'heatmap';
                      }}
                    >
                      Map View
                    </Button>
                    <Button
                      variant={viewType === 'list-view' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setViewType('list-view');
                        window.location.hash = 'list-view';
                      }}
                    >
                      List View
                    </Button>
                  </div>
                </div>

                {viewType === 'list-view' ? (
                  // <Card>
                  //   <Table>
                  //     <TableHeader>
                  //       <TableRow>
                  //         <TableHead className="w-[100px]">ID</TableHead>
                  //         <TableHead>Location</TableHead>
                  //         <TableHead>Status</TableHead>
                  //         <TableHead className="text-right">Date</TableHead>
                  //       </TableRow>
                  //     </TableHeader>
                  //     <TableBody>
                  //       {locationData.map((item) => (
                  //         <TableRow key={item.id}>
                  //           <TableCell className="font-medium">
                  //             #{item.id}
                  //           </TableCell>
                  //           <TableCell>{item.location}</TableCell>
                  //           <TableCell>
                  //             <span
                  //               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  //                 item.status === 'genuine'
                  //                   ? 'bg-green-100 text-green-800'
                  //                   : 'bg-red-100 text-red-800'
                  //               }`}
                  //             >
                  //               {item.status}
                  //             </span>
                  //           </TableCell>
                  //           <TableCell className="text-right">
                  //             {item.date}
                  //           </TableCell>
                  //         </TableRow>
                  //       ))}
                  //     </TableBody>
                  //   </Table>
                  // </Card>
                  <PaginatedDataTable data={locationData} itemsPerPage={7} />
                ) : (
                  <div className="bg-gray-100 rounded-md shadow-sm">
                    <div className="h-96 relative" id="map-container">
                      <WorldMap locationData={locationData} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* QR Generator Tab */}
            {activeTab === 'qr-generator' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>QR Fingerprint Generator</CardTitle>
                    <CardDescription>
                      Generate new QR fingerprints for your products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-3 px-4 bg-gray-100 rounded-md shadow-sm w-full md:w-fit">
                      <div className="text-md font-semibold">
                        Total fingerprints generated: {scanData.genuine}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>QR Fingerprints</CardTitle>
                    <CardDescription>
                      List of all generated QR fingerprints
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground">
                      List view of all QR fingerprints
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Printers Tab */}
            {activeTab === 'printers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Printers</h2>
                  <Button size="sm">Add Printer</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {printers.map((printer) => (
                    <Card key={printer.id}>
                      <CardHeader>
                        <CardTitle>{printer.name}</CardTitle>
                        <CardDescription>{printer.model}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <span className="font-medium text-green-500">
                              Online
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              QRs Generated:
                            </span>
                            <span>1,250</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button size="sm">Configure</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Manage your application settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Collapsible className="w-full">
                        <div className="flex items-center justify-between space-x-4 px-4">
                          <h4 className="text-sm font-semibold">General</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="p-4">
                          <div className="text-sm">
                            General settings content would appear here
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      <Separator />
                      <Collapsible className="w-full">
                        <div className="flex items-center justify-between space-x-4 px-4">
                          <h4 className="text-sm font-semibold">Team</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="p-4">
                          <div className="text-sm">
                            Team settings content would appear here
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      <Separator />
                      <Collapsible className="w-full">
                        <div className="flex items-center justify-between space-x-4 px-4">
                          <h4 className="text-sm font-semibold">Billing</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="p-4">
                          <div className="text-sm">
                            Billing settings content would appear here
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Index;
