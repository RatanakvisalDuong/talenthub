export interface Skill {
    id: number,
    portfolio_id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string,
    endorsers: [
        {
            id: number,
            name: string,
        }
    ]
}