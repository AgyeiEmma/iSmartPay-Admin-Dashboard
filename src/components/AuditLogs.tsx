<<<<<<< HEAD
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Search,
  Filter,
  Download,
  Eye,
=======
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
  Calendar as CalendarIcon,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Settings,
  DollarSign,
  FileText,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Database,
<<<<<<< HEAD
  Activity,
} from "lucide-react";
import { format } from "date-fns";

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
=======
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89

  // Mock audit logs data
  const auditLogs = [
    {
<<<<<<< HEAD
      id: "audit-001",
      timestamp: "2024-01-15T14:23:45Z",
      user: "john.doe@ismartpay.com",
      userId: "user-001",
      action: "settlement_approved",
      category: "financial",
      resource: "STL-2024-002",
      details: "Approved settlement batch for ₵1,449,505.30",
      ipAddress: "192.168.1.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      deviceInfo: "Windows Desktop",
      status: "success",
      riskScore: 15,
      oldValue: null,
      newValue: "approved",
      checksum: "a7b3c2d4e5f6g7h8",
    },
    {
      id: "audit-002",
      timestamp: "2024-01-15T13:45:12Z",
      user: "jane.smith@ismartpay.com",
      userId: "user-002",
      action: "settlement_hold",
      category: "financial",
      resource: "STL-2024-001",
      details: "Applied hold on settlement batch due to high risk score",
      ipAddress: "192.168.1.67",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      deviceInfo: "MacOS Desktop",
      status: "success",
      riskScore: 85,
      oldValue: "pending_approval",
      newValue: "hold",
      checksum: "d4e5f6g7h8i9j0k1",
    },
    {
      id: "audit-003",
      timestamp: "2024-01-15T12:30:22Z",
      user: "mike.johnson@ismartpay.com",
      userId: "user-003",
      action: "kyc_approved",
      category: "compliance",
      resource: "KYC-2024-0156",
      details: "Approved KYC application after document verification",
      ipAddress: "192.168.1.23",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      deviceInfo: "iOS Mobile",
      status: "success",
      riskScore: 25,
      oldValue: "pending_review",
      newValue: "approved",
      checksum: "g7h8i9j0k1l2m3n4",
    },
    {
      id: "audit-004",
      timestamp: "2024-01-15T11:15:30Z",
      user: "admin@ismartpay.com",
      userId: "user-004",
      action: "user_role_changed",
      category: "admin",
      resource: "user-005",
      details: "Changed user role from Support Agent to Compliance Officer",
      ipAddress: "192.168.1.10",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      deviceInfo: "Linux Desktop",
      status: "success",
      riskScore: 45,
      oldValue: "Support Agent",
      newValue: "Compliance Officer",
      checksum: "j0k1l2m3n4o5p6q7",
    },
    {
      id: "audit-005",
      timestamp: "2024-01-15T10:45:18Z",
      user: "system@ismartpay.com",
      userId: "system",
      action: "auto_reconciliation",
      category: "system",
      resource: "RECON-2024-0034",
      details: "Automated reconciliation processed 247 transactions",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0 (Automated Process)",
      deviceInfo: "System Process",
      status: "success",
      riskScore: 5,
      oldValue: "unmatched",
      newValue: "matched",
      checksum: "m3n4o5p6q7r8s9t0",
    },
    {
      id: "audit-006",
      timestamp: "2024-01-15T09:22:41Z",
      user: "sarah.wilson@ismartpay.com",
      userId: "user-006",
      action: "login_failed",
      category: "security",
      resource: "user-006",
      details: "Failed login attempt - incorrect password",
      ipAddress: "203.45.67.89",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      deviceInfo: "Windows Desktop",
      status: "failed",
      riskScore: 75,
      oldValue: null,
      newValue: null,
      checksum: "p6q7r8s9t0u1v2w3",
    },
    {
      id: "audit-007",
      timestamp: "2024-01-15T08:10:15Z",
      user: "treasury@ismartpay.com",
      userId: "user-007",
      action: "batch_settlement_created",
      category: "financial",
      resource: "STL-2024-003",
      details: "Created new settlement batch for morning processing",
      ipAddress: "192.168.1.78",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      deviceInfo: "Windows Desktop",
      status: "success",
      riskScore: 20,
      oldValue: null,
      newValue: "created",
      checksum: "s9t0u1v2w3x4y5z6",
    },
  ];

  const getActionIcon = (action: string) => {
    if (action.includes("settlement"))
      return <DollarSign className="w-4 h-4" />;
    if (action.includes("kyc")) return <Shield className="w-4 h-4" />;
    if (action.includes("user") || action.includes("login"))
      return <User className="w-4 h-4" />;
    if (action.includes("role")) return <Settings className="w-4 h-4" />;
    if (action.includes("reconciliation"))
      return <Database className="w-4 h-4" />;
=======
      id: 'audit-001',
      timestamp: '2024-01-15T14:23:45Z',
      user: 'john.doe@ismartpay.com',
      userId: 'user-001',
      action: 'settlement_approved',
      category: 'financial',
      resource: 'STL-2024-002',
      details: 'Approved settlement batch for ₵1,449,505.30',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      deviceInfo: 'Windows Desktop',
      status: 'success',
      riskScore: 15,
      oldValue: null,
      newValue: 'approved',
      checksum: 'a7b3c2d4e5f6g7h8'
    },
    {
      id: 'audit-002',
      timestamp: '2024-01-15T13:45:12Z',
      user: 'jane.smith@ismartpay.com',
      userId: 'user-002',
      action: 'settlement_hold',
      category: 'financial',
      resource: 'STL-2024-001',
      details: 'Applied hold on settlement batch due to high risk score',
      ipAddress: '192.168.1.67',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      deviceInfo: 'MacOS Desktop',
      status: 'success',
      riskScore: 85,
      oldValue: 'pending_approval',
      newValue: 'hold',
      checksum: 'd4e5f6g7h8i9j0k1'
    },
    {
      id: 'audit-003',
      timestamp: '2024-01-15T12:30:22Z',
      user: 'mike.johnson@ismartpay.com',
      userId: 'user-003',
      action: 'kyc_approved',
      category: 'compliance',
      resource: 'KYC-2024-0156',
      details: 'Approved KYC application after document verification',
      ipAddress: '192.168.1.23',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      deviceInfo: 'iOS Mobile',
      status: 'success',
      riskScore: 25,
      oldValue: 'pending_review',
      newValue: 'approved',
      checksum: 'g7h8i9j0k1l2m3n4'
    },
    {
      id: 'audit-004',
      timestamp: '2024-01-15T11:15:30Z',
      user: 'admin@ismartpay.com',
      userId: 'user-004',
      action: 'user_role_changed',
      category: 'admin',
      resource: 'user-005',
      details: 'Changed user role from Support Agent to Compliance Officer',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      deviceInfo: 'Linux Desktop',
      status: 'success',
      riskScore: 45,
      oldValue: 'Support Agent',
      newValue: 'Compliance Officer',
      checksum: 'j0k1l2m3n4o5p6q7'
    },
    {
      id: 'audit-005',
      timestamp: '2024-01-15T10:45:18Z',
      user: 'system@ismartpay.com',
      userId: 'system',
      action: 'auto_reconciliation',
      category: 'system',
      resource: 'RECON-2024-0034',
      details: 'Automated reconciliation processed 247 transactions',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0 (Automated Process)',
      deviceInfo: 'System Process',
      status: 'success',
      riskScore: 5,
      oldValue: 'unmatched',
      newValue: 'matched',
      checksum: 'm3n4o5p6q7r8s9t0'
    },
    {
      id: 'audit-006',
      timestamp: '2024-01-15T09:22:41Z',
      user: 'sarah.wilson@ismartpay.com',
      userId: 'user-006',
      action: 'login_failed',
      category: 'security',
      resource: 'user-006',
      details: 'Failed login attempt - incorrect password',
      ipAddress: '203.45.67.89',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      deviceInfo: 'Windows Desktop',
      status: 'failed',
      riskScore: 75,
      oldValue: null,
      newValue: null,
      checksum: 'p6q7r8s9t0u1v2w3'
    },
    {
      id: 'audit-007',
      timestamp: '2024-01-15T08:10:15Z',
      user: 'treasury@ismartpay.com',
      userId: 'user-007',
      action: 'batch_settlement_created',
      category: 'financial',
      resource: 'STL-2024-003',
      details: 'Created new settlement batch for morning processing',
      ipAddress: '192.168.1.78',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      deviceInfo: 'Windows Desktop',
      status: 'success',
      riskScore: 20,
      oldValue: null,
      newValue: 'created',
      checksum: 's9t0u1v2w3x4y5z6'
    }
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('settlement')) return <DollarSign className="w-4 h-4" />;
    if (action.includes('kyc')) return <Shield className="w-4 h-4" />;
    if (action.includes('user') || action.includes('login')) return <User className="w-4 h-4" />;
    if (action.includes('role')) return <Settings className="w-4 h-4" />;
    if (action.includes('reconciliation')) return <Database className="w-4 h-4" />;
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
    return <Activity className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
<<<<<<< HEAD
      case "success":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        );
=======
      case 'success':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
<<<<<<< HEAD
    const colors: Record<string, string> = {
      financial: "bg-blue-100 text-blue-800",
      compliance: "bg-green-100 text-green-800",
      admin: "bg-purple-100 text-purple-800",
      security: "bg-red-100 text-red-800",
      system: "bg-gray-100 text-gray-800",
=======
    const colors = {
      financial: 'bg-blue-100 text-blue-800',
      compliance: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      security: 'bg-red-100 text-red-800',
      system: 'bg-gray-100 text-gray-800'
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
    };
    return (
      <Badge variant="outline" className={colors[category] || colors.system}>
        {category}
      </Badge>
    );
  };

  const getRiskBadge = (score: number) => {
    if (score >= 70) return <Badge variant="destructive">High Risk</Badge>;
<<<<<<< HEAD
    if (score >= 40)
      return (
        <Badge variant="secondary" className="bg-yellow-500">
          Medium Risk
        </Badge>
      );
    return (
      <Badge variant="default" className="bg-green-500">
        Low Risk
      </Badge>
    );
  };

  const getDeviceIcon = (deviceInfo: string) => {
    if (
      deviceInfo.includes("Mobile") ||
      deviceInfo.includes("iOS") ||
      deviceInfo.includes("Android")
    ) {
=======
    if (score >= 40) return <Badge variant="secondary" className="bg-yellow-500">Medium Risk</Badge>;
    return <Badge variant="default" className="bg-green-500">Low Risk</Badge>;
  };

  const getDeviceIcon = (deviceInfo: string) => {
    if (deviceInfo.includes('Mobile') || deviceInfo.includes('iOS') || deviceInfo.includes('Android')) {
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

<<<<<<< HEAD
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction =
      actionFilter === "all" || log.category === actionFilter;
    const matchesUser = userFilter === "all" || log.userId === userFilter;
=======
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.category === actionFilter;
    const matchesUser = userFilter === 'all' || log.userId === userFilter;
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
    return matchesSearch && matchesAction && matchesUser;
  });

  // Statistics
  const totalLogs = auditLogs.length;
<<<<<<< HEAD
  const successfulActions = auditLogs.filter(
    (log) => log.status === "success"
  ).length;
  const failedActions = auditLogs.filter(
    (log) => log.status === "failed"
  ).length;
  const highRiskActions = auditLogs.filter((log) => log.riskScore >= 70).length;
=======
  const successfulActions = auditLogs.filter(log => log.status === 'success').length;
  const failedActions = auditLogs.filter(log => log.status === 'failed').length;
  const highRiskActions = auditLogs.filter(log => log.riskScore >= 70).length;
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
<<<<<<< HEAD
          <p className="text-gray-600">
            Tamper-evident trail of all system activities
          </p>
=======
          <p className="text-gray-600">Tamper-evident trail of all system activities</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
        </div>
        <div className="flex items-center space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
<<<<<<< HEAD
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
=======
                <p className="text-sm font-medium text-gray-600">Total Events</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                <p className="text-2xl font-bold text-blue-600">{totalLogs}</p>
                <p className="text-xs text-gray-500">Last 24 hours</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
<<<<<<< HEAD
                <p className="text-2xl font-bold text-green-600">
                  {successfulActions}
                </p>
                <p className="text-xs text-gray-500">
                  {Math.round((successfulActions / totalLogs) * 100)}% success
                  rate
                </p>
=======
                <p className="text-2xl font-bold text-green-600">{successfulActions}</p>
                <p className="text-xs text-gray-500">{Math.round((successfulActions / totalLogs) * 100)}% success rate</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
<<<<<<< HEAD
                <p className="text-sm font-medium text-gray-600">
                  Failed Actions
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {failedActions}
                </p>
=======
                <p className="text-sm font-medium text-gray-600">Failed Actions</p>
                <p className="text-2xl font-bold text-red-600">{failedActions}</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                <p className="text-xs text-gray-500">Requires attention</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
<<<<<<< HEAD
                <p className="text-2xl font-bold text-orange-600">
                  {highRiskActions}
                </p>
=======
                <p className="text-2xl font-bold text-orange-600">{highRiskActions}</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                <p className="text-xs text-gray-500">Risk score ≥ 70</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="integrity">Data Integrity</TabsTrigger>
          <TabsTrigger value="reports">Audit Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Activity Logs</CardTitle>
<<<<<<< HEAD
              <CardDescription>
                Comprehensive log of all user and system actions
              </CardDescription>
=======
              <CardDescription>Comprehensive log of all user and system actions</CardDescription>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search Logs</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by user, action, resource, or details..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="action">Action Category</Label>
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="user">User Filter</Label>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="user-001">John Doe</SelectItem>
                      <SelectItem value="user-002">Jane Smith</SelectItem>
                      <SelectItem value="user-003">Mike Johnson</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Logs Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">
<<<<<<< HEAD
                                {format(
                                  new Date(log.timestamp),
                                  "MMM dd, HH:mm:ss"
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {format(new Date(log.timestamp), "yyyy")}
=======
                                {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                              </p>
                              <p className="text-xs text-gray-500">
                                {format(new Date(log.timestamp), 'yyyy')}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
<<<<<<< HEAD
                              {log.user === "system@ismartpay.com"
                                ? "System"
                                : log.user.split("@")[0]}
=======
                              {log.user === 'system@ismartpay.com' ? 'System' : log.user.split('@')[0]}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{log.ipAddress}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getActionIcon(log.action)}
                            <div>
                              <p className="font-medium text-sm">
<<<<<<< HEAD
                                {log.action.replace("_", " ").toUpperCase()}
=======
                                {log.action.replace('_', ' ').toUpperCase()}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                              </p>
                              {getCategoryBadge(log.category)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {log.resource}
                            </code>
                            <p className="text-xs text-gray-500 mt-1 max-w-48 truncate">
                              {log.details}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{log.riskScore}</span>
                            {getRiskBadge(log.riskScore)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getDeviceIcon(log.deviceInfo)}
                            <span className="text-sm">{log.deviceInfo}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Audit Log Details</DialogTitle>
                                <DialogDescription>
                                  Complete audit trail information
                                </DialogDescription>
                              </DialogHeader>
                              <LogDetailsModal log={log} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
<<<<<<< HEAD
              <CardDescription>
                Authentication failures, suspicious activities, and security
                alerts
              </CardDescription>
=======
              <CardDescription>Authentication failures, suspicious activities, and security alerts</CardDescription>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs
<<<<<<< HEAD
                  .filter(
                    (log) =>
                      log.category === "security" ||
                      log.action.includes("login") ||
                      log.riskScore >= 70
                  )
                  .map((log) => (
                    <div
                      key={log.id}
                      className={`border rounded-lg p-4 ${
                        log.status === "failed"
                          ? "border-red-200 bg-red-50"
                          : log.riskScore >= 70
                          ? "border-orange-200 bg-orange-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              log.status === "failed"
                                ? "bg-red-100"
                                : log.riskScore >= 70
                                ? "bg-orange-100"
                                : "bg-blue-100"
                            }`}
                          >
                            {log.status === "failed" ? (
                              <XCircle className="w-5 h-5 text-red-600" />
                            ) : log.riskScore >= 70 ? (
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                            ) : (
                              <Shield className="w-5 h-5 text-blue-600" />
                            )}
=======
                  .filter(log => log.category === 'security' || log.action.includes('login') || log.riskScore >= 70)
                  .map((log) => (
                    <div key={log.id} className={`border rounded-lg p-4 ${
                      log.status === 'failed' ? 'border-red-200 bg-red-50' : 
                      log.riskScore >= 70 ? 'border-orange-200 bg-orange-50' : 
                      'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            log.status === 'failed' ? 'bg-red-100' : 
                            log.riskScore >= 70 ? 'bg-orange-100' : 
                            'bg-blue-100'
                          }`}>
                            {log.status === 'failed' ? <XCircle className="w-5 h-5 text-red-600" /> :
                             log.riskScore >= 70 ? <AlertTriangle className="w-5 h-5 text-orange-600" /> :
                             <Shield className="w-5 h-5 text-blue-600" />}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                          </div>
                          <div>
                            <p className="font-medium">{log.details}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{log.user}</span>
                              <span>{log.ipAddress}</span>
<<<<<<< HEAD
                              <span>
                                {format(
                                  new Date(log.timestamp),
                                  "MMM dd, HH:mm:ss"
                                )}
                              </span>
=======
                              <span>{format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}</span>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getRiskBadge(log.riskScore)}
                          {getStatusBadge(log.status)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Integrity Verification</CardTitle>
<<<<<<< HEAD
              <CardDescription>
                Cryptographic checksums and tamper detection
              </CardDescription>
=======
              <CardDescription>Cryptographic checksums and tamper detection</CardDescription>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
<<<<<<< HEAD
                    <h4 className="font-medium text-green-900 mb-2">
                      Verified Entries
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      {auditLogs.filter((log) => log.checksum).length}
                    </p>
                    <p className="text-sm text-green-700">
                      All checksums valid
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Total Checksums
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {auditLogs.length}
                    </p>
                    <p className="text-sm text-blue-700">100% coverage</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Last Verification
                    </h4>
                    <p className="text-2xl font-bold text-gray-600">Now</p>
                    <p className="text-sm text-gray-700">
                      Continuous monitoring
                    </p>
=======
                    <h4 className="font-medium text-green-900 mb-2">Verified Entries</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {auditLogs.filter(log => log.checksum).length}
                    </p>
                    <p className="text-sm text-green-700">All checksums valid</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Total Checksums</h4>
                    <p className="text-2xl font-bold text-blue-600">{auditLogs.length}</p>
                    <p className="text-sm text-blue-700">100% coverage</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Last Verification</h4>
                    <p className="text-2xl font-bold text-gray-600">Now</p>
                    <p className="text-sm text-gray-700">Continuous monitoring</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Log Entry</TableHead>
                        <TableHead>Checksum</TableHead>
                        <TableHead>Verification Status</TableHead>
                        <TableHead>Chain Position</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.slice(0, 10).map((log, index) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{log.id}</p>
<<<<<<< HEAD
                              <p className="text-xs text-gray-500">
                                {log.action}
                              </p>
=======
                              <p className="text-xs text-gray-500">{log.action}</p>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {log.checksum}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </TableCell>
                          <TableCell>
<<<<<<< HEAD
                            <span className="text-sm font-medium">
                              #{index + 1}
                            </span>
=======
                            <span className="text-sm font-medium">#{index + 1}</span>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
<<<<<<< HEAD
              <CardDescription>
                Generate compliance and regulatory audit reports
              </CardDescription>
=======
              <CardDescription>Generate compliance and regulatory audit reports</CardDescription>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
<<<<<<< HEAD
                  <h4 className="font-medium mb-3">
                    Regulatory Compliance Report
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Generate comprehensive audit trail for regulatory
                    submissions
=======
                  <h4 className="font-medium mb-3">Regulatory Compliance Report</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Generate comprehensive audit trail for regulatory submissions
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label>Report Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last7days">Last 7 days</SelectItem>
<<<<<<< HEAD
                          <SelectItem value="last30days">
                            Last 30 days
                          </SelectItem>
                          <SelectItem value="lastquarter">
                            Last quarter
                          </SelectItem>
=======
                          <SelectItem value="last30days">Last 30 days</SelectItem>
                          <SelectItem value="lastquarter">Last quarter</SelectItem>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                          <SelectItem value="lastyear">Last year</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Report Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Report</SelectItem>
<<<<<<< HEAD
                          <SelectItem value="excel">
                            Excel Spreadsheet
                          </SelectItem>
=======
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                          <SelectItem value="csv">CSV Export</SelectItem>
                          <SelectItem value="json">JSON Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Security Incident Report</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed analysis of security events and anomalies
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label>Incident Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Incidents</SelectItem>
<<<<<<< HEAD
                          <SelectItem value="failed_logins">
                            Failed Logins
                          </SelectItem>
                          <SelectItem value="high_risk">
                            High Risk Actions
                          </SelectItem>
                          <SelectItem value="anomalies">
                            Behavioral Anomalies
                          </SelectItem>
=======
                          <SelectItem value="failed_logins">Failed Logins</SelectItem>
                          <SelectItem value="high_risk">High Risk Actions</SelectItem>
                          <SelectItem value="anomalies">Behavioral Anomalies</SelectItem>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Risk Threshold</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Risk Levels</SelectItem>
                          <SelectItem value="high">High Risk (≥70)</SelectItem>
<<<<<<< HEAD
                          <SelectItem value="medium">
                            Medium Risk (40-69)
                          </SelectItem>
                          <SelectItem value="low">Low Risk (&lt;40)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" variant="outline">
                      Generate Report
                    </Button>
=======
                          <SelectItem value="medium">Medium Risk (40-69)</SelectItem>
                          <SelectItem value="low">Low Risk (<40)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" variant="outline">Generate Report</Button>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Recent Audit Reports</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Q4 2024 Compliance Report</TableCell>
<<<<<<< HEAD
                        <TableCell>
                          <Badge variant="outline">Regulatory</Badge>
                        </TableCell>
=======
                        <TableCell><Badge variant="outline">Regulatory</Badge></TableCell>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                        <TableCell>2024-01-15 09:30</TableCell>
                        <TableCell>Oct-Dec 2024</TableCell>
                        <TableCell>2.4 MB</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Security Incidents - January</TableCell>
<<<<<<< HEAD
                        <TableCell>
                          <Badge variant="outline">Security</Badge>
                        </TableCell>
=======
                        <TableCell><Badge variant="outline">Security</Badge></TableCell>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
                        <TableCell>2024-01-14 16:45</TableCell>
                        <TableCell>Jan 1-14, 2024</TableCell>
                        <TableCell>876 KB</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LogDetailsModal({ log }: { log: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Event Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Event ID:</span>
<<<<<<< HEAD
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {log.id}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Timestamp:</span>
              <span className="font-medium">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Action:</span>
              <span className="font-medium">
                {log.action.replace("_", " ").toUpperCase()}
              </span>
=======
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.id}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Timestamp:</span>
              <span className="font-medium">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Action:</span>
              <span className="font-medium">{log.action.replace('_', ' ').toUpperCase()}</span>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{log.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resource:</span>
<<<<<<< HEAD
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {log.resource}
              </code>
=======
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.resource}</code>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">{log.status}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">User & Security</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">User:</span>
              <span className="font-medium">{log.user}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">User ID:</span>
<<<<<<< HEAD
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {log.userId}
              </code>
=======
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.userId}</code>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IP Address:</span>
              <span className="font-medium">{log.ipAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Device:</span>
              <span className="font-medium">{log.deviceInfo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Score:</span>
              <span className="font-medium">{log.riskScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Checksum:</span>
<<<<<<< HEAD
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {log.checksum}
              </code>
=======
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.checksum}</code>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Event Details</h4>
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p>{log.details}</p>
        </div>
      </div>

      {(log.oldValue || log.newValue) && (
        <div>
          <h4 className="font-medium mb-3">Data Changes</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Previous Value</Label>
              <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
<<<<<<< HEAD
                <code>{log.oldValue || "null"}</code>
=======
                <code>{log.oldValue || 'null'}</code>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
              </div>
            </div>
            <div>
              <Label>New Value</Label>
              <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
<<<<<<< HEAD
                <code>{log.newValue || "null"}</code>
=======
                <code>{log.newValue || 'null'}</code>
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium mb-3">Technical Details</h4>
        <div className="bg-gray-50 rounded-lg p-4 text-xs">
          <pre className="whitespace-pre-wrap overflow-x-auto">
<<<<<<< HEAD
            {`User-Agent: ${log.userAgent}
=======
{`User-Agent: ${log.userAgent}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
IP Address: ${log.ipAddress}
Device Info: ${log.deviceInfo}
Checksum: ${log.checksum}
Risk Score: ${log.riskScore}/100`}
          </pre>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89
