import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="absolute top-0 z-20 items-start flex h-[60px] w-full bg-background px-[5%] text-foreground max-lg:px-4 py-3">
      <div className="flex items-center justify-between w-full h-full">
        <a className="w-[120px] p-[4px]" href="">
          <img
            src="/assets/logo/incerto.png"
            alt="logo"
            className="object h-full w-full"
          />
        </a>

        <nav>
          <Link
            className="btn h-full min-w-[120px] rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 max-md:w-full px-4 py-2"
            to="/clickhouse-remediation"
          >
            Our ClickHouse Remediation
          </Link>
        </nav>
      </div>
    </header>
  );
};
