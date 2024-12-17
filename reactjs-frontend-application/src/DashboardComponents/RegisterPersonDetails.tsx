import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiCheckCircleFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import axiosInstance from "../utils/axiosInstance";


interface User {
  _id: number;
  name: string;
  roles: [string];
}

function RegisterPersonDetails() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { t }: { t: (key: keyof typeof import('../locales/en/translation.json')) => string } = useTranslation();

  const [userData, setUserData] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editCheck, setEditCheck] = useState<boolean>(false);

  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setEditCheck(true);
  };
  const isAdmin = Cookies.get('role') === 'ROLE_ADMIN'
  const fetchUserDetail = async () => {
    const accessToken = Cookies.get('accessToken');
    console.log('Access Token:', accessToken);

    try {
      const response = await axiosInstance.get('/api/allusers');
      setUserData(response.data.filter((data: any) => data.roles[0] !== 'admin'));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  console.log(userData, 'use');

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const handleSave = async (user: any) => {
    try {
      // const response = await fetch(`http://localhost:3001/api/updateUser/${editingUser._id}`, {
      //   method: "PUT",
      //   headers: headers,
      //   body: JSON.stringify(editingUser),
      // });
      const response = await axiosInstance.put(`/api/updateUsers/${editingUser._id}`, editingUser, {
      });


      setEditCheck(false);

      toast.success("Updated Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff",
          color: "#004164",
          fontSize: "12px",
        },
      });

      const result = await response.data();
      console.log("User updated successfully:", result);

      fetchUserDetail();
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId: any) => {
    const accessToken = Cookies.get('accessToken');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['x-access-token'] = accessToken;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/deleteUser/${userId._id}`, {
        method: "DELETE",
        headers: headers,
      });


      const result = await response.json();
      console.log("User deleted successfully:", result);

      toast.success("Deleted Successfully", {
        autoClose: 3000,
        style: {
          backgroundColor: "#fff",
          color: "#004164",
          fontSize: "12px",
        },
      });

      fetchUserDetail();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleRoleChange = (newRole: string) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        roles: [newRole], // Set the new role in the roles array
      });
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('name')}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("username")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('email')}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize ml-2">
          {editingUser?._id === row.original._id ? (
            <Select
              value={editingUser?.roles[0] || ''}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger className="p-2 my-2 border rounded bg-black dark:bg-black bg-white">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>

          ) : (
            row.original.roles[0]
          )}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original;
        return (
          <div className="flex gap-4">
            {editCheck ? (
              <PiCheckCircleFill
                className="text-green-400 dark:text-green-300 text-xl cursor-pointer"
                onClick={handleSave}
              />
            ) : (
              <FaEdit
                className="text-green-400 dark:text-green-300 text-xl cursor-pointer"
                onClick={() => handleEditClick(id)}
              />
            )}
            <MdOutlineDeleteForever
              className="text-red-400 text-xl cursor-pointer"
              onClick={() => handleDelete(id)}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: userData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) => table.getColumn("email")?.setFilterValue(event.target.value)}
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
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RegisterPersonDetails;
