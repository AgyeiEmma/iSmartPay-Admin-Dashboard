import React, { useEffect, useState } from "react";
import { getAllRoles, createRole, Role } from "../services/roleService";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken") || "";
      const data = await getAllRoles(token);
      setRoles(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newName) return;
    setCreating(true);
    try {
      const token = localStorage.getItem("authToken") || "";
      await createRole({ name: newName, description: newDesc }, token);
      setNewName("");
      setNewDesc("");
      await loadRoles();
    } catch (err: any) {
      setError(err?.message || "Failed to create role");
    } finally {
      setCreating(false);
    }
  };

  const filtered = roles.filter((r) => {
    const s = search.trim().toLowerCase();
    if (!s) return true;
    return (
      (r.name || "").toLowerCase().includes(s) ||
      (r.description || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Role Management</h2>
          <p className="text-sm text-gray-600">Manage system roles</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" placeholder="Search roles..." />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Create Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Role</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateRole} className="space-y-3 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role Name</label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit" disabled={creating}>{creating ? 'Creating...' : 'Create'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-3">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Users</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="py-6 text-center text-gray-500">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={4} className="py-6 text-center text-gray-500">No roles found</td></tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="py-3 px-3">
                        <div className="font-medium">{r.name}</div>
                      </td>
                      <td className="py-3 px-3 text-sm text-gray-600">{r.description}</td>
                      <td className="py-3 px-3">
                        <Badge>{r.userCount ?? 0}</Badge>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { /* edit placeholder */ }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => { /* delete placeholder */ }}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
