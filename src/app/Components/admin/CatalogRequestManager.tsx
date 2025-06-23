"use client";

import { useState, useEffect } from 'react';

interface CatalogRequest {
  _id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productName: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export default function CatalogRequestManager() {
  const [requests, setRequests] = useState<CatalogRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<CatalogRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/catalog-requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching catalog requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'pending' | 'sent' | 'failed') => {
    try {
      const response = await fetch(`/api/catalog-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const updatedRequests = requests.map(req =>
          req._id === id ? { ...req, status } : req
        );
        setRequests(updatedRequests);

        if (selectedRequest && selectedRequest._id === id) {
          setSelectedRequest({
            ...selectedRequest,
            status
          });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="text-gray-300">Loading...</div>;

  return (
    <div
      className="p-6 bg-gray-900 min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white shadow-lg">Catalog Requests</h2>

      {/* Total Count Display */}
      <div className="mb-4 text-gray-300 font-semibold">
        Total Requests: {requests.length}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-100 bg-gradient-to-r from-blue-900 to-blue-700 p-2 rounded">Recent Requests</h3>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                onClick={() => setSelectedRequest(request)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRequest?._id === request._id
                    ? 'border-blue-500 bg-gray-700'
                    : 'border-gray-700 hover:border-blue-500 bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-100">{request.fullName}</h4>
                    <p className="text-sm text-gray-400">{request.companyName}</p>
                    <p className="text-sm text-gray-500">{request.productName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    request.status === 'sent' ? 'bg-green-900/50 text-green-200' :
                    request.status === 'failed' ? 'bg-red-900/50 text-red-200' :
                    'bg-yellow-900/50 text-yellow-200'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRequest && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-100 bg-gradient-to-r from-blue-900 to-blue-700 p-2 rounded">Request Details</h3>
            <div className="space-y-4">
              <DetailField label="Full Name" value={selectedRequest.fullName} />
              <DetailField label="Company" value={selectedRequest.companyName} />
              <DetailField label="Email" value={selectedRequest.email} />
              <DetailField label="Phone" value={selectedRequest.phone} />
              <DetailField label="Product" value={selectedRequest.productName} />
              <div>
                <label className="text-sm font-medium text-gray-300">Status</label>
                <select
                  value={selectedRequest.status}
                  onChange={(e) => updateStatus(selectedRequest._id, e.target.value as 'pending' | 'sent' | 'failed')}
                  className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="sent">Sent</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <p className="mt-1 text-gray-100">{value}</p>
    </div>
  );
}