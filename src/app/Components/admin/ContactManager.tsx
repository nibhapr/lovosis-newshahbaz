'use client';

import { useState, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'inProgress' | 'completed';
  createdAt: string;
}

export default function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setContacts(data);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: 'pending' | 'inProgress' | 'completed') => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update status');

      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status } : contact
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete contact');

      // Update local state
      setContacts(contacts.filter(contact => contact._id !== id));
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-gray-300">Loading...</div>;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div 
      className="p-6 bg-gray-900"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white shadow-lg">Contact Submissions</h2>
      
      {/* Total Count Display */}
      <div className="mb-4 text-gray-300 font-semibold">
        Total Contacts: {contacts.length}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact List */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-900 to-blue-700 p-2 rounded text-white">Recent Contacts</h3>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedContact?._id === contact._id
                    ? 'border-blue-500 bg-gray-700'
                    : 'border-gray-700 hover:border-blue-500 bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-100">{contact.name}</h4>
                    <p className="text-sm text-gray-400">{contact.subject}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contact.status === 'completed' ? 'bg-green-900/50 text-green-200' :
                      contact.status === 'inProgress' ? 'bg-yellow-900/50 text-yellow-200' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {contact.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact._id);
                      }}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <IoTrashOutline className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        {selectedContact && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-900 to-blue-700 p-2 rounded text-white">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Name</label>
                <p className="mt-1 text-gray-100">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Email</label>
                <p className="mt-1 text-gray-100">{selectedContact.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Phone</label>
                <p className="mt-1 text-gray-100">{selectedContact.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <p className="mt-1 text-gray-100">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Message</label>
                <p className="mt-1 whitespace-pre-wrap text-gray-100">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Status</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => updateContactStatus(selectedContact._id, e.target.value as 'pending' | 'inProgress' | 'completed')}
                  className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}