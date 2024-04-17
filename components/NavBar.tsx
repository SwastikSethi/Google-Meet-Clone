import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px6 py-4 lg:px:10 '>
      <Link href="/" className='flex items-center gap-4 px-3 mx-3'>
        <Image src='/icons/logo.svg' width={32} height={32} alt='Logo'
          className='max-sm:size-10' />
        <p className='text-[24px] font-extrabold text-white max-sm:hidden' >Meeting</p>
      </Link>

      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>

    </nav>
  )
}

export default NavBar