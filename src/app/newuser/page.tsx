"use client"
import { TextField } from "@mui/material";
import { useState , ChangeEventHandler} from 'react';
import { UserRegisterJson } from '../../../interface';
import addUser from '@/libs/addUser';


export default function newUserPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const makeUser = async () => {
        if (email && password && confirmPassword) {
            const submitButton = document.getElementById("submitButton");
            if (!submitButton) throw new Error("submit button has gone AWOL. how'd that even happen?");
            const item: UserRegisterJson = {
                name: name,
                email: email,
                tel: tel,
                password: password,
            }
            submitButton.innerText = "Registering..."
            submitButton.classList.remove("bg-sky-600", "bg-red-600", "bg-green-600");
            submitButton.classList.add("bg-gray-200");
            const response = password == confirmPassword ? await addUser(item) : {success: false};
            submitButton.classList.remove("bg-gray-200")
            if(!(response.success || response.seccess)){
                    submitButton.innerText = "Failed.";
                    submitButton.classList.add("bg-red-600");
            } else {
                submitButton.innerText = "Registered!";
                submitButton.classList.add("bg-green-600");
            }
        }
    }

    const handleNameChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setName(event.target.value); 
    };
    const handleEmailChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value); 
    };
    const handleTelChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setTel(event.target.value); 
    };
    const handlePasswordChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value); 
    };
    const handleConfirmChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setConfirmPassword(event.target.value); 
    };
    
    return(
        <main className='w-[100%] flex flex-col items-center space-y-4 m-5 p-5' style={{ marginTop: '70px' }}>
            
            <div className = "text-x1 front-medium " >Register new User</div>
            <div className='m-[0.2em]'>
            <TextField
                id="name"
                label="Name"
                variant="standard"
                name="name"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={name}
                onChange={handleNameChange}
            />
            </div>
            <div className='m-[0.2em]'>
            <TextField
                id="email"
                label="E-mail"
                variant="standard"
                name="email"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={email}
                onChange={handleEmailChange}
            />
            </div>
            <div className='m-[0.2em]'>
            <TextField
                id="tel"
                label="Phone Number"
                variant="standard"
                name="tel"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={tel}
                onChange={handleTelChange}
            />
            </div>
            <div className='m-[0.2em]'>
            <TextField
                id="pass"
                label="Password"
                variant="standard"
                name="password"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={password}
                onChange={handlePasswordChange}
                type="password"
            />
            </div>
            <div className='m-[0.2em]'>
            <TextField
                id="confirm"
                label="Confirm Password"
                variant="standard"
                name="confirm_password"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={confirmPassword}
                onChange={handleConfirmChange}
                type="password"
            />
            </div>

            <button id="submitButton" className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 m-[1em] text-white shadow-sm' name='Book Vaccine'
            onClick={makeUser}>
                Register
            </button>
            
        </main>
    );
}