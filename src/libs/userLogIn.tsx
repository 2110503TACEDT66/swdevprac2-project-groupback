import getUserProfile from "./getUserProfile"

export default async function userLogin(userEmail:string,userPassword:string) {
    
    const response = await fetch(`${process.env.BACKEND}/api/v1/auth/login`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })    
    if(!response.ok){
        throw new Error("Failed to log-in")
    }
    const token = (await response.json()).token
    const profile = await getUserProfile(token)
    return {id: profile.data._id, token: token, name: profile.data.name}
}