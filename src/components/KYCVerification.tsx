import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Check,
  X,
  Eye,
  Clock,
  AlertCircle,
  FileText,
  Image,
  User,
} from "lucide-react";

// API Base URL
const API_BASE_URL = "http://18.116.165.182:5600/auth-service";

const mockKycApplications = [
  {
    id: "KYC001",
    userId: "USR001",
    userName: "Kwame Asante",
    email: "kwame.asante@email.com",
    submittedDate: "2024-10-05",
    status: "Pending Review",
    documentType: "Ghana Card",
    documents: {
      idFront: "/api/placeholder/400/250",
      idBack: "/api/placeholder/400/250",
      selfie: "/api/placeholder/300/300",
      proofOfAddress: "/api/placeholder/400/250",
    },
    personalInfo: {
      fullName: "Kwame Asante",
      dateOfBirth: "1995-03-15",
      idNumber: "GHA-123456789-0",
      address: "123 Liberation Road, Accra",
      occupation: "Software Developer",
    },
    reviewNotes: "",
  },
  {
    id: "KYC002",
    userId: "USR002",
    userName: "Ama Boateng",
    email: "ama.boateng@email.com",
    submittedDate: "2024-10-03",
    status: "Under Review",
    documentType: "Passport",
    documents: {
      idFront: "/api/placeholder/400/250",
      idBack: "/api/placeholder/400/250",
      selfie: "/api/placeholder/300/300",
      proofOfAddress: "/api/placeholder/400/250",
    },
    personalInfo: {
      fullName: "Ama Boateng",
      dateOfBirth: "1992-08-22",
      idNumber: "P-87654321",
      address: "456 Independence Ave, Kumasi",
      occupation: "Teacher",
    },
    reviewNotes: "Address document needs verification",
  },
  {
    id: "KYC003",
    userId: "USR003",
    userName: "Kofi Mensah",
    email: "kofi.mensah@email.com",
    submittedDate: "2024-09-28",
    status: "Rejected",
    documentType: "Ghana Card",
    documents: {
      idFront: "/api/placeholder/400/250",
      idBack: "/api/placeholder/400/250",
      selfie: "/api/placeholder/300/300",
      proofOfAddress: "/api/placeholder/400/250",
    },
    personalInfo: {
      fullName: "Kofi Mensah",
      dateOfBirth: "1988-12-10",
      idNumber: "GHA-987654321-5",
      address: "789 Castle Road, Cape Coast",
      occupation: "Trader",
    },
    reviewNotes: "Blurry ID document, selfie does not match ID",
  },
];

export function KYCVerification() {
  const [kycApplications, setKycApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch KYC applications on component mount
  useEffect(() => {
    fetchKYCApplications();
  }, []);

  const fetchKYCApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/auth/profile/kyc-docs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to fetch KYC applications"
        );
      }

      const data = await response.json();

      // Handle different response structures
      let kycData: any[] = [];
      if (Array.isArray(data)) {
        kycData = data;
      } else if (data.data && Array.isArray(data.data)) {
        kycData = data.data;
      } else if (data.applications && Array.isArray(data.applications)) {
        kycData = data.applications;
      }

      setKycApplications(kycData);
    } catch (err: any) {
      setError(err.message || "Failed to load KYC applications");
      console.error("Error fetching KYC applications:", err);
      // Fallback to empty array on error
      setKycApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return "bg-yellow-100 text-yellow-700";
      case "under review":
        return "bg-blue-100 text-blue-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return <Clock className="w-4 h-4" />;
      case "under review":
        return <Eye className="w-4 h-4" />;
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleApprove = (applicationId: string) => {
    console.log("Approving KYC application:", applicationId);
    // Implementation for approving KYC
  };

  const handleReject = (applicationId: string, notes: string) => {
    console.log("Rejecting KYC application:", applicationId, "Notes:", notes);
    // Implementation for rejecting KYC
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
          <p className="text-gray-600 mt-1">
            Review and verify customer identity documents
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">8</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">In Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">156</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </div>
      </div>

      {/* KYC Applications Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Application ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  User
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Document Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Submitted
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kycApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {application.userName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {application.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {application.documentType}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {application.submittedDate}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`${getStatusColor(
                        application.status
                      )} flex items-center space-x-1`}
                    >
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                            setReviewNotes(application.reviewNotes);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            KYC Review - {application.userName}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedApplication && (
                          <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="border rounded-lg p-4">
                              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Personal Information
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Full Name
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {selectedApplication.personalInfo.fullName}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Date of Birth
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {
                                      selectedApplication.personalInfo
                                        .dateOfBirth
                                    }
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    ID Number
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {selectedApplication.personalInfo.idNumber}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Occupation
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {
                                      selectedApplication.personalInfo
                                        .occupation
                                    }
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-600">
                                    Address
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {selectedApplication.personalInfo.address}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Document Review */}
                            <div className="border rounded-lg p-4">
                              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <FileText className="w-5 h-5 mr-2" />
                                Document Review
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-600">
                                    ID Front
                                  </label>
                                  <img
                                    src={selectedApplication.documents.idFront}
                                    alt="ID Front"
                                    className="w-full h-40 object-cover border rounded-lg"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-600">
                                    ID Back
                                  </label>
                                  <img
                                    src={selectedApplication.documents.idBack}
                                    alt="ID Back"
                                    className="w-full h-40 object-cover border rounded-lg"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-600">
                                    Selfie
                                  </label>
                                  <img
                                    src={selectedApplication.documents.selfie}
                                    alt="Selfie"
                                    className="w-full h-40 object-cover border rounded-lg"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-600">
                                    Proof of Address
                                  </label>
                                  <img
                                    src={
                                      selectedApplication.documents
                                        .proofOfAddress
                                    }
                                    alt="Proof of Address"
                                    className="w-full h-40 object-cover border rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Review Notes */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-600">
                                Review Notes
                              </label>
                              <Textarea
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                                placeholder="Add notes about the verification..."
                                rows={3}
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                              <Button
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() =>
                                  handleReject(
                                    selectedApplication.id,
                                    reviewNotes
                                  )
                                }
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject Application
                              </Button>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() =>
                                  handleApprove(selectedApplication.id)
                                }
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Approve Application
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
