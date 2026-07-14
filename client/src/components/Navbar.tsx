import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Search, BarChart3, History, LogOut, Menu, X, Target, Sun, Moon, ChartNoAxesColumnIcon } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
    const { user, logout } = useApp();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

// this function work user login then they can't access feature page
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: "/dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
        { path: "/analyze", label: "Analyze", icon: <Search size={18} /> },
        { path: "/rank-tracker", label: "Rank Tracker", icon: <Target size={18} /> },
        { path: "/history", label: "History", icon: <History size={18} /> },
    ];

    return (
        <nav className="top-0 z-50 fixed bg-background/70 backdrop-blur-lg w-full">
            <div className="mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-2">
                        <ChartNoAxesColumnIcon />
                        <span className="text-foreground text-xl tracking-tight">Rank Pilot</span>
                    </Link>

                    {/* Desktop nav */}
                    {user && (
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.path} to={link.path} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${isActive(link.path) ? "bg-accent/5 text-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}>
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex justify-center items-center hover:bg-muted p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle theme">
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <>
                                <div className="flex items-center gap-2 bg-card px-2 py-1.5 border border-border rounded-full text-sm">
                                    <div className="flex justify-center items-center bg-primary rounded-full w-6 h-6 font-bold text-xs" style={{ color: "var(--background)" }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-foreground">{user.name}</span>
                                    <span className="bg-accent/10 px-2 py-0.5 border border-accent/15 rounded-full font-medium text-[10px] text-accent uppercase">{user.plan}</span>
                                </div>
                                <button onClick={handleLogout} className="flex items-center gap-1.5 hover:bg-muted px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm transition-all">
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Log In
                                </Link>
                                <Link to="/register" className="bg-primary px-5 py-2 rounded-full text-sm transition-opacity" style={{ color: "var(--background)" }}>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle container */}
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:bg-muted p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-background border-border border-b origin-top">
                    <div className="space-y-1 px-4 py-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 bg-muted mb-2 px-3 py-3 rounded-lg">
                                    <div className="flex justify-center items-center bg-primary rounded-full w-10 h-10 font-bold text-sm" style={{ color: "var(--background)" }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-sm">{user.name}</div>
                                        <div className="text-muted-foreground text-xs">{user.email}</div>
                                    </div>
                                </div>
                                <div className="space-y-1 py-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.path) ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                    className="flex items-center gap-3 hover:bg-danger/10 mt-2 px-3 py-3 rounded-lg w-full text-danger text-sm"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="space-y-2 py-2">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="block hover:bg-muted px-3 py-3 rounded-lg font-medium text-foreground text-sm text-center">
                                    Log In
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)} className="block bg-primary px-3 py-3 rounded-lg font-semibold text-sm text-center" style={{ color: "var(--background)" }}>
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
