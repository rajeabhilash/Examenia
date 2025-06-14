import "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Outlet, Link, Navigate } from "react-router-dom";

export function Layout() {
    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-content">
                    <h1>Examenia</h1>
                    <p>AI Powered Exam Platform</p>
                    <nav>
                        <SignedIn>
                            <Link to="/">Home</Link>
                            <Link to="/history">History</Link>
                            <UserButton />
                        </SignedIn>
                    </nav>
                </div>
            </header>

            <main className="app-main">
                <SignedOut>
                    <Navigate to="/sign-in" replace />
                </SignedOut>
                <SignedIn>
                    <Outlet />
                </SignedIn>
            </main>

            <footer>
                <p>&copy; 2023 Your Company</p>
            </footer>
        </div>
    );
}