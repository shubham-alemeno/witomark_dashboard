import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loader from "@/components/Loader";
import { useAxios } from "@/hooks/useAxios";
import { getPrinters } from "@/lib/api/methods";

const MyPrinters = () => {
  const { data, isLoading } = useAxios(getPrinters);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">Printer ID</TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">Printer Name</TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">Type</TableHead>
              <TableHead className="text-left font-medium text-gray-600 py-4 px-6">Date added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((printer) => (
                <TableRow key={printer.printer_id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="py-4 px-6 font-medium text-gray-900">{printer.printer_id}</TableCell>
                  <TableCell className="py-4 px-6 text-gray-900">{printer.printer_name}</TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                      {printer.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">
                    {new Date(printer.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No printers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyPrinters;
