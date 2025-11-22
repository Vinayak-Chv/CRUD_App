import { useState, useEffect } from "react";

const Form = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    // Load data when editing
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setAge(initialData.age);
            setEmail(initialData.email);
            setRole(initialData.role);
        } else {
            setName("");
            setAge("");
            setEmail("");
            setRole("user");
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { name, age, email, role };
        onSubmit(formData);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#2E2C34] p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {initialData ? "Update Data" : "Add New User"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-300">Name:</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-[#3A383F] outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-300">Age:</label>
                        <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#3A383F] outline-none"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-300">Email:</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-lg bg-[#3A383F] outline-none"
                            value={email} // FIXED
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-300">Role:</label>
                        <select
                            className="w-full p-3 rounded-lg bg-[#3A383F] outline-none"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
                        >
                            {initialData ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
