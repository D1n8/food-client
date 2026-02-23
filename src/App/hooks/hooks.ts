import { useState } from "react";

export function useFetching<T extends unknown[]>(callback: (...args: T) => Promise<void> | void) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const fetching = async (...args: T) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, isError] as const
}