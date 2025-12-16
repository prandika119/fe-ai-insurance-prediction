import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faWandMagicSparkles,
    faClockRotateLeft,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: faChartLine },
        { path: "/predict", label: "Prediksi", icon: faWandMagicSparkles },
        { path: "/history", label: "Riwayat", icon: faClockRotateLeft },
        { path: "/profile", label: "Profile", icon: faUser },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r border-gray-200">
                <div className="h-full px-3 py-4 overflow-y-auto">
                    {/* Logo */}
                    <div className="mb-8 px-4">
                        <h1 className="text-2xl font-bold text-blue-600">
                            AI Insurance
                        </h1>
                        <p className="text-sm text-gray-500">
                            Prediction System
                        </p>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.username?.[0]?.toUpperCase() || "U"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Online
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="text-lg w-5"
                                    />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="absolute bottom-4 left-3 right-3">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                className="text-lg w-5"
                            />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="ml-64">
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
