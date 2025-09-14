import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    village: "",
    district: "",
    state: "",
    country: "",
    role: "villager",
    adminId: "",
  });

  const allowedAdminIds = ["ADMIN123", "SUPER001"]; // Example allowed admin IDs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "password",
      "confirmPassword",
      "village",
      "district",
      "state",
      "country",
    ];

    // Check if all required fields are filled
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`${field} is required!`);
        return;
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Admin ID check
    if (form.role === "admin" && !allowedAdminIds.includes(form.adminId)) {
      alert("Invalid Admin ID!");
      return;
    }

    console.log("✅ Registration data:", form);
    alert("Registered successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* Header */}
      <header className="w-full bg-green-700 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">🌿 E-Gram Panchayat</h1>
      </header>

      {/* Form */}
      <main className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 w-[850px] border border-green-300 mt-10 mb-10"
        >
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Register
          </h2>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block font-medium mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mt-6">
            <label className="block font-medium mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password + Confirm */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
            <div>
              <label className="block font-medium mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          </div>

          {/* Village, District, State, Country */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
            <div>
              <label className="block font-medium mb-1">
                Village <span className="text-red-600">*</span>
              </label>
              <input
                name="village"
                type="text"
                value={form.village}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                District <span className="text-red-600">*</span>
              </label>
              <input
                name="district"
                type="text"
                value={form.district}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                State <span className="text-red-600">*</span>
              </label>
              <input
                name="state"
                type="text"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="mt-6">
            <label className="block font-medium mb-1">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="villager">Villager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Admin ID */}
          {form.role === "admin" && (
            <div className="mt-6">
              <label className="block font-medium mb-1">
                Admin ID <span className="text-red-600">*</span>
              </label>
              <input
                name="adminId"
                type="text"
                value={form.adminId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg mt-8 hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-200 text-center py-3 text-sm text-gray-700">
        © 2025 E-Gram Panchayat | All Rights Reserved
      </footer>
    </div>
  );
};

export default Register;
