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
    faHand,
} from "@fortawesome/free-solid-svg-icons";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ScatterChart,
    Scatter,
    ZAxis,
} from "recharts";

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

    // Helper functions untuk format data chart
    const prepareSmokerData = () => {
        if (!global_stats?.smoker_distribution) return [];
        return [
            {
                name: "Perokok",
                value: parseInt(
                    global_stats.smoker_distribution.yes.replace("%", "")
                ),
                color: "#EF4444",
            },
            {
                name: "Tidak Merokok",
                value: parseInt(
                    global_stats.smoker_distribution.no.replace("%", "")
                ),
                color: "#22C55E",
            },
        ];
    };

    const prepareGenderData = () => {
        if (!global_stats?.sex_distribution) return [];
        return [
            {
                name: "Pria",
                value: parseInt(
                    global_stats.sex_distribution.male.replace("%", "")
                ),
                color: "#3B82F6",
            },
            {
                name: "Wanita",
                value: parseInt(
                    global_stats.sex_distribution.female.replace("%", "")
                ),
                color: "#EC4899",
            },
        ];
    };

    const prepareAgeGroupData = () => {
        if (!global_stats?.avg_charges_by_age_group) return [];
        return global_stats.avg_charges_by_age_group.map((item) => ({
            group: item.group,
            charges: Math.round(item.average_charge),
        }));
    };

    const prepareScatterData = () => {
        if (!global_stats?.scatter_plot_data) return [];
        return global_stats.scatter_plot_data.map((item) => ({
            age: item.age,
            charges: Math.round(item.charges),
            smoker: item.smoker,
        }));
    };

    const prepareSmokerChargesData = () => {
        if (!global_stats?.avg_charges_by_smoker) return [];
        return [
            {
                category: "Tidak Merokok",
                charges: Math.round(global_stats.avg_charges_by_smoker.no),
                color: "#22C55E",
            },
            {
                category: "Perokok",
                charges: Math.round(global_stats.avg_charges_by_smoker.yes),
                color: "#EF4444",
            },
        ];
    };

    const smokerData = prepareSmokerData();
    const genderData = prepareGenderData();
    const ageGroupData = prepareAgeGroupData();
    const scatterData = prepareScatterData();
    const smokerChargesData = prepareSmokerChargesData();

    // Custom tooltip untuk Scatter Plot
    const CustomScatterTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                        Age: {payload[0].payload.age}
                    </p>
                    <p className="text-sm text-gray-600">
                        Charges: ${payload[0].payload.charges.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                        Smoker:{" "}
                        {payload[0].payload.smoker === "yes" ? "Ya" : "Tidak"}
                    </p>
                </div>
            );
        }
        return null;
    };

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
                                    R<sup>2</sup> Score
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {user_data?.r2_score || "0.0"}
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
                                    Rata-rata Prediksi Global
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
                                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faWandMagicSparkles
                                                        }
                                                        className="text-lg text-blue-600"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        Prediksi #{activity.id}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
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
                                        <div className="ml-13 grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-600">
                                                    Usia:
                                                </span>
                                                <span className="font-medium text-gray-900">
                                                    {activity.age} tahun
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-600">
                                                    BMI:
                                                </span>
                                                <span className="font-medium text-gray-900">
                                                    {activity.bmi || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 col-span-2">
                                                <span className="text-gray-600">
                                                    Status:
                                                </span>
                                                <span
                                                    className={`font-medium ${
                                                        activity.smoker ===
                                                        "yes"
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {activity.smoker === "yes"
                                                        ? "Perokok"
                                                        : "Tidak Merokok"}
                                                </span>
                                            </div>
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
                    {/* Smoker Distribution - PIE CHART */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Distribusi Perokok
                        </h2>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={smokerData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={(entry) => `${entry.value}%`}
                                    >
                                        {smokerData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Gender Distribution - PIE CHART */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Distribusi Gender
                        </h2>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={(entry) => `${entry.value}%`}
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* BAR CHART - Average Charges by Age Group */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Rata-rata Biaya per Kelompok Usia
                    </h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageGroupData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="group" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) =>
                                        `$${value.toLocaleString()}`
                                    }
                                    labelStyle={{ color: "#000" }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="charges"
                                    fill="#3B82F6"
                                    name="Rata-rata Biaya"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* BAR CHART - Perbandingan Biaya Perokok vs Non-Perokok */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Perbandingan Biaya: Perokok vs Tidak Merokok
                    </h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={smokerChargesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) =>
                                        `$${value.toLocaleString()}`
                                    }
                                    labelStyle={{ color: "#000" }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="charges"
                                    name="Rata-rata Biaya"
                                    radius={[8, 8, 0, 0]}
                                >
                                    {smokerChargesData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            💡 <span className="font-semibold">Insight:</span>{" "}
                            Perokok memiliki biaya asuransi rata-rata
                            <span className="font-bold text-red-600">
                                {" "}
                                $
                                {smokerChargesData[1]?.charges.toLocaleString()}
                            </span>
                            , sedangkan non-perokok
                            <span className="font-bold text-green-600">
                                {" "}
                                $
                                {smokerChargesData[0]?.charges.toLocaleString()}
                            </span>
                            .
                        </p>
                    </div>
                </div>

                {/* SCATTER PLOT - Age vs Charges */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Hubungan Usia dan Biaya Asuransi
                    </h2>
                    <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    type="number"
                                    dataKey="age"
                                    name="Usia"
                                    label={{
                                        value: "Usia",
                                        position: "insideBottom",
                                        offset: -10,
                                    }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="charges"
                                    name="Biaya"
                                    label={{
                                        value: "Biaya ($)",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <ZAxis range={[100, 100]} />
                                <Tooltip content={<CustomScatterTooltip />} />
                                <Legend />
                                <Scatter
                                    name="Tidak Merokok"
                                    data={scatterData.filter(
                                        (d) => d.smoker === "no"
                                    )}
                                    fill="#22C55E"
                                    shape="circle"
                                />
                                <Scatter
                                    name="Perokok"
                                    data={scatterData.filter(
                                        (d) => d.smoker === "yes"
                                    )}
                                    fill="#EF4444"
                                    shape="circle"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
