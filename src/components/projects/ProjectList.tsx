import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectServices";
import { ProjectCard } from "./ProjectCard";

export const ProjectList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};
