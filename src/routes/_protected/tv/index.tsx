import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tv/')({
  component: () => <div>Hello /_protected/tv/!</div>
})