import { useState } from "react";

interface Video {
  title: string;
  src: string;
}

const videos: Video[] = [
  {
    title: "Cluster Connectivity",
    src: "/assets/video/cluster_connectivity.webm",
  },
  {
    title: "Resource Optimization",
    src: "/assets/video/low_resource.webm",
  },
  {
    title: "Table Data",
    src: "/assets/video/table_data.webm",
  },
  {
    title: "Query Performance",
    src: "/assets/video/query.webm",
  },
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="mt-2">
      <div className="pb-10 mx-auto">
        <h2 className="text-4xl font-semibold text-foreground text-center">
          Problems We Solve
        </h2>
      </div>
      <div className="px-10 mx-auto">
        <div className="grid grid-cols-2 gap-10 max-w-[1200px] mx-auto max-md:grid-cols-1">
          {videos.map((video) => (
            <div key={video.title} className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-foreground">
                {video.title}
              </h3>
              <div
                className="video-thumbnail cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                onClick={() => openVideoModal(video)}
              >
                <video src={video.src} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeVideoModal();
          }}
        >
          <div className="relative w-[90%] max-w-[1000px] scale-100 transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-foreground flex-1">
                {selectedVideo.title}
              </h3>
              <button
                onClick={closeVideoModal}
                className="text-foreground text-3xl hover:opacity-80 transition-opacity ml-4"
              >
                ✕
              </button>
            </div>
            <video
              controls
              autoPlay
              src={selectedVideo.src}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
