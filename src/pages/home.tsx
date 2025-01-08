import VideoGallery from "@/components/VideoGallery";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Home = () => {
  const [email, setEmail] = useState("");

  const handleContactSubmit = async () => {
    await fetch("https://incerto.in/api/contact", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  return (
    <>
      <section className="relative flex min-h-[70vh] w-full max-w-[100vw] flex-col overflow-hidden pt-[80px] max-lg:px-4 max-md:mt-0">
        <div className="flex h-full w-full place-content-center items-center gap-6 p-[5%] max-lg:flex-col max-lg:place-items-center">
          <div className="flex max-w-[600px] flex-col place-content-center max-lg:order-2 max-lg:mt-8 max-lg:text-center">
            <div className="flex flex-wrap text-6xl font-semibold uppercase leading-[1.2] max-lg:text-4xl max-md:text-3xl">
              Effortless ClickHouse Problem Solving with Just a Click
            </div>
            <h2 className="reveal mt-6 text-xl font-medium">
              Get alpha release access
            </h2>
            <div className="reveal mt-4 flex w-full max-w-[350px] place-items-center gap-4 overflow-hidden flex-col md:flex-row max-lg:mx-auto p-2">
              <Input
                type="email"
                className="h-full w-full p-3"
                placeholder="joe@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Button
                className="h-full min-w-[120px] max-md:w-full p-2.5"
                onClick={handleContactSubmit}
              >
                Let's Go
              </Button>
            </div>
          </div>

          <div className="flex max-h-[550px] max-w-[800px] w-full place-content-center place-items-center overflow-hidden max-lg:order-1 max-md:max-w-[100%]">
            <div className="relative flex w-fit place-content-center place-items-center">
              <div className="flex aspect-[4/2] overflow-hidden rounded-xl shadow-xl max-lg:max-h-[420px] max-lg:max-w-[100%]">
                <video
                  controls
                  src="/assets/video/intro.webm"
                  className="h-full w-full object-cover max-lg:object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoGallery />
    </>
  );
};
