import React from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return "Loading..."
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2} >
      {videos?.map((items, id) => (
        <Box key={id} sx={{width: { xs: '100%', sm:'358px', md: "320px" }}}>
          {items?.id?.videoId && <VideoCard video={items} />}
          {items?.id?.channelId && <ChannelCard channelDetail={items} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
