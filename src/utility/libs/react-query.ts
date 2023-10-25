import { useToast } from "@chakra-ui/react";
import { QueryClient, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if ((error as FetchError)?.code === 404) return false;
                if (failureCount < 1) return true;
                return false;
            },
        },
    },
});

export const useToastError = (query: UseQueryResult, message = "Terjadi kesalahan, silahkan coba kembali") => {
    const toast = useToast()

    useEffect(() => {
        if (query.error && (query.error as FetchError)?.code !== 404) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
            })
        }
    }, [message, query.error, toast]);
};
