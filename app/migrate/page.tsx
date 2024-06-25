// pages/migrate.tsx
"use client";
import { useState } from "react";
import axios from "axios";
import Wrapper from "@/components/Wrapper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MigratePage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleMigrate = async () => {
    try {
      setLoading(true);

      const { data } = await axios("/api/migrate", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      console.log(data);
      toast.success("Data migrated successfully!");
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <Wrapper>
      <h1>Data Migration</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleMigrate}
        disabled={loading}
      >
        {loading ? "Migrating..." : "Migrate Data"}
      </button>
      {message && <p>{message}</p>}
    </Wrapper>
  );
};

export default MigratePage;
