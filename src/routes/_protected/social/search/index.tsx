import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/social/search/')({
  component: () => <div>Hello /_protected/social/search/!</div>
})