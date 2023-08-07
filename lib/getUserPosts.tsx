export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: { revalidate: 60}})
    // revalidate checks if there is update on data in 60 seconds 
    if(!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}