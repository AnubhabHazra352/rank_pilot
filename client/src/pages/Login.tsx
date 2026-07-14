import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, ChartNoAxesColumnIcon, User2Icon } from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Login({ state }: { state: string }) {
    const [isLoginState, setIsLoginState] = useState(state === "login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {login, register} = useApp();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true); 
        
        let result;
        if(isLoginState){
            result = await login(email, password)
        }else{
            result = await register(name, email, password)
        }

        if(result.success){
            const redirect = searchParams.get("redirect") || "/Dashboard";
            navigate(redirect);
        }else{
            toast.error(result.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center px-4 min-h-screen">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <Link to="/" className="group flex justify-center items-center gap-2 mb-10">
                        <ChartNoAxesColumnIcon />
                        <span className="text-foreground text-xl tracking-tight">Rank Pilot</span>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-card p-8 border border-border rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="py-5 text-center">
                            <h1 className="text-foreground text-2xl">Welcome back</h1>
                            <p className="mt-1 text-muted-foreground text-sm">{isLoginState ? "Sign in to your" : "Create an"} Rank Pilot account</p>
                        </div>

                        {!isLoginState && (
                            <label>
                                <div className="block mb-1.5 text-foreground text-sm">Name</div>
                                <div className="relative">
                                    <User2Icon size={18} className="top-1/2 left-3.5 absolute text-muted-foreground -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="bg-muted/60 py-3 pr-4 pl-11 border border-border focus:border-primary/50 rounded-lg outline-none w-full text-foreground text-sm transition-colors placeholder-muted-foreground"
                                    />
                                </div>
                            </label>
                        )}
                        <label>
                            <div className="block mt-4 mb-1.5 text-foreground text-sm">Email</div>
                            <div className="relative">
                                <Mail size={18} className="top-1/2 left-3.5 absolute text-muted-foreground -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="bg-muted/60 py-3 pr-4 pl-11 border border-border focus:border-primary/50 rounded-lg outline-none w-full text-foreground text-sm transition-colors placeholder-muted-foreground"
                                />
                            </div>
                        </label>

                        <label>
                            <div className="block mt-4 mb-1.5 text-foreground text-sm">Password</div>
                            <div className="relative">
                                <Lock size={18} className="top-1/2 left-3.5 absolute text-muted-foreground -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="bg-muted/60 py-3 pr-4 pl-11 border border-border focus:border-primary/50 rounded-lg outline-none w-full text-foreground text-sm transition-colors placeholder-muted-foreground"
                                />
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-50 mt-5 py-3 rounded-lg w-full text-primary-foreground text-sm transition-opacity"
                            id="login-submit-btn"
                            style={{ color: "var(--background)" }}
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : isLoginState ? "Sign In" : "Create Account"}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-muted-foreground text-sm text-center">
                    {isLoginState ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLoginState((prev) => !prev)} className="pl-1 font-medium text-primary hover:underline">
                        {isLoginState ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
