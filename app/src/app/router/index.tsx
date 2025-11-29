//* React
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";


//* App layout
import { Layout } from '@app/layout';


//* Pages
import { UserPage } from "@pages/user";
import { NoPage } from "@pages/404";
import { AuthRouting } from "@pages/auth";
import { HomePage } from "@pages/home";
import { RouteRouting } from "@pages/route";



export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />

                    <Route path="/route/*" element={<RouteRouting />} />
                    
                    
                    <Route path="/auth/*" element={<AuthRouting />} />


                    {/* User page */}
                    <Route path="/user" element={<UserPage />} />

                    {/*     ... */}

                    {/* System pages */}
                    <Route path="/404" element={<NoPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>

                

            </Routes>
        </BrowserRouter>
    );
}
