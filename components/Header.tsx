import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 * 
 * @param children content for header
 * @param className additional class name if parents need any
 * 
 * cn function from utils combines these both classNames
 * 
 * @returns 
 */

const Header = ({ children, className} : HeaderProps) => {
  return (
    <header className={cn('header', className)}>
        <Link href='/' className='md:flex-1'>
            <Image
                src="/assets/icons/logo.svg"
                alt='Logo with name'
                width={120}
                height={32}
                className='hidden md:block'
            />
            <Image
                src="/assets/icons/logo-icon.svg"
                alt='Logo with name'
                width={32}
                height={32}
                className='block md:hidden'
            />
        </Link>
        {children}
    </header>
  );
}

export default Header;