import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPosts";
type Params = {
    params: {
        userId: string,
    }
}
export default async function User( {params: { userId } }: Params ) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPost(userId);

    const [user, userPosts ] = await Promise.all([userData, userPostsData]);

    return (
        <>
            <h2> {user.name}</h2>
            <br />
            {/* <UserPosts posts={userPosts} /> */}
            
        </>
    )
}