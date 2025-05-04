export interface Notification {
    id: number,
    owner_google_id: string,
    receiver_google_id: string,
    owner_name: string,
    receiver_name: string,
    type: number,
    endorsement_type: number | null,
    status: number,
    title: string,
    created_at: string;
}