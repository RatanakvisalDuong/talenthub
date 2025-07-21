export interface Majors {
    id: number;
    name: string;
}

export const getMajorName = (majorId: number | null, majors: Majors[]): string => {
    if (majorId == null) {
        return "";
    }
    const major = majors.find((m) => m.id === majorId);
    return major?.name || "";
};

// export const getMajorName = (majorId: number | null): string => {
//     if (majorId == null) {
//         return "";
//     }

//     const major = majors.find((m) => m.id === majorId);
//     return major?.name || "";
// };