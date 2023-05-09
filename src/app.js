import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Box} from '@mui/material';
import {Navbar,VideoDetail,Feed,ChannelDetails,SearchFeed} from './components'


const App = () => {
    return(
        <BrowserRouter>
        <Box sx={{backgroundColor:"#0e0e0e"}}>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Feed/>}  />
                <Route path="/video/:id"  element={<VideoDetail/>} />
                <Route path="/channel/:id"  element={<ChannelDetails/>}/>
                <Route path="/search/:searchTerm"  element={<SearchFeed/>} />
            </Routes>
        </Box>
        </BrowserRouter>
    )
}

export default App