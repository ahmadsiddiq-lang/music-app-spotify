import { Album, Error, Home, Playing } from "@/pages";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getAuthToken } from "./utility/api";
import { setAxiosToken } from "./utility/axios";
import { LoadingPage } from "./components";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/playing",
    element: <Playing />,
  },
  {
    path: "/album/:id",
    element: <Album />,
  },
]);
export default function App() {
  const toas = useToast()
  const [status, setStatus] = useState<statusFetch>('idl')

  const fetchToken = useCallback(async () => {
    setStatus('fetching')
    try {
      const token = await getAuthToken()
      setAxiosToken(token.access_token)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      toas({
        position: 'top',
        title: 'Gagal terhubung',
        status: 'error',
      })
    }
  }, [toas])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])


  return (
    status == 'fetching' || status == 'idl' ? <LoadingPage /> : status == 'success' ? <RouterProvider router={router} /> : status == 'error' && <Error />
  )
}