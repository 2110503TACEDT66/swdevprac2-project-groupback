import { UserRegisterJson } from "../../interface";

export default async function addUser(data:UserRegisterJson) {
    return fetch(`${process.env.BACKEND}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            tel: data.tel,
            role: "user"

        })
    })
    .then((prev) => {if(prev.ok) return prev.json(); else return {success: false}})
}