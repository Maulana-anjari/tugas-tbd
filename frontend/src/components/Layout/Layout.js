import React from 'react';
import TopNavbar from "../Navbar";
import Footer from "../Footer";
const Layout =({children}) =>{
    return(
        <>
            <TopNavbar/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}

export default Layout;