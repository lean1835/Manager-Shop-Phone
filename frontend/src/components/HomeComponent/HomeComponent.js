import React from 'react'
import HeaderComponent from './HeaderComponent'
import BannerComponent from './BannerComponent'
import BodyComponent from './BodyComponent'
import FooterComponent from './FooterComponent'
import ManageComponent from './ManageComponent'

function HomeComponent(){
    return(
        <>
        {/* <HeaderComponent/> */}
        <ManageComponent/>
        <BannerComponent/>
        <BodyComponent/>
        {/* <FooterComponent/> */}
        </>
    )
}
export default HomeComponent