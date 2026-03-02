// Schema de réponse lorsque l'on créer un job
interface data{
    job_id: string,
    message: string
}

export interface CreateJobAPIResponse{
    data : data,
    status: "success" | "error"
}