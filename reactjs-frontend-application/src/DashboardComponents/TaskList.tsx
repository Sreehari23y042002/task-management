import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "../components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem } from "../components/ui/dropdown-menu";
import { Checkbox } from "../components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  comments: Array<any>;
};



const TaskList = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { t }: { t: (key: keyof typeof import('../locales/en/translation.json')) => string } = useTranslation();
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: t('title'),
      cell: ({ row }) => row.getValue("title"),
    },
    {
      accessorKey: "description",
      header: t('description'),
      cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "status",
      header: t('status'),
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
      accessorKey: "assignedTo",
      header: t('assign'),
      cell: ({ row }) => row.getValue("assignedTo"),
    },
    {
      accessorKey: "assignedBy",
      header: t('assigned_by'),
      cell: ({ row }) => row.getValue("assignedBy"),
    },
    {
      id: "comments",
      header: t('comments'),
      cell: ({ row }) => (
        <div>
          {row.original.comments.length > 0 ? (
            row.original.comments.map((comment: any, index: number) => (
              <p key={index}>
                <strong>{comment.commentBy?.split("@")[0].replace(/\./g, " ")}</strong>: {comment.commentText}
              </p>
            ))
          ) : (
            <p>{t('no_comments')}</p>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  React.useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get('/api/alltasks');
        setTasks(response.data);
      } catch (err) {
        setError('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={t('filter_status')}
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('columns')} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;
