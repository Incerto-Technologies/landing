import { GlowingEffect } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import Image from "next/image";

const IMPACT_METRICS = [
  {
    number: "65%",
    text: "Reduction in MTTR",
    area: "md:col-span-2",
    background: "globe",
    icon: "chart-line",
  },
  {
    number: "80%",
    text: "Reduction in MTTR",
    area: "md:col-span-1",
    background: "mttr",
    icon: "chart-line",
  },
  {
    number: "95%",
    text: "Cost saved on compute & storage",
    area: "md:col-span-1 md:row-span-2",
    background: "cost",
    icon: "dollar-sign",
  },
  {
    number: "90%",
    text: "Reduce on-call time",
    area: "md:col-span-1",
    background: "oncall",
    icon: "clock",
  },
  {
    number: "<2s",
    text: "Time to detect exact root cause",
    area: "md:col-span-1",
    background: "detection",
    icon: "search",
  },
  {
    number: "65%",
    text: "Increase in Query Performance",
    area: "md:col-span-1",
    background: "performance",
    icon: "zap",
  },
];

export function ImpactBento() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
      {IMPACT_METRICS.map((metric) => (
        <GridItem
          key={metric.text + metric.number}
          area={metric.area}
          title={metric.text}
          percentage={metric.number}
          background={metric.background}
          icon={metric.icon}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  percentage: string;
  background: string;
  icon: string;
}

const GridItem = ({
  area,
  title,
  percentage,
  background,
  icon,
}: GridItemProps) => {
  return (
    <li
      className={`min-h-[14rem] list-none ${area} group overflow-hidden rounded-2xl md:rounded-3xl`}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 transition-all duration-300 group-hover:border-primary/40">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-2 z-10">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="text-7xl font-medium leading-[1.1] tracking-tight text-muted-foreground text-start transition-all duration-300 group-hover:text-foreground">
              {percentage}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 text-start pt-0.5 font-sans text-[21px] font-medium text-balance transition-all duration-300 group-hover:text-foreground">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className={cn("absolute -right-1/3 -bottom-1/4 size-full opacity-30 transition-all  duration-500 group-hover:opacity-100", {
          "-rotate-45 opacity-60 -bottom-1/6  group-hover:-bottom-1/12 ": background === "globe",
          "opacity-30 group-hover:opacity-100 group-hover:-rotate-12 group-hover:-right-36 group-hover:bottom-2": background === "mttr",
         "-bottom-[70%] opacity-30  -right-[70%]  group-hover:-bottom-[50%] group-hover:-right-[50%] ": background === "performance",
          "group-hover:-rotate-180 opacity-30   group-hover:animate-spin group-hover:-right-36 group-hover:bottom-2": background === "cost",
          "group-hover:-rotate-180 opacity-30    group-hover:animate-ping  group-hover:-right-20 group-hover:bottom-2 ": background === "detection",

        })}>
          <BackgroundPattern type={background}  className={cn("text-muted-foreground group-hover:text-primary", {
          "scale-150": background === "performance",

          })}/>
        </div>
      </div>
    </li>
  );
};

interface BackgroundPatternProps {
  type: string;
  className?: string;
}

const BackgroundPattern = ({ type, className }: BackgroundPatternProps) => {
  switch (type) {
    case "mttr":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
        >
          <path
            d="M10,50 L30,30 L50,50 L70,30 L90,50"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.6"
            strokeOpacity="0.6"
            
          />
          <circle
            cx="50"
            cy="49"
            r="3"
            fill="currentColor"
            fillOpacity="1"
            
          />
          <path
            d="M20,70 L40,50 L60,60 L80,30"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.6"
            strokeOpacity="0.6"
            
          />
          <circle
            cx="60"
            cy="60"
            r="3"
            fill="currentColor"
            fillOpacity="1"

          />
        </svg>
      );
    case "cost":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}  
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.6"
            
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="20"
            fill="currentColor"
            fillOpacity="0.6"
           
          >
            $
          </text>
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.3  "
           
          />

        </svg>
      );
    case "oncall":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.6"
           
          />
          <path
            d="M50,30 L50,50 L65,65"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.6"
            className="transition-transform duration-300 origin-center group-hover:rotate-45"
            
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.3"
            
          />
  
        </svg>
      );
    case "detection":
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="currentColor"
            fillOpacity="0.3"
            
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeOpacity="0.1"
            
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            fill="currentColor"
            fillOpacity="0.5"
            
          />
            <circle
            cx="50"
            cy="50"
            r="1"
            fill="currentColor"
            fillOpacity="1"
            
          />
        </svg>
      );
    case "performance":
      return(
        <svg xmlns="http://www.w3.org/2000/svg"         width="100%"
        height="100%"
        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.618501" className={cn(className)}><path className="" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
      )
    default:
      return (
        <svg className={className} width="427" height="427" viewBox="0 0 427 427" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.6" d="M103.057 395.12C101.228 394.006 104.559 384.531 112.689 367.633C120.819 350.734 133.473 327.015 149.373 298.849C165.273 270.683 183.859 239.074 203.268 207.204C222.685 175.32 242.236 144.306 259.949 117.246C277.678 90.195 292.949 68.0678 304.228 53.097C315.515 38.1105 322.412 30.8166 324.241 31.931M76.3531 375.894C68.7577 369.467 67.6347 355.649 73.0874 335.831C78.5554 316.022 90.4219 290.89 107.486 262.992C124.55 235.095 146.231 205.403 170.33 176.914C194.438 148.41 220.108 122.107 244.768 100.637C269.442 79.1741 292.232 63.2922 310.863 54.6129C329.494 45.9327 343.306 44.7476 350.91 51.1589M50.3018 349.652C39.3524 336.508 36.1566 317.319 41.0054 294.002C45.8542 270.685 58.6109 244.057 77.968 216.796C97.3252 189.534 122.61 162.6 151.285 138.702C179.959 114.803 211.011 94.7929 241.302 80.6684C271.608 66.5518 300.09 58.8053 323.915 58.2241C347.732 57.6585 366.036 64.2613 376.97 77.398M25.1062 311.842C14.4342 291.389 12.6585 266.742 19.9672 240.392C27.2758 214.042 43.4105 186.922 66.7274 161.74C90.0595 136.567 119.756 114.231 152.847 96.9647C185.938 79.6984 221.266 68.1512 255.254 63.4238C289.259 58.7042 320.731 61.0164 346.513 70.0992C372.295 79.1829 391.488 94.7565 402.16 115.21M5.1594 255.301C-0.239811 228.363 4.08922 199.96 17.7111 172.957C31.3329 145.954 53.7628 121.295 82.7586 101.476C111.754 81.6571 146.282 67.3569 182.877 60.0159C219.471 52.6758 256.842 52.5717 291.237 59.6919C325.632 66.811 355.831 80.9139 378.802 100.576C401.775 120.238 416.716 144.794 422.115 171.733M4.45397 175.433C9.82883 145.899 24.7771 118.658 47.8022 96.4384C70.8121 74.211 101.086 57.7881 135.586 48.8065C170.078 39.8405 207.567 38.6289 244.285 45.3269C281.012 52.0101 315.671 66.3604 344.773 86.9187C373.874 107.477 396.43 133.515 410.123 162.432C423.817 191.35 428.209 222.108 422.835 251.641M41.6166 88.5583C68.7046 51.2816 112.797 28.6812 164.215 25.7514C215.634 22.8217 270.147 39.7993 315.768 72.9337C361.388 106.068 394.394 152.675 407.503 202.462C420.603 252.265 412.762 301.185 385.689 338.469M107.384 29.3429C145.212 7.52298 192.692 5.98741 239.371 25.1034C286.05 44.2184 328.105 82.3778 356.278 131.236C384.459 180.079 396.455 235.597 389.619 285.573C382.783 335.548 357.696 375.886 319.868 397.706M171.851 5.04192C209.403 -2.48372 249.816 12.2563 284.209 46.0417C318.602 79.827 344.139 129.849 355.227 185.141C366.315 240.432 362.012 296.451 343.299 340.867C324.585 385.281 292.972 414.473 255.42 421.999M223.075 1.11072C253.351 2.45974 281.398 26.1343 301.042 66.9141C320.686 107.693 330.302 162.266 327.817 218.598C325.308 274.937 310.89 328.424 287.704 367.31C264.519 406.197 234.494 427.295 204.217 425.945M262.964 6.70708C282.667 11.3992 296.356 37.708 301.037 79.8103C305.717 121.912 300.999 176.387 287.909 231.247C274.826 286.092 254.444 336.844 231.266 372.313C208.088 407.78 183.999 425.071 164.305 420.363M295.634 17.3402C303.773 20.7451 302.924 44.672 293.299 83.8652C283.674 123.058 266.059 174.312 244.314 226.337C222.569 278.361 198.489 326.92 177.343 361.308C156.222 395.689 139.783 413.108 131.644 409.702M140.835 413.316C120.08 405.751 99.9265 394.56 82.5335 380.941M218.371 426.104C185.622 426.843 147.275 416.196 111.972 396.592C76.669 376.988 47.3836 350.059 30.6757 321.876M269.044 418.819C227.397 430.061 169.232 418.836 116.042 389.299C62.851 359.762 22.5751 316.322 10.1029 275.028M311.16 402.465C289.206 413.796 259.413 417.491 225.735 413.058C192.057 408.625 156.042 396.288 122.503 377.664C88.9643 359.039 59.4446 335.005 37.8872 308.746C16.3213 282.501 3.70798 255.258 1.72108 230.632M346.852 379.26C325.397 396.501 292.418 404.177 253.264 401.042C214.109 397.906 171.084 384.144 131.188 361.989C91.291 339.834 56.8646 310.587 33.5048 279.008C10.1449 247.429 -0.772643 215.376 2.52067 188.051M376.397 350.352C357.093 373.325 322.497 385.238 279.25 383.81C235.995 382.397 187.097 367.742 141.938 342.665C96.7787 317.587 58.4902 283.828 34.4249 247.857C10.3595 211.886 2.18381 176.222 11.4709 147.707M399.534 316.753C389.136 335.476 370.339 349.078 345.03 356.237C319.705 363.389 288.776 363.826 255.32 357.486C221.865 351.148 187.08 338.279 154.439 320.154C121.797 302.027 92.4859 279.303 69.4196 254.255C46.3534 229.208 30.3588 202.713 23.0572 177.444C15.7404 152.167 17.3734 129.014 27.7624 110.306M399.534 316.753C372.158 366.049 326.309 402.458 272.087 417.961C217.866 433.465 159.721 426.789 110.41 399.406C61.1129 372.031 24.7029 326.181 9.19144 271.975C-6.31157 217.754 0.364105 159.61 27.7472 110.297C55.1219 61.0006 100.973 24.5909 155.179 9.07915C209.399 -6.42376 267.544 0.251627 316.856 27.6345C366.153 55.0096 402.562 100.861 418.074 155.067C433.577 209.288 426.909 267.455 399.534 316.753ZM415.825 279.351C408.728 301.161 391.74 317.778 366.811 327.298C341.891 336.803 310.059 338.829 274.965 333.112C239.862 327.41 202.919 314.199 168.392 295.026C133.85 275.844 103.122 251.477 79.7254 224.694C56.3293 197.911 41.1981 169.826 36.1083 143.657C31.0033 117.479 36.1427 94.2823 50.8986 76.7048M424.736 239.005C421.787 263.417 407.645 282.829 384.172 294.709C360.69 306.605 328.954 310.395 293.142 305.613C257.329 300.83 219.099 287.681 183.461 267.89C147.823 248.101 116.451 222.6 93.46 194.728C70.4692 166.857 56.9093 137.914 54.5943 111.693C52.2792 85.4715 61.2802 63.2068 80.4351 47.8129M425.575 196.426C427.704 222.802 417.523 244.791 396.578 259.071C375.634 273.351 345.064 279.162 309.462 275.611C273.862 272.061 235.184 259.358 199.257 239.409C163.331 219.458 132.087 193.332 110.268 164.998C88.4351 136.654 77.2072 107.633 78.2568 82.3051C79.3064 56.9772 92.605 36.7203 116.105 24.5762M417.193 152.03C425.515 179.617 420.716 203.956 403.627 220.755C386.537 237.554 358.264 245.715 323.807 243.796C289.366 241.884 250.972 229.996 215.441 210.265C179.909 190.535 149.537 164.236 129.693 136.003C109.864 107.777 101.845 79.4637 107.071 56.0768C112.296 32.6899 130.429 15.7329 158.237 8.22989M396.59 105.166C412.998 132.884 415.887 159.543 404.602 179.326C393.318 199.11 368.786 210.424 336.373 210.773C303.952 211.137 266.266 200.519 231.556 181.244C196.846 161.97 167.911 135.593 151.081 107.88C134.252 80.1657 130.878 53.3768 141.707 33.3399C152.535 13.3029 176.691 1.66152 208.894 0.936936M344.738 46.1231C367.969 64.3172 384.899 85.7582 392.428 106.496C399.942 127.226 397.538 145.852 385.635 158.904C373.73 171.955 353.157 178.541 327.707 177.462C302.255 176.384 273.668 167.694 247.248 153.023C220.812 138.342 198.338 118.679 183.968 97.6441C169.6 76.6096 164.314 55.6654 169.1 38.6604C173.886 21.6562 188.411 9.7625 209.995 5.19017C231.564 0.609992 258.729 3.6556 286.453 13.7565M373.377 124.713C366.248 137.551 350.508 144.93 329.647 145.226C308.77 145.515 284.479 138.692 262.104 126.267C239.715 113.834 221.083 96.8203 210.307 78.9561C199.516 61.0831 197.465 43.8453 204.602 30.9924C211.731 18.1551 227.471 10.7757 248.332 10.4792C269.209 10.1916 293.5 17.0132 315.875 29.4381C338.248 41.8631 356.896 58.8848 367.673 76.749C378.449 94.6142 380.505 111.876 373.377 124.713ZM351.5 100.605C346.643 109.35 335.936 114.37 321.737 114.566C307.539 114.761 290.989 110.127 275.763 101.672C260.537 93.217 247.846 81.6326 240.514 69.462C233.175 57.3061 231.775 45.5635 236.631 36.8175C241.488 28.0714 252.196 23.0524 266.394 22.857C280.592 22.6616 297.144 27.2958 312.37 35.7503C327.595 44.2057 340.286 55.7901 347.617 67.9608C354.957 80.1166 356.357 91.8592 351.5 100.605ZM326.233 79.2703C321.114 88.4876 303.947 88.7262 287.885 79.8064C271.822 70.8866 262.95 56.1888 268.068 46.9715C273.187 37.7541 290.354 37.5156 306.416 46.4344C322.478 55.3542 331.351 70.053 326.233 79.2703Z" stroke="currentColor" stroke-width="0.618501"/>
        </svg>
        
      );
  }
};
