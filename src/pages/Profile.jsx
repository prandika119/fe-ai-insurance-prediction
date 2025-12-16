import { useState, useEffect } from "react";
import api from "../utils/axios";
import Layout from "../components/Layout";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/profile");
            setProfile(response.data.data);
            setFormData({
                full_name: response.data.data.full_name,
                email: response.data.data.email,
            });
            setLoading(false);
        } catch (err) {
            setError("Gagal memuat profile");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.put("/profile", formData);
            setProfile(response.data.data);
            setSuccess("Profile berhasil diperbarui!");
            setEditing(false);
            setSaving(false);
        } catch (err) {
            setError(
                err.response?.data?.message || "Gagal memperbarui profile"
            );
            setSaving(false);
        }
    };

    const cancelEdit = () => {
        setFormData({
            full_name: profile.full_name,
            email: profile.email,
        });
        setEditing(false);
        setError("");
        setSuccess("");
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading profile...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Profile Saya
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Kelola informasi profile Anda
                    </p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    {/* Header with Avatar */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4">
                            <span className="text-4xl font-bold text-blue-600">
                                {profile?.username?.[0]?.toUpperCase() || "U"}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            {profile?.username}
                        </h2>
                        <p className="text-blue-100 mt-1">{profile?.email}</p>
                    </div>

                    {/* Profile Information */}
                    <div className="p-8">
                        {!editing ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">
                                            Username
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {profile?.username}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">
                                            User ID
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            #{profile?.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Nama Lengkap
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {profile?.full_name}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Email
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {profile?.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setEditing(true)}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    ✏️ Edit Profile
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="full_name"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Masukkan email"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving
                                            ? "Menyimpan..."
                                            : "💾 Simpan Perubahan"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                        <span className="text-4xl mb-3 block">🔐</span>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Keamanan
                        </h3>
                        <p className="text-sm text-gray-600">Akun Anda aman</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                        <span className="text-4xl mb-3 block">✅</span>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Terverifikasi
                        </h3>
                        <p className="text-sm text-gray-600">
                            Email terverifikasi
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                        <span className="text-4xl mb-3 block">⭐</span>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Member
                        </h3>
                        <p className="text-sm text-gray-600">Status aktif</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
