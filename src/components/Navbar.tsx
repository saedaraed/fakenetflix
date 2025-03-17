// src/components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { LogOut, Menu as MenuIcon, User, X } from "lucide-react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isAuthenticated, logout: logoutUser, login } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      login(); 
    }
  }, [login]);

  const handleLogout = async () => {
    Cookies.remove("authToken");
    logoutUser();
    router.replace("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 text-white p-4 flex items-center justify-between h-[70px] shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold tracking-wide">Fake Netflix</h1>
      </div>

      {isAuthenticated && (
        <div className="hidden lg:flex space-x-6">
          <Link href="/" className="hover:text-red-500 transition">Home</Link>
          <Link href="/movies" className="hover:text-red-500 transition">Movies</Link>
          <Link href="/tv-show" className="hover:text-red-500 transition">TV Shows</Link>
          <Link href="/my-list" className="block text-white hover:text-red-500 transition">My List</Link>
        </div>
      )}

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <SearchBar />
            <Tooltip title="Account settings">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
                <Avatar sx={{ width: 40, height: 40, boxShadow: "0 0 8px rgba(255,255,255,0.3)" }}><User /></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  '&::before': {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogOut fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 w-full bg-gray-800 p-5 space-y-4 shadow-lg">
          <Link href="/" className="block text-white hover:text-red-500 transition">Home</Link>
          <Link href="/movies" className="block text-white hover:text-red-500 transition">Movies</Link>
          <Link href="/tv-show" className="block text-white hover:text-red-500 transition">TV Shows</Link>
          <Link href="/my-list" className="block text-white hover:text-red-500 transition">My List</Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
