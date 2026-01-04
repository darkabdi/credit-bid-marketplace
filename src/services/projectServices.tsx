const API_URL = import.meta.env.VITE_API_URL;

type CreateProjectInput = {
  title: string;
  category: string;
  budget: number;
  description: string;
};

export const createProject = async (projectData: CreateProjectInput) => {
const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create project");
  }

  return data;
};
export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};