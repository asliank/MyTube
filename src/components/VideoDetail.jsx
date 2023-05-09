import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setvideoDetail] = useState(null);
  const [relatedVideos, setrelatedVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setvideoDetail(data.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setrelatedVideos(data.items);
      }
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight={"90vh"}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1} justifyItems="center" alignItems={"center"} >
          <Box sx={{ width: "100%", position: "sticky",top:'70px' }}>
            <ReactPlayer
              className={"react-player"}
              controls
              url={`https://www.youtube.com/watch?v=${id}`}
            />
            <Typography
              color={"#fcfcfc"}
              variant="h5"
              fontWeight={"bold"}
              p={2}
            >
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  color={"#fff"}
                  variant={{ sm: "subtitle1", md: "h6" }}
                  fontWeight={"bold"}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack gap="20px" direction={"row"} alignItems="center">
                <Typography
                  color={"#fff"}
                  variant={"body1"}
                  sx={{ opacity: 0.8 }}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  color={"#fff"}
                  variant={"body1"}
                  sx={{ opacity: 0.8 }}
                >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Videos videos={relatedVideos} direction={'column'} />
      </Box>
      </Stack>

      
    </Box>
  );
};

export default VideoDetail;
