import ResponsiveAppBar from "../components/appbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid, Typography } from '@mui/material';
import Promotion_cards from "./promotion_cards";
import axios from "axios";
import  Hero  from '../assets/hero.jpg';
import React, { useState, useEffect } from 'react';
import agent from '../api/agent';
function HomePage(){
 
    const [homepagecards, setHomePageCards] = useState([]);
  
    useEffect(() => {
      agent.HomePage.list()
        .then(homepagecards => setHomePageCards(homepagecards))
        .catch(error => console.error('Error fetching homepage cards:', error));
    }, []);
return(
 <div>
    <ResponsiveAppBar/>
    <Box sx={{ display: { xs: 'none', md: 'flex' ,flexDirection:"column"}}}>
    <img src={Hero} alt="Hero" />

      </Box>
  <Box sx={{ marginTop: '200px' }}> </Box>
  <Box>
    <Typography sx={{maxWidth:"900px",marginX: 'auto',alignItems:'center'}} variant="h1">
      BİZE KATILMAK İSTER MİSİN?
    </Typography>
    <Typography sx={{ marginTop:"20px",maxWidth:"900px",marginX: 'auto',alignItems:'center'}} variant="h6">
      ÜYE OL
    </Typography>
  </Box>
  <Box sx={{ marginTop: '100px' }}> </Box>
  <Box sx={{ alignItems:"center" }}>
  <Promotion_cards homepagecards={homepagecards} />
  </Box>
  <Box>
  <Box sx={{ marginTop: '200px' }}> </Box>
  </Box>
  </div>

   
);};
export default HomePage;