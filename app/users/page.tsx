import React from 'react';
import type { Metadata } from 'next';
import getAllUsers from '@/lib/getuAllUsers';

export const metadata: Metadata = {
    title : 'Users',
}

export default async function UsersPage ()  {
    // const usersData: Promise<> = getAllUsers()
    return (
        <div>Users</div>
    )
}