import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPosts";
import getAllUsers from "@/lib/getuAllUsers";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata} from 'next';

type Params = {
    params: {
        userId: string,
    }
}
// generate dynamic metadata for each page
export async function generateMetadata({params: { userId } }: Params): Promise<Metadata> {
    const userData : Promise<User> = getUser(userId);
    const user: User = await userData

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}
export default async function UserPage( {params: { userId } }: Params ) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPost(userId);

    // const [user, userPosts ] = await Promise.all([userData, userPostsData]);
    const user = await userData

    return (
        <>
            <h2> {user.name}</h2>
            <br />
            {/* waits on the data arrival of posts data for a given user*/}
            <Suspense fallback={<h2>Loading Posts...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
            
        </>
    )
}

// generate static parameters 
// server generates the data with the param before it is requested 
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;
    
    return users.map(user => ({
        userId: user.id.toString()
    }))

}