import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/logo/logo.png";
import Loading from "./Loading";

const Header = () => {
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("LoggedOut");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="py-3 bg-[#1c231f] text-white">
      <div className="container">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="max-w-[200px]" />
          </NavLink>

          {/* Desktop Menu Starts Here */}
          <ul className="hidden lg:flex items-center gap-x-4">
            <li>
              <NavLink to="/" className="header-nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-spot" className="header-nav-link">
                All Tourists Spot
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-spot" className="header-nav-link">
                Add Tourists Spot
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-list" className="header-nav-link">
                My List
              </NavLink>
            </li>
            {loading ? (
              <Loading size={20} color="white" />
            ) : (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL}
                        alt="User"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="text-center">
                        {user?.displayName}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex justify-center focus:bg-transparent">
                        <button
                          onClick={handleLogout}
                          type="button"
                          className="primary-button"
                        >
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login" className="primary-button">
                      Login
                    </Link>
                    <Link to="/register" className="secondary-button">
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </ul>
          {/* Desktop Menu Ends Here */}

          {/* Hamburger Menu for Mobile Starts Here */}
          <div className="lg:hidden">
            <Hamburger toggled={isOpen} toggle={setIsOpen} direction="left" />

            {isOpen && (
              <div className="absolute top-[72px] right-0 bg-[#1c231f] p-4 shadow-lg text-center min-h-[calc(100vh-112px)]">
                <div className="flex flex-col gap-5">
                  <NavLink
                    to="/"
                    className="header-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/all-spot"
                    className="header-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    All Tourists Spot
                  </NavLink>
                  <NavLink
                    to="/add-spot"
                    className="header-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Tourists Spot
                  </NavLink>
                  <NavLink
                    to="/my-list"
                    className="header-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    My List
                  </NavLink>
                  {loading ? (
                    <Loading size={20} color="white" />
                  ) : (
                    <>
                      {user ? (
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                              <img
                                referrerPolicy="no-referrer"
                                src={user?.photoURL}
                                alt="User"
                                className="w-[40px] h-[40px] rounded-full object-cover"
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel className="text-center">
                                {user?.displayName}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex justify-center focus:bg-transparent">
                                <button
                                  onClick={handleLogout}
                                  type="button"
                                  className="primary-button"
                                >
                                  Logout
                                </button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="primary-button"
                            onClick={() => setIsOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="secondary-button"
                            onClick={() => setIsOpen(false)}
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Hamburger Menu for Mobile Ends Here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
