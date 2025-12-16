import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCakeCandles,
    faWeightScale,
    faBaby,
    faMars,
    faVenus,
    faSmoking,
    faBan,
    faEarthAmericas,
    faWandMagicSparkles,
    faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const Predict = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        bmi: "",
        children: "",
        sex: "male",
        smoker: "no",
        region: "northwest",
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await api.post("/predict", {
                ...formData,
                age: parseInt(formData.age),
                bmi: parseFloat(formData.bmi),
                children: parseInt(formData.children),
            });
            setResult(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Prediksi gagal");
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            age: "",
            bmi: "",
            children: "",
            sex: "male",
            smoker: "no",
            region: "northwest",
        });
        setResult(null);
        setError("");
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Prediksi Biaya Asuransi
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Masukkan data untuk mendapatkan estimasi biaya asuransi
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Age */}
                            <div>
                                <label
                                    htmlFor="age"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faCakeCandles}
                                        className="mr-2"
                                    />
                                    Usia (Tahun)
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Contoh: 30"
                                    min="18"
                                    max="100"
                                    required
                                />
                            </div>

                            {/* BMI */}
                            <div>
                                <label
                                    htmlFor="bmi"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faWeightScale}
                                        className="mr-2"
                                    />
                                    BMI (Body Mass Index)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    id="bmi"
                                    name="bmi"
                                    value={formData.bmi}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Contoh: 28.5"
                                    min="10"
                                    max="60"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    BMI = Berat (kg) / (Tinggi (m))²
                                </p>
                            </div>

                            {/* Children */}
                            <div>
                                <label
                                    htmlFor="children"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faBaby}
                                        className="mr-2"
                                    />
                                    Jumlah Anak
                                </label>
                                <input
                                    type="number"
                                    id="children"
                                    name="children"
                                    value={formData.children}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Contoh: 2"
                                    min="0"
                                    max="10"
                                    required
                                />
                            </div>

                            {/* Sex */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Jenis Kelamin
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label
                                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                                            formData.sex === "male"
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="male"
                                            checked={formData.sex === "male"}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <FontAwesomeIcon
                                            icon={faMars}
                                            className="text-2xl mr-2"
                                        />
                                        <span className="font-medium">
                                            Pria
                                        </span>
                                    </label>
                                    <label
                                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                                            formData.sex === "female"
                                                ? "border-pink-500 bg-pink-50"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="female"
                                            checked={formData.sex === "female"}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <FontAwesomeIcon
                                            icon={faVenus}
                                            className="text-2xl mr-2"
                                        />
                                        <span className="font-medium">
                                            Wanita
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Smoker */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Status Perokok
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label
                                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                                            formData.smoker === "yes"
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="smoker"
                                            value="yes"
                                            checked={formData.smoker === "yes"}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <FontAwesomeIcon
                                            icon={faSmoking}
                                            className="text-2xl mr-2"
                                        />
                                        <span className="font-medium">Ya</span>
                                    </label>
                                    <label
                                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                                            formData.smoker === "no"
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="smoker"
                                            value="no"
                                            checked={formData.smoker === "no"}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <FontAwesomeIcon
                                            icon={faBan}
                                            className="text-2xl mr-2"
                                        />
                                        <span className="font-medium">
                                            Tidak
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Region */}
                            <div>
                                <label
                                    htmlFor="region"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faEarthAmericas}
                                        className="mr-2"
                                    />
                                    Region
                                </label>
                                <select
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                >
                                    <option value="northwest">Northwest</option>
                                    <option value="northeast">Northeast</option>
                                    <option value="southwest">Southwest</option>
                                    <option value="southeast">Southeast</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        "Memproses..."
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faWandMagicSparkles}
                                                className="mr-2"
                                            />
                                            Prediksi Sekarang
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Result */}
                    <div className="space-y-6">
                        {result ? (
                            <>
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
                                    <div className="text-center">
                                        <FontAwesomeIcon
                                            icon={faWandMagicSparkles}
                                            className="text-5xl mb-4"
                                        />
                                        <h2 className="text-xl font-semibold mb-2">
                                            Estimasi Biaya Asuransi
                                        </h2>
                                        <p className="text-5xl font-bold mb-2">
                                            {result.predicted_charges_formatted}
                                        </p>
                                        <p className="text-green-100">
                                            Prediksi berhasil dibuat!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Ringkasan Input
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">
                                                Usia:
                                            </span>
                                            <span className="font-semibold">
                                                {result.input_summary.age} tahun
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">
                                                BMI:
                                            </span>
                                            <span className="font-semibold">
                                                {result.input_summary.bmi}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">
                                                Jumlah Anak:
                                            </span>
                                            <span className="font-semibold">
                                                {result.input_summary.children}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">
                                                Jenis Kelamin:
                                            </span>
                                            <span className="font-semibold capitalize">
                                                {result.input_summary.sex}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">
                                                Perokok:
                                            </span>
                                            <span className="font-semibold capitalize">
                                                {result.input_summary.smoker ===
                                                "yes"
                                                    ? "Ya"
                                                    : "Tidak"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">
                                                Region:
                                            </span>
                                            <span className="font-semibold capitalize">
                                                {result.input_summary.region}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/history")}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    <FontAwesomeIcon
                                        icon={faClockRotateLeft}
                                        className="mr-2"
                                    />
                                    Lihat Riwayat
                                </button>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 text-center">
                                <FontAwesomeIcon
                                    icon={faWandMagicSparkles}
                                    className="text-6xl mb-4 text-blue-600"
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Siap untuk Prediksi?
                                </h3>
                                <p className="text-gray-600">
                                    Lengkapi form di sebelah kiri untuk
                                    mendapatkan estimasi biaya asuransi Anda.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Predict;
