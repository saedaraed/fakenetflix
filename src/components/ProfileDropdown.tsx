// src/components/ProfileDropdown.tsx
import Link from "next/link";

const ProfileDropdown = () => {
  return (
    <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-40">
      <ul>
        <li className="py-2 text-center">
          <a href="/logout" className="block text-white hover:bg-gray-700 px-4 py-2 rounded">
   Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
