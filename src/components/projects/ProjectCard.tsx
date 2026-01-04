import { JobCard } from "../dashboard/JobCard";
import { useAuth } from "@/context/authContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";


export const ProjectCard = ({project}: {project:any})=>{
    const {user} = useAuth()
    const navigate = useNavigate()


     return (
    <JobCard
      id={project._id}
      title={project.title}
      company={project.client?.name || "Client"}
      budget={`$${project.budget}`}
      deadline="Open"
      bidsCount={project.bids?.length || 0}
      tags={[project.category]}
      status="open"
      onViewDetails={() => navigate(`/jobs/${project._id}`)}
      footer={
        user?.role === "freelancer" && (
          <Button size="sm">Place Bid</Button>
        )
      }
    />
  );
}