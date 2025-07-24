import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiFunction<T> = (args?: any, page?: number, limit?: number) => Promise<T>;

export function useAxios<T>(fn: ApiFunction<T>, page = 1, limit = 10) {
    const navigate = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fn(page, limit);
            setData(response as T);
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message || "Something went wrong";
            setError(message);
            alert(message);

            if (err?.response?.status === 401 || err?.response?.status === 403) {
                navigate("/sign-in");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, isLoading, error, refetch: fetchData };
}
