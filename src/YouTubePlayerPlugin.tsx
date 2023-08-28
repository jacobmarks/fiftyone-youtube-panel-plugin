import { useState } from "react";
import { registerComponent, PluginComponentType } from "@fiftyone/plugins";
import { Box, Typography, Select, MenuItem, TextField } from "@mui/material";

export const YouTubeIcon = ({ size = "1rem", style = {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      style={style}
      viewBox={`0 0 250 165`}
    >
      <path
        d="M93.333 117.559V47.775l61.334 34.893zm136.43-91.742c-2.699-10.162-10.651-18.165-20.747-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.555 7.652 7.603 15.655 4.904 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.904 56.849c2.699 10.163 10.65 18.165 20.747 20.883 18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.683-4.934c10.096-2.718 18.048-10.72 20.747-20.883 4.904-18.42 4.904-56.85 4.904-56.85s0-38.43-4.904-56.849"
        fill="#fff"
      />
    </svg>
  );
};

const YoutubeEmbed = ({ embedId }) => (
  <div
    className="video-responsive"
    style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      minWidth: "500px",
    }}
  >
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default function YouTubePlayerPanel() {
  const videos = [
    { title: "Install, Use, and Write Plugins", embedId: "iJJaHudKlLI" },
    {
      title: "Introducing VoxelGPT & Building Custom Plugins",
      embedId: "F-2M37NFavU",
    },
    { title: "Getting Started with Fiftyone, Part 1", embedId: "rb-hKjXSNm8" },
    { title: "Getting Started with Fiftyone, Part 2", embedId: "5NudjkMAwKE" },
    { title: "Getting Started with Fiftyone, Part 3", embedId: "nCryMB4tId8" },
    { title: "Getting Started with Fiftyone, Part 4", embedId: "aZvXTUXFvxc" },
    { title: "Getting Started with Fiftyone, Part 5", embedId: "pufM7LwcvjY" },
    { title: "Getting Started with Fiftyone, Part 6", embedId: "3zi6nh3WhHk" },
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0].embedId);
  const [customLink, setCustomLink] = useState("");
  const [videoSource, setVideoSource] = useState("FiftyOne");


  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.value);
  };

  const handleCustomLinkChange = (event) => {
    const link = event.target.value;
    setCustomLink(link);

    const videoId = link.split("v=")[1]?.split("&")[0]; // Extract video ID from the URL
    if (videoId) {
      setSelectedVideo(videoId);
    }
  };

  const handleVideoSourceChange = (event) => {
    setVideoSource(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h6">Select video to watch</Typography>

      <div>
        <label>
          <input
            type="radio"
            value="FiftyOne"
            checked={videoSource === "FiftyOne"}
            onChange={handleVideoSourceChange}
          />
          FiftyOne Video
        </label>
        <label>
          <input
            type="radio"
            value="FromLink"
            checked={videoSource === "FromLink"}
            onChange={handleVideoSourceChange}
          />
          From Link
        </label>
      </div>
      {videoSource === "FiftyOne" ? (
        <Select
          value={selectedVideo}
          onChange={handleVideoChange}
          style={{ minWidth: "200px", marginBottom: "20px" }}
          label="Age"
        >
          {videos.map((video) => (
            <MenuItem key={video.embedId} value={video.embedId}>
              {video.title}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          label="Paste a custom YouTube link"
          variant="outlined"
          fullWidth
          value={customLink}
          onChange={handleCustomLinkChange}
          style={{ marginBottom: "20px" }}
        />
      )}

      <div className="App" style={{ minWidth: "500px" }}>
        <YoutubeEmbed embedId={selectedVideo} />
      </div>
    </Box>
  );
}

registerComponent({
  name: "YouTubePlayerPanel",
  label: "YouTube Player",
  component: YouTubePlayerPanel,
  type: PluginComponentType.Panel,
  Icon: () => <YouTubeIcon size={"1rem"} style={{ marginRight: "0.5rem" }} />,
});
