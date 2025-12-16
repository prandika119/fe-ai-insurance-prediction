import { useState, useEffect } from "react";
import api from "../utils/axios";
import Layout from "../components/Layout";

const History = () => {
    const [history, setHistory] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchHistory(currentPage);
    }, [currentPage]);

    const fetchHistory = async (page) => {
        try {
            setLoading(true);
            const response = await api.get(`/history?page=${page}`);
            setHistory(response.data.data);
            setPagination(response.data.pagination);
            setLoading(false);
        } catch (err) {
            setError("Gagal memuat riwayat");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading history...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Riwayat Prediksi
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Lihat semua prediksi yang pernah Anda buat
                        </p>
                    </div>
                    <div className="bg-blue-100 px-6 py-3 rounded-lg">
                        <p className="text-sm text-gray-600">Total Prediksi</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {pagination?.total || 0}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* History List */}
                <div className="space-y-4">
                    {history.length > 0 ? (
                        history.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                #{item.id}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    Prediksi #{item.id}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                Estimasi Biaya
                                            </p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {item.charges}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Input Details */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Usia
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {item.input.age} tahun
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                BMI
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {item.input.bmi}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Anak
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {item.input.children}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Jenis Kelamin
                                            </p>
                                            <p className="font-semibold text-gray-900 capitalize">
                                                {item.input.sex === "male"
                                                    ? "👨 Pria"
                                                    : "👩 Wanita"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Perokok
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {item.input.smoker === "yes"
                                                    ? "🚬 Ya"
                                                    : "🚭 Tidak"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Region
                                            </p>
                                            <p className="font-semibold text-gray-900 capitalize">
                                                {item.input.region}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                            <span className="text-6xl mb-4 block">📭</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Belum Ada Riwayat
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Anda belum membuat prediksi apapun.
                            </p>
                            <a
                                href="/predict"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                🔮 Buat Prediksi Pertama
                            </a>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Previous
                        </button>
                        <div className="flex gap-2">
                            {Array.from(
                                { length: pagination.total_pages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(pagination.total_pages, prev + 1)
                                )
                            }
                            disabled={currentPage === pagination.total_pages}
                            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default History;
