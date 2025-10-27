// Role service helpers
const API_BASE = "http://18.116.165.182:5600/auth-service/api";
const ADMIN_API_BASE = `${API_BASE}/admin`;

export type Role = {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
  userCount?: number;
};

export async function getAllRoles(token: string): Promise<Role[]> {
  const res = await fetch(`${ADMIN_API_BASE}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(body?.message || "Failed to fetch roles");
  }
  const data = await safeJson(res);
  // normalize possible shapes
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.roles)) return data.roles;
  return data?.data || [];
}

export async function createRole(
  roleData: { name: string; description?: string },
  token: string
) {
  const res = await fetch(`${ADMIN_API_BASE}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roleData),
  });
  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(body?.message || "Failed to create role");
  }
  return safeJson(res);
}

export async function setAdminRole(adminId: string, roleId: string, token: string) {
  const res = await fetch(`${ADMIN_API_BASE}/admins/${adminId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roleId }),
  });
  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(body?.message || "Failed to set admin role");
  }
  return safeJson(res);
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
