import { buttonVariants } from "./ui/button";
import landingImg from "../assets/landing-img.png";
import { Link } from "react-router-dom";
import { BiLogoGithub } from "react-icons/bi";
import logo from "../assets/logo.ico";

function Landing() {
  return (
    <div>
      <nav className="w-full md:w-2/3 mx-auto">
        <Link to="#">
          <img src={logo} />
        </Link>
      </nav>
      <main id="landing">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="flex flex-col items-center justify-center space-y-4 w-full md:w-2/3 mx-auto">
            <h1 className="text-4xl font-bold uppercase">
              Pread <span className="text-orange-400 uppercase">Me</span>
            </h1>
            <p className="text-md text-muted-foreground text-center">
              PreadMe: Streamline Readme Creation. Craft professional project
              documentation with ease.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 mt-4">
            <Link
              to="/editor"
              className={buttonVariants({
                className: "bg-orange-400 text-white rounded-lg px-14",
              })}
            >
              Get Started
            </Link>
          </div>
          <div className="mt-16 max-w-4xl px-4">
            <div className="rounded-lg border border-gray-400 border-opacity-50 shadow-md">
              <img src={landingImg} alt="landing-img" className="rounded-lg" />
            </div>
          </div>
        </div>
      </main>
      <footer id="footer" className=" bg-orange-400 text-white">
        <div className="w-2/3 mx-auto">
          <div className="py-24 md:py-6">
            <div className="flex flex-col justify-center  items-center gap-2">
              <span className="text-[.75rem]">
                Developed with 💗 by Ken Gervacio
              </span>
              <Link target="_blank" to="https://github.com/jkenger">
                <BiLogoGithub />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
