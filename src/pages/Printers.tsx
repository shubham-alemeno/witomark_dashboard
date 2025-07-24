import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock printer data matching the design
const printerData = [
  {
    id: '#abct23',
    name: 'Xerox Versa 1200',
    dateAdded: 'June 21, 2025, 1:11 p.m.',
    authModelNo: '28876',
  },
  {
    id: '#xyzt23',
    name: 'Indigo 1999',
    dateAdded: 'June 21, 2025, 1:11 p.m.',
    authModelNo: '56425',
  },
];

const Printers = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Printers Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">
                Printer ID
              </TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">
                Printer Name
              </TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">
                Date added
              </TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">
                Authentication model no
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {printerData.map((printer) => (
              <TableRow
                key={printer.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="py-4 px-6">
                  <span className="text-gray-900 font-medium">
                    {printer.id}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-gray-900">{printer.name}</span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-gray-600">{printer.dateAdded}</span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-gray-900">{printer.authModelNo}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Printers;
