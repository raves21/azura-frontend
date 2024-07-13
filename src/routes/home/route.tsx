import { createFileRoute, Outlet } from '@tanstack/react-router'
import HomeHeader from './-HomeHeader'

export const Route = createFileRoute('/home')({
  component: () => <HomeLayout/>
})

function HomeLayout() {
  return (
    <div className='text-white font-montserrat'>
      <HomeHeader/>
      <Outlet/>
    </div>
  )
}