export interface Project {
    id: number,
    portfolio_id: number,
    title: string,
    description: string,
    instruction: string,
    link: string,
    file: string,
    programming_language_id: [
        {
            id: number,
            name: string
        }
    ],
    project_visibility_status: number,
    created_at: string,
    updated_at: string
}