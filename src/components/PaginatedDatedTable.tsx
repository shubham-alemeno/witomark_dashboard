/* eslint-disable prefer-const */
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';

interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: string;
  location: string;
  date: string;
}

interface PaginatedDataTableProps {
  data: LocationData[];
  itemsPerPage?: number;
}

const PaginatedDataTable = ({
  data,
  itemsPerPage = 5,
}: PaginatedDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ column: 'id', direction: 'asc' });
  const [selected, setSelected] = useState<number[]>([]);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const column = sort.column as keyof LocationData;
    if (a[column] < b[column]) return sort.direction === 'asc' ? -1 : 1;
    if (a[column] > b[column]) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Sorting handler
  const handleSort = (column: keyof LocationData) => {
    const isAsc = sort.column === column && sort.direction === 'asc';
    setSort({
      column,
      direction: isAsc ? 'desc' : 'asc',
    });
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selected.length === currentItems.length) {
      setSelected([]);
    } else {
      setSelected(currentItems.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get visible page numbers (show max 5 page numbers)
  const getVisiblePageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4 && totalPages > 5) {
      startPage = Math.max(1, endPage - 4);
    }

    return pageNumbers.slice(startPage - 1, endPage);
  };

  const visiblePages = getVisiblePageNumbers();

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="w-[40px] py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th
                  className="w-[80px] py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown size={16} className="ml-1" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location
                    <ArrowUpDown size={16} className="ml-1" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown size={16} className="ml-1" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center justify-end">
                    Date
                    <ArrowUpDown size={16} className="ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer"
                  onClick={() => toggleSelectRow(item.id)}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectRow(item.id);
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">#{item.id}</td>
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'genuine'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {selected.length} of {data.length} row(s) selected.
        </div>

        <div className="flex items-center justify-center space-x-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 min-w-[2.25rem] ${
                currentPage === page
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginatedDataTable;
