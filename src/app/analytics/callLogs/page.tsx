"use client"

import * as React from "react"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/sidebar/sidebar"
import PhoneSideBar from "@/components/sidebar/phoneSideBar"
import {
  Captions,
  ChevronLeft,
  ChevronRight,
  Copy,
  File,
  ListFilter,
  MoreVertical,
  Search,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sugar from 'sugar'



export default function Dashboard() {
  
    const [callLogs, setCallLogs] = React.useState<any[]>([]);
    const [selectedLog, setSelectedLog] = React.useState<any | null>(null);
    const [copySuccess, setCopySuccess] = React.useState('');

    const formatDate = (timestamp:any) => {
      const date = Sugar.Date.create(timestamp * 1000); // Assuming _seconds is a Unix timestamp

      return {date:date.toLocaleString().split(',')[0],time:date.toLocaleString().split(',')[1]}; // Adjust to the desired format
    };

    const calculateDuration = (start:any, end:any) => {
      const startDate = Sugar.Date.create(start);
      const endDate = Sugar.Date.create(end);
      const durationMillis = (endDate.getTime() - startDate.getTime())*1000;
    
      // Convert durationMillis to a readable format if needed, e.g., hours, minutes, seconds
      const seconds = Math.floor((durationMillis / 1000) % 60);
      const minutes = Math.floor((durationMillis / (1000 * 60)) % 60);
      const hours = Math.floor((durationMillis / (1000 * 60 * 60)) % 24);

      if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
      if (minutes > 0) return `${minutes}m ${seconds}s`;
      return `${seconds}s`;
    };
    
    const handleCopy = (text:any) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
      }).catch(() => {
        setCopySuccess('Failed to copy!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear the error message after 2 seconds
      });
    };

    function handleRowClick(log:any) {
      setSelectedLog(log);
    }
  
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await fetch("/api/firestore/collections/conversations",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            }
          });
          const data=await response.json();
          const current = data.current
          setCallLogs(current);
        } catch(error:any){
          console.log(error);
        }
      };
      fetchData();
    },[]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <Sidebar /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* <PhoneSideBar /> */}
          <Breadcrumb className=" md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Calls</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Call Logs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Analytics</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Call Analytics Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Check Call Analytics</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">1329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">5876</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={10} aria-label="10% increase" />
                </CardFooter>
              </Card>
            </div> */}
            {/* lg:w-[50rem] */}
            <Tabs defaultValue="week" className="">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        any
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Success
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Error
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              {/* <TabsContent value="month"> */}
              <TabsContent value="week">
              {/* <TabsContent value="year"> */}
                <Card x-chunk="dashboard-05-chunk-3" className="sm:col-span-3">
                  <CardHeader className="px-7 sm:col-span-2">
                    <CardTitle>Call Logs</CardTitle>
                    <CardDescription>
                      Recent call details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phone Number</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Start Time
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Duration
                          </TableHead>
                          <TableHead className="text-right">Agent Used</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {callLogs.map((log:any) => (
                          // <TableRow key={log.id} className={log.status === "Error" ? "bg-red-100" : "bg-green-100"}>
                          <TableRow key={log.id} className="" onClick={() => handleRowClick(log)}>
                            <TableCell>
                              <div className="font-medium">{log.caller?? '+918445979949'}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">{log.id}</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div className="font-medium">{formatDate(log.beginTimestamp._seconds).date}</div>
                              <div className="hidden text-center text-sm text-muted-foreground md:inline">
                                {formatDate(log.beginTimestamp._seconds).time}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {calculateDuration(log.beginTimestamp._seconds, log.endTimestamp._seconds)}
                            </TableCell>
                            <TableCell className="text-right">{log.agent}</TableCell>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          {selectedLog && (
          <Card
          className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
          > 
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    id: {selectedLog.id}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" onClick={() => handleCopy(selectedLog.id)}/>
                      <span className="sr-only">Copy Call ID</span>
                    </Button>
                    {copySuccess && <span className="ml-2 text-sm text-gray-500">{copySuccess}</span>}
                  </CardTitle>
                  <CardDescription>{selectedLog.phone}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Captions className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Check Transcript
                      </span>
                    </Button> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Call Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Customer Name <span></span>
                      </span>
                      <span>{selectedLog.name}</span>
                    </li>
                  </ul>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Start Time of Call</span>
                      <span>{formatDate(selectedLog.beginTimestamp._seconds).date} {formatDate(selectedLog.beginTimestamp._seconds).time}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Timezone</span>
                      <span>{selectedLog.timezone}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration of Call</span>
                      <span>{calculateDuration(selectedLog.beginTimestamp._seconds, selectedLog.endTimestamp._seconds)}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                  {/* insert a chat type UI,  */}
                  <ScrollArea className="h-96 chat-container space-y-2 p-2  rounded-lg">
                    {selectedLog.transactions.map((transaction: { query: any; response: any}, index: any) => (
                      <div key={index}>
                        <div className="chat-message customer-query  rounded p-2 text-left">
                          <strong>Customer:</strong> {transaction.query}
                        </div>
                        <div className="chat-message agent-response  rounded p-2 text-right">
                          <strong>Agent:</strong> {transaction.response}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Call end Reason</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Reason</dt>
                      <dd>Call Completed</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Agent</dt>
                      <dd>{selectedLog.agent}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">June 24, 2024</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Call</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Call</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>      )}

          </div>
        </main>
      </div>
    </div>
  )
}