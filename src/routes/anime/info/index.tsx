import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/info/')({
  component: () => <Navigate to='/anime'/>
})
