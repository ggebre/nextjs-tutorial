import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
type Params = {
    params: {
        userId: string,
    }
}
export default async function User( {params: { userId } }: Params ) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPost(userId);

    // const [user, userPosts ] = await Promise.all([userData, userPostsData]);
    const user = await userData

    return (
        <>
            <h2> {user.name}</h2>
            <br />
            {/* waits on the data arrival of posts data */}
            <Suspense fallback={<h2>Loading Posts...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
            
        </>
    )
}