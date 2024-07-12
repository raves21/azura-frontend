import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/')({
  component: () => <Home/>
})

function Home() {
  return (
    <div className='grid text-white bg-gray-900 h-dvh place-items-center'>anime</div>
  )
}