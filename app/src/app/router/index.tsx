//* React
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";


//* App layout
import { Layout } from '@app/layout';


//* Pages
import { UserPage } from "@pages/user";
import { NoPage } from "@pages/404";
import { AuthRouting } from "@pages/auth";


export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<AuthRouting />} />

                <Route path="/" element={<Layout />}>

                    {/* User page */}
                    <Route path="/" element={<UserPage />} />

                    {/*     ... */}

                    {/* System pages */}
                    <Route path="/404" element={<NoPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
