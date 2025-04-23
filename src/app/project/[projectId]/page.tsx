import ProjectPage from "./projectpage-component";
import axios from "axios";

export default async function ProjectPageContainer() {

    const { data: projectData } = await axios.get(
        "https://talenthub.newlinkmarketing.com/api/view_project_detail/12",
    );
    return <ProjectPage projectData={projectData} />;
}
