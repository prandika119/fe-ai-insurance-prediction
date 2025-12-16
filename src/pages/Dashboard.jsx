import { useState, useEffect } from "react";
import api from "../utils/axios";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faDollarSign,
    faBullseye,
    faGlobe,
    faWandMagicSparkles,
    faSmoking,
    faBan,
    faMars,
    faVenus,
    faHand,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get("/dashboard");
            setDashboardData(response.data);
            setLoading(false);
        } catch (err) {
            setError("Gagal memuat data dashboard");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            Loading dashboard...
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            </Layout>
        );
    }

    const { user_data, global_stats } = dashboardData || {};

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                    <h1 className="text-3xl font-bold">
                        Welcome back, {user_data?.username}!{" "}
                        <FontAwesomeIcon icon={faHand} className="inline" />
                    </h1>
                    <p className="text-blue-100 mt-2">{user_data?.full_name}</p>
                    <div className="mt-4 flex items-center gap-4">
                        <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            {user_data?.system_status}
                        </span>
                        <span className="text-blue-100">
                            Last updated: {user_data?.last_updated}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Prediksi
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {user_data?.total_predictions_user || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="text-2xl text-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Rata-rata Prediksi
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {user_data?.average_charges_user || "$0"}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faDollarSign}
                                    className="text-2xl text-green-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Akurasi Model
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {user_data?.accuracy_model || "0%"}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faBullseye}
                                    className="text-2xl text-purple-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Global Average
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {global_stats?.average_charges_global ||
                                        "$0"}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faGlobe}
                                    className="text-2xl text-orange-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Latest Activities */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Aktivitas Terakhir
                        </h2>
                        <div className="space-y-3">
                            {user_data?.latest_activities?.length > 0 ? (
                                user_data.latest_activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faWandMagicSparkles}
                                                    className="text-lg text-blue-600"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    Prediksi #{activity.id}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Age: {activity.age} |{" "}
                                                    {activity.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">
                                                {activity.charges}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Belum ada aktivitas
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Global Statistics */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Statistik Global
                        </h2>
                        <div className="space-y-4">
                            {/* Total Global Predictions */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Total Prediksi Global
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {global_stats?.total_global_predictions ||
                                        0}
                                </p>
                            </div>

                            {/* Top Region */}
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Top Region
                                </p>
                                <p className="text-2xl font-bold text-green-600 capitalize">
                                    {global_stats?.top_region || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Distribution Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Smoker Distribution */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Distribusi Perokok
                        </h2>
                        <div className="space-y-3">
                            {global_stats?.smoker_distribution &&
                                Object.entries(
                                    global_stats.smoker_distribution
                                ).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 capitalize">
                                                {key === "yes" ? (
                                                    <>
                                                        <FontAwesomeIcon
                                                            icon={faSmoking}
                                                            className="mr-1"
                                                        />{" "}
                                                        Perokok
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon
                                                            icon={faBan}
                                                            className="mr-1"
                                                        />{" "}
                                                        Tidak Merokok
                                                    </>
                                                )}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                {value}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    key === "yes"
                                                        ? "bg-red-500"
                                                        : "bg-green-500"
                                                }`}
                                                style={{ width: value }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Gender Distribution */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Distribusi Gender
                        </h2>
                        <div className="space-y-3">
                            {global_stats?.sex_distribution &&
                                Object.entries(
                                    global_stats.sex_distribution
                                ).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 capitalize">
                                                {key === "male" ? (
                                                    <>
                                                        <FontAwesomeIcon
                                                            icon={faMars}
                                                            className="mr-1"
                                                        />{" "}
                                                        Pria
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon
                                                            icon={faVenus}
                                                            className="mr-1"
                                                        />{" "}
                                                        Wanita
                                                    </>
                                                )}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                {value}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    key === "male"
                                                        ? "bg-blue-500"
                                                        : "bg-pink-500"
                                                }`}
                                                style={{ width: value }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
