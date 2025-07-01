import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { loginUser } from "../authSlice"
import { useEffect, useState } from 'react';
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";
// import { useTheme } from "next-themes";



// const [showPassword,setShowPassword] = useState()

// const schema = z.object({
//     email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
//     password: z.string().min(6, { message: "password must be at least 6 characters long" }),

// });



function Login() {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    // console.log(error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const onSubmit = (data) => {
        dispatch(loginUser(data));
        console.log(error);

        // if (error) {
        //   {error ? (alert("user unauthoeized ",error))  :null}
        // }

    };


    return (
        <Card className="p-0 max-w-sm w-full shadow-none border-none">
            <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                className="p-0"
            >
                <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                    <form>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="name@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
                    <Button className="w-full">Sign In</Button>
                </CardFooter>
            </MagicCard>
        </Card>
    );
}

export default Login;