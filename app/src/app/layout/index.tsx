import { Outlet } from "react-router-dom";
import { useEffect } from "react";


// import { Header } from "@app/layout/Header";
import { Footer } from '@app/layout/Footer';


import { useAuth } from "@features/auth";



export function Layout() {
    const { user, signOut } = useAuth()

    useEffect(() => {
        if (!user.id) {
            signOut()
        }
    }, [])


    return (<>
        {/* App header component */}
        {/* <Header /> */}

        {/* App content */}
        <div className="app-content">
            <Outlet />
        </div>

        {/* App footer component */}
        <Footer />
    </>);
}
