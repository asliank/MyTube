import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetails = () => {
  const { id } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data)=>{
      setChannelDetails(data?.items[0]);
    })
    fetchFromAPI(`search?channelId=${id}&part=snippet,id&order=date`)
    .then((data)=>{
      setVideos(data?.items);
    })
  }, [id]);

  return (
    <Box minHeight={"95v"}>
      <Box>
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(254,72,32,1) 19%, rgba(222,27,27,1) 100%)",
            zInex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetails} marginTop="-110px" />
      </Box>
      <Box display={"flex"} p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetails;
